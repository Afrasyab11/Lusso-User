import { useDisclosure } from '@mantine/hooks';
import NotificationCard from '../bellNotification/BellNotificationModal';

function NotificationPart() {
    const [opened, { toggle }] = useDisclosure(false);
    return (
        <div className="relative">
            <button
                onClick={toggle}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-white relative z-10"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#00b2ff"
                    className="w-6 h-7"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-1.518-.597-2.879-1.685-3.87A5.978 5.978 0 0012 5c-1.657 0-3.157.672-4.315 1.87C6.597 8.121 6 9.482 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h11z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.73 21a2 2 0 01-3.46 0"
                    />
                </svg>
            </button>

            <NotificationCard opened={opened} toggle={toggle} />
        </div>
    );
}

export default NotificationPart;
