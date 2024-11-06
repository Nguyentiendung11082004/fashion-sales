import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PasswordResetHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const url = window.location.href; // Lấy URL hiện tại
        const segments = url.split('/'); // Chia URL thành các phần
        const token = segments[segments.length - 1]; // Lấy phần cuối cùng, đó là token
        console.log("url:", url); // In ra token để kiểm tra
        console.log("segments:", segments); // In ra token để kiểm tra
        console.log("Token:", token); // In ra token để kiểm tra

        if (token) {
            // Chuyển hướng đến trang r eset mật khẩu với token
            navigate(`/password/reset?token=${token}`);
        } else {
            console.error('Token not found in the URL.');
        }
    }, [navigate]); // Thay đổi dependency từ `history` sang `navigate`

    return null;
};

export default PasswordResetHandler;
