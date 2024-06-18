import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BsWhatsapp, BsPinAngle, BsEyeFill, BsFillEyeSlashFill, BsPersonCircle } from 'react-icons/bs';
import { MdCalendarMonth, MdOutlineFileDownload } from 'react-icons/md';
import { AiFillFacebook } from 'react-icons/ai';
import { CiClock1 } from 'react-icons/ci';
import dayjs from 'dayjs';
import TagsComponent from 'components/Elements/Tags';
import palette from 'styles/palette';
import avatar from 'assets/avatar.png';
import { CircularProgress, Divider } from '@mui/material';
import toast from 'react-hot-toast';
import { TiGroupOutline } from 'react-icons/ti';
import { Viewer as ViewerPDF, Worker } from '@react-pdf-viewer/core';
import { BiErrorCircle } from 'react-icons/bi';
import parseLanguages from './utils';
import { countryToFlag, getCodeCountries } from '../../../utils/functions/getCodeContries';
import Timeline from '../../Elements/Timeline';

const workerUrl = 'https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js';

const ApplicantResume = ({ person, onShowAddress, showMap, setShowMap }) => {
  const [showOtherCV, setShowOtherCV] = useState(false);

  const renderError = (error) => {
    let message = '';
    switch (error.name) {
      case 'InvalidPDFException':
        message = 'El archivo es invalido o esta corrupto.';
        break;
      case 'n':
        message = 'El archivo es invalido o esta corrupto.';
        break;
      case 'MissingPDFException':
        message = 'No hay documento';
        break;
      case 'UnexpectedResponseException':
        message = 'El servidor no responde';
        break;
      default:
        message = 'No se encontró en documento';
        break;
    }
    return (
      <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center">
        <BiErrorCircle size={80} className="text-purple" />
        <p className="mt-[40px] text-base text-purple">Error, algo salió mal.</p>
        <p className="mt-[40px] text-base text-purple">{message}</p>
      </div>
    );
  };

  function addTarget(index) {
    setTimeout(() => {
      try {
        const doc = document.getElementById(`cv-file-id-${index}`);
        if (doc) {
          const atags = doc.getElementsByTagName('a') || [];
          const tagsLength = atags.length;
          for (let item = 0; item < tagsLength; item += 1) {
            atags[item].target = '_blank';
          }
        }
      } catch (error) {
        console.error(error);
      }
    }, 500);
  }

  const onViewDocument = (documentData) => (
    <Worker workerUrl={workerUrl}>
      <ViewerPDF
        fileUrl={documentData?.url}
        // plugins={[defaultLayoutPluginInstance]}
        renderError={(error) => renderError(error)}
        initialPage={1}
        renderLoader={(percentages) => (
          <div className="flex flex-col items-center justify-center">
            <CircularProgress size={80} className="text-purple300" />
            <p>Cargando PDF {`${Math.round(percentages)}%`}</p>
          </div>
        )}
        onDocumentLoad={() => addTarget(documentData?.label)}
      />
    </Worker>
  );

  return (
    <Box
      sx={{
        paddingLeft: '1rem',
        paddingRight: '4rem',
        paddingTop: '2rem',
        paddingBottom: '2.5rem',
        background: palette.gray300,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Stack direction="row" spacing={4} alignItems="center" className="flex flex-row">
        <img src={avatar} alt="candidate-avatar" style={{ width: '120px', height: '120px' }} />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <p className="text-xl">
              {countryToFlag(
                getCodeCountries()?.find(
                  (codFlag) => codFlag?.phoneCode === (person?.codePhone || person?.whatsApp?.codePhone)
                )?.iso2 || 'MX'
              )}
            </p>
            <h1
              onClick={() => {
                navigator.clipboard.writeText(`${person?.names} ${person?.lastNames}`);
                toast.success('Copiado al portapapeles');
              }}
              className="cursor-pointer text-xl font-light"
            >
              {person?.names} {person?.lastNames}
            </h1>
          </div>

          <div className="align-center flex items-center gap-4 ">
            <BsPersonCircle className="w-1/3" fontSize="medium" style={{ width: '20px', color: palette.blackText }} />
            <p
              onClick={() => {
                navigator.clipboard.writeText(person?.docID);
                toast.success('Copiado al portapapeles');
              }}
              className="col-8 align-center w-2/3 cursor-pointer items-center font-founders text-[16px] font-bold tracking-[0.15em]"
            >
              {person?.docID}
            </p>
          </div>

          <div className="flex items-stretch gap-4">
            {person?.dataToAdmin?.birth && (
              <>
                <MdCalendarMonth fontSize="medium" style={{ width: '20px', color: palette.blackText }} />
                <div className="flex items-stretch gap-4">
                  <p className="font-founders text-[16px]">
                    {dayjs(person?.dataToAdmin?.birth).locale('es').format('DD/MMM/YYYY')}
                  </p>
                  <p className="font-founders text-[16px]">{person?.dataToAdmin?.gender?.label}</p>
                </div>
              </>
            )}
          </div>
          {person?.dataToAdmin?.belongingToCommunity?.length && (
            <div className="flex items-stretch gap-4">
              <TiGroupOutline className="w-1/3" fontSize="medium" style={{ width: '20px', color: palette.blackText }} />
              <p className="col-8 align-center w-2/3 cursor-pointer items-center font-founders text-[16px]">
                {person?.dataToAdmin?.belongingToCommunity?.toString()}
              </p>
            </div>
          )}
          {person?.dataToAdmin?.translate && (
            <div className="flex items-stretch gap-4">
              <CiClock1 className="w-1/3" fontSize="medium" style={{ width: '20px', color: palette.blackText }} />
              <p className="col-8 align-center w-2/3 cursor-pointer items-center font-founders text-[16px]">
                {person?.dataToAdmin?.translate} minutos
              </p>
            </div>
          )}
          <div className="flex items-stretch gap-4">
            {showMap && (
              <BsFillEyeSlashFill
                onClick={() => setShowMap(false)}
                cursor="pointer"
                className="w-1/3"
                fontSize="medium"
                style={{ width: '20px', color: palette.blackText }}
              />
            )}
            {!showMap && person?.address && (
              <BsEyeFill
                className="w-1/3"
                fontSize="medium"
                style={{ width: '20px', color: palette.blackText }}
                onClick={() => onShowAddress(person?.address)}
                cursor="pointer"
              />
            )}
            <p
              onClick={() => {
                navigator.clipboard.writeText(person?.address?.address);
                toast.success('Copiado al portapapeles');
              }}
              className="col-8 align-center w-2/3 cursor-pointer items-center font-founders text-[16px]"
            >
              {person?.address?.address}
            </p>
          </div>
          {person?.registerWhitFacebook && person?.phone === '0' ? (
            <div className="flex items-stretch gap-4">
              <AiFillFacebook className="w-1/3" fontSize="medium" style={{ width: '20px', color: palette.blackText }} />
              <p className="col-8 align-center w-2/3 cursor-pointer items-center font-founders text-[16px]">
                Registado con Facebook
              </p>
            </div>
          ) : (
            <div className="flex items-stretch gap-4">
              <BsWhatsapp className="w-1/3" fontSize="medium" style={{ width: '20px', color: palette.blackText }} />
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/${
                  !person?.phone?.toString()?.includes('+') ? person?.whatsApp?.codePhone || 52 : ``
                }${person?.phone}`}
                className=" col-8 align-center w-2/3 cursor-pointer items-center font-founders font-founders text-[16px] text-black no-underline"
              >
                +
                {!person?.phone?.toString()?.includes('+')
                  ? person?.whatsApp?.codePhone || person?.codePhone || 52
                  : ``}{' '}
                {person?.phone}
              </a>
            </div>
          )}
          <TagsComponent person={person} />
          <Timeline person={person} />
          {/*  translate  */}
        </div>
      </Stack>
      {showOtherCV ? (
        <div className="relative flex flex-col items-center justify-center gap-y-4 pt-8">
          <button
            className="cursor-pointer self-start rounded-lg border-none bg-purple px-2 py-1 text-white outline-none"
            type="button"
            onClick={() => setShowOtherCV(false)}
          >
            Mostrar CV Intrare
          </button>
          {person?.documents?.cv?.url?.includes('pdf') &&
            !person?.documents?.cv?.url?.includes('jpeg') &&
            !person?.documents?.cv?.url?.includes('jpg') && (
              <figure className="mx-10 h-full w-full">
                {/* <img src={showDoc?.url} alt={showDoc.label} /> */}
                {onViewDocument(person?.documents?.cv)}
              </figure>
            )}
          <a
            className="absolute bottom-2 right-16 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-none bg-purple text-white outline-none"
            href={person?.documents?.cv?.url}
            rel="noreferrer"
            target="_blank"
          >
            <MdOutlineFileDownload size={20} />
          </a>
          {(person?.documents?.cv?.url?.includes('jpeg') || person?.documents?.cv?.url?.includes('jpg')) && (
            <figure className="mx-10 w-full 2xl:h-[65vh]">
              <img className="w-full" src={person?.documents?.cv?.url} alt={person?.documents?.cv?.label} />
            </figure>
          )}
        </div>
      ) : (
        <Stack
          className="relative min-h-full"
          spacing={0}
          alignItems="stretch"
          direction="row"
          marginTop="2rem"
          width="100%"
        >
          {person?.documents?.cv?.url && (
            <button
              className="absolute top-0 cursor-pointer rounded-lg border-none bg-purple px-2 py-1 text-white outline-none"
              type="button"
              onClick={() => setShowOtherCV(true)}
            >
              Mostrar CV Original
            </button>
          )}
          <Stack alignItems="stretch" width="30%">
            <Stack
              direction="column"
              spacing={2}
              sx={{
                backgroundColor: palette.bgMain,
                padding: '2rem 1rem',
                paddingBottom: '3rem',
                color: palette.blackText,
                minHeight: '100%',
              }}
            >
              <h2 className="text-sm font-medium 2xl:text-base">Contacto</h2>
              <div className="flex items-center gap-x-2">
                <BsWhatsapp fontSize="medium" style={{ width: '20px' }} />
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wa.me/${
                    !person?.phone?.toString()?.includes('+') ? person?.whatsApp?.codePhone || 52 : ``
                  }${person?.phone}`}
                  className="pt-1 font-helvetica text-sm text-black no-underline"
                >
                  {!person?.phone?.toString()?.includes('+')
                    ? person?.whatsApp?.codePhone || person?.codePhone || 52
                    : ``}
                  {person?.phone}
                </a>
              </div>
              <div className="flex cursor-pointer items-center gap-x-2" onClick={() => onShowAddress(person?.address)}>
                <BsPinAngle size={18} />
                <p className="w-4/5 pt-1 font-helvetica text-sm">{person?.address?.address}</p>
              </div>
              {person?.dataToAdmin?.skills && (
                <>
                  <h2 className="text-sm font-medium 2xl:text-base">Habilidades</h2>
                  <div className="flex flex-col">
                    {person?.dataToAdmin?.skills?.map((skill) => (
                      <p key={skill?.value} className="font-helvetica text-sm">
                        {skill?.label}
                      </p>
                    ))}
                  </div>
                </>
              )}
              {person?.dataToAdmin?.languages && (
                <>
                  <h2 className="text-sm font-medium 2xl:text-base">Idiomas Hablados</h2>
                  <div className="flex flex-col">
                    {parseLanguages(person?.dataToAdmin?.languages)?.map((lang) => (
                      <p key={lang?.label} className="font-helvetica text-sm">
                        {`${lang?.label} - ${lang?.level}`}
                      </p>
                    ))}
                  </div>
                </>
              )}
              {(person?.dataToAdmin?.salary?.label || person?.dataToAdmin?.salaryMinimum) && (
                <>
                  <h2 className="text-sm font-medium 2xl:text-base">Salario mínimo</h2>
                  <div className="flex flex-col">
                    <p className="textsm font-helvetica">
                      {person?.dataToAdmin?.salary?.label || person?.dataToAdmin?.salaryMinimum}
                    </p>
                  </div>
                </>
              )}
              {person?.dataToAdmin?.translate && (
                <>
                  <h2 className="text-sm font-medium 2xl:text-base">Tiempo de traslado</h2>
                  <div className="flex flex-col">
                    <p className="textsm font-helvetica">{person?.dataToAdmin?.translate} minutos</p>
                  </div>
                </>
              )}
            </Stack>
          </Stack>
          <div className="w-4/5 bg-white">
            <div className="ml-4 flex w-[87%] flex-col gap-4 px-4 pt-6">
              <h1 className="text-2xl font-medium">
                {person?.names} {person?.lastNames}
              </h1>
              <div className="flex flex-col gap-2 pt-6">
                <div>
                  <h2 className="text-sm font-medium">Experiencia previa</h2>
                  <Divider className="py-1" />
                </div>
                {!person?.dataToAdmin?.experienceIndustrias?.length && (
                  <Typography component="p" fontSize="0.8rem">
                    Sin experiencia
                  </Typography>
                )}
                {person?.dataToAdmin?.experienceIndustrias?.map((experience) => (
                  <div key={experience?.label}>
                    <div className="flex items-center justify-between">
                      <h3 className="w-2/3 font-helvetica text-base font-medium xl:w-3/4">{experience?.label}</h3>
                      <span className="w-1/3 self-start font-helvetica text-sm xl:w-1/4">
                        {`${experience?.year && experience?.year > 0 ? `${experience?.year} años` : ''} ${
                          experience?.month && experience?.month > 0 ? `${experience?.month} meses` : ''
                        }`}
                      </span>
                    </div>
                    {experience?.details && (
                      <Typography component="p" fontSize="0.8rem">
                        {experience?.details}
                      </Typography>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 pt-6">
                <div>
                  <h2 className="text-sm font-medium">Educacion maxima</h2>
                  <Divider className="py-1" />
                </div>
                <div>
                  <h3 className="font-helvetica text-sm font-medium 2xl:text-base">{person?.grade?.label}</h3>
                  <p className="font-helvetica text-xs">{person?.grade?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </Stack>
      )}
    </Box>
  );
};

ApplicantResume.defaultProps = {
  showMap: false,
  setShowMap() {},
};

ApplicantResume.propTypes = {
  showMap: PropTypes.bool,
  setShowMap: PropTypes.func,
  person: PropTypes.shape().isRequired,
  onShowAddress: PropTypes.func.isRequired,
};

export default ApplicantResume;
