import React, { useState } from 'react';
import DefaultLogoIntrare from 'assets/intrareLogotipo.png'; // Asegúrate de que la ruta es correcta
import dayjs from 'dayjs';
import { Divider } from '@mui/material';
import WatchVacancySidebar from './WatchVacancySidebar'; // Asegúrate de que la ruta es correcta

const Postulation = ({ postulation, keyData }) => {
  const [showVacancy, setShowVacancy] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-white px-4 py-4" key={keyData}>
      <div className="relative flex items-center gap-3">
        <div className="flex items-center gap-4">
          <img
            className="h-20 w-20 rounded-lg object-contain object-center"
            alt="Logo de la empresa"
            src={postulation?.company?.logo?.url || postulation?.company?.logo || DefaultLogoIntrare}
          />
          <div className="flex w-[90%] flex-col gap-y-1 pt-4">
            <h1 onClick={() => setShowVacancy(true)} className="w-64 cursor-pointer text-base font-medium">
              {postulation?.job?.name}
            </h1>
            {postulation?.job?.salary?.type === 'range' && (
              <p className="text-xs font-medium">
                ${postulation?.job?.salary?.min} - ${postulation?.job?.salary?.max}
              </p>
            )}
            {postulation?.job?.salary?.type === 'exact' && (
              <p className="text-xs font-medium">${postulation?.job?.salary?.total || 0}</p>
            )}
            {typeof postulation?.job?.salary === 'number' && (
              <p className="text-xs font-medium">${postulation?.job?.salary || 0}</p>
            )}
            <p>
              {/* Ubicación: {} */}
              {postulation?.['Zona de trabajo'] || typeof postulation?.job?.location === 'string'
                ? postulation?.job?.location
                : postulation?.job?.location?.location || ''}
            </p>
            <div className="flex justify-center py-2">
              <p className="w-max rounded-full bg-purple px-10 py-1.5 text-center text-sm text-white">Postulado</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-3 text-[0.8rem]">
          <span>
            Publicado hace {postulation?.createdAt ? dayjs().diff(dayjs(postulation?.createdAt), 'days') : '0'} días
          </span>
        </div>
      </div>
      <Divider className="-mx-4 pb-4" />
      <WatchVacancySidebar showVacancy={showVacancy} setShowVacancy={setShowVacancy} match={postulation} />
    </div>
  );
};

export default Postulation;
