import React from 'react';
import { RiLoader3Fill } from 'react-icons/ri';
import PropTypes from 'prop-types';
import { Box, Button, Stack } from '@mui/material';
import { MdDone, MdClose, MdLocationOn } from 'react-icons/md';
import Markdown from 'markdown-to-jsx';
import palette from 'styles/palette';
import avatar from 'assets/avatar.png';
import { fetchDataGetAsync } from 'services/axios/fetchs';
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import CardPostulation from './CardPostulation';

import rejectAcceptBtnStyles from '../styles';

const JobAndPostulations = ({ job, showClose, showActions, onClose, onAccept, onReject, open }) => {
  const [activeSection, setActiveSection] = React.useState('home');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [postulations, setPostulations] = React.useState([]);
  const getPostulations = async () => {
    setLoading(true);
    fetchDataGetAsync(`/ats/vacancy/postulations?companyID=${job.companyID}&jobID=${job.jobID}`)
      .then((data) => {
        setLoading(false);
        setPostulations(data?.body.data.postulations);
      })
      .catch(() => {
        setError(true);
      });
    setError(false);
  };

  React.useEffect(() => {
    getPostulations();
  }, [open]);

  React.useEffect(() => {
    if (error && activeSection === 'postulation') {
      toast.error('Error al actualizar o traer las postulaciones');
      // NotificationManager.error("Error al actualizar o traer las postulaciones", "code: 500");
      setLoading(false);
    }
  }, [activeSection]);

  const areTherePostulations = postulations.length === 0 && !loading;

  const showPostulations = () => {
    if (areTherePostulations) {
      return <span className="text-sm text-purple300">No hay postulaciones aún...</span>;
    }
    if (loading) {
      return (
        <span className="animate-pulse bg-gradient-to-r from-purple300 via-purple300 to-purple300 bg-clip-text text-sm text-transparent">
          Cargando...
        </span>
      );
    }
    return postulations?.map((applicant) => <CardPostulation key={uuid()} data={applicant} />);
  };

  return (
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
      <div className="flex w-full gap-2 pb-6">
        <figure className="relative -mt-14 ml-8 h-28 w-28">
          <img
            alt="Imagen de la empresa"
            className="h-full w-full rounded-lg"
            src={typeof job.logo === 'string' ? job.logo : job.logo.url || avatar}
          />
        </figure>
        {showActions && (
          <Stack direction="row" alignItems="center" spacing={3} sx={{ marginTop: '0.5rem' }}>
            <div className="flex items-center">
              <Button
                onClick={onAccept}
                className="p-0"
                variant="contained"
                sx={rejectAcceptBtnStyles(palette.success)}
              >
                <MdDone size={20} />
              </Button>
              <span className="text-sm text-purple300">Aceptar</span>
            </div>
            <Stack direction="row" alignItems="center">
              <Button onClick={onReject} className="p-0" variant="contained" sx={rejectAcceptBtnStyles(palette.red300)}>
                <MdClose size={20} />
              </Button>
              <span className="text-sm text-purple300">Rechazar</span>
            </Stack>
          </Stack>
        )}
      </div>
      {/* Tabs */}
      <div className="flex flex-col gap-4">
        <div className="flex px-4">
          <button
            onClick={() => setActiveSection('home')}
            type="button"
            className={`w-36 cursor-pointer border-x-0 border-y-0 border-b-2 border-solid py-4 ${
              activeSection === 'home' ? 'border-purple' : 'border-transparent'
            }  text-black" bg-transparent text-center text-base
                `}
          >
            Información
          </button>
          <button
            onClick={() => {
              setActiveSection('postulation');
            }}
            type="button"
            className={`w-36 cursor-pointer border-x-0 border-y-0 border-b-2 border-solid py-4 ${
              activeSection === 'postulation' ? 'border-purple' : 'border-transparent'
            }  text-black" bg-transparent text-center text-base
                `}
          >
            Postulaciones
          </button>
        </div>
        {activeSection === 'home' && (
          <div className="flex max-w-lg flex-col px-8">
            <h1 className="text-lg font-medium text-purple300">{job?.name}</h1>
            <div className="flex flex-col gap-y-2 pt-2">
              <p
                className='text-[0.75rem] text-purple300 cursor-pointer'
                onClick={() => {
                  navigator.clipboard.writeText(job?.jobID || job?.docID);
                  toast.success('Copiado al portapapeles');
                }}
              >
                {`ID: ${job?.jobID || job?.docID}`}
              </p>
              <div className="flex items-center gap-2">
                <RiLoader3Fill size={22} color={palette.red300} />
                <p className="text-xs text-purple300">
                  {job?.salary?.min && job?.salary?.max
                    ? `$${job?.salary?.min} - ${job?.salary?.max}`
                    : `$${job.salaryWork || job?.salary?.total}`}
                </p>
              </div>
              {(job?.location?.location || job.location || job['Zona de trabajo']) && (
                <div className="flex items-center gap-2">
                  <MdLocationOn size={22} color={palette.red300} />
                  <p className="text-xs text-purple300">
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
        )}
        {activeSection === 'postulation' && (
          <div
            className={`${
              !areTherePostulations && 'flex max-h-[32rem] max-w-7xl flex-wrap justify-between gap-4 overflow-y-auto'
            } p-4`}
          >
            {showPostulations()}
          </div>
        )}
      </div>
    </div>
  );
};

JobAndPostulations.defaultProps = {
  showClose: false,
  showActions: false,
  open: true,
  onClose() {},
  onAccept() {},
  onReject() {},
};

JobAndPostulations.propTypes = {
  showClose: PropTypes.bool,
  showActions: PropTypes.bool,
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  job: PropTypes.shape().isRequired,
  open: PropTypes.bool,
};

export default JobAndPostulations;
