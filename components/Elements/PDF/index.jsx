import React from 'react';
import { Box, CircularProgress, Typography, Stack } from '@mui/material';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { openLinkReactPDF } from 'utils/functions/general';
import CVPersonal from 'utils/templates/pdfPersonal';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const workerUrl = 'https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js';

const PDF = function (args) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { cv, docID, keyDocument, info } = args;

  const pattern = React.useRef();

  const renderError = React.useCallback(
    (error) => {
      let message = '';
      switch (error.name) {
        case 'InvalidPDFException':
          message = 'Archivo invalido';
          break;
        case 'MissingPDFException':
          message = 'MNo hay file';
          break;
        case 'UnexpectedResponseException':
          message = 'Error en el server';
          break;
        case 'n':
          message = 'Error en la API';
          break;
        default:
          message = 'No hay Archivo';
          break;
      }

      return (
        <Box
          sx={{ display: 'flex', flexDirection: 'column' }}
          justifyContent="center"
          height="100%"
          alignItems="center"
        >
          <Typography variant="h6" textAlign="center" color="text.primary.main">
            Error general
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.primary.main" sx={{ paddingTop: 2 }}>
            {message}
          </Typography>
        </Box>
      );
    },
    [docID]
  );

  const getCV = React.useMemo(() => {
    if (keyDocument !== 'cvPersonal') {
      if (!cv?.includes('http')) {
        return (
          <Stack sx={{ height: '100%', width: '100%' }} onClick={openLinkReactPDF}>
            <Typography variant="h2" textAlign="center" color="text.primary.main" sx={{ paddingTop: 4 }}>
              {keyDocument?.toUpperCase()}: {cv}
            </Typography>
          </Stack>
        );
      }
      return (
        <Stack sx={{ height: '100%', width: '100%' }} onClick={openLinkReactPDF}>
          <Worker workerUrl={workerUrl}>
            <Viewer
              // fileUrl="https://firebasestorage.googleapis.com/v0/b/intrare-dev.appspot.com/o/files%2F1%2FProfile.pdf?alt=media&token=8c122332-44c3-499f-8688-2ff318b99ddc"
              fileUrl={cv || 'https://firebasestorage.googleapis.com'}
              plugins={[defaultLayoutPluginInstance]}
              renderError={renderError}
              initialPage={0}
              renderLoader={(percentages) => (
                <Box sx={{ display: 'flex', flexDirection: 'column' }} justifyContent="center" alignItems="center">
                  <CircularProgress color="primary" />
                  <Typography variant="h6" textAlign="center" color="text.primary.main" sx={{ paddingTop: 2 }}>
                    Cargando {`${Math.round(percentages)}%`}
                  </Typography>
                </Box>
              )}
            />
          </Worker>
        </Stack>
      );
    }
    return <CVPersonal infoGeneral={info} />;
  }, [docID, cv, pattern, keyDocument, info]);

  return (
    <Box
      height="100%"
      width="100%"
      position="relative"
      ref={pattern}
      sx={{
        overflowY: 'hidden',
        padding: '0 10px',
      }}
    >
      {getCV}
    </Box>
  );
};

export default PDF;
