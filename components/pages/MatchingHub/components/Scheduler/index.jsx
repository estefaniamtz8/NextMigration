import React, { useEffect, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { v4 as uuid } from 'uuid';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

import DEFAULT_EVENTS from './constants';
import EventModal from './modals/Event';
import CreateEventModal from './modals/CreateEvent';


import 'react-big-calendar/lib/css/react-big-calendar.css';

dayjs.extend(timezone);


const Calendar = dynamic(() => import('react-big-calendar').then(mod => mod.Calendar), { ssr: false });
const dayjsLocalizer = dynamic(() => import('react-big-calendar').then(mod => mod.dayjsLocalizer), { ssr: false });

const djLocalizer = dayjsLocalizer(dayjs);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: '#5432CF',
      borderRadius: '0.25rem',
      outline: 'none',
    },
  });

const Scheduler = () => {
  const [event, setEvent] = useState(null);
  const [eventToAdd, setEventToAdd] = useState(null);
  const [myEvents, setEvents] = useState(DEFAULT_EVENTS);
  const [createEvent, setCreateEvent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const { max, views, components } = useMemo(() => ({
    max: dayjs().endOf('day').subtract(1, 'hours').toDate(),
    views: ['month', 'week', 'day', 'agenda'],
    components: {
      eventWrapper: ColoredDateCellWrapper,
    },
  }), []);

  const onSelectEvent = useCallback((event) => {
    setEvent(() => event);
    setShowDetails(true);
  }, [setEvent, setShowDetails]);

  const onSelectSlot = useCallback(({ start, end }) => {
    const eventToAdd = { id: uuid(), start, end };
    setEventToAdd(() => eventToAdd);
    setCreateEvent(true);
  }, [setEventToAdd, setCreateEvent]);

  const onBeforeClose = () => {
    setEvent(null);
    return setCreateEvent(false);
  };

  const onAddEvent = useCallback((event) => setEvents((events) => [...events, event]), [setEvents]);

  return (
    <>
      <div className="flex flex-row justify-end mb-4">
        <button
          className="bg-purple border-none cursor-pointer rounded-md text-white py-2 px-5"
          type="button"
          onClick={() => onSelectSlot({ start: dayjs().toDate(), end: dayjs().add(1, "hour").toDate() })}
        >
          Crear evento
        </button>
      </div>
      <div className="h-750 bg-white px-2 pt-4 pb-2 rounded-md">
        <Calendar
          components={components}
          events={myEvents}
          localizer={djLocalizer}
          max={max}
          showMultiDayTimes
          step={60}
          views={views}
          onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
          selectable
        />
        {event && (
          <EventModal event={event} open={showDetails} onClose={setShowDetails} />
        )}
        {eventToAdd && (
          <CreateEventModal
            event={eventToAdd}
            open={createEvent}
            onClose={onBeforeClose}
            onCreateEvent={onAddEvent}
          />
        )}
      </div>
    </>
  );
};

export default Scheduler;
