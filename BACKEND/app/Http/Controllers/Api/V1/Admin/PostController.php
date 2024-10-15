<?php
namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;
use Illuminate\Support\Str;
use HTMLPurifier;

use App\Http\Controllers\Controller;
use App\Http\Requests\Post\StorePostRequest;
use App\Http\Requests\Post\UpdatePostRequest;
use App\Models\Category;

class PostController extends Controller
{
    /**
     * Bảo vệ tất cả các phương thức bằng middleware auth.
     */
    public function __construct()
    {
        $this->middleware('auth:sanctum');  // Bảo vệ tất cả phương thức
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $posts = Post::latest('id')->get();

            return response()->json([
                'data' => $posts
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => 'Đã có lỗi nghiêm trọng xảy ra.'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        try {
            $data = $request->all();
            // Tạo slug 
            $data['slug'] = $this->generateUniqueSlug($data['post_name']);
            // Lấy user_id
            $data['user_id'] = Auth::id();
           // Làm sạch nội dung HTML trước khi lưu
            $purifier = new HTMLPurifier();
            $data['post_content'] = $purifier->purify($data['post_content']);

            // Nếu có nhiều hình ảnh, mã hóa mảng ảnh thành chuỗi JSON để lưu
            if ($request->has('img_thumbnail')) {
                $data['img_thumbnail'] = json_encode($request->img_thumbnail);
            }

            // Tạo bài viết mới
            $post = Post::create($data);

            return response()->json([
                'message' => 'Thêm bài viết thành công!',
                'data' => $post
            ], Response::HTTP_CREATED);

        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Thêm bài viết thất bại!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $post = Post::findOrFail($id);
       // Giải mã img_thumbnail từ chuỗi JSON thành mảng
            $post->img_thumbnail = json_decode($post->img_thumbnail);

            return response()->json([
                'message' => 'Lấy bài viết thành công!',
                'data' => $post
            ], Response::HTTP_OK);
        } catch (\Exception $ex) {
            return response()->json([
                'message' => $ex->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, $id)
    {
        try {
            $post = Post::findOrFail($id);
            $data = $request->all();
    
            // Kiểm tra xem 'post_name' có thay đổi không, nếu có thì tạo slug mới
            if ($data['post_name'] !== $post->post_name) {
                $data['slug'] = $this->generateUniqueSlug($data['post_name'], $id);
            } else {
                $data['slug'] = $post->slug; // Nếu không thay đổi giữ nguyên slug
            }

            // Làm sạch nội dung HTML trước khi lưu
            $purifier = new HTMLPurifier();
            $data['post_content'] = $purifier->purify($data['post_content']);
    
            // Nếu có hình ảnh mới, mã hóa mảng hình ảnh thành chuỗi JSON
            if ($request->has('img_thumbnail')) {
                $data['img_thumbnail'] = json_encode($request->img_thumbnail);
            } else {
                // Nếu không có hình ảnh mới, giữ lại ảnh cũ
                $data['img_thumbnail'] = $post->img_thumbnail; // Giữ nguyên ảnh cũ
            }
    
            // Cập nhật bài viết
            $post->update($data);
    
            return response()->json([
                'message' => 'Cập nhật bài viết thành công!',
                'data' => $post
            ], Response::HTTP_OK);
    
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Cập nhật bài viết thất bại!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            // Tìm và xóa bài viết
            $post = Post::findOrFail($id);
            $post->delete();

            return response()->json([
                'message' => 'Xóa bài viết thành công!'
            ], Response::HTTP_OK);

        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Xóa bài viết thất bại!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate a unique slug for the post.
     */
    private function generateUniqueSlug($value, $id = null)
    {
        // Tạo slug từ 'value'
        $slug = Str::slug($value, '-');

        // Kiểm tra slug trùng lặp, bỏ qua chính bản ghi đang được cập nhật (nếu có id)
        $original_slug = $slug;
        $count = 1;

        // Vòng lặp kiểm tra slug có trùng lặp không, nếu có thì thêm số
        while (Post::where('slug', $slug)->where('id', '!=', $id)->exists()) {
            $slug = $original_slug . '-' . $count;
            $count++;
        }

        return $slug;
    }
    // public function getPostsGroupedByCategory()
    // {
    //     try {
    //         $categories = Category::with('posts')->get();
    //         $data = [];
    //         foreach ($categories as $category) {
    //             $data[$category->name] = $category->posts->map(function ($post) {
    //                 return [
    //                     'title' => $post->post_name,
    //                 ];
    //             });
    //         }

    //         $uncategorizedPosts = Post::whereNull('category_id')->get();
            
    //         // 5. Thêm bài viết không có danh mục vào mảng
    //         $data['Không có danh mục'] = $uncategorizedPosts->map(function ($post) {
    //             return [
    //                 'title' => $post->post_name,
    //             ];
    //         });

    //         // 6. Trả về JSON response
    //         return response()->json([
    //             'status' => true,
    //             'message' => 'Danh sách bài viết theo danh mục và không có danh mục',
    //             'data' => $data
    //         ], 200);

    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Không thể lấy danh sách bài viết',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }
    public function getPostsGroupedByCategory(Request $request)
    {
        try {
            // Kiểm tra tham số fields để xác định có trả về tất cả các trường hay chỉ các trường cụ thể
            $fields = $request->query('fields', 'id_post_name_img_user_date'); // Mặc định là id, post_name, img_thumbnail, user_name, và created_at
    
            // 1. Lấy tất cả các danh mục và bài viết thuộc danh mục
            $categories = Category::with('posts.user')->get(); // Lấy cả thông tin người đăng qua mối quan hệ 'user'
            
            // 2. Chuẩn bị mảng để lưu bài viết phân theo danh mục
            $data = [];
    
            // 3. Lặp qua các danh mục và nhóm bài viết
            foreach ($categories as $category) {
                // Kiểm tra nếu danh mục có bài viết
                if ($category->posts->count() > 0) {
                    if ($fields === 'id_post_name_img_user_date') {
                        // Trả về id, post_name, img_thumbnail, tên người đăng và ngày đăng
                        $data[$category->name] = $category->posts->map(function ($post) {
                            return [
                                'id' => $post->id,
                                'post_name' => $post->post_name,
                                'img_thumbnail' => $post->img_thumbnail,
                                'user_name' => $post->user->name, // Lấy tên người đăng từ quan hệ user
                                'created_at' => $post->created_at->format('Y-m-d'), // Định dạng ngày đăng
                                'slug' => $post->slug,
                            ];
                        });
                    } else {
                        // Trả về tất cả các trường
                        $data[$category->name] = $category->posts;
                    }
                }
            }
    
            // 4. Lấy các bài viết không có danh mục (category_id = null)
            $uncategorizedPosts = Post::whereNull('category_id')->with('user')->get(); // Lấy thông tin người đăng
    
            // Nếu có bài viết không thuộc danh mục
            if ($uncategorizedPosts->count() > 0) {
                if ($fields === 'id_post_name_img_user_date') {
                    $data['Không có danh mục'] = $uncategorizedPosts->map(function ($post) {
                        return [
                            'id' => $post->id,
                            'post_name' => $post->post_name,
                            'img_thumbnail' => $post->img_thumbnail,
                            'user_name' => $post->user->name, // Lấy tên người đăng từ quan hệ user
                            'created_at' => $post->created_at->format('Y-m-d'), // Định dạng ngày đăng
                            'slug' => $post->slug,
                        ];
                    });
                } else {
                    $data['Không có danh mục'] = $uncategorizedPosts;
                }
            }
    
            // 5. Trả về JSON response
            return response()->json([
                'status' => true,
                'message' => 'Danh sách bài viết theo danh mục và không có danh mục',
                'data' => $data
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Không thể lấy danh sách bài viết',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    
    
}
