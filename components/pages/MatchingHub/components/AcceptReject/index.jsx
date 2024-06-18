import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { MdClose, MdDone } from 'react-icons/md';

export default function AcceptRejectButtons(props) {
  const { onAccept, onReject, acceptColor, rejectColor } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button
        onClick={onAccept}
        variant="contained"
        sx={{
          padding: 0,
          borderRadius: '2px',
          minWidth: 0,
          width: '60px',
          height: '30px',
          margin: '0 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${acceptColor} !important`,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: `${acceptColor} !important`,
          },
        }}
      >
        <MdDone />
      </Button>
      <Button
        onClick={onReject}
        variant="contained"
        sx={{
          padding: 0,
          borderRadius: '2px',
          width: '60px',
          height: '30px',
          margin: '0 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: `${rejectColor} !important`,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: `${rejectColor} !important`,
          },
        }}
      >
        <MdClose />
      </Button>
    </div>
  );
}

AcceptRejectButtons.defaultProps = {
  acceptColor: '#0DC599',
  rejectColor: '#FCCFCA',
}

AcceptRejectButtons.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  acceptColor: PropTypes.string,
  rejectColor: PropTypes.string,
}
