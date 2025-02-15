import React from 'react';
import Input from '../../components/ui/Input';

interface OrganizationalTypeProps {
    data?: any;
    validation?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OrganizationalType: React.FC<OrganizationalTypeProps> = ({
    data = {},
    validation = {},
    onChange = () => console.log('...clicked'),
}) => {
    return (
        <div className="flex flex-col justify-center gap-10">
            <h2 className="text-primary-custom font-semibold text-[26px]">
                Select Your Business Type
            </h2>
            <div className="flex flex-col gap-5">
                <div className='flex flex-col gap-2.5'>
                    <Input
                        labelKey="INDIVIDUAL"
                        type="radio"
                        name="orgType"
                        value="INDIVIDUAL"
                        checked={data?.orgType === 'INDIVIDUAL'}
                        onChange={onChange}
                        error={validation?.orgType?.error ?? false}
                        errorMessage='Please select account type'
                    />
                    <p className='text-normal-color'>Register as an individual to enjoy a seamless app browsing experience, save your favorite apps, and gain valuable insights along with exclusive offers tailored just for you</p>
                </div>
                <div className='flex flex-col gap-2.5'>
                    <Input
                        labelKey="ORGANIZATION"
                        type="radio"
                        name="orgType"
                        value="ORGANIZATION"
                        onChange={onChange}
                        checked={data?.orgType === 'ORGANIZATION'}
                        error={validation?.orgType?.error ?? false}
                        errorMessage='Please select account type'
                    />
                    <p className='text-normal-color'>Create an organization account to facilitate team collaboration, manage app usage across your company, and access advanced reporting features for deeper insights into app performance.</p>
                </div>
            </div>
        </div>
    );
};

export default OrganizationalType;
