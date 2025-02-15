import { Dialog, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import { ImSpinner8 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { PROXY_USER, SESSION_KEYS } from '../../constants/global.constants';
import useContextMenuHook from '../../hooks/useContextMenuHook';
import useEncryptionHook from '../../hooks/useEncryption';
import useSearchParam from '../../hooks/useSearchParam';
import { setSessionItem } from '../../utils/utils';

interface LoginPopupProps {
    open: boolean;
    loading?: boolean;
    onClose: () => void;
    onConfirm?: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ open, onClose }) => {
    useContextMenuHook();
    const { encrypt } = useEncryptionHook();

    const navigate = useNavigate();
    const { value: redirectRoute } = useSearchParam('redirect');
    const [userName, setUserName]: any = useState();
    const [password, setPassword]: any = useState();
    const [invalidField, setInvalidField]: any = useState('');
    const [isLoading, setIsLoading]: any = useState(false);

    const handleLogin = () => {
        if (!validateFields()) return;
        const encryptedPassword = encrypt(password);
        const encryptedStorageKey = encrypt(SESSION_KEYS.PROXY_AUTH);

        setIsLoading(true);
        let apiRequest = {
            email: userName,
            password: encryptedPassword,
        };
        if (userName === PROXY_USER.username && password === PROXY_USER.password) {
            setSessionItem(encryptedStorageKey, encrypt(JSON.stringify({
                password,
                expiresAt: Date.now() + SESSION_KEYS.PROXY_EXPIRE_AT,
            })));
            onClose();
        }
        setIsLoading(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission
        handleLogin();
    };
    const validateFields = () => {
        if (userName !== 'admin') {
            setInvalidField('credserror');
            return false;
        }
        if (password !== 'admin@123') {
            setInvalidField('credserror');
            return false;
        }
        // if (
        //     !/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/.test(
        //         userName,
        //     )
        // ) {
        //     setInvalidField('credserror');
        //     return false;
        // }
        // if (
        //     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        //         password,
        //     )
        // ) {
        //     setInvalidField('credserror');
        //     return false;
        // }
        return true;
    };
    return (
        <Dialog
            open={open}
            // onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        // onClose={(event, reason) => {
        //     if (reason !== 'backdropClick') {
        //         onClose && onClose();
        //     }
        // }}
        >
            <DialogContent className="w-full md:w-[580px]  bg-zinc-700  text-white slide-in-alert">
                <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-lg font-semibold">Sign in</h2>
                    <p>
                        The proxy https://lusso.dev is requires a username and password
                    </p>

                    <div className="flex flex-col md:flex-row md:items-center gap-x-4 space-y-2">
                        <p>Username</p>
                        <div className="flex flex-col w-full">
                            <input
                                type="text"
                                autoComplete="new-password"
                                value={userName || ''}
                                onChange={e => {
                                    setInvalidField('');
                                    setUserName(e.target.value);
                                }}
                                className={`bg-zinc-800 rounded-md border w-full px-2 py-2 text-white 
        ${invalidField === 'credserror' ? 'border-red-500' : 'border-gray-500'} 
        focus:border-orange-500 focus:outline-none`}
                            />
                            {invalidField === 'credserror' && (
                                <span className="text-red-500 text-xs">
                                    Please enter a valid username
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-x-4 space-y-2">
                        <p>Password</p>
                        <div className="flex flex-col w-full">
                            <input
                                autoComplete="new-password"
                                type="password"
                                value={password}
                                onChange={e => {
                                    setInvalidField('');
                                    setPassword(e.target.value);
                                }}
                                className={`bg-zinc-800 rounded-md border w-full px-2 py-2 text-white 
        ${invalidField === 'credserror' ? 'border-red-500' : 'border-gray-500'} 
        focus:border-orange-500 focus:outline-none`}
                            />
                            {invalidField === 'credserror' && (
                                <span className="text-red-500 text-xs">
                                    Please enter a valid password
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="submit"
                            className={`min-w-[120px] rounded-full py-2 bg-orange-500`}
                            disabled={isLoading}
                        >
                            {!isLoading ? (
                                'Sign in'
                            ) : (
                                <ImSpinner8 color="white" size={23} className="spinning-icon" />
                            )}
                        </button>
                        {/* <button
                            type="button"
                            onClick={onClose}
                            className="text-white py-2 rounded-full hover:text-white border px-5  border-white"
                        >
                            Cancel
                        </button> */}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default LoginPopup;
