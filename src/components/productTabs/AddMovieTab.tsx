import { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { RxQuestionMarkCircled } from "react-icons/rx";
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css";
import { useStateContext } from "../../context/ContextProvider";
import { languages, movieTabGeners } from "../../data/productData";
import { checkNullOrEmpty, negativeNumberValidation } from "../../utils/utils";
import { isValidEmail, isValidPhone, isValidUrl, isValidWebsite } from "../../utils/validationUtils";
import DropDown from "../dropdown/DropDown";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import MediaUpload from "./MediaUpload";
interface AddMovieTabProps {
    setCurrentStep: (step: number) => void;
    currentStep: number;
    countries: string[];
    getAllProducts?: any
}
interface Link {
    platform: string;
    link: string;
}
interface Plan {
    plan: string;
    price: string;
}
interface Field {
    id: number;
    title: string;
    placeholder: string;
    value: string;
}
const AddMovieTab: React.FC<AddMovieTabProps> = ({ setCurrentStep, currentStep, countries, getAllProducts }) => {

    // ------------------------ Handle Submission ------------------------
    const context = useStateContext()
    const [description, setDescription] = useState("")
    const [additionalInfo, setAdditionalInfo] = useState<Record<string, string>>({});
    const [mediaFields, setMediaFields] = useState<Record<string, any>[]>([]);
    const [productInfo, setProductInfo] = useState<Record<string, string>>({});
    const [releaseDate, setReleaseDate] = useState("")
    const [primaryLanguage, setPrimaryLanguage] = useState(languages[0])
    const [supportInfo, setSupportInfo] = useState<Record<string, string>>({});
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [websiteError, setWebsiteError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false)
    const [durationError, setDurationError] = useState(false)
    const [releaseDateError, setReleaseDateError] = useState(false)
    const [fields, setFields] = useState<Field[]>([]);


    const handleSubmission = () => {
        let hasError = false;
        // Validate description
        if (description === "") {
            setDescriptionError(true);
            hasError = true;
        } else {
            setDescriptionError(false);
        }
        // Validate email
        if (!isValidEmail(supportInfo['email'] || '')) {
            setEmailError(true);
            hasError = true;
        } else {
            setEmailError(false);
        }

        // Validate phone
        // if (!isValidPhone(supportInfo['PHONE'] || '')) {
        //     setPhoneError(true);
        //     hasError = true;
        // } else {
        //     setPhoneError(false);
        // }

        // Validate website
        if (!isValidWebsite(supportInfo['website'] || '')) {
            setWebsiteError(true);
            hasError = true;
        } else {
            setWebsiteError(false);
        }

        if (!isValidPhone(supportInfo['phone'] || '')) {
            setPhoneError(true);
            hasError = true;
        } else {
            setPhoneError(false);
        }

        if (releaseDate === "") {
            setReleaseDateError(true);
            hasError = true;
        } else {
            setReleaseDateError(false)
        }
        if (time.hours === "" || time.minutes === "" || time.seconds === "") {
            setDurationError(true);
            hasError = true;
        } else {
            setDurationError(false)
        }

        // Validate social links
        for (const platform of selectedSocialLinks) {
            if (socialLinks[platform]?.link.trim() === "") {
                setSocialLinkErrors(prevState => ({
                    ...prevState,
                    [platform]: true
                }));
                hasError = true;
            } else {
                setSocialLinkErrors(prevState => ({
                    ...prevState,
                    [platform]: false
                }));
            }
        }
        // Validate source links
        for (const platform of selectedSourceLinks) {
            const sourceLink = sourceLinks[platform] || {};

            // Check if link, payment plan, and price are non-empty
            if (sourceLink.link.trim() === "") {
                setSourceLinkErrors(prevState => ({
                    ...prevState,
                    [platform]: { ...prevState[platform], link: true }
                }));
                hasError = true;
            } else {
                setSourceLinkErrors(prevState => ({
                    ...prevState,
                    [platform]: { ...prevState[platform], link: false }
                }));
            }

            if (!sourceLink.paymentPlan) {
                setSourceLinkErrors(prevState => ({
                    ...prevState,
                    [platform]: { ...prevState[platform], paymentPlan: true }
                }));
                hasError = true;
            } else {
                setSourceLinkErrors(prevState => ({
                    ...prevState,
                    [platform]: { ...prevState[platform], paymentPlan: false }
                }));
            }

            // if (!isValidPrice(sourceLink.price || '')) {
            //     setSourceLinkErrors(prevState => ({
            //         ...prevState,
            //         [platform]: { ...prevState[platform], price: true }
            //     }));
            //     hasError = true;
            // } else {
            //     setSourceLinkErrors(prevState => ({
            //         ...prevState,
            //         [platform]: { ...prevState[platform], price: false }
            //     }));
            // }
        }
        if (!hasError) {
            context?.setProductInfo({
                productInfo,
                fields
            })
            context?.setProductDescription(description)
            context?.setSourceLinks(sourceLinks)
            console.log({ releaseDate })
            context?.setAdditionalInfo({
                releaseDate: releaseDate,
                duration: `${time?.hours} : ${time?.minutes} : ${time?.seconds}`,
                supportInfo,
                socialLinks,
                genres: selectedGenres,
                dubbedLanguages: selectedLanguages,
                primaryLanguage,
                isMadeForKids: selectedOption,
                audience: {
                    age: ageRestrictions,
                    countries: selectedCountries,
                }

            })
            context?.setCastInfo({
                castLinks
            })
            if (currentStep <= 5) {
                setCurrentStep(currentStep + 1)
            }
        }

    }

    // ----------------------- Handle Age Restrictions & Countries ----------
    const [ageRestrictions, setAgeRestrictions] = useState<string[]>([]);
    const [ageInputValue, setAgeInputValue] = useState<string>('');
    const handleAgeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && ageInputValue.trim()) {
            e.preventDefault();
            setAgeRestrictions([...ageRestrictions, ageInputValue.trim()]);
            setAgeInputValue('');
        }
    };
    const handleAgeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgeInputValue(e.target.value);
    };
    const removeAgeRestriction = (indexToRemove: number) => {
        setAgeRestrictions(ageRestrictions.filter((_, index) => index !== indexToRemove));
    };
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>("All Countries");
    const handleCountryChangeSelect = (country: string) => {
        setSelectedCountry(country);
    };
    const addCountry = () => {
        if (selectedCountry && !selectedCountries.includes(selectedCountry)) {
            setSelectedCountries([...selectedCountries, selectedCountry]);
            setSelectedCountry("");
        }
    };
    const removeCountry = (index: number) => {
        setSelectedCountries(prevCountries =>
            prevCountries?.filter((_, i) => i !== index)
        );
    };
    const calculateAvailableCountryOptions = () => {
        return countries?.filter(option => !selectedCountries.includes(option));
    };


    // ---------------------------------------------------------------------------------------------

    const [time, setTime] = useState({ hours: '', minutes: '', seconds: '' });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setTime({
            ...time,
            [field]: e.target.value,
        });
    };
    // ----------------------- Handle Support info Change ---------------------
    const handleSupportInfoChange = (fieldName: string, value: string) => {
        setSupportInfo(prevState => ({
            ...prevState,
            [fieldName.toLowerCase()]: value,
        }));

        // Validate the inputs based on field name
        switch (fieldName.toLowerCase()) {
            case 'email':
                setEmailError(!isValidEmail(value));
                break;
            case 'phone':
                setPhoneError(!isValidPhone(value));
                break;
            case 'website':
                setWebsiteError(!isValidWebsite(value));
                break;
            default:
                break;
        }
    };

    // --------------------- Handle Geners & Dubbed Langusges ------------------
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const addLanguage = (language: string) => {
        if (language && !selectedLanguages.includes(language)) {
            setSelectedLanguages([...selectedLanguages, language]);
        }
    };
    const addGenre = (genre: string) => {
        if (genre && !selectedGenres.includes(genre)) {
            setSelectedGenres([...selectedGenres, genre]);
        }
    };
    const removeLanguage = (index: number) => {
        const updatedLanguages = [...selectedLanguages];
        updatedLanguages.splice(index, 1);
        setSelectedLanguages(updatedLanguages);
    };
    const removeGenre = (index: number) => {
        const updatedGenres = [...selectedGenres];
        updatedGenres.splice(index, 1);
        setSelectedGenres(updatedGenres);
    };
    const handlePrimaryLangauge = (option: string) => {
        setPrimaryLanguage(option);
    };


    // --------------------- Handle More Fields -------------------- 
    const [selectedOption, setSelectedOption] = useState<string>('no');
    const addField = () => {
        const newFieldTitle = prompt("Enter the title for the new field:");
        if (newFieldTitle) {
            const newField = {
                id: fields.length + 1,
                title: newFieldTitle,
                placeholder: `Enter your ${newFieldTitle.toLowerCase()}`,
                value: ""
            };
            setFields([...fields, newField]);
        }
    };
    const removeField = (indexToRemove: number) => {
        const updatedFields = fields.filter((_, index) => index !== indexToRemove);
        setFields(updatedFields);

        const fieldTitle = fields[indexToRemove].title;
        const newAdditionalInfo = { ...productInfo };
        delete newAdditionalInfo[fieldTitle];
        setProductInfo(newAdditionalInfo);
    };
    const handleFieldChange = (id: number, value: string) => {
        setFields(fields.map(field => field.id === id ? { ...field, value } : field));

        const fieldTitle = fields.find(field => field.id === id)?.title;
        if (fieldTitle) {
            setProductInfo(prev => ({
                ...prev,
                [fieldTitle]: value
            }));
        }
    };

    // ------------------------- Handle More Social Links, Sources & Casts ------------------------
    const [castLinks, setCastLinks] = useState<{ name: string; role: string }[]>([]);
    const [newCast, setNewCast] = useState<{ role: string; name: string }>({ role: '', name: '' });
    // const availableCastOptions = ['Director', 'Actor', 'Producer'];
    const availableCastOptions = [
        "Director",
        "Producer",
        "Screenwriter",
        "Actor",
        "Cinematographer",
        "Production Designer",
        "Costume Designer",
        "Editor",
        "Other"
    ];;
    const handleRoleSelect = (selectedRole: string) => {
        setNewCast({ ...newCast, role: selectedRole });
    };
    const handleNameChange = (name: string) => {
        setNewCast({ ...newCast, name });
    };
    const addCastMember = () => {
        if (newCast.name && newCast.role) {
            setCastLinks([...castLinks, newCast]);
            setNewCast({ role: '', name: '' });
        }
    };
    const removeCastMember = (index: number) => {
        const updatedCastLinks = [...castLinks];
        updatedCastLinks.splice(index, 1);
        setCastLinks(updatedCastLinks);
    };



    // ------------------------- Handle More Social Links and Sources ------------------------
    const socialOptions = ["Facebook", "Twitter", "Instagram"];
    const [socialLinks, setSocialLinks] = useState<{ [key: string]: { link: string } }>({});
    const [selectedSocialLinks, setSelectedSocialLinks] = useState<string[]>([]);
    const [usedSocialOptions, setUsedSocialOptions] = useState<string[]>([]);
    const [socialLinkErrors, setSocialLinkErrors] = useState<Record<string, boolean>>({});
    const [sourceLinkErrors, setSourceLinkErrors] = useState<Record<string, { link?: boolean; price?: boolean }>>({});
    const calculateAvailableSocialOptions = (index: number) => {
        return socialOptions.filter(option => !usedSocialOptions.includes(option) || selectedSocialLinks[index] === option);
    };
    const handleSelectSocial = (index: number, selectedOption: string) => {
        const newSelectedLinks = [...selectedSocialLinks];
        const previousPlatform = newSelectedLinks[index];
        newSelectedLinks[index] = selectedOption;
        setSelectedSocialLinks(newSelectedLinks);
        setUsedSocialOptions(prevOptions => {
            const updatedOptions = new Set(prevOptions);
            if (previousPlatform) {
                updatedOptions.delete(previousPlatform);
            }
            if (selectedOption) {
                updatedOptions.add(selectedOption);
            }
            return Array.from(updatedOptions);
        });
        setSocialLinks(prevLinks => {
            const updatedLinks = { ...prevLinks };
            if (previousPlatform) {
                delete updatedLinks[previousPlatform];
            }
            if (selectedOption) {
                updatedLinks[selectedOption] = updatedLinks[selectedOption] || { link: "" };
            }
            return updatedLinks;
        });
    };
    const handleSocialLinkChange = (platform: string, field: "link", value: string) => {
        setSocialLinks(prevLinks => ({
            ...prevLinks,
            [platform]: { ...prevLinks[platform], [field]: value }
        }));

        if (field === 'link') {
            if (value.trim() === "" && selectedSocialLinks.includes(platform)) {
                // If the link is empty and the platform is selected
                setSocialLinkErrors(prevState => ({
                    ...prevState,
                    [platform]: true
                }));
            } else if (!isValidUrl(value) && selectedSocialLinks.includes(platform)) {
                // If the link is not valid and the platform is selected
                setSocialLinkErrors(prevState => ({
                    ...prevState,
                    [platform]: true
                }));
            } else {
                // If the link is valid or platform is not selected
                setSocialLinkErrors(prevState => ({
                    ...prevState,
                    [platform]: false
                }));
            }
        }
    };
    const addMoreSocialLink = () => {
        if (selectedSocialLinks[selectedSocialLinks.length - 1]) {
            setUsedSocialOptions(prevOptions => [...prevOptions, selectedSocialLinks[selectedSocialLinks.length - 1]]);
        }
        setSelectedSocialLinks([...selectedSocialLinks, ""]);
    };


    const sourceOptions = ["G-Drive", "Apple Store", "Netflix"];
    const plansOptions = ["Buy now", "Subscription", "Annually", "Monthly"];
    const [sourceLinks, setSourceLinks] = useState<{ [key: string]: { link: string; paymentPlan: string; price: string } }>({});
    const [selectedSourceLinks, setSelectedSourceLinks] = useState<string[]>([]);
    const [usedSourceOptions, setUsedSourceOptions] = useState<string[]>([]);
    const calculateAvailableSourceOptions = (index: number) => {
        return sourceOptions.filter(option => !usedSourceOptions.includes(option) || selectedSourceLinks[index] === option);
    };
    const handleSelectSource = (index: number, selectedOption: string) => {
        const newSelectedLinks = [...selectedSourceLinks];
        const previousPlatform = newSelectedLinks[index];
        newSelectedLinks[index] = selectedOption;
        setSelectedSourceLinks(newSelectedLinks);
        setUsedSourceOptions(prevOptions => {
            const updatedOptions = new Set(prevOptions);
            if (previousPlatform) {
                updatedOptions.delete(previousPlatform);
            }
            if (selectedOption) {
                updatedOptions.add(selectedOption);
            }
            return Array.from(updatedOptions);
        });
        setSourceLinks(prevLinks => {
            const updatedLinks = { ...prevLinks };
            if (previousPlatform) {
                delete updatedLinks[previousPlatform];
            }
            if (selectedOption) {
                updatedLinks[selectedOption] = updatedLinks[selectedOption] || { link: "", paymentPlan: "", price: "" };
            }
            return updatedLinks;
        });
    };
    const handleSourceLinkChange = (platform: string, field: "link" | "paymentPlan" | "price", value: string) => {
        setSourceLinks(prevLinks => ({
            ...prevLinks,
            [platform]: { ...prevLinks[platform], [field]: value }
        }));

        let hasError = false;

        if (field === 'link') {
            if (value.trim() === "" && selectedSourceLinks.includes(platform)) {
                hasError = true;
            } else if (!isValidUrl(value) && selectedSourceLinks.includes(platform)) {
                hasError = true;
            }
        }

        // if (field === 'price') {
        //     if (!isValidPrice(value) && selectedSourceLinks.includes(platform)) {
        //         hasError = true;
        //     }
        // }

        setSourceLinkErrors(prevState => ({
            ...prevState,
            [platform]: {
                ...prevState[platform],
                [field]: hasError
            }
        }));
    };
    const addMoreSourceLink = () => {
        if (selectedSourceLinks[selectedSourceLinks.length - 1]) {
            setUsedSourceOptions(prevOptions => [...prevOptions, selectedSourceLinks[selectedSourceLinks.length - 1]]);
        }
        setSelectedSourceLinks([...selectedSourceLinks, ""]);
    };
    useEffect(() => {
        if (getAllProducts) {
            setDescription(getAllProducts?.description || '');
            // setTags(getAllProducts?.additionalInfo?.productComability || []);
            const ageRestrictionsFromAPI = getAllProducts?.additionalInfo?.audience?.age || [];
            setAgeRestrictions(ageRestrictionsFromAPI);

            const countriesFromAPI = getAllProducts?.additionalInfo?.audience?.countries || [];
            setSelectedCountries(countriesFromAPI);
            setSupportInfo({
                email: getAllProducts?.additionalInfo?.supportInfo?.email || '',
                phone: getAllProducts?.additionalInfo?.supportInfo?.phone || '',
                website: getAllProducts?.additionalInfo?.supportInfo?.website || '',
            });
            const socialLinksFromAPI = getAllProducts.additionalInfo.socialLinks;

            const platforms = Object?.keys(socialLinksFromAPI);
            const links = platforms?.reduce((acc: any, platform) => {
                acc[platform] = { link: socialLinksFromAPI[platform].link };
                return acc;
            }, {});

            setSocialLinks(links);
            setSelectedSocialLinks(platforms);
            setUsedSocialOptions(platforms);
            setSelectedOption(getAllProducts?.additionalInfo?.isMadeForKids)
            if (getAllProducts?.teamInfo?.cast) {
                setCastLinks(getAllProducts?.teamInfo.cast);
            }
            const apiProductInfo = getAllProducts?.productInfo || {};
            const initialFields: any = !checkNullOrEmpty(apiProductInfo?.fields) ? apiProductInfo?.fields : Object.entries(apiProductInfo).flatMap(([title, valueObj]) => {
                return Object.entries(valueObj as Record<string, string>).map(([key, value], index) => ({
                    id: index,
                    title: key,
                    value: value || "",
                }));
            });


            setFields(initialFields);

            const duration = getAllProducts?.additionalInfo?.duration || '';
            const [hours, minutes, seconds] = duration.split(' : ');
            setTime({
                hours: hours || '',
                minutes: minutes || '',
                seconds: seconds || ''
            });
            setReleaseDate(getAllProducts?.additionalInfo?.releaseDate || '');

            const genresFromAPI = getAllProducts?.additionalInfo?.genres || [];
            setSelectedGenres(genresFromAPI);

            const dubbedLanguagesFromAPI = getAllProducts?.additionalInfo?.dubbedLanguages || [];
            setSelectedLanguages(dubbedLanguagesFromAPI);

            setPrimaryLanguage(getAllProducts?.additionalInfo?.primaryLanguage || '');

            const apiSourceLinks: any = getAllProducts?.sourceLinks || [];
            const srcLinks: any = {};
            const srcPlatforms: any[] = [];

            apiSourceLinks?.forEach((item: any) => {
                Object?.keys(item)?.forEach((platform: string) => {
                    srcPlatforms?.push(platform);
                    srcLinks[platform] = {
                        link: item[platform]?.link || "",
                        paymentPlan: item[platform]?.paymentPlan || "",
                        price: item[platform]?.price || "",
                    };
                });
            });

            setSourceLinks(srcLinks);
            setSelectedSourceLinks(srcPlatforms);
            setUsedSourceOptions(srcPlatforms);
        }
    }, [getAllProducts]);
    return (
        <div className='flex flex-col gap-10'>
            <div className='flex flex-col gap-10'>
                <div className='flex flex-col gap-6 w-full'>
                    <div className="flex items-center gap-3">
                        <p className='font-semibold text-[#00FFFF] md-lt:text-[20px] lg:text-[26px]'>Product Info</p>
                        <RxQuestionMarkCircled className="text-[#98A2B3] md-lt:text-[16px] lg:text-[20px]" />
                    </div>
                    <div className='flex flex-col gap-3 w-full'>
                    <div className="flex items-center">
                        <p className='text-white'>Product Description</p>
                        <span className="text-red-500 ml-1">*</span>
                        </div>
                        <div className="w-full">
                            <textarea
                                className={`outline-none w-full bg-[#04040433] px-5 py-3 border-2 ${descriptionError ? 'border-red-500' : 'border-[#5721B9]'} rounded-2xl text-[white] resize-none`}
                                rows={3}
                                placeholder="Enter your product description"
                                required
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                            />
                            {
                                descriptionError &&
                                <p className='text-[#FF0000] md-lt:text-[10px] lg:text-[12px]'>Product description is required</p>
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 w-full'>
                        {fields?.map((field, index) => (
                            <div key={index} className='flex flex-col gap-3'>
                                <div className="flex items-center justify-between">
                                    <p className='text-white'>{field.title}</p>
                                    <div className="border-2 border-white w-6 cursor-pointer" onClick={() => {
                                        removeField(index)
                                    }} />
                                </div>
                                <RichTextEditor value={field.value}
                                    onChange={(value) => handleFieldChange(field.id, value)} />
                            </div>
                        ))}
                        <button
                            onClick={addField}
                            className="bg-[#5721b9] text-white font-bold text-[16px] w-full py-2 rounded-full"
                        >
                            + Add Custom Field
                        </button>
                    </div>
                    <div className='flex flex-col gap-3 lg:w-[70%] md-lt:w-full'>
                        <div className="flex items-center">
                        <p className='text-white md-lt:text-[16px] lg:text-[20px] font-semibold'>Duration</p>
                        <span className="text-red-500 ml-1">*</span>
                        </div>
                        <div>
                            <div className={`flex items-center justify-between p-2 rounded-2xl border-2 ${durationError ? 'border-red-500' : 'border-[#5721B9]'} bg-[#04040433] md-lt:w-full lg:w-full`}>
                                <div className="flex flex-col items-center">
                                    <input
                                        type="number"
                                        value={time.hours}
                                        onChange={(e) => handleInputChange(e, 'hours')}
                                        className="text-white no-spinners md-lt:text-[30px] lg:text-[40px] bg-transparent text-center outline-none"
                                        placeholder="00"
                                        min="0"
                                        max="99"
                                    
                                    />
                                    <p className="text-white md-lt:text-sm lg:text-lg">Hours</p>
                                </div>
                                <span className="text-white md-lt:text-[30px] lg:text-[40px] mb-10">:</span>
                                <div className="flex flex-col items-center">
                                    <input
                                        type="number"
                                        value={time.minutes}
                                        onChange={(e) => handleInputChange(e, 'minutes')}
                                        className="text-white md-lt:text-[30px] lg:text-[40px] bg-transparent text-center  outline-none no-spinners"
                                        placeholder="00"
                                        min="0"
                                        max="99"
                                    />
                                    <p className="text-white md-lt:text-sm lg:text-lg ">Minutes</p>
                                </div>
                                <span className="text-white md-lt:text-[30px] lg:text-[40px]  mb-10">:</span>
                                <div className="flex flex-col items-center">
                                    <input
                                        type="number"
                                        value={time.seconds}
                                        onChange={(e) => handleInputChange(e, 'seconds')}
                                        className="text-white md-lt:text-[30px] lg:text-[40px] bg-transparent text-center  outline-none no-spinners"
                                        placeholder="00"
                                        min="0"
                                        max="99"
                                    />
                                    <p className="text-white md-lt:text-sm lg:text-lg ">Seconds</p>
                                </div>
                            </div>
                            {
                                durationError &&
                                <p className='text-[#FF0000] md-lt:text-[10px] lg:text-[12px]'>Movie duration required</p>
                            }
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 lg:w-[50%] md-lt:w-full'>
                        <div className="flex items-center">
                        <p className='text-white md-lt:text-[16px] lg:text-[20px] font-semibold'>Release Date</p>
                        <span className="text-red-500 ml-1">*</span>
                        </div>
                        <div>
                            <input
                                style={{
                                    WebkitAppearance: "none",
                                    appearance: "none"
                                }}
                                className={`w-full outline-none date-picker bg-[#04040433] px-5 py-5 border-2 ${releaseDateError ? 'border-red-500' : 'border-[#5721B9]'} rounded-2xl text-[white]`}
                                type="date"
                                value={releaseDate}
                                placeholder="Enter here..."
                                onChange={(e) => {
                                    const newDate = e.target.value;
                                    setReleaseDate(newDate);
                                    console.log("New date selected:", newDate);
                                }}
                            />
                            {
                                releaseDateError &&
                                <p className='text-[#FF0000] md-lt:text-[10px] lg:text-[12px]'>Release date is required</p>
                            }
                        </div>
                    </div>
                    <DropDown
                        label={`Primary Language`}
                        options={languages}
                        value={primaryLanguage}
                        onSelect={(option: string) => handlePrimaryLangauge(option)}
                        width="w-full"
                        padding="py-3 px-6"
                        height="h-40"
                        optionStyles="text-gray-300 z-50"
                        dropdownId={1}
                        notAbsolute={true}
                    />
                    <div className="flex flex-col gap-6">
                        {/* Available/Dubbed Languages Section */}
                        <div className="flex flex-col gap-4">
                            <DropDown
                                label="Available/Dubbed Language(s)"
                                options={languages}
                                onSelect={(option: string) => addLanguage(option)} // Call addLanguage function on select
                                width="w-full"
                                padding="py-3 px-6"
                                height="h-40"
                                optionStyles="text-gray-300 z-50"
                                dropdownId={2}
                                notAbsolute={true}
                            />
                            <div className="flex flex-wrap gap-2 mt-4">
                                {selectedLanguages?.map((language, index) => (
                                    <div
                                        key={index}
                                        className='px-2 py-1 bg-[#E9DFFC] border-[1px] border-[#BE9FF6] rounded-full flex gap-1 items-center'
                                    >
                                        <div
                                            className="h-5 w-5 rounded-full bg-[#5721B9] text-white flex items-center justify-center cursor-pointer"
                                            onClick={() => removeLanguage(index)}
                                        >
                                            <GrFormClose />
                                        </div>
                                        <span className="text-[#5721B9]">{language}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Genre(s) Section */}
                        <div className="flex flex-col gap-4">
                            <DropDown
                                label="Genre(s)"
                                options={movieTabGeners}
                                onSelect={(option: string) => addGenre(option)} // Call addGenre function on select
                                width="w-full"
                                height="h-40"
                                padding="py-3 px-6"
                                optionStyles="text-gray-300 z-50"
                                dropdownId={3}
                                notAbsolute={true}
                            />
                            {/* Display the added genres */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {selectedGenres.map((genre, index) => (
                                    <div
                                        key={index}
                                        className='px-2 py-1 bg-[#E9DFFC] border-[1px] border-[#BE9FF6] rounded-full flex gap-1 items-center'
                                    >
                                        <div
                                            className="h-5 w-5 rounded-full bg-[#5721B9] text-white flex items-center justify-center cursor-pointer"
                                            onClick={() => removeGenre(index)}
                                        >
                                            <GrFormClose />
                                        </div>
                                        <span className="text-[#5721B9]">{genre}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
                {/* Cast & Crew Links */}
                <div className='flex flex-col gap-6'>
    <p className='font-semibold text-[#00FFFF] md-lt:text-[20px] lg:text-[26px]'>Cast & Crew</p>

    <div className="flex items-start gap-3"> 
        <div className="w-[50%] relative"> 
            <DropDown
                label="Role"
                options={availableCastOptions}
                onSelect={handleRoleSelect}
                width="w-full"
                height="h-40"
                padding="py-3 px-6"
                optionStyles="text-gray-300 z-50"
                dropdownId={4}
                notAbsolute={false}
                value={newCast.role}
            />
        </div>

        <div className="flex flex-col gap-3 w-[50%]"> 
            <p className='text-white'>Person Name</p>
            <input
                className='outline-none bg-[#04040433] px-5 py-3 border-2 border-[#5721B9] rounded-full text-[white] w-full'
                placeholder="Enter Person name"
                value={newCast.name}
                onChange={e => handleNameChange(e.target.value)}
            />
        </div>
    </div>

              {/* Add Button */}
              <div className="flex flex-col items-end w-full">
                        <button
                            onClick={addCastMember}
                            className="px-3 py-2 mt-2 bg-[#5721B9] rounded-full text-white font-semibold"
                        >
                            Add
                        </button>
                    </div>

                    {/* Display the added cast members */}
                    <div className='flex flex-wrap gap-3 mt-4'>
                        {castLinks?.map((cast, index) => (
                            <div
                                key={index}
                                className='px-2 py-1 bg-[#E9DFFC] border-[1px] border-[#BE9FF6] rounded-full flex gap-1 items-center'
                            >
                                <div
                                    className="h-5 w-5 rounded-full bg-[#5721B9] text-white flex items-center justify-center cursor-pointer"
                                    onClick={() => removeCastMember(index)}
                                >
                                    <GrFormClose />
                                </div>
                                <span className="text-[#5721B9]">{cast.role} - {cast.name}</span>
                            </div>
                        ))}
                    </div>
</div>

                <div className='flex flex-col  gap-6'>
                    <p className='font-semibold text-[#00FFFF] md-lt:text-[20px] lg:text-[26px]'>Product Media</p>
                    <MediaUpload productData={getAllProducts} />
                </div>
                <div className='flex flex-col  gap-6'>
                    <p className='font-semibold text-[#00FFFF] md-lt:text-[20px] lg:text-[26px]'>Product Support Info</p>
                    <div className="flex items-start lg:flex-row md-lt:flex-wrap lg:justify-between">
                        <div className="pr-2 w-full flex flex-col gap-4">
                            <div className=' flex flex-col gap-3 w-full'>
                            <div className="flex items-center">
                                <p className='text-white '>Email</p>
                                <span className="text-red-500 ml-1">*</span>  
                                </div>
                                <div className="w-full">
                                    <input
                                        className={`w-full outline-none bg-[#04040433] px-5 py-3 border-2 ${emailError ? 'border-red-500' : 'border-[#5721B9]'} rounded-full text-[white]`}
                                        placeholder="Matthew@Lusso.com"
                                        value={supportInfo?.email || ''}
                                        onChange={e => handleSupportInfoChange('Email', e.target.value)}
                                    />
                                    {
                                        emailError &&
                                        <p className='text-[#FF0000] md-lt:text-[10px] lg:text-[12px]'>Email not valid</p>
                                    }
                                </div>
                            </div>
                            <div className='md-lt:pr-0 lg:pr-2 flex flex-col gap-3 w-full'>
                            <div className="flex items-center">
                                <p className='text-white '>Website</p>
                                <span className="text-red-500 ml-1">*</span>
                                </div>
                                <div className="w-full">
                                    <input
                                        className={`w-full outline-none bg-[#04040433] px-5 py-3 border-2 ${websiteError ? 'border-red-500' : 'border-[#5721B9]'} rounded-full text-[white]`}
                                        placeholder="https://"
                                        value={supportInfo?.website || ''}
                                        onChange={e => handleSupportInfoChange('Website', e.target.value)}
                                    />
                                    {
                                        websiteError &&
                                        <p className='text-[#FF0000] md-lt:text-[10px] lg:text-[12px]'>Website Link not Valid</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="md-lt:pl-0 md-lt:pt-2 lg:pl-2 flex flex-col gap-3 w-full">
                            <p className="text-white">Phone</p>
                            <div
                                className={`flex items-center gap-4 bg-[#04040433] px-5 py-2 border-[#5721B9] border-2  rounded-full text-white w-full`}
                            >
                                <PhoneInput
                                    country={"us"}
                                    value={supportInfo?.phone || ''}
                                    onChange={(value: any) => {
                                        handleSupportInfoChange("phone", value);
                                    }}
                                    enableSearch={true}
                                    placeholder="Enter phone number"
                                    buttonStyle={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        color: "#fff",
                                    }}
                                    inputStyle={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        color: "#fff",
                                        width: "100%",
                                    }}
                                    dropdownStyle={{

                                        backgroundColor: "#2D246C",
                                        color: "#fff",
                                    }}
                                    containerClass="w-full"
                                    inputClass="appearance-none text-white placeholder-gray-400 leading-tight focus:outline-none"
                                />
                            </div>
                            {
                                phoneError &&
                                <p className='text-[#FF0000] md-lt:text-[10px] lg:text-[12px]'>Phone is required</p>
                            }
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-6'>
                    {/* Product Social Links */}
                    <div className='flex flex-col gap-6'>
                        <p className='font-semibold text-[#00FFFF] md-lt:text-[20px] lg:text-[26px]'>Product Social Links</p>
                        {selectedSocialLinks?.map((platform: any, index: number) => (
                            <div key={index} className="flex items-start md-lt:flex-wrap lg:justify-between">
                                <DropDown
                                    label={`Social Platform ${index + 1}`}
                                    options={calculateAvailableSocialOptions(index)}
                                    onSelect={(option: string) => handleSelectSocial(index, option)}
                                    width="w-[50%] md-lt:w-[70%]"
                                    value={platform || "Select Platform..."} // Use placeholder if `platform` is null
                                    padding="py-3 px-6"
                                    height="h-40"
                                    optionStyles="text-gray-300 z-50"
                                    dropdownId={index} // Ensure unique ID for each dropdown
                                    notAbsolute={true}
                                />
                                {platform && (
                                    <div className="flex flex-col items-end w-full">
                                        <div className='md-lt:pl-0 pl-2 md-lt:pt-2 flex flex-col gap-3 w-full'>
                                            <p className='text-white'>Link</p>
                                            <input
                                                className={`outline-none bg-[#04040433] px-5 py-3 border-2 ${socialLinkErrors[platform] ? 'border-red-500' : 'border-[#5721B9]'} rounded-full text-[white]`}
                                                placeholder="https://"
                                                type="url"
                                                value={socialLinks[platform]?.link || ""}
                                                onChange={e => handleSocialLinkChange(platform, "link", e.target.value)}
                                            />
                                            {socialLinkErrors[platform] && <span className="text-red-500">Invalid URL</span>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="flex flex-col items-end w-full">
                            {socialOptions?.length > selectedSocialLinks?.length && (
                                <button
                                    onClick={addMoreSocialLink}
                                    className="px-3 py-2 mt-2 bg-[#5721B9] rounded-full text-white font-semibold">
                                    {selectedSocialLinks?.length === 0 ? "Add" : "Add More"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {/* Product Source Links */}
                <div className='flex flex-col gap-6'>
                    <p className='font-semibold text-[#00FFFF] md-lt:text-[20px] lg:text-[26px]'>Product Source Links</p>
                    {selectedSourceLinks?.map((platform, index) => (
                        <div key={index}>
                            <div className="flex items-start md-lt:flex-wrap lg:justify-between">
                                <DropDown
                                    label={`Source Platform ${index + 1}`}
                                    value={platform ?? 'Select Platform...'}
                                    options={calculateAvailableSourceOptions(index)}
                                    onSelect={(option: string) => handleSelectSource(index, option)}
                                    width="w-[50%] md-lt:w-[70%]"
                                    padding="py-3 px-6"
                                    height="h-40"
                                    optionStyles="text-gray-300 z-50"
                                    dropdownId={index}
                                    notAbsolute={true}
                                />
                                {platform && (
                                    <div className="flex flex-col items-end w-full">
                                        <div className='md-lt:pl-0 pl-2 md-lt:pt-2 flex flex-col gap-3 w-full'>
                                            <p className='text-white'>Link</p>
                                            <input
                                                className={`outline-none bg-[#04040433] px-5 py-3 border-2 ${sourceLinkErrors[platform]?.link ? 'border-red-500' : 'border-[#5721B9]'} rounded-full text-[white]`}
                                                placeholder="https://"
                                                value={sourceLinks[platform]?.link || ""}
                                                onChange={e => handleSourceLinkChange(platform, "link", e.target.value)}
                                            />
                                            {sourceLinkErrors[platform]?.link && (
                                                <p className='text-[#FF0000] md-lt:text-[10px] lg:text-[12px]'>Invalid URL</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {platform && (
                                <div className="flex items-start md-lt:flex-wrap lg:justify-between mt-4">
                                    <DropDown
                                        label={`Payment Plan`}
                                        options={plansOptions}
                                        value={sourceLinks[platform]?.paymentPlan ? sourceLinks[platform]?.paymentPlan : 'Payment Plan...'}
                                        onSelect={(option: string) => handleSourceLinkChange(platform, "paymentPlan", option)}
                                        width="w-[50%] md-lt:w-[70%]"
                                        padding="py-3 px-6"
                                        height="h-40"
                                        optionStyles="text-gray-300 z-50"
                                        dropdownId={platform}
                                        notAbsolute={true}
                                    />
                                    <div className="flex flex-col items-end w-full">
                                        <div className='md-lt:pl-0 pl-2 md-lt:pt-2 flex flex-col gap-3 w-full'>
                                            <p className='text-white'>Price</p>
                                            <input
                                                className={`outline-none bg-[#04040433] px-5 py-3 border-2 border-[#5721B9] rounded-full text-[white]`}
                                                placeholder="Enter Price here"
                                                // type="number"
                                                value={sourceLinks[platform]?.price || ""}
                                                onChange={e => {
                                                    if (negativeNumberValidation(e.target.value)) {
                                                    handleSourceLinkChange(platform, "price", e.target.value)
                                                    }
                                                 }
                                                }
                                            />
                                            {/* {sourceLinkErrors[platform]?.price && (
                                                <p className='text-[#FF0000] md-lt:text-[10px] lg:text-[12px]'>Invalid Price</p>
                                            )} */}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="flex flex-col items-end w-full">
                        {sourceOptions?.length > selectedSourceLinks?.length && (
                            <button
                                onClick={addMoreSourceLink}
                                className="px-3 py-2 mt-2 bg-[#5721B9] rounded-full text-white font-semibold">
                                {selectedSourceLinks?.length === 0 ? "Add" : "Add More"}
                            </button>
                        )}
                    </div>
                </div>
                <div className='flex flex-col  gap-6'>
                    <p className='font-semibold text-[#00FFFF] md-lt:text-[20px] lg:text-[26px]'>Audience</p>
                    <div className="flex items-start justify-between">
                        <div className='pr-2 flex flex-col gap-3 w-[50%]'>
                            <div>
                                <p className='text-white '>Age</p>
                                <input
                                    className='outline-none bg-[#04040433] px-5 py-3 border-2 border-[#5721B9] rounded-full text-[white] mt-3'
                                    placeholder="18"
                                    value={ageInputValue} // Use ageInputValue here
                                    onChange={handleAgeInputChange} // Handle input change
                                    onKeyDown={handleAgeKeyDown} // Add restriction on Enter key press
                                />
                                <div className='flex flex-wrap gap-2 mt-4'>
                                    {ageRestrictions.map((restriction, index) => (
                                        <div
                                            key={index}
                                            className='px-2 py-1 bg-[#E9DFFC] border-[1px] border-[#BE9FF6] rounded-full flex gap-1 items-center'
                                        >
                                            <div
                                                className="h-5 w-5 rounded-full bg-[#5721B9] text-white flex items-center justify-center cursor-pointer"
                                                onClick={() => removeAgeRestriction(index)} // Remove restriction on click
                                            >
                                                <GrFormClose />
                                            </div>
                                            <span className="text-[#5721B9]">{restriction}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className="">
                                <DropDown
                                    label="Country"
                                    options={calculateAvailableCountryOptions()}
                                    onSelect={handleCountryChangeSelect}
                                    value={selectedCountry}
                                    width="w-full"
                                    padding="py-3 px-6"
                                    height="h-40"
                                    optionStyles="text-gray-300"
                                    dropdownId={8}
                                    notAbsolute={true}
                                />
                                <div className="flex justify-end">
                                    <button
                                        onClick={addCountry}
                                        className="px-3 py-2 mt-2 bg-[#5721B9] rounded-full text-white font-semibold"
                                    >
                                        Add Country
                                    </button>
                                </div>
                            </div>
                            <div className='flex flex-wrap gap-2 mt-4'>
                                {selectedCountries?.map((country, index) => (
                                    <div
                                        key={index}
                                        className='px-2 py-1 bg-[#E9DFFC] border-[1px] border-[#BE9FF6] rounded-full flex gap-1 items-center'
                                    >
                                        <div
                                            className="h-5 w-5 rounded-full bg-[#5721B9] text-white flex items-center justify-center cursor-pointer"
                                            onClick={() => removeCountry(index)}
                                        >
                                            <GrFormClose />
                                        </div>
                                        <span className="text-[#5721B9]">{country}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col  gap-6'>
                    <p className="text-white font-medium">Is this Product made for kids? (required)</p>
                    <p className="text-white text-opacity-50">Regardless of your location, you're legally required to comply with the Children's Online Privacy Protection Act (COPPA) and/or other laws. You're required to tell us whether your videos are made for kids. <a href="https://support.google.com/youtube/answer/9528076?hl=en" target="_blank" className="text-[#A259FF] underline">What's content made for kids?</a></p>
                    <div>
                        <div className="bg-dark-700 space-y-4">
                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    className="hidden"
                                    value="yes"
                                    checked={selectedOption === 'yes'}
                                    onChange={() => setSelectedOption('yes')}
                                />
                                <div
                                    className={`w-9 h-9 rounded-full border-2 border-[#8f36ff] flex items-center justify-center
                                    ${selectedOption === 'yes' ? 'border-[1px]' : ''}`}
                                >
                                    {selectedOption === 'yes' && <div className="w-7 h-7 bg-[#8f36ff] rounded-full" />}
                                </div>
                                <span className="text-white">Yes, it's made for kids</span>
                            </label>

                            <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    className="hidden"
                                    value="no"
                                    checked={selectedOption === 'no'}
                                    onChange={() => setSelectedOption('no')}
                                />
                                <div
                                    className={`w-9 h-9 rounded-full border-[1px] border-[#8f36ff] flex items-center justify-center
                                    ${selectedOption === 'no' ? 'border-[1px]' : ''}`}
                                >
                                    {selectedOption === 'no' && <div className="w-7 h-7 bg-[#8f36ff] rounded-full" />}
                                </div>
                                <span className="text-white">No, it's not made for kids</span>
                            </label>
                        </div>

                    </div>
                </div>
            </div>
            <div className='border-[1px] border-white border-opacity-20 w-full rounded-full' />
            <div className='flex items-center gap-10 justify-start'>
                <button onClick={() => {
                    setCurrentStep(currentStep - 1)
                }}
                    className="relative py-3 lg:px-0 md-lt:px-3 md-lt:w-[50%] lg:w-[30%] rounded-full text-white md-lt:font-medium lg:font-bold md-lt:text-[12px] lg:text-[16px] rounded-fullrounded-full border-2 bg-transparent gradient-border border-t-[#4B03CE] border-b-[#F572B6] border-l-[#4B03CE] border-r-[#F572B6]"
                >
                    Back
                </button>
                <button onClick={() => {
                    handleSubmission();
                }} style={{
                    background:
                        'linear-gradient(180deg, #4B03CE 0%, #F572B6 80%)'
                }} className='py-3 lg:px-0 md-lt:px-3 md-lt:w-[50%] lg:w-[30%] text-white md-lt:font-medium lg:font-bold md-lt:text-[12px] lg:text-[16px] rounded-full'>
                    Save & Continue
                </button>
            </div>
        </div>
    )
}

export default AddMovieTab