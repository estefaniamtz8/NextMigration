import React, { useState } from 'react';
import { FaRegBell } from 'react-icons/fa';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useClickAway } from '@uidotdev/usehooks';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import getNotificationsByUser from '../../../services/notifications';
import Notification from './Notification';

const Timeline = (args) => {
  const { person } = args;
  const userID = person?.userID || person?.docID || person?.uid;
  const [showTimeline, setShowTimeline] = useState(false);

  const ref = useClickAway(() => {
    setShowTimeline(false);
  });

  const { data: dataNotifications, isLoading: loadingNotifications } = useQuery({
    queryFn: () => getNotificationsByUser(userID, showTimeline),
    queryKey: ['getNotifications', userID, showTimeline],
  });

  return (
    <div className="relative">
      <div
        onClick={() => setShowTimeline(true)}
        className="flex w-max cursor-pointer items-baseline gap-x-1 rounded-full bg-gray px-2 pt-0.5 font-founders text-sm"
        role="button"
        tabIndex={-1}
      >
        Eventos y Notificaciones <FaRegBell className="text-black" size={10} />
      </div>
      <div
        ref={ref}
        className={`top-3 z-10 flex flex-col ${
          showTimeline ? 'absolute' : 'hidden'
        } mt-4 w-96 flex-1 rounded-lg bg-white p-8 shadow-xl drop-shadow-xl`}
      >
        <h4 className="text-gray-900 text-xl font-medium">Eventos y notificaciones</h4>
        <div className="relative max-h-96 overflow-y-scroll px-4">
          {loadingNotifications ? (
            <CircularProgress color="primary" />
          ) : (
            <>
              {/* <div */}
              {/*  style={{ height: 80 * dataNotifications?.notifications?.length }} */}
              {/*  className="absolute border border-dashed border-gray300 border-opacity-20" */}
              {/* /> */}
              {dataNotifications?.notifications?.map((notification) => (
                <Notification notification={notification} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
