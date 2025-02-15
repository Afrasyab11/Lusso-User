import { allCountries } from "country-region-data";
import React, { useEffect, useState } from "react";
import { ActionMeta, SingleValue } from "react-select";
import Ninput from "../../components/ui/Ninput";
import SelectDropdown from "../../components/ui/SelectDropdown";
import { BusinessTypeOptions } from "../../utils/utils";
// import './dev.scss';
// import './dev.scss';
// import './dev.scss';
interface AddressFormProps {
    data?: any;
    validation?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeProperty?: (name: string, value: any) => void;

}
type OptionType = {
    value: string;
    label: string;
};

const AddressForm: React.FC<AddressFormProps> = ({
    data = {},
    validation = {},
    onChange = () => console.log("...clicked"),
    onChangeProperty = () => console.log("...clicked"),

}) => {

    const [stateOptions, setStateOptions] = useState<OptionType[]>([]);

    const countryOptions = allCountries.map((country) => ({
        value: country[1],
        label: country[0],
    }));


    const handleCountryChange = (
        selectedOption: SingleValue<OptionType>,
        actionMeta: ActionMeta<OptionType>
    ) => {
        onChangeProperty("city", "");
        if (selectedOption) {
            onChangeProperty("state", '');
            onChangeProperty("country", selectedOption?.label);

            const countryData = allCountries.find(
                (item) => item[0] === selectedOption?.label
            );
            if (countryData && countryData[2].length > 0) {
                const regionOptions = countryData[2].map((region) => ({
                    value: region[1],
                    label: region[0],
                }));
                setStateOptions(regionOptions);

            } else {
                setStateOptions([]);
            }
        } else {
            onChangeProperty("country", "");
            setStateOptions([]);
        }
    };

    useEffect(() => {
        const countryData = allCountries.find(
            (item) => item[0] === data?.country
        );
        if (countryData && countryData[2].length > 0) {
            const regionOptions = countryData[2].map((region) => ({
                value: region[1],
                label: region[0],
            }));
            setStateOptions(regionOptions);

        } else {
            setStateOptions([]);
        }
    }, [])


    return (
        <div className="flex flex-col gap-0">
            <div className="text-center md:text-start">
                <h3 className="text-primary-custom font-inter font-semibold text-2xl ">
                    Profile
                </h3>
                <span className="font-inter font-medium text-xs text-white">
                    Update your personal details here
                </span>
                <span>
                    <hr
                        className="w-full my-4"
                        style={{
                            height: "2px",
                            border: "none",
                            backgroundImage:
                                "linear-gradient(125.12deg, rgba(45, 36, 108, 0.8) 6.52%, rgba(22, 19, 43, 0.8) 30.66%, rgba(24, 20, 46, 0.8) 63.49%, rgba(37, 32, 74, 0.8) 78.95%)",
                        }}
                    />
                </span>
            </div>
            <div className="gap-x-6 gap-y-2">
                <Ninput
                    label="Business Name"
                    placeholder="Enter Business Name"
                    name="channelName"
                    value={data?.channelName ?? ""}
                    onChange={onChange}
                    error={validation?.channelName?.error ?? false}
                    errorMessage={validation?.channelName?.errorMessage ?? ""}
                    // append={{
                    //     type: 'text',
                    //     className: '',
                    //     append: 'start',
                    //     text: '.com/'
                    // }}
                    required
                    maxLength={60}
                />

                <SelectDropdown
                    label="Business Type"
                    value={BusinessTypeOptions?.find((i) => i?.label === data?.businessType)}
                    placeholder="Select your business type"
                    options={BusinessTypeOptions}
                    onChange={(selectedOption: any) => {
                        onChangeProperty("businessType", selectedOption?.label);
                    }}
                    error={validation?.businessType?.error ?? false}
                    errorMessage="Please select business type"
                    required
                />

                <hr
                    className="w-full my-4"
                    style={{
                        height: "2px",
                        border: "none",
                        backgroundImage:
                            "linear-gradient(125.12deg, rgba(45, 36, 108, 0.8) 6.52%, rgba(22, 19, 43, 0.8) 30.66%, rgba(24, 20, 46, 0.8) 63.49%, rgba(37, 32, 74, 0.8) 78.95%)",
                    }}
                />

                {/* business description */}

                <Ninput
                    label="Business Description"
                    placeholder="Enter Description"
                    name="businessDescription"
                    value={data?.businessDescription ?? ""}
                    onChange={onChange}
                    error={validation?.businessDescription?.error ?? false}
                    errorMessage={validation?.businessDescription?.errorMessage ?? ""}
                    subTitle="Enter your business description briefly"
                    required
                    textarea
                />

                <hr
                    className="w-full my-4"
                    style={{
                        height: "2px",
                        border: "none",
                        backgroundImage:
                            "linear-gradient(125.12deg, rgba(45, 36, 108, 0.8) 6.52%, rgba(22, 19, 43, 0.8) 30.66%, rgba(24, 20, 46, 0.8) 63.49%, rgba(37, 32, 74, 0.8) 78.95%)",
                    }}
                />

                {/* business URL */}
                

                <Ninput
                    label="Business URL"
                    placeholder="Enter Business URL"
                    name="businessWebsiteUrl"
                    value={data?.businessWebsiteUrl ?? ""}
                    onChange={onChange}
                    error={validation?.businessWebsiteUrl?.error ?? false}
                    errorMessage={validation?.businessWebsiteUrl?.errorMessage ?? ""}
                    append={{
                        type: 'text',
                        className: '',
                        append: 'start',
                        text: 'https://'
                    }}
                    required
                />

                <hr
                    className="w-full my-4"
                    style={{
                        height: "2px",
                        border: "none",
                        backgroundImage:
                            "linear-gradient(125.12deg, rgba(45, 36, 108, 0.8) 6.52%, rgba(22, 19, 43, 0.8) 30.66%, rgba(24, 20, 46, 0.8) 63.49%, rgba(37, 32, 74, 0.8) 78.95%)",
                    }}
                />

                {/* Address 1 */}

                <Ninput
                    label="Address 1"
                    placeholder="Address 1"
                    name="address"
                    value={data?.address ?? ""}
                    onChange={onChange}
                    error={validation?.address?.error ?? false}
                    errorMessage={validation?.address?.errorMessage ?? ""}
                    required
                    subTitle="Enter business country"
                // append={{
                //     className: '',
                //     append: 'start',
                //     icon: direction_sign
                // }}
                />

                {/* apt suite */}

                <Ninput
                    label="Address 2"
                    placeholder="Address 2 (Optional)"
                    name="aptSuit"
                    value={data?.aptSuit ?? ""}
                    onChange={onChange}
                    error={validation?.aptSuit?.error ?? false}
                    errorMessage={validation?.aptSuit?.errorMessage ?? ""}
                    // required
                    subTitle="Enter your business country(optional)"
                />



                <hr
                    className="w-full my-4"
                    style={{
                        height: "2px",
                        border: "none",
                        backgroundImage:
                            "linear-gradient(125.12deg, rgba(45, 36, 108, 0.8) 6.52%, rgba(22, 19, 43, 0.8) 30.66%, rgba(24, 20, 46, 0.8) 63.49%, rgba(37, 32, 74, 0.8) 78.95%)",
                    }}
                />

                {/* Address 2 */}

                {/* <Ninput
                    label="Address 2"
                    name="address"
                    value={data?.address ?? ""}
                    onChange={onChange}
                    error={validation?.address?.error ?? false}
                    errorMessage={validation?.address?.errorMessage ?? ""}
                    required
                    subTitle="subTitle"
                /> */}

                {/* apt suite */}

                {/* <Ninput
                    label="Apt Suite"
                    name="aptSuit"
                    value={data?.aptSuit ?? ""}
                    onChange={onChange}
                    error={validation?.aptSuit?.error ?? false}
                    errorMessage={validation?.aptSuit?.errorMessage ?? ""}
                    required
                    subTitle="subTitle"
                />

                <hr
                    className="w-full my-4"
                    style={{
                        height: "2px",
                        border: "none",
                        backgroundImage:
                            "linear-gradient(125.12deg, rgba(45, 36, 108, 0.8) 6.52%, rgba(22, 19, 43, 0.8) 30.66%, rgba(24, 20, 46, 0.8) 63.49%, rgba(37, 32, 74, 0.8) 78.95%)",
                    }}
                /> */}

                <SelectDropdown
                    label="Country"
                    value={countryOptions?.find((i) => i?.label === data?.country)}
                    placeholder="Select Country"
                    options={countryOptions}
                    onChange={handleCountryChange}
                    error={validation?.country?.error ?? false}
                    errorMessage="Please select Country"
                    required
                    dropdownSubTitle="Select business country"
                // append={{
                //     className: '',
                //     append: 'start',
                //     icon: location_icon
                // }}
                />

                <SelectDropdown
                    label="State"
                    value={stateOptions?.find((i) => i?.label === data?.state)}
                    placeholder="Select State"
                    options={stateOptions}
                    onChange={(selectedOption: any) => {
                        onChangeProperty("state", selectedOption?.label);
                    }}
                    error={validation?.state?.error ?? false}
                    errorMessage="Please select state"
                    required
                    dropdownSubTitle="Select state"
                />

                <Ninput
                    label="City"
                    name="city"
                    placeholder="Select City"
                    value={data?.city ?? ""}
                    onChange={onChange}
                    error={validation?.city?.error ?? false}
                    errorMessage={validation?.city?.errorMessage ?? ""}
                    required
                    subTitle="Select city"
                />

                {/* zip code */}
                <Ninput
                    label="Zip Code"
                    placeholder="Enter Zip Code"
                    name="zipCode"
                    value={data?.zipCode ?? ""}
                    onChange={onChange}
                    error={validation?.zipCode?.error ?? false}
                    errorMessage={validation?.zipCode?.errorMessage ?? ""}
                    required
                    subTitle="Enter Zip code"
                />
                <hr
                    className="w-full my-4"
                    style={{
                        height: "2px",
                        border: "none",
                        backgroundImage:
                            "linear-gradient(125.12deg, rgba(45, 36, 108, 0.8) 6.52%, rgba(22, 19, 43, 0.8) 30.66%, rgba(24, 20, 46, 0.8) 63.49%, rgba(37, 32, 74, 0.8) 78.95%)",
                    }}
                />
            </div>
        </div>
    );
};

export default AddressForm;
