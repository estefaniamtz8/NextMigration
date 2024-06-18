import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import palette from 'styles/palette';

const Badge = ({ title, fullWidth, children }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={2}
    sx={{
      borderRadius: '100px',
      padding: '0.4rem 0.9rem',
      width: fullWidth ? '100%' : 'max-content',
      background: palette.red300,
      position: 'relative',
    }}
  >
    <Typography component="p" sx={{ color: palette.blackText, fontSize: '0.8rem', width: '20%' }}>
      {title}
    </Typography>
    <Stack spacing={1} alignItems="center" direction="row">
      {children}
    </Stack>
  </Stack>
);

Badge.defaultProps = {
  children: null,
  fullWidth: false,
};

Badge.propTypes = {
  title: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  children: PropTypes.node,
};

export default Badge;
