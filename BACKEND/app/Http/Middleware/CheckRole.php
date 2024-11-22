<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, ...$roles)
{
    $user = auth()->user();

    // Kiểm tra nếu user chưa đăng nhập
    if (!$user) {
        return response()->json(['message' => 'Chưa đăng nhập'], 401);
    }

    // Kiểm tra nếu role của user không nằm trong danh sách $roles
    if (!in_array($user->role->id, $roles)) {
        return response()->json(['message' => 'Bạn không có quyền ở chức năng này!'], 403);
    }

    // Nếu hợp lệ, tiếp tục xử lý request
    return $next($request);
}

}
