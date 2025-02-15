import { Box } from '@mantine/core';
import React, { useState } from 'react';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import apps from "../../assets/icons/apps.svg";
import cap from '../../assets/icons/Capa_1.svg';
import cross from "../../assets/icons/cross.svg";
import del from "../../assets/icons/delete.svg";
import email from "../../assets/icons/email.svg";
import tick from "../../assets/icons/tick.svg";

interface Notification {
  title: string;
  description: string;
  time: string;
  icon: string;
  hasViewButton: boolean;
  read?: boolean;
}

interface NotificationCardProps {
  opened: boolean;
  toggle: () => void;
}

const initialNotifications: Notification[] = [
  {
    title: 'Promotion',
    description: "Harry Potter and the Sorcerer's Stone added",
    time: '2 days ago 11:41AM',
    icon: cap,
    hasViewButton: true,
    read: false
  },
  {
    title: 'View Top Rated Games',
    description: '',
    time: '3 days ago 11:41AM',
    icon: apps,
    hasViewButton: false,
    read: false
  },
  {
    title: 'Subscribe Now!',
    description: '',
    time: '4 days ago 11:41AM',
    icon: email,
    hasViewButton: false,
    read: false
  },
];

const NotificationCard: React.FC<NotificationCardProps> = ({ opened, toggle }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const handleSelect = (index: number) => {
    setSelectedIndices((prev) =>
      prev?.includes(index) ? prev?.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleDelete = () => {
    if (selectedIndices.length === 0) {
      const updatedNotifications = notifications?.filter(
        (notification) => !notification?.read
      );
      setNotifications(updatedNotifications);
    } else {
      const updatedNotifications = notifications?.filter(
        (_, index) =>
          !selectedIndices?.includes(index) || (notifications[index]?.read && selectedIndices.includes(index))
      );
      setNotifications(updatedNotifications);
    }
    setSelectedIndices([]);
  };

  const handleMarkAsRead = (index: number) => {
    setNotifications((prev) =>
      prev?.map((notification, i) =>
        i === index ? { ...notification, read: !notification.read } : notification
      )
    );
  };

  const leadingActions = (index: number) => (
    <LeadingActions>
      <SwipeAction
        onClick={() => console.info(`View action triggered for item ${index}`)}
      >
        <span className="text-sm text-white bg-blue-500 rounded">
          View
        </span>
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = (index: number) => (
    <TrailingActions>
      <SwipeAction
        destructive
        onClick={() => {
          setNotifications((prev) => prev?.filter((_, i) => i !== index));
        }}
      >
        <span className="text-sm text-white bg-red-500  rounded text-center align-middle">
          <img src={del} alt="Delete" className='cursor-pointer text-center align-middle' />
        </span>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <Box
      className={`absolute top-12 right-0 w-96 bg-[#181534] rounded-lg shadow-lg transition-transform duration-300 ${opened ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      style={{ zIndex: 10 }}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-[#2c2051] py-2 px-3 rounded-full flex justify-center items-center">
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
          </div>
          <div>
            <span className="font-normal text-xs md:text-sm lg:text-base text-white">
              <span className="text-xl p-2 rounded text-white">Notification</span>
              ({notifications?.length})
            </span>
          </div>
        </div>
        <div onClick={toggle} className="cursor-pointer">
          <img src={cross} alt="Close" />
        </div>
      </div>

      <SwipeableList fullSwipe={true} threshold={0.5}>
        <div className="space-y-2 px-4">
          {notifications?.length === 0 ? (
            <div className="flex justify-center items-center py-4">
              <p className="text-lg font-medium text-gray-500">No Notification available</p>
            </div>
          ) : (
            notifications?.map((item, index) => (
              <SwipeableListItem
                key={index}
                leadingActions={leadingActions(index)}
                trailingActions={trailingActions(index)}
                fullSwipe={true}
              >
                <div
                  className={`flex flex-col p-3 bg-[#FFFFFF1A] rounded-md w-full hover:bg-[#383867] transition-all duration-300 ${selectedIndices?.includes(index) ? 'bg-[#0c4a6e]' : ''
                    } ${item?.read ? 'opacity-50' : ''}`}
                  onClick={() => handleSelect(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full">
                        <img src={item?.icon} alt={item?.title} className="w-5 h-5" />
                      </div>
                      <div>
                        <h1
                          className={`${item?.title === 'Promotion'
                            ? 'font-bold text-base text-[#FFFFFF]'
                            : 'font-normal text-base text-[#FFFFFF]'
                            }`}
                        >
                          {item?.title}
                        </h1>
                        {item?.description && (
                          <span className="font-normal text-xs text-[#FFFFFF]">
                            {item?.description}
                          </span>
                        )}
                        <div>
                          <span className="text-center font-medium text-xs text-[#B1ADCD]">
                            {item?.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <img
                        src={tick}
                        alt="tick"
                        className={`w-5 h-5 cursor-pointer ${notifications[index]?.read ? 'opacity-50' : ''}`}
                        onClick={() => handleMarkAsRead(index)}
                      />
                    </div>
                  </div>
                  {item?.hasViewButton && (
                    <div className="mt-2 flex justify-start ms-10">
                      <button className="px-4 py-1 text-sm bg-[#792FFF80] text-white rounded hover:bg-[#008fcc] transition duration-300">
                        View
                      </button>
                    </div>
                  )}
                </div>
              </SwipeableListItem>
            ))
          )}
        </div>
      </SwipeableList>


      <div className="flex items-center justify-end p-4">
        <div>
          <img src={del} onClick={handleDelete} alt="Delete" className='cursor-pointer' />
        </div>
      </div>
    </Box>
  );
};

export default NotificationCard;
