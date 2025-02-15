import React from "react";
import Button from "../../../../components/ui/SettingButton";
// import Input from "../../../../components/ui/SettingInput";
import Select from "react-select";
import Input from "../../../../components/ui/Input";
import { customStyles } from "../../../../utils/utils";
import { DrawerContentProps } from "../../types/types";
import "./settingDrawer.scss";
const DrawerContent: React.FC<DrawerContentProps> = ({
    title,
    fields,
    buttons,
    toastError
}) => {



    return (
        <div className="md:rounded-2xl lg:px-4 lg:py-6 opacity-70 text-white grid grid-cols-1 lg:grid-cols-2 gap-6">
            <span className="text-lg font-bold text-[#FFFFFF]">{title}</span>
            {fields?.map((field, index) => (
                <div className="lg:col-span-2" key={index}>
                    {field?.type === "select" && field?.options ? (
                        <div>
                            <label className="block text-sm font-medium text-white mb-2">
                                {field.label}
                            </label>
                            <Select
                                name={field.name}
                                options={field.options}
                                classNamePrefix="react-select"
                                styles={customStyles}
                                placeholder={field.placeholder}
                                onChange={field.onChange}

                            />
                            {field?.error && <span className="text-red-600">Please {field?.placeholder ?? ''}</span>}
                        </div>
                    ) : (
                        <>
                            <Input
                                label={field?.label}
                                name={field?.name}
                                onChange={(e: any) => {
                                    field?.onClick?.(e.target.value)
                                }}
                                value={field?.value}
                                type={field?.type}
                                placeholder={field?.placeholder}
                                className={field?.className}
                            />

                            {field.error && (
                                <span className="text-red-500 text-sm">{field.error}</span>
                            )}
                            {/* {field?.validation?.[field?.name]?.error && (
                                <span className="text-red-500 text-sm">
                                    {field?.validation[field?.name]?.errorMessage}
                                </span>
                            )} */}
                        </>
                    )}
                </div>
            ))}
            <div className="flex gap-6 lg:col-span-2 mt-3">
                {buttons?.map((button, index) => (
                    <div key={index}>
                        <Button
                            // label={button.label}
                            className={button.className}
                            onClick={button.onClick}
                            style={button.style}
                            type="custom"
                            // isLoading={button?.isLoading ?? false}
                            disabled={button?.disabled ?? false}
                        >
                            {button?.isLoading ? <div className="loader-md" /> : button?.label}
                        </Button>
                    </div>
                ))}
            </div>
            {toastError && (
                <span className="text-red-500 text-sm">{toastError}</span>
            )}

        </div>
    );
};

export default DrawerContent;
