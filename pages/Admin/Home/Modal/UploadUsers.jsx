import React, { useState } from 'react';
import ModalBuilder from 'components/Elements/Modal';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as XLSX from 'xlsx';
import { ImArrowUp } from 'react-icons/im';
import palette from 'styles/palette';
import CommonButton from 'components/pages/Home/Profile/CommonButton';
import { urlBase } from 'utils/environment';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';

const UploadUsers = ({ openUploadModal, setUploadModal }) => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const drop = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [vacanciesFile, setVacanciesFile] = useState([]);

  const vacancy = {
    vacancyID: 'ID Vacante',
    companyName: 'Empresa',
    companyID: 'ID Empresa',
    name: 'Nombre de la vacante',
    belongingToCommunity:
      'Tipo de Vulnerabilidad (en caso de que acepten) PCD (motriz, auditiva, visual, intelectual o psicosocial), Comunidad LGBTTTIQA, Joven sin experiencia laboral, Madre o padre soltero(a) sin pareja, al cuidado de hijos, Persona a cargo de persona adulta mayor, Persona a cargo de persona con discapacidad, Persona adulta mayor (mayor de 50 años), Persona con rezago educativo, Persona liberada, Persona migrante, Persona refugiada, Persona sobreviviente de alguna enfermedad catastrófica, Persona víctima de trata y trabajo forzado',
    salaryWork: 'Sueldo mensual',
    benefitsWork: 'Prestaciones',
    workingHours: 'Horas a laborar',
    turnWork: 'Turno(s)',
    daysWork: 'Días laborales',
    functions: 'Funciones o actividades a realizar',
    educationWork: 'Escolaridad mínima requerida',
    languagesWork: 'Idioma requerido',
    status: 'Estatus',
    location: 'Zona de trabajo (Alcaldia)',
    salaryScheme: 'Esquema de contratación',
  };

  const getValidStatus = (status) => {
    switch (status) {
      case 'Active':
      case 'Activa':
      case 'active':
        return 'active';
      case 'Inactive':
      case 'Inactiva':
      case 'inactive':
        return 'inactive';
      case 'Closed':
      case 'Cerrada':
      case 'closed':
        return 'closed';
      case 'Paused':
      case 'Pausada':
      case 'paused':
        return 'paused';
      default:
        return status;
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(event?.target?.files?.length ? event?.target?.files : null);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const headers = jsonData[0];
        const modifiedHeaders = headers.map((header) => {
          let modifiedHeader = header.trim();
          modifiedHeader = modifiedHeader.replace(/["':]/g, '');
          modifiedHeader = modifiedHeader.replace(/\s+/g, ' ');
          return modifiedHeader;
        });

        const data = jsonData
          .slice(1)
          .map((row) => {
            const obj = {};
            modifiedHeaders.forEach((header, index) => {
              const cellValue = row[index];
              if (cellValue !== undefined && cellValue !== null && cellValue !== '') {
                obj[header] = cellValue;
              }
            });
            return obj;
          })
          .filter((obj) => Object.keys(obj).length > 0)
          .map((obj) => {
            const { Empresa, Prestaciones, Estatus } = obj;
            const {
              name,
              vacancyID,
              salaryWork,
              turnWork,
              functions,
              educationWork,
              languagesWork,
              daysWork,
              workingHours,
              belongingToCommunity,
              companyID,
              location,
              salaryScheme,
            } = vacancy;
            const transformedObj = {
              vacancyID: obj[vacancyID] || '',
              companyName: Empresa || '',
              companyID: obj[companyID]?.toString() || '',
              salaryWork: obj[salaryWork] || '',
              name: obj[name] || '',
              belongingToCommunity: obj[belongingToCommunity] || '',
              benefitsWork: Prestaciones || '',
              workingHours: obj[workingHours] || '',
              turnWork: obj[turnWork] || '',
              daysWork: obj[daysWork] || '',
              functions: obj[functions] || '',
              educationWork: obj[educationWork] || '',
              languagesWork: obj[languagesWork] || '',
              status: getValidStatus(Estatus || ''),
              location: obj?.[location] || '',
              salaryScheme: obj?.[salaryScheme] || '',
            };
            return transformedObj;
          });
        setVacanciesFile(data);
      } catch (error) {
        console.error('Error al leer el archivo:', error);
      }
    };

    if (file) {
      reader.readAsBinaryString(file);
    } else {
      console.error('No se ha seleccionado ningún archivo.');
    }
  };

  const handleDragOver = (e) => {
    setDragging(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload({ target: { files: [file] } });
    }
    setDragging(false);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const uploadVacancies = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const url = '/aperture/upload-vacancies';
      const saveVacancies = await axios.request({
        url,
        method: 'POST',
        baseURL: urlBase,
        data: {
          vacancies: vacanciesFile,
        },
      });
      toast.success(saveVacancies?.data?.body?.message);
      setLoading(false);
      setUploadModal(false);
    } catch (e) {
      toast.error('Ha habido un error subiendo las vacantes');
      setUploadModal(false);
      setLoading(false);
    }
  };

  return (
    <ModalBuilder
      withoutFooter
      noCancel
      title="Subir excel"
      open={openUploadModal}
      onClose={() => setUploadModal(false)}
      height="auto"
      width="46rem"
    >
      <form onSubmit={uploadVacancies} className="flex flex-col items-center gap-4">
        <div className="flex w-full max-w-lg items-center justify-between py-4 text-sm">
          {/* <CloseOutline className='cursor-pointer' onClick={() => setUploadModal(false)} size={20} /> */}
        </div>
        {loading ? (
          <div className="relative m-auto flex h-[200px] w-full max-w-lg items-center justify-center overflow-hidden rounded-lg bg-gray100">
            <CircularProgress className="text-purple" />
          </div>
        ) : (
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            ref={drop}
            className="relative m-auto flex h-[200px] w-full max-w-lg cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray100"
          >
            <div className="absolute cursor-pointer">
              {file === null ? (
                <div className="flex items-center gap-2">
                  {dragging ? (
                    <>
                      <ImArrowUp size={30} color={palette.purple300} />
                      <span className="text-sm text-purple300">Suelta archivo</span>
                    </>
                  ) : (
                    <>
                      <ImArrowUp size={30} color={palette.purple300} />
                      <span className="text-sm text-purple300">Subir archivo</span>
                    </>
                  )}
                </div>
              ) : (
                <span className="text-center text-sm text-black">{file[0]?.name || file?.name}</span>
              )}
            </div>
            <input
              onChange={handleFileUpload}
              className="h-full w-auto cursor-pointer text-purple300 opacity-0"
              type="file"
              accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/csv"
            />
          </div>
        )}
        <CommonButton disabled={loading} text="Subir" type="submit" />
      </form>
    </ModalBuilder>
  );
};

export default UploadUsers;
