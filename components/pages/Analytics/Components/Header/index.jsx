import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BsChevronDown } from 'react-icons/bs';

import palette from 'styles/palette';

import ROUTES from './constants';

const AnalyticsHeader = ({ showAllLink, showExport, multipleExport, onExportPDF, onExportXLS }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [exportEl, setExportEl] = React.useState(null);
  const [open, setOpen] = useState(Boolean(anchorEl));
  const [openExport, setOpenExport] = useState(false);

  const handleClick = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (key) => {
    setOpen(false);
    if (key) {
      navigate(key);
    }
  };

  const onBeforeExport = (type) => {
    if (type === 'pdf') {
      return onExportPDF();
    }

    return onExportXLS();
  };

  return (
    <div className="flex flex-row items-center justify-between w-full py-8">
      <div className="flex flex-row items-center gap-2">
        <h2 className="text-2xl font-normal">De un vistazo:</h2>
        <button
          className="flex text-2xl font-normal bg-transparent border-none cursor-pointer"
          id="analytics-btn"
          type="button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {ROUTES.find((route) => route.key === location.pathname)?.label}
          <BsChevronDown size={20} />
        </button>
        <Menu id="analytics-menu" anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
          {ROUTES.map((route) => (
            <MenuItem key={route.key} selected={location.pathname === route.key} onClick={() => handleClose(route.key)}>
              {route.label}
            </MenuItem>
          ))}
        </Menu>
      </div>
      {showAllLink && (
        <p className="text-sm">
          <Link to="/analytics" style={{ textDecoration: 'none', color: palette.purple300 }}>
            Ver todo
          </Link>
        </p>
      )}
      {showExport && (
        <div>
          {multipleExport ? (
            <>
              <button
                className="py-2 text-white border-none rounded-md cursor-pointer bg-purple px-7"
                type="button"
                onClick={(e) => {
                  setExportEl(e.currentTarget);
                  setOpenExport(true);
                }}
              >
                Exportar
              </button>
              <Menu
                id="export-menu"
                anchorEl={exportEl}
                open={openExport}
                onClose={() => setOpenExport(false)}
                MenuListProps={{
                  'aria-labelledby': 'export-button',
                }}
              >
                <MenuItem onClick={() => onBeforeExport('pdf')}>Exportar a PDF</MenuItem>
                <MenuItem onClick={() => onBeforeExport('xls')}>Exportar a XLS</MenuItem>
              </Menu>
            </>
          ) : (
            <button
              className="py-2 text-white border-none rounded-md cursor-pointer bg-purple px-7"
              type="button"
              onClick={onExportPDF}
            >
              Exportar PDF
            </button>
          )}
        </div>
      )}
    </div>
  );
};

AnalyticsHeader.defaultProps = {
  showAllLink: true,
  showExport: false,
  multipleExport: false,
  onExportPDF() {},
  onExportXLS() {},
};

AnalyticsHeader.propTypes = {
  showAllLink: PropTypes.bool,
  showExport: PropTypes.bool,
  multipleExport: PropTypes.bool,
  onExportPDF: PropTypes.func,
  onExportXLS: PropTypes.func,
};

export default AnalyticsHeader;
