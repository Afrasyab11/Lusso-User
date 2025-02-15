import { ChangeEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";

const ContactDetailsForm = () => {
    const [selectedCountryCode, setSelectedCountryCode] = useState<string>('+635');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const countryCodes: string[] = ['+635', '+1', '+91']; // Example country codes

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setImagePreview(reader.result);
                } else {
                    console.error('Unexpected FileReader result type');
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='flex flex-col gap-6 w-full'>
            <p className='font-semibold text-[#00FFFF] md-lt:text-[20px] lg:text-[26px]'>Contact Details</p>
            <div className="flex justify-between items-start">
                <div className="w-full">
                    <div className='md-lt:pl-0 md-lt:pt-2 lg:pl-2 flex flex-col gap-3 w-full'>
                        <p className='text-white '>Full name</p>
                        <div className="flex items-center gap-4">
                            <input
                                className='outline-none bg-[#04040433] px-5 py-3 border-2 border-[#5721B9] rounded-full text-[white]'
                                placeholder="First name"
                            // value={companyName}
                            // onChange={e => setCompanyName(e.target.value)}
                            />
                            <input
                                className='outline-none bg-[#04040433] px-5 py-3 border-2 border-[#5721B9] rounded-full text-[white]'
                                placeholder="Last name"
                            // value={companyName}
                            // onChange={e => setCompanyName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='md-lt:pl-0 md-lt:pt-2 lg:pl-2 flex flex-col gap-3 w-full'>
                        <p className='text-white '>Email</p>
                        <div className="flex items-center gap-4">
                            <input
                                className='outline-none bg-[#04040433] px-5 py-3 border-2 border-[#5721B9] rounded-full text-[white] w-full'
                                placeholder="Enter your email"
                            // value={companyName}
                            // onChange={e => setCompanyName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='md-lt:pl-0 md-lt:pt-2 lg:pl-2 flex flex-col gap-3 w-full'>
                        <p className='text-white'>Phone</p>
                        <div className="flex items-center gap-4 bg-[#04040433] px-5 py-3 border-2 border-[#5721B9] rounded-full text-white w-full">
                            {/* Country Code Dropdown */}
                            <div className="flex items-center gap-1">
                                <select
                                    className='bg-transparent text-[#FF5722] outline-none border-none text-lg'
                                    value={selectedCountryCode}
                                    onChange={e => setSelectedCountryCode(e.target.value)}
                                    style={{
                                        appearance: 'none',
                                        WebkitAppearance: 'none',
                                        MozAppearance: 'none',
                                        paddingRight: '0.5rem',
                                    }}
                                >
                                    {countryCodes.map(code => (
                                        <option key={code} value={code} className="text-black">
                                            {code}
                                        </option>
                                    ))}
                                </select>
                                <span className="pointer-events-none">
                                    <svg className="w-4 text-[#FF5722]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </div>
                            {/* Phone Number Input */}
                            <input
                                className='outline-none bg-transparent text-white w-full'
                                placeholder="Your Phone Number"
                            />
                        </div>
                    </div>
                </div>
                <div className="ml-3 max-w-xs mx-auto p-4 bg-gradient-to-b from-[#1A0D2B] to-[#24035F] rounded-xl w-[40%]">
                    <div className="relative bg-white rounded-lg overflow-hidden">
                        <div className="relative w-full h-[200px]">
                            <div className="absolute inset-0 aspect-w-1 aspect-h-1">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Uploaded" className="object-cover w-full h-full" />
                                ) : (
                                    <div className="flex justify-center items-center w-full h-full bg-gray-100">
                                        <p className="text-gray-400">No image uploaded</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-[#1A0D2B] bg-opacity-50 text-white flex justify-center py-2">
                            <label htmlFor="file-upload" className="cursor-pointer flex items-center">
                                <FiUpload className="mr-2 text-white" />
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </div>
                    <p className="text-gray-400 mt-3 text-[11px]">
                        Image size should be under 1MB<br />and image ratio needs to be 1:1
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ContactDetailsForm;
