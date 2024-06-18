import { FaRegBell, FaWhatsapp } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { formatDistanceToNow } from 'date-fns';
import { IoIosArrowDown } from 'react-icons/io';
import React, { useState } from 'react';

const Notification = (args) => {
  const { notification } = args;

  const [showMore, setShowMore] = useState(false);

  return (
    <div key={notification?.id} className="relative my-6 -ml-2.5 flex w-full items-center">
      <div className="z-10 w-2/12">
        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full ${
            notification?.type === 'mail' && 'bg-blue'
          } ${notification?.type === 'whatsapp' && 'bg-green'} ${notification?.type === 'custom_event' && 'bg-purple'}`}
        >
          {notification?.type === 'custom_event' && <FaRegBell className="text-white" />}
          {notification?.type === 'whatsapp' && <FaWhatsapp className="text-white" />}
          {notification?.type === 'mail' && <MdOutlineEmail className="text-white" />}
        </div>
      </div>
      <div className="w-10/12">
        <p className="text-sm">{notification?.description}</p>
        {showMore && (
          <div className="flex flex-col">
            <h6 className="text-sm font-medium text-purple">Metadatos</h6>
            {Object.keys(notification?.metadata || {})?.map((item, index) => (
              <div className="grid grid-cols-2">
                <p className="break-words text-xs text-gray300">{item}:</p>
                <p className="break-words">{Object.values(notification?.metadata || {})[index]}</p>
              </div>
            ))}
          </div>
        )}
        <p className="text-gray-500 text-xs">
          {formatDistanceToNow(new Date(notification?.sentAt * 1000 || null), { addSuffix: true })}
        </p>
      </div>
      {Object.values(notification?.metadata || {})?.length > 0 && (
        <IoIosArrowDown
          onClick={() => setShowMore(!showMore)}
          size={12}
          className={`${showMore && 'rotate-180'} absolute -right-4 top-1 cursor-pointer`}
        />
      )}
    </div>
  );
};

export default Notification;
