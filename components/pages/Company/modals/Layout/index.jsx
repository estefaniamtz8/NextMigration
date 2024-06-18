import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Box, Container } from '@mui/material';
import { MdClose } from 'react-icons/md';

import palette from 'styles/palette';

const ModalLayout = ({ open, onClose, title, actions, sidenav, maxWidth, containerMaxWidth, children }) => (
  <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
    <Box sx={{ padding: '1rem 0', height: 'auto', position: 'relative', backgroundColor: palette.colorLightFour }}>
      <Container maxWidth={containerMaxWidth}>
        <h1 className="text-2xl font-medium text-left text-purple">{title}</h1>
      </Container>
      <Box sx={{ cursor: 'pointer', position: 'absolute', top: '8px', right: '10px' }} onClick={onClose}>
        <MdClose size={25} color={palette.black} />
      </Box>
    </Box>

    <Box sx={{ position: 'relative' }}>
      {sidenav || null}
      <Container maxWidth={containerMaxWidth}>{children}</Container>
    </Box>

    <Box sx={{ padding: '1rem 0', height: 'auto', backgroundColor: palette.colorLightFour }}>
      <Container maxWidth={containerMaxWidth} sx={{ textAlign: 'center' }}>
        {actions}
      </Container>
    </Box>
  </Dialog>
);

ModalLayout.defaultProps = {
  open: false,
  title: '',
  actions: null,
  sidenav: null,
  maxWidth: 'lg',
  containerMaxWidth: 'sm',
};

ModalLayout.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  actions: PropTypes.node,
  sidenav: PropTypes.node,
  maxWidth: PropTypes.oneOf(['lg', 'xl']),
  containerMaxWidth: PropTypes.oneOf(['sm', 'md', 'lg']),
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalLayout;
