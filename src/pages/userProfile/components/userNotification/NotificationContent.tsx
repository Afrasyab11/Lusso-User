import { useState } from "react";
import Button from "../../../../components/ui/SettingButton";
import UserCheckBoxNotifications from "./userCheckBoxNotifications";
import UserSwitchNotification from './userSwitchNotification';

const NotificationContent = () => {
    const [checkboxStates, setCheckboxStates] = useState([
        { statement: 'Important updates and announcements', checked1: false, checked2: false },
        { statement: 'Changes in terms of service or privacy policy', checked1: false, checked2: false },
        { statement: 'Recommendations based on your viewing or browsing history', checked1: false, checked2: false },
        { statement: 'Upcoming subscription renewals and payment reminders', checked1: false, checked2: false },
        { statement: 'Changes in subscription pricing or plan upgrades', checked1: false, checked2: false },
        { statement: 'Account activity alerts (e.g., suspicious login attempts)', checked1: false, checked2: false },
        { statement: 'Successful login attempts from new devices or locations', checked1: false, checked2: false },
    ]);

    const [switchStates, setSwitchStates] = useState<any>([
        { statement: 'Enable/disable All real-time notifications', checked: false },
        { statement: 'Enable/disable sound', checked: false },
    ]);

    return (
        <div className="flex flex-col gap-5">
            <UserCheckBoxNotifications checkboxStates={checkboxStates} setCheckboxStates={setCheckboxStates} />
            <UserSwitchNotification switchStates={switchStates} setSwitchStates={setSwitchStates} />
            <div className='flex gap-6 lg:col-span-2 mt-5'>
                <Button
                    label="Save"
                    className='bg-gradient-vertical rounded px-12  text-white border-white'
                    style={{
                        background: "linear-gradient(90deg, #4B03CE 0 %, #F572B6 100 %)",
                        border: "1px solid #A768FD",
                    }}
                />
                <Button
                    label="Reset to Default"
                    className='px-6 py-2 rounded border-2 bg-transparent'
                    style={{
                        border: '2px solid var(--accent1, #7D3CF3)',
                        // backgroundColor: 'transparent',
                    }}
                    onClick={() => {
                        setCheckboxStates([
                            { statement: 'Important updates and announcements', checked1: false, checked2: false },
                            { statement: 'Changes in terms of service or privacy policy', checked1: false, checked2: false },
                            { statement: 'Recommendations based on your viewing or browsing history', checked1: false, checked2: false },
                            { statement: 'Upcoming subscription renewals and payment reminders', checked1: false, checked2: false },
                            { statement: 'Changes in subscription pricing or plan upgrades', checked1: false, checked2: false },
                            { statement: 'Account activity alerts (e.g., suspicious login attempts)', checked1: false, checked2: false },
                            { statement: 'Successful login attempts from new devices or locations', checked1: false, checked2: false },
                        ]);
                        setSwitchStates([
                            { statement: 'Enable/disable All real-time notifications', checked: false },
                            { statement: 'Enable/disable sound', checked: false },
                        ])
                    }}
                />

            </div>
        </div>
    );
};

export default NotificationContent;
