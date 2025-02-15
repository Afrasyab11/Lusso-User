import axios from 'axios';
import React, { useState } from 'react';
import FAQ from '../../../components/common/FAQ';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { ICON_ENUM } from '../../../constants/icons.constant';
import { getCookies } from '../../../utils/utils';

export const questions: { question: string; answer: string }[] = [
    {
        question: 'How does your platform handle product promotion?',
        answer:
            "Our platform uses a custom AI model to generate promotional posts tailored to your product's specifics. The posts are automatically scheduled and published across multiple social media platforms. You can also take advantage of our built-in product boosting features to enhance visibility and engagement.",
    },
    {
        question: "Can I track my product's performance?",
        answer:
            "Absolutely! Our platform provides detailed analytics, giving you real-time insights into your product's performance. You can track metrics such as views, clicks, likes, shares, and other engagement stats across all social platforms.",
    },
    {
        question: 'How can I integrate my listings with other platforms?',
        answer:
            'Our platform offers seamless integration with various social media and e-commerce platforms. With just a few clicks, you can sync your product listings, ensuring consistency and wide reach across multiple channels.',
    },
    {
        question: 'How can I contact customer support?',
        answer:
            'You can reach our customer support via email, or through a support ticket directly from your account dashboard. Our team is available 24/7 to assist you with any inquiries or issues.',
    },
];

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    listOfServices: '',
    helpMessage: '',
}

const ContactUs = () => {
    const [formData, setFormData] = useState<{ [key: string]: string }>(initialState);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<any>({});
    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setFieldErrors((prevErrors: any) => ({
            ...prevErrors,
            [name]: undefined, // Clear error for the current field
        }));

    };

    const validateFields = () => {
        const errors: any = {};

        if (!formData.firstName?.trim()) {
            errors.firstName = "Name is required.";
        }

        if (!formData.email?.trim()) {
            errors.email = "Email is required.";
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                errors.email = "Please enter a valid email address.";
            }
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = async () => {
        if (!validateFields()) return;

        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phone,
            servicesList: [formData.listOfServices],
            description: formData.helpMessage,
        };

        try {
            const token = getCookies('authToken');
            const response = await axios.post(
                'https://api.lusso.dev/api/v1/contactUs',
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            if (response.status === 200) {
                setSuccessMessage('Your message has been sent successfully!');
                setFormData(initialState)
            }
        } catch (error) {
            setError('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="home-price-background-banner flex flex-col gap-2">
                <div className="relative h-[80%] bg-cover w-full contact-background-banner flex flex-col justify-center items-center gap-5 py-24 md-lt:h-[50%] md:px-0 px-[15px]">
                    <h1 className="text-3xl lg:text-5xl font-bold">Get in touch</h1>
                    <p className="text-xl px-3 text-center">
                        Can’t find the solution you’re looking for? Here’s how to get help
                        from our experts.
                    </p>
                    <div className="join bg-[#FFFFFF1A] rounded-full p-2 w-full lg:w-1/2">
                        <input
                            className="input join-item bg-transparent w-full"
                            placeholder="Search"
                        />
                        <button className="btn bg-gradient-vertical rounded-full text-white py-2 lg:px-6 transition-all transform hover:scale-105 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70 hover:opacity-100"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-bold hover:text-gray-200 transition-colors">
                                Search
                            </span>
                            <div>
                                <img
                                    src={ICON_ENUM.STAR_GROUP.icon}
                                    alt="star-group"
                                    className="h-3 opacity-80 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </button>

                    </div>
                </div>
                <div className="px-5 lg:px-10 py-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 space-y-3">
                        <div className="flex items-center">
                            <div className="flex flex-col gap-5 lg:w-1/2">
                                <h1 className="text-xl lg:text-3xl font-bold text-center lg:text-start">
                                    Feel free to{' '}
                                    <span className="text-primary-custom">reach out</span> to us
                                    for any inquiries or assistance directly
                                </h1>
                                <div className="flex items-center justify-center lg:justify-start gap-5 p-3 border border-[#FFFFFF57]">
                                    <div>
                                        <img
                                            src={ICON_ENUM.EMAIL.icon}
                                            alt="email"
                                            className="h-5"
                                        />
                                    </div>
                                    <span>Lusso.ai</span>
                                </div>
                            </div>
                        </div>
                        <div className="card-bg-dev rounded-2xl p-5 lg:p-16 opacity-70 text-white space-y-3">
                            <Input
                                label="First Name"
                                name="firstName"
                                placeholder="Enter your first name"
                                value={formData?.firstName ?? ''}
                                onChange={onChange}
                                required
                            />
                            {fieldErrors.firstName && <p className="text-red-500 text-sm ">{fieldErrors.firstName}</p>}
                            <Input
                                label="Last Name"
                                name="lastName"
                                placeholder="Enter your last name"
                                value={formData?.lastName ?? ''}
                                onChange={onChange}
                            />
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData?.email ?? ''}
                                onChange={onChange}
                                required
                            />
                            {fieldErrors.email && <p className="text-red-500 text-sm ">{fieldErrors.email}</p>}
                            <Input
                                label="Phone Number"
                                type="phone"
                                name="phone"
                                placeholder="Enter your phone"
                                value={formData?.phone ?? ''}
                                onChange={onChange}
                            />
                            <Input
                                label="I am interested in:"
                                name="listOfServices"
                                placeholder="List of services"
                                value={formData?.listOfServices ?? ''}
                                onChange={onChange}
                            />
                            <Input
                                label="How can we help you?"
                                name="helpMessage"
                                className='h-[140px]'
                                type="textarea"
                                placeholder="Enter your message here"
                                value={formData.helpMessage}
                                onChange={onChange}
                            />
                            {isSubmitting ?
                                <div className="flex w-full justify-center">
                                    <div className="loader"></div>
                                </div> :
                                <Button
                                    label={isSubmitting ? "Sending..." : "Send Message"}
                                    className="bg-gradient-vertical w-full py-2 rounded-full transition-transform transform hover:scale-105 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500"
                                    onClick={handleSubmit}

                                    disabled={isSubmitting}
                                />
                            }
                            {error && <p className="text-red-500">{error}</p>}
                            {successMessage && (
                                <p className="text-green-500">{successMessage}</p>
                            )}
                        </div>
                    </div>
                    <FAQ questions={questions} />
                </div>
            </div>
        </>
    );
};

export default ContactUs;

