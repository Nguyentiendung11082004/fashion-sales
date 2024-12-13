import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PasswordResetHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const url = window.location.href;
        const segments = url.split('/');
        const token = segments[segments.length - 1];

        if (token) {
            navigate(`/password/reset?token=${token}`);
        } else {
            console.error('Token not found in the URL.');
        }
    }, [navigate]);

    return null;
};

export default PasswordResetHandler;
