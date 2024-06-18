import React from 'react';
import { Button, Popover } from '@mui/material';

const ActionPopover = (args) => {
  const { dataPopover, handleClose, onClickCompleteYourProfileIntrare, onClickInviteVacant, onClickDeleteCandidate } =
    args;

  return (
    <Popover
      id={dataPopover?.data?.docID}
      open={dataPopover?.open}
      anchorEl={dataPopover?.anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          padding: '10px 0px',
          alignItems: 'start',
        }}
      >
        <Button style={{ width: '100%' }} onClick={onClickCompleteYourProfileIntrare} variant="text">
          Notificación completa tu perfil
        </Button>
        <Button style={{ width: '100%' }} onClick={() => onClickInviteVacant(dataPopover?.data)} variant="text">
          Invitar a vacante
        </Button>
        <Button
          style={{ color: 'red', width: '100%' }}
          onClick={() => onClickDeleteCandidate(dataPopover?.data)}
          variant="text"
        >
          Borrar candidato
        </Button>
        {/* <button type="button"> Recordatorio de vacantes enviadas </button> */}
      </main>
    </Popover>
  );
};

export default ActionPopover;
