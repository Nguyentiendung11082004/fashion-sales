// toastConfig.js
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/index.css'; 
const Toast = {
    success: (message:string) => {
        toast.success(message, {
            className: 'toast-success',
        });
    },
    error: (message:string) => {
        toast.error(message, {
            className: 'toast-error', 
        });
    },
};
export const ToastProvider = () => <ToastContainer />;

export default Toast;
