import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import OPTIONS from './contants';  // Ensure this path is correct and the file exists

const Sidenav = ({ active, onClick }) => (
  <div className="flex h-full flex-col items-center pl-10">
    <div className="mt-24 flex flex-col gap-6">
      {OPTIONS.map((opt) => (
        <React.Fragment key={opt.value}>
          {opt.enabled ? (
            <div onClick={() => onClick(opt.link, opt.value)} className="relative cursor-pointer">
              <div
                className={`rounded-xl bg-white px-4 py-6 text-center text-sm font-normal shadow-md ${
                  active.includes(opt.value) || active.includes(opt.link) ? 'bg-purple text-white' : ''
                }`}
              >
                {opt.label}
              </div>
              <div className="absolute -right-2.5 top-1/3 flex h-6 w-6 items-center justify-center rounded-full bg-purple text-white">
                <MdOutlineArrowForwardIos size={14} />
              </div>
            </div>
          ) : (
            <div className="cursor-not-allowed rounded-xl bg-white px-2 py-4 text-center text-sm font-normal opacity-55 shadow-md">
              <Tooltip title="Próximamente" placement="top" arrow>
                <span>{opt.label}</span>
              </Tooltip>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

Sidenav.defaultProps = {
  active: '',
  onClick: () => {},
};

Sidenav.propTypes = {
  active: PropTypes.string,
  onClick: PropTypes.func,
};

export default Sidenav;
