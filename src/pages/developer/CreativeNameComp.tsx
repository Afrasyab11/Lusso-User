import React from 'react';
import Input from '../../components/ui/Input';

interface CreativeNameProps {
    data?: any;
    validation?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreativeName: React.FC<CreativeNameProps> = ({
    data = {},
    validation = {},
    onChange = () => console.log('...clicked'),
}) => {
    return (
        <div className="flex flex-col justify-center items-center gap-12">
            <h2 className="text-primary-custom font-semibold text-[26px]">
                Your Channel Name
            </h2>
            <div className="flex flex-col gap-5">
                <Input
                    label="Name"
                    name="username"
                    value={data?.username ?? ''}
                    onChange={onChange}
                    error={validation?.username?.error ?? false}
                    errorMessage={validation?.username?.errorMessage ?? ''}
                />
                <p className="text-normal-color">
                    This name will be visible to all users and can be changed at any time for your recognition.
                </p>
            </div>
        </div>
    );
};

export default CreativeName;
