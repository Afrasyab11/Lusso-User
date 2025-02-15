import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { ChangeEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getCookies } from "../../utils/utils";
import "../developer/dev.scss";
const AddMember = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [role, setRole] = useState('');
    const [snackOpen, setSnackOpen] = useState(false);
    const SnackBar = () => {
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackOpen} autoHideDuration={6000} onClose={() => { setSnackOpen(false) }}>
                <Alert
                    onClose={() => { setSnackOpen(false) }}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Added member successfully
                </Alert>
            </Snackbar>
        )
    }
    const onSave = () => {
        const token = getCookies('authToken');
        let headers = {
            Authorization: `Bearer ${token}`
        }
        let request = {
            "username": name,
            "email": email,
            "phoneNumber": mobileNumber,
            "role": role
        }
        axios.post('https://api.lusso.dev/api/v1/users', request, { headers: headers })
            .then((response) => {
                console.log('Member added successfully')
                setSnackOpen(true);
                setTimeout(() => {
                    navigate('/dev/members')
                }, 3000)
            })
            .catch((error) => {
                console.log('Error in adding member')
            })
    }
    return (
        <div>
            <div>
                <div className='text-white font-bold text-[20px]'>
                    <span>Member Management</span>
                </div>
                <div>
                    <div className="horizontal-divider-light mt-4 mb-4"></div>
                </div>
            </div>
            <div>
                <input
                    placeholder='Search Members'
                    className='table-searchInput'
                    style={{ color: "#FFF" }}
                />
            </div>
            <div className="flex-1">
                <div className='members-data-table'>
                    <div className="flex flex-row justify-center items-center bg-[#2E2E66] p-1.5"
                        style={{ borderRadius: 8, borderBottom: '1px #8e8c8c solid' }}
                    >
                        <span className='text-white font-semi-bold text-[18px]'>Add New Member</span>
                    </div>
                    <div className="p-6 flex flex-row justify-center items-center"
                        style={{ minHeight: 'calc(100vh - 320px)' }}
                    >
                        <div className="flex flex-col gap-y-4 p-6" style={{ border: '1px solid #8D57FF', boxShadow: '0px 0px 50px 0px #6C8CFF', borderRadius: 12 }}>
                            <div>
                                <label>
                                    <span className="text-white font-normal text-[14px]">
                                        Full Name <span style={{ color: 'red' }}>*</span>
                                    </span>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Enter Here"
                                        className="ac-frm-input rounded-pill badge h-[50px]"
                                        value={name || ''}
                                        style={{
                                            borderRadius: 50,
                                            border: '1px solid #A768FD',
                                            background: 'rgba(4, 4, 4, 0.20)',
                                            marginTop: 10,
                                        }}
                                        onChange={e => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <span className="text-white font-normal text-[14px]">
                                        Email <span style={{ color: 'red' }}>*</span>
                                    </span>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Enter Here"
                                        className="ac-frm-input rounded-pill badge h-[50px]"
                                        value={email || ''}
                                        style={{
                                            borderRadius: 50,
                                            border: '1px solid #A768FD',
                                            background: 'rgba(4, 4, 4, 0.20)',
                                            marginTop: 10,
                                        }}
                                        onChange={e => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <span className="text-white font-normal text-[14px]">
                                        Phone <span style={{ color: 'red' }}>*</span>
                                    </span>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Enter Here"
                                        className="ac-frm-input rounded-pill badge h-[50px]"
                                        value={mobileNumber || ''}
                                        style={{
                                            borderRadius: 50,
                                            border: '1px solid #A768FD',
                                            background: 'rgba(4, 4, 4, 0.20)',
                                            marginTop: 10,
                                        }}
                                        onChange={e => {
                                            setMobileNumber(e.target.value);
                                        }}
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <span className="text-white font-normal text-[14px]">
                                        Role <span style={{ color: 'red' }}>*</span>
                                    </span>
                                    <select
                                        value={role || ''}
                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                            setRole(e.target.value);
                                        }}
                                        className="ac-frm-select-input rounded-pill badge h-[50px]"
                                        style={{
                                            borderRadius: 50,
                                            border: '1px solid #A768FD',
                                            background: 'rgba(4, 4, 4, 0.20)',
                                            marginTop: 10,
                                        }}
                                    >
                                        <option value="" disabled>
                                            Select your role
                                        </option>
                                        <option value="Admin">Admin</option>
                                        <option value="Editor">Editor</option>
                                        <option value="User">User</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </label>
                            </div>
                            <div className='flex flex-row justify-center items-center'>
                                <div className='flex flex-row justify-center items-center gap-12'>
                                    <button
                                        className="saveContinue mt-5"
                                        style={{
                                            borderRadius: 50,
                                            border: '1px solid #FFF',
                                            textTransform: 'capitalize',
                                            paddingLeft: 36,
                                            paddingRight: 36
                                        }}
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={onSave}
                                        className="saveContinue mt-5"
                                        style={{
                                            borderRadius: 50,
                                            border: '1px solid #A768FD',
                                            background: 'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)',
                                            textTransform: 'capitalize',
                                            paddingLeft: 36,
                                            paddingRight: 36
                                        }}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                <SnackBar />
            }
        </div>
    )
}

export default AddMember;