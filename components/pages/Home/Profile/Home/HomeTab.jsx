import React, { useEffect, useState } from 'react';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';
import palette from 'styles/palette';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { CircularProgress, Divider } from '@mui/material';
import { Error } from '@mui/icons-material';
import { Viewer as ViewerPDF, Worker } from '@react-pdf-viewer/core';
import DownloadIcon from '@mui/icons-material/Download';
import CommonButton from '../CommonButton';
import CommonChip from '../CommonChip';
import CVSidebar from './HomeTab/CVSidebar';

const workerUrl = 'https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js';

const BpIcon = styled('span')(() => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  backgroundColor: '#f5f8fa',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: `2px auto ${palette.purple300}`,
    outlineOffset: 2,
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: `radial-gradient(${palette.purple300},${palette.purple300} 28%,transparent 32%)`,
    content: '""',
  },
});

const HomeTab = (args) => {
  const { data = {}, setMatches } = args;
  const levels = [
    { label: 'Básico', levels: [1, 2] },
    { label: 'Conversacional', levels: [3, 4] },
    { label: 'Nativo', levels: [5] },
  ];
  const [selected, setSelected] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [cvSid, setCvSid] = useState(data);
  const generalData = data?.dataToAdmin;
  const setDefaultValues = () => {
    try {
      const defaultSelected = {};
      generalData?.languages.forEach((language) => {
        const rating = language.rating || 1;
        const selectedLevel = levels.find((level) => level.levels.includes(rating));
        defaultSelected[language.label] = {
          label: selectedLevel.label,
          checked: true,
        };
      });
      setSelected(defaultSelected);
    } catch (e) {
      // console.log(e);
      toast.error('Error al momento de filtrar los idiomas');
    }
  };

  // Establecer los valores por defecto al montar el componente
  useEffect(() => {
    if (generalData?.languages) {
      setDefaultValues();
    }
  }, [generalData?.languages]);
  // Función para manejar el cambio de los niveles checkeados
  const handleChange = (event, language) => {
    setSelected({
      ...selected,
      [language.label]: {
        label: event.target.value,
        checked: event.target.checked,
      },
    });
  };
  const [showCV, setShowCV] = useState(false);
  useEffect(() => {
    setMatches((data?.matches?.length || 0) + (data?.invitations?.length || 0));
  }, [data]);

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
        <Error size={80} className="text-purple" />
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

  const onViewDocument = () => {
    const validUrl =
      /[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/;
    if (validUrl.test(data?.documents?.hasDocuments?.url)) {
      return (
        <Worker workerUrl={workerUrl}>
          {/* {console.log(defaultLayoutPluginInstance)} */}
          <ViewerPDF
            fileUrl={data?.documents?.hasDocuments?.url}
            // plugins={[defaultLayoutPluginInstance]}
            renderError={(error) => renderError(error)}
            initialPage={0}
            renderLoader={(percentages) => (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <CircularProgress size={80} className="text-purple300" />
                <p>Cargando PDF {`${Math.round(percentages)}%`}</p>
              </div>
            )}
            onDocumentLoad={() => addTarget(data?.documents?.hasDocuments?.name)}
          />
        </Worker>
      );
    }
    return <p> {data?.documents?.hasDocuments?.url} </p>;
  };

  const getStepIncomplete = () => {
    if (!data?.isComplete) {
      switch (data?.lastStepRegister) {
        case 1:
          return 'Nombres / Apellidos';
        case 2:
          return 'Selección WhatsApp/Facebook';
        case 3:
          return 'País de origen / Dirección';
        case 4:
          return 'Fecha de nacimiento';
        case 5:
          return 'Género';
        case 6:
          return 'Máximo nivel de estudios';
        case 7:
          return 'Idiomas';
        case 8:
          return 'Expectativa económica';
        case 9:
          return 'Residencia permanente';
        case 10:
          return 'TRVH';
        case 11:
          return 'Cita en COMAR';
        case 12:
          return 'Documentos que tiene';
        case 13:
          return 'RFC';
        case 14:
          return 'Número de seguridad social';
        case 15:
          return 'CURP';
        case 16:
          return 'Cómo te enteraste de Intrare';
        default:
          return '';
      }
    }
    return null;
  };

  return (
    <>
      {showCV && <CommonButton onClick={() => setShowCV(false)} width="9.5rem" text="Esconder CV" />}
      {!showCV && <CommonButton onClick={() => setShowCV(true)} width="9.5rem" text="Mostrar CV" />}
      <div className="mt-3 flex flex-col gap-4 2xl:mt-4">
        <h2 className="text-lg font-medium text-purple300 2xl:text-xl">Información Personal</h2>
        <div className="grid-rows-auto grid w-full grid-cols-4 gap-x-5 gap-y-2 rounded-lg bg-white px-6 py-4 xl:w-[720px] 2xl:w-1/2 2xl:gap-y-4">
          <div>
            <label className="text-sm">Signed up</label>
            <p className="pt-0.5 font-founders text-sm">
              {dayjs(data?.createdAt || 0)
                .locale('es')
                .format('DD/MMMM/YYYY')}
            </p>
          </div>
          <div>
            <label className="text-sm">Referido Por</label>
            {(data?.origin || data?.origin?.value) && (
              <p className="pt-0.5 font-founders text-sm">
                {typeof data?.origin === 'string'
                  ? data?.origin
                  : data?.origin?.value?.value?.toString() || data?.origin?.value?.toString() || ''}
              </p>
            )}
            {!data?.origin && !data?.origin?.value && !data?.isComplete && data?.lastStepRegister <= 16 && (
              <p className="pt-0.5 font-founders text-sm">
                No terminó paso {data?.lastStepRegister} | {getStepIncomplete()}
              </p>
            )}
            {!data?.origin && !data?.origin?.value && data?.isComplete && (
              <p className="pt-0.5 font-founders text-sm">Otro</p>
            )}
          </div>
          {/* <div> */}
          {/*  <label className="text-sm">Estado civil</label> */}
          {/*  <p className="pt-0.5 font-founders text-sm">{generalData?.married?.label}</p> */}
          {/* </div> */}
          <div>
            <label className="text-sm">Educación máxima</label>
            <p className="pt-0.5 font-founders text-sm">
              {data?.grade?.label ||
                `No terminó paso ${data?.lastStepRegister || 'desconocido'} | ${getStepIncomplete()}`}
            </p>
          </div>
          <div
            className={`col-span-4 ${
              data?.dataToAdmin?.belongingToCommunity?.includes('LGBTQI+') ? 'xl:col-span-2' : 'xl:col-span-4'
            }`}
          >
            <label className="text-sm">Grupo(s) perteneciente</label>
            <p className="pt-0.5 font-founders text-sm">
              {data?.dataToAdmin?.belongingToCommunity?.toString() ||
                `No terminó paso ${data?.lastStepRegister || 'desconocido'} | ${getStepIncomplete()}`}
            </p>
          </div>
          {data?.dataToAdmin?.belongingToCommunity?.includes('LGBTQI+') && (
            <div className="col-span-4 xl:col-span-2">
              <label className="text-sm">Nombre preferido</label>
              <p className="pt-0.5 font-founders text-sm">{data?.isComplete ? data?.alias : ''}</p>
              <p className="pt-0.5 font-founders text-sm">{!data?.isComplete && data?.alias && data?.alias}</p>
            </div>
          )}
          <div className="col-span-1 xl:col-span-2">
            <div className="pb-2">
              <label className="h-6 text-sm">Dependientes</label>
              <Divider className="h-1 w-full" />
            </div>
            <div className="flex flex-wrap gap-2">
              {data?.dataToAdmin?.relationOfMe?.length > 0 &&
                data?.dataToAdmin?.relationOfMe?.map((relation) => (
                  <CommonChip key={relation?.value} color="#cfcfcf" title={relation?.label} />
                ))}
              {data?.isComplete && data?.dataToAdmin?.relationOfMe?.length === 0 && (
                <CommonChip color="#cfcfcf" title="Sin dependientes" />
              )}
            </div>
          </div>
          <div className="col-span-3 xl:col-span-2">
            <div className="pb-2">
              <label className="h-6 text-sm">Idiomas hablados</label>
              <Divider className="h-1 w-60" />
            </div>
            <div className="flex flex-col gap-2">
              {generalData?.languages?.length > 0 &&
                generalData?.languages?.map((lenguage) => (
                  <div
                    key={lenguage?.label}
                    className="flex w-full flex-col items-center gap-3 rounded-2xl bg-gray px-2 py-0 lg:flex-row"
                  >
                    <p className="text-xs">{lenguage?.label}</p>
                    <div className="flex flex-row items-center justify-center">
                      {levels?.map((level) => (
                        <div className="flex items-center text-sm" key={level?.label}>
                          <Radio
                            key={level.label}
                            checked={
                              selected[lenguage.label]?.label === level.label && selected[lenguage.label]?.checked
                            }
                            onChange={(event) => handleChange(event, lenguage)}
                            value={level.label}
                            name={`radio-buttons-${lenguage.label}`}
                            inputProps={{ 'aria-label': level.label }}
                            sx={{
                              '&.Mui-checked': {
                                color: palette.purple300,
                              },
                            }}
                            checkedIcon={<BpCheckedIcon />}
                            icon={<BpIcon />}
                            disabled
                          />
                          <label className="text-[10px]">{level?.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              {data?.isComplete && generalData?.languages?.length === 0 && (
                <CommonChip color="#cfcfcf" title="No respondió" />
              )}
              {!data?.isComplete && generalData?.languages?.length === 0 && (
                <CommonChip
                  color="#cfcfcf"
                  title={`No terminó paso ${data?.lastStepRegister} | ${getStepIncomplete()}`}
                />
              )}
            </div>
          </div>
        </div>
        <h2 className="text-lg font-medium text-purple300 2xl:text-xl">Información Laboral</h2>
        <div className="grid-rows-auto grid w-full grid-cols-4 gap-x-5 gap-y-2 rounded-lg bg-white px-6 py-4 xl:w-[720px] 2xl:w-1/2 2xl:gap-y-4">
          <div className="col-start-1 col-end-5 flex w-full justify-start gap-6 2xl:gap-12">
            {/* <div> */}
            {/*  <label className="text-sm">Tiempo de traslado</label> */}
            {/*  {generalData?.translate && ( */}
            {/*    <p className="pt-0.5 font-founders text-sm">{generalData?.translate} minutos</p> */}
            {/*  )} */}
            {/*  {!generalData?.translate && ( */}
            {/*    <p className="pt-0.5 font-founders text-sm"> */}
            {/*      No terminó paso {data?.lastStepRegister} | {getStepIncomplete()} */}
            {/*    </p> */}
            {/*  )} */}
            {/* </div> */}
            <div>
              <label className="text-sm">Salario mínimo deseado</label>
              <p className="pt-0.5 font-founders text-sm">
                {generalData?.salary?.label &&
                  `${generalData?.salary?.label} ${generalData?.salaryMinimumCurrency?.label}`}

                {generalData?.salaryMinimum &&
                  !generalData?.salary &&
                  `${generalData?.salaryMinimum} ${generalData?.salaryMinimumCurrency?.label || 'MXN'}`}
                {!generalData?.salary && !generalData?.salaryMinimum && (
                  <p className="pt-0.5 font-founders text-sm">
                    No terminó paso {data?.lastStepRegister || 'desconocido'} | {getStepIncomplete()}
                  </p>
                )}
              </p>
            </div>
          </div>
          <Divider className="col-span-4 w-full" />
          {/* Here2 */}
          <div className="col-span-2">
            <div>
              <label className="text-sm">Experiencia previa</label>
              <Divider className="pt-2" />
            </div>
            {generalData?.experienceIndustrias !== undefined ? (
              generalData?.experienceIndustrias.map((experience) => (
                <div>
                  {experience?.description !== 'No experiencia' || experience?.value !== 'No experiencia' ? (
                    <>
                      <div className="flex items-center justify-between gap-4 pt-2">
                        <h2 className="w-2/3 font-founders text-sm font-medium 2xl:w-3/4">{experience?.label}</h2>
                        <span className="w-1/3 font-founders text-xs 2xl:w-1/4">
                          {experience?.year} {experience?.year === 1 ? 'año' : 'años'} {experience?.month}{' '}
                          {experience?.month === 1 ? 'mes' : 'meses'}
                        </span>
                      </div>
                      <p className="font-founders text-xs">{experience?.description}</p>
                    </>
                  ) : (
                    <p className="font-founders text-sm">Sin experiencia</p>
                  )}
                </div>
              ))
            ) : (
              <p className="font-founders text-sm">Sin experiencia</p>
            )}
            {generalData?.withoutExperiences && <p className="font-founders text-sm">Sin experiencia</p>}
            {!generalData?.experienceIndustrias?.length && !data?.isComplete && data?.lastStepRegister <= 11 && (
              <p className="font-founders text-sm">
                No terminó paso {data?.lastStepRegister} | {getStepIncomplete()}
              </p>
            )}
            {!generalData?.experienceIndustrias?.length &&
              !data?.isComplete &&
              data?.lastStepRegister > 11 &&
              !generalData?.withoutExperiences && <p className="font-founders text-sm">Sin experiencia</p>}
            {!generalData?.experienceIndustrias?.length &&
              data?.isComplete &&
              !data?.lastStepRegister &&
              !generalData?.withoutExperiences && <p className="font-founders text-sm">Sin experiencia</p>}
          </div>
          <div className="col-span-2">
            <label className="text-sm">Habilidades duras</label>
            <div className="flex flex-col gap-4">
              {generalData?.skills?.length !== 0 ? (
                generalData?.skills?.map((skill) => (
                  <div className="w-auto max-w-[185px]">
                    <CommonChip color="#cfcfcf" title={skill?.label} />
                  </div>
                ))
              ) : (
                <p className="font-founders text-sm">Sin experiencia</p>
              )}
              {!generalData?.skills?.length && data?.isComplete && (
                <p className="font-founders text-sm">No hay skills para mostrar:(</p>
              )}
              {!generalData?.skills?.length && !data?.isComplete && (
                <p className="font-founders text-sm">No hay skills para mostrar:(</p>
              )}
            </div>
          </div>
        </div>
        {(data?.dataToAdmin?.belongingToCommunity?.includes('Refugiado') ||
          data?.dataToAdmin?.belongingToCommunity?.includes('Migrante')) && (
          <>
            <h2 className="text-lg font-medium text-purple300 2xl:text-xl">Información Migratoria</h2>
            <div className="flex w-full flex-col gap-x-5 gap-y-2 rounded-lg bg-white px-6 py-4 xl:w-[720px] 2xl:w-1/2 2xl:gap-y-4">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <div className="flex flex-col gap-2">
                  <p className="text-sm">¿Tiene residencia?</p>
                  {(data?.documents?.hasDocuments?.details?.resident || data?.resident) && (
                    <p className="w-32 rounded-full bg-green py-1 text-center text-sm text-white">Sí</p>
                  )}
                  {!data?.documents?.hasDocuments?.details?.resident &&
                    !data?.resident &&
                    (data?.isComplete || data?.isFromPrototype) && (
                      <p className="w-32 rounded-full bg-pink px-3 py-1 text-center text-sm text-black">No</p>
                    )}
                  {!data?.documents?.hasDocuments?.details?.resident &&
                    !data?.resident &&
                    (!data?.isComplete || !data?.isFromPrototype) &&
                    data?.lastStepRegister > 9 && (
                      <p className="w-32 rounded-full bg-pink px-3 py-1 text-center text-sm text-black">No</p>
                    )}
                  {!data?.documents?.hasDocuments?.details?.resident &&
                    !data?.resident &&
                    data?.lastStepRegister <= 9 &&
                    (!data?.isComplete || !data?.isFromPrototype) && (
                      <p className="w-max rounded-full bg-pink px-3 py-1 text-center text-sm text-black">
                        No terminó paso {data?.lastStepRegister} | {getStepIncomplete()}
                      </p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm">¿Tiene TRVH?</p>
                  {(data?.partial
                    ? data?.partial === true
                    : data?.documents?.hasDocuments?.details?.partial === true) && (
                    <p className="w-32 rounded-full bg-green py-1 text-center text-sm text-white">Sí</p>
                  )}
                  {data?.partial
                    ? !data?.partial
                    : !data?.documents?.hasDocuments?.details?.partial &&
                      (data?.isComplete || data?.isFromPrototype) && (
                        <p className="w-32 rounded-full bg-pink py-1 text-center text-sm text-black">No</p>
                      )}
                  {data?.partial
                    ? !data?.partial
                    : !data?.documents?.hasDocuments?.details?.partial &&
                      (!data?.isComplete || !data?.isFromPrototype) &&
                      data?.lastStepRegister > 10 && (
                        <p className="w-32 rounded-full bg-pink py-1 text-center text-sm text-black">No</p>
                      )}
                  {/* {data?.documents?.hasDocuments?.status && */}
                  {/*  !data?.documents?.hasDocuments?.details?.partial && */}
                  {/*  !data?.partial && */}
                  {/*  data?.isComplete && ( */}
                  {/*    <p className="w-32 py-1 text-sm text-center text-black rounded-full bg-pink">No3</p> */}
                  {/*  )} */}
                  {/* {(!data?.documents?.hasDocuments?.status || */}
                  {/*  data?.documents?.hasDocuments?.status === 'necesito ayuda') && */}
                  {/*  !data?.partial && */}
                  {/*  data?.lastStepRegister > 19 && ( */}
                  {/*    <p className="w-32 py-1 text-sm text-center text-black rounded-full bg-pink">No4</p> */}
                  {/*  )} */}
                  {(!data?.partial || !data?.documents?.hasDocuments?.details?.partial) &&
                    data?.lastStepRegister <= 10 && (
                      <p className="w-max rounded-full bg-pink px-3 py-1 text-center text-sm text-black">
                        No terminó paso {data?.lastStepRegister} | {getStepIncomplete()}
                      </p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm">¿Tiene cita en COMAR?</p>
                  {data?.dataToAdmin?.dateRequestComar && (
                    <p className="text-blakc w-32 rounded-full bg-gray py-1 text-center text-sm">
                      {new Date(data?.dataToAdmin?.dateRequestComar)?.toISOString().slice(0, 10)}
                    </p>
                  )}
                  {!data?.dataToAdmin?.dateRequestComar && (data?.isComplete || data?.isFromPrototype) && (
                    <p className="w-32 rounded-full bg-gray px-3 py-1 text-center text-sm text-black">N/A</p>
                  )}
                  {!data?.dataToAdmin?.dateRequestComar &&
                    (!data?.isComplete || !data?.isFromPrototype) &&
                    data?.lastStepRegister <= 11 && (
                      <p className="w-max rounded-full bg-gray px-3 py-1 text-center text-sm text-black">
                        No terminó paso {data?.lastStepRegister} | {getStepIncomplete()}
                      </p>
                    )}
                  {!data?.dataToAdmin?.dateRequestComar &&
                    (!data?.isComplete || !data?.isFromPrototype) &&
                    data?.lastStepRegister > 11 && (
                      <p className="w-32 rounded-full bg-gray px-3 py-1 text-center text-sm text-black">N/A</p>
                    )}
                </div>
              </div>
              <Divider />
              {data?.documents?.hasDocuments && data?.documents?.hasDocuments?.ext === 'pdf' && (
                <div className="flex h-full w-1/2 self-center">
                  <figure className="relative h-full w-full">
                    {/* <img src={showDoc?.url} alt={showDoc.label} /> */}
                    {onViewDocument()}
                    <p
                      onClick={() => {
                        const url = data?.documents?.hasDocuments?.url;
                        window.open(url, '_blank');
                      }}
                      className="absolute bottom-1 right-5 z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-black"
                    >
                      <DownloadIcon sx={{ color: 'white' }} fontSize="medium" />
                    </p>
                  </figure>
                </div>
              )}
              {data?.documents?.hasDocuments &&
                (data?.documents?.hasDocuments?.ext === 'jpeg' || data?.documents?.hasDocuments?.ext === 'jpg') && (
                  <div className="flex h-full w-full">
                    <figure className="relative flex h-full w-full items-center justify-center">
                      <img
                        className="h-full w-[20rem]"
                        src={data?.documents?.hasDocuments?.url}
                        alt={data?.documents?.hasDocuments.name}
                      />
                    </figure>
                  </div>
                )}
            </div>
          </>
        )}
      </div>
      <CVSidebar showCV={showCV} setShowCV={setShowCV} data={data} />
    </>
  );
};

export default HomeTab;
