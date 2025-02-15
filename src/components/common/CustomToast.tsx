import { toast } from 'react-toastify';


const showCustomToast = (message: string, backgroundColor: string, color: string) => {


    toast(message, {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
        style: { backgroundColor: backgroundColor, color: color },
        closeButton: <span
            style={{
                cursor: 'pointer',
                color: color,
                fontSize: '16px',
                fontWeight: 'bold',
            }}
        >
            ✖
        </span>
    });
};

export default showCustomToast;
