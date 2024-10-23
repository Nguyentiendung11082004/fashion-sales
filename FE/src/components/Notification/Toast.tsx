import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface NotificationProps {
    title: string;
    icon: 'success' | 'error' | 'warning' | 'info' | 'question'; 
    text: string; 
    isVisible: boolean; 
}

const Notification: React.FC<NotificationProps> = ({ title, icon, text, isVisible }) => {
    useEffect(() => {
        if (isVisible) {
            MySwal.fire({
                title: title,
                icon: icon,
                text: text,
                timerProgressBar: true,
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }, [isVisible]);

    return null; 
};

export default Notification;
