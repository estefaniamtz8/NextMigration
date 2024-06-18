import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Box } from '@mui/material';
import { MdClose } from 'react-icons/md';

import palette, { FontsData } from 'styles/palette';

const ModalLayout = ({ open, onClose, title, actions, children }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <Box sx={{ padding: '1rem 0', height: 'auto', position: 'relative', backgroundColor: palette.colorLightFour }}>
      <h1
        style={{
          color: palette.purple300,
          fontFamily: FontsData.circularStd,
          fontSize: '1.5rem',
          width: '100%',
          textAlign: 'center',
          fontWeight: '500',
        }}
      >
        {title}
      </h1>
      <Box sx={{ cursor: 'pointer', position: 'absolute', top: '8px', right: '10px' }} onClick={onClose}>
        <MdClose size={25} color={palette.black} />
      </Box>
    </Box>

    <Box sx={{ position: 'relative' }}>{children}</Box>

    <Box sx={{ padding: '1rem 0', height: 'auto', textAlign: 'center', backgroundColor: palette.colorLightFour }}>
      {actions}
    </Box>
  </Dialog>
);

ModalLayout.defaultProps = {
  open: false,
  title: '',
  actions: null,
};

ModalLayout.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalLayout;
