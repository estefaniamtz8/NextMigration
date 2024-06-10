import React from 'react';
import { RiLoader3Fill } from 'react-icons/ri';
import PropTypes from 'prop-types';
import { Box, Button, Stack } from '@mui/material';
import { MdClose, MdDone, MdLocationOn } from 'react-icons/md';
import Markdown from 'markdown-to-jsx';
import Image from 'next/image';

import palette from 'styles/palette';
import avatar from 'public/avatar.png'; 

import rejectAcceptBtnStyles from './styles'; 

const Job = ({ job, showClose, showActions, onClose, onAccept, onReject }) => (
  <div className="h-screen overflow-y-auto">
    <Box
      sx={{
        height: '250px',
        width: '100%',
        padding: '1rem',
        background: palette.bgMain,
        backgroundImage: `url(${job.cover})`,
      }}
    >
      {showClose && (
        <Button variant="contained" color="primary" sx={{ width: 'max-content' }} onClick={onClose}>
          Cerrar
        </Button>
      )}
    </Box>
    <div className="flex flex-col px-8">
      <div className="flex w-full gap-2 pb-6">
        <figure className="relative -mt-14 h-28 w-28">
          <Image alt="Imagen de la empresa" className="w-full h-full rounded-lg" src={job.logo || avatar} />
        </figure>
        {showActions && (
          <Stack direction="row" alignItems="center" spacing={3} sx={{ marginTop: '0.5rem' }}>
            <div className="flex items-center">
              <Button onClick={onAccept} className="p-0" variant="contained" sx={rejectAcceptBtnStyles(palette.success)}>
                <MdDone />
              </Button>
              <span className="text-sm text-purple300">Aceptar</span>
            </div>
            <Stack direction="row" alignItems="center">
              <Button onClick={onReject} className="p-0" variant="contained" sx={rejectAcceptBtnStyles(palette.red300)}>
                <MdClose />
              </Button>
              <span className="text-sm text-purple300">Rechazar</span>
            </Stack>
          </Stack>
        )}
      </div>
      <h1 className="text-lg font-medium text-purple300">{job?.name}</h1>
      <div className="flex flex-col pt-2 gap-y-2">
        <div className="flex items-center gap-2">
          <RiLoader3Fill size={22} color={palette.red300} />
          <p className=" text-[0.8rem] text-xs text-purple300">
            {job?.salary?.min && job?.salary?.max
              ? `$${job?.salary?.min} - ${job?.salary?.max}`
              : `$${job.salaryWork || job?.salary?.total}`}
          </p>
        </div>
        {(job?.location?.location || job.location || job['Zona de trabajo']) && (
          <div className="flex items-center gap-2">
            <MdLocationOn size={22} color={palette.red300} />
            <p className="text-[0.8rem] text-xs text-purple300">
              {job?.location?.location || job.location || job['Zona de trabajo']}
            </p>
          </div>
        )}
        {job.jobDescription && (
          <Box sx={{ color: palette.blackText, p: { fontSize: '0.8rem' }, span: { fontSize: '0.8rem' } }}>
            <Markdown>{job?.jobDescription?.replace(/(\r\n|\n|\\n|\r|\n+)/gm, '\n')}</Markdown>
          </Box>
        )}

        {job?.functions?.length > 0 && (
          <>
            <h2 className="text-bold mb-2 mt-4 text-[1rem] text-purple md:text-[1rem]">
              Funciones o actividades a realizar
            </h2>
            {job?.functions?.map((functionVacancy) => (
              <p className="mb-3 text-[0.8rem] md:text-[0.8rem]" key={functionVacancy?.value}>
                <Markdown>{functionVacancy?.label}</Markdown>
              </p>
            ))}
          </>
        )}

        {typeof job?.turnWork === 'object' && Object.values(job?.turnWork || {})?.length ? (
          <>
            <h2 className="text-bold mb-2 mt-3 text-[1rem] text-purple md:text-[1rem]">Horario de trabajo</h2>
            <p className="mb-3 text-[0.8rem] capitalize md:text-[0.8rem]" key={job?.turnWork?.value}>
              <Markdown>{job?.turnWork?.label}</Markdown>
            </p>
          </>
        ) : null}

        {Object.values(job?.educationWork || {})?.length ? (
          <>
            <h2 className="text-bold mb-2 mt-3 text-[1rem] text-purple md:text-[1rem]">Grado de estudios</h2>
            <p className="mb-3 text-[0.8rem] capitalize md:text-[0.8rem]" key={job?.educationWork?.value}>
              <Markdown>{job?.educationWork?.label}</Markdown>
            </p>
          </>
        ) : null}

        {Object.values(job?.languagesWork || [])?.length ? (
          <>
            <h2 className="text-bold mb-2 mt-3 text-[1rem] text-purple md:text-[1rem]">
              Idiomas requeridos para el puesto
            </h2>
            {Object.values(job?.languagesWork || [])?.map((functionVacancy) => (
              <p className="mb-3 text-[0.8rem] capitalize md:text-[0.8rem]" key={functionVacancy?.value}>
                <Markdown>{`${functionVacancy?.label || functionVacancy?.value || ''} `}</Markdown>
              </p>
            ))}
          </>
        ) : null}
      </div>
    </div>
  </div>
);

Job.defaultProps = {
  showClose: false,
  showActions: false,
  onClose() {},
  onAccept() {},
  onReject() {},
};

Job.propTypes = {
  showClose: PropTypes.bool,
  showActions: PropTypes.bool,
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  job: PropTypes.shape().isRequired,
};

export default Job;

// Mover imagen a la carpeta public