import React from 'react';
import { Popover } from '@mui/material';

const DocumentsPopover = (args) => {
  const { documentsPopoverDefault, dataPopoverDocuments, handleCloseDocuments, getCircleColorWithName } = args;
  return (
    <Popover
      open={dataPopoverDocuments?.open}
      onClose={handleCloseDocuments}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      anchorEl={dataPopoverDocuments?.anchorEl}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '100%',
          height: '100%',
          overflow: 'auto',
          padding: '10px',
        }}
      >
        <div style={{ fontSize: '1.5em', fontWeight: '400', textAlign: 'center', color: '#888888' }}>Documentos</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            alignItems: 'center',
            gap: '0.3rem',
            width: '20vw',
            height: '100%',
            borderRadius: '10px',
          }}
        >
          {documentsPopoverDefault?.map((item) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                padding: '0.2rem',
              }}
            >
              <div style={{ fontSize: '1.2em', width: '50%', marginRight: '0.3rem', color: '#888888' }}>
                {item?.abbreviation}
              </div>
              <div style={{ fontSize: '1.5em', width: '20%', color: '#888888' }}>
                {getCircleColorWithName(item?.value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Popover>
  );
};

export default DocumentsPopover;
