import { Close } from '@mui/icons-material';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LineDraw } from '../../pages/explore/categoryDetails/GameDetailsScreen';

type FormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
};

type ContactFormProps = {
    isPopup?: boolean;
    onClose?: () => void;
    onSubmit?: any
};

const ContactForm: React.FC<ContactFormProps> = ({ isPopup = false, onClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleFormSubmit: SubmitHandler<FormInputs> = (data) => {
        if (onSubmit) {
            onSubmit(data);
        }

        // Reset the form fields
        reset();

        // Set the form as submitted (if needed)
        setIsSubmitted(true);
    };

    const formContent = (
        <div className="mb-3 bg-[#161328] rounded-2xl p-5 md:max-w-xl">
            <h2 className="text-3xl font-bold mb-4">Let's work together!</h2>
            <LineDraw />
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input
                            {...register("firstName", { required: "First name is required" })}
                            placeholder="First name"
                            className="w-full bg-gray-800 text-white border border-[#7D3CF3] rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#5721B9]"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <input
                            {...register("lastName", { required: "Last name is required" })}
                            placeholder="Last name"
                            className="w-full bg-gray-800 text-white border border-[#7D3CF3] rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#5721B9]"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid email address"
                                }
                            })}
                            placeholder="Email address"
                            className="w-full bg-gray-800 text-white border border-[#7D3CF3] rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#5721B9]"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <input
                            {...register("phoneNumber", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Invalid phone number"
                                }
                            })}
                            placeholder="Phone number"
                            className="w-full bg-gray-800 text-white border border-[#7D3CF3] rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#5721B9]"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                    </div>
                </div>
                <div>
                    <textarea
                        {...register("message", { required: "Message is required" })}
                        placeholder="Message..."
                        rows={4}
                        className="w-full bg-gray-800 text-white border border-[#7D3CF3] rounded-3xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#5721B9]"
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>
                <button
                    type="submit"
                    className="bg-[#5721B9] hover:bg-[#7D3CF3] text-white font-bold py-2 px-6 rounded-full transition duration-300"
                >
                    Send Message
                </button>
            </form>
        </div>
    );

    if (isPopup) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex top-10 md:top-0 items-center justify-center p-4 z-30">
                <div className="relative">
                    {formContent}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-white hover:text-gray-300"
                    >
                        <Close />
                    </button>
                </div>
            </div>
        );
    }

    return formContent;
};

export default ContactForm;