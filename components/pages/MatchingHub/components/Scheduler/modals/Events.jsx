import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import Dialog from '@mui/material/Dialog';
import { GrAttachment } from 'react-icons/gr';
import { MdLocationOn } from 'react-icons/md';
import { BiSolidUser } from 'react-icons/bi';

dayjs.extend(timezone);

const Event = ({ open, event, onClose }) => (
  <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
    <div className="flex flex-col gap-4 p-6">
      <div className="flex flex-row items-center justify-between gap-2">
        <h2 className="text-lg">{event.title}</h2>
        <button className="px-5 py-2 text-white border-none rounded-md cursor-pointer bg-purple" type="button">
          Mandar Recordatorio
        </button>
      </div>

      <p className="mt-4 text-sm">
        {`${dayjs(event.start).format('dddd, MMMM DD, HH:mm')} - ${dayjs(event.end).format('HH:mm')}`}
      </p>

      <div className="flex flex-row gap-6">
        <BiSolidUser size={20} />
        <p className="text-sm">
          {event.details.user.name}
          <br />
          {`ID: ${event.details.user.id}`}
        </p>
      </div>

      {event.details.location && (
        <div className="flex flex-row items-center gap-6">
          <MdLocationOn size={20} />
          <p className="text-sm">{event.details.location}</p>
        </div>
      )}

      {event.details.attachment && (
        <div className="flex flex-row items-center gap-6">
          <GrAttachment size={20} />
          <p className="text-sm">{event.details.attachment.name}</p>
        </div>
      )}

      <button
        className="px-4 py-2 mt-4 bg-transparent border-solid rounded-md cursor-pointer border-purple text-purple w-max"
        type="button"
        onClick={() => onClose(false)}
      >
        Cerrar
      </button>
    </div>
  </Dialog>
);

Event.defaultProps = {
  open: false,
};

Event.propTypes = {
  open: PropTypes.bool,
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
    details: PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }).isRequired,
      location: PropTypes.string,
      attachment: PropTypes.shape({
        file: PropTypes.any,
        name: PropTypes.string,
      }),
    }).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Event;
