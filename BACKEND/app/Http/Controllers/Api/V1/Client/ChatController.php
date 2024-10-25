<?php

namespace App\Http\Controllers\Api\V1\Client;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Dotenv\Util\Str;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            $user = Auth::user();
            $menbership = User::query()->where('id', "<>", $user->id)->where("role_id", 2)->get();
            $conversation = Conversation::query()->with(["users"=>function($query) use($user){
                $query->wherePivot("user_id","<>",$user->id);
            }])->get();

            return response()->json([
                "message" => "lấy dữ liệu thành công",
                "menbership" => $menbership,
                "conversation" => $conversation
            ]);
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        try {
            return  DB::transaction(function () use ($request) {
                $request->validate([
                    'recipient_id' => 'required|exists:users,id',
                    'content' => 'required|string',
                ]);


                $user = $request->user();

                $recipient_id = $request->recipient_id;
                if ($recipient_id == $user->id) {
                    return response()->json([
                        "message" => "Bạn không thể gửi tin nhắn cho chính mình",

                    ], Response::HTTP_INTERNAL_SERVER_ERROR);
                }
                // Kiểm tra xem đã có cuộc trò chuyện giữa hai người chưa
                $conversation = Conversation::whereHas('users', function ($q) use ($user) {
                    $q->where('id', $user->id);
                })->whereHas('users', function ($q) use ($recipient_id) {
                    $q->where('id', $recipient_id);
                })->first();

                if (!$conversation) {
                    // Tạo cuộc trò chuyện mới
                    $conversation = Conversation::create();
                    $conversation->users()->attach([$user->id, $recipient_id]);
                }
                // Kiểm tra quyền truy cập
                if (!$conversation->users->contains($user)) {

                    return response()->json(['error' => 'Unauthorized'], 403);
                }


                // Tạo tin nhắn mới
                $message = $conversation->messages()->create([
                    'user_id' => $user->id,
                    'content' => $request->input("content"),
                ]);


                // Phát sự kiện MessageSent
                broadcast(new MessageSent($message))->toOthers();

                return response()->json([
                    "message" => "gửi tin nhắn thành công",
                    "data" => $message
                ]);
            });
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {


            $user = request()->user();
            $conversation = Conversation::query()->findOrFail($id);

            // // $conversation->load('users');
            // dd($conversation->load('users')->toArray());
            if (!$conversation->users->contains("id", $user->id)) {

                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $messages = $conversation->messages()

                ->with('user:id,name,email')

                ->orderBy('created_at', 'asc')
                ->get();
            // dd($messages->toArray());

            // Lấy danh sách người dùng từ các tin nhắn, sau đó loại bỏ trùng lặp
            $uniqueUsers = $messages->pluck('user')->unique('id')->values();

            // Tạo mảng tin nhắn chỉ chứa thông tin user_id thay vì toàn bộ user
            $messages = $messages->map(function ($message) {
                return [
                    'id' => $message->id,
                    'user_id' => $message->user_id,
                    'conversation_id' => $message->conversation_id,
                    'content' => $message->content,
                    'created_at' => $message->created_at,
                    'updated_at' => $message->updated_at,
                ];
            });

            return response()->json([
                "message" => "Lấy dữ liệu thành công",
                "users" => $uniqueUsers,
                "messages" => $messages,
            ]);
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    // destroy conversation
    public function destroy(string $id)
    {
        //
        try {
            return DB::transaction(function () use ($id) {
                $conversation = Conversation::query()->findOrFail($id);
                $user = request()->user();
                $conversation->users()->updateExistingPivot($user->id, ['is_deleted' => true]);
                $deletedForAllUsers = $conversation->users()->wherePivot('is_deleted', false)->count() === 0;
                if ($deletedForAllUsers) {

                    $message = $conversation->load(["messages"]);
                    foreach ($message->messages as $item) {

                        Message::query()->findOrFail($item->id)->delete();
                    }
                    $conversation->users()->sync([]);
                    $conversation->delete();
                }

                return response()->json(['message' => 'Xóa cuộc trò chuyện thành công']);
            });
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    // xóa message
    public function deleteMessage($conversationId)
    {
        try {

            return DB::transaction(function () use ($conversationId) {

                $messageId = request()->input('message');
                // dd($messageId);
                $user = Auth::user();
                $conversation = Conversation::query()->findOrFail($conversationId);
                foreach ($messageId as  $id) {

                    $message = Message::query()->where([
                        [
                            'id',
                            $id
                        ],
                        [
                            'user_id',
                            $user->id
                        ],
                        [
                            "conversation_id",
                            $conversation->id
                        ]
                    ])->first();
                    // dd($message->toArray());
                    if (!$message) {
                        // echo 1;die;
                        return response()->json([
                            'error' => 'Tin nhắn không tồn tại hoặc bạn không có quyền xóa tin nhắn này.'
                        ], 403);
                    } else {

                        $message->delete();
                        return response()->json([
                            "message" => "xóa tin nhắn thành công"
                        ]);
                    }
                }

                // dd($message->toArray());
            });
        } catch (\Exception $ex) {
            return response()->json([
                "message" => $ex->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
