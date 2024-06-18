import { MdOutlineDiversity3 } from 'react-icons/md';
import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getAnalyticsVacancyAndUsersSegments,
  getAnalyticsVacancyBySegment,
  getAnalyticsVacancyResponse,
  getCompanies,
  getVacancies,
} from '../../../../services/analytics';

const StackedChart = React.lazy(() => import('../components/Charts/StackedColumns'));

const CompanyAnalytics = ({ range, typeOfGraphs }) => {
  const { data: vacancyBySegment, isLoading: loadingVacancyBySegment } = useQuery({
    queryFn: () => getAnalyticsVacancyBySegment({ ...range, type: typeOfGraphs }),
    queryKey: ['getVacancyBySegment', range, typeOfGraphs],
  });

  const { data: vacancyAndUsersSegment, isLoading: loadingVacancyAndUsersSegments } = useQuery({
    queryFn: () => getAnalyticsVacancyAndUsersSegments(),
    queryKey: ['getVacancyAndUsersSegments'],
  });

  const [idCompany, setIdCompany] = useState('');
  const [idVacancy, setIdVacancy] = useState('');

  const { data: companies, isLoading: loadingCompanies } = useQuery({
    queryFn: () => getCompanies(),
    queryKey: ['companiesAnalytics'],
  });

  const { data: vacancies, isLoading: loadingVacancies } = useQuery({
    queryFn: () => getVacancies({ idCompany }),
    queryKey: ['vacanciesAnalytics', idCompany],
  });

  const { data: vacanciesResponse, isLoading: loadingVacanciesResponse } = useQuery({
    queryFn: () => getAnalyticsVacancyResponse({ idCompany, idVacancy }),
    queryKey: ['vacanciesResponse', idCompany, idVacancy],
  });

  return (
    <div className="grid grid-cols-2 gap-x-2 pb-4 pt-8">
      <div className="col-span-1 flex h-[500px] w-full flex-col rounded-2xl bg-white px-4 py-2 drop-shadow-lg">
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">Vacantes por segmento</p>
            <p className="text-sm">Cantidad de vacantes</p>
          </div>
        </div>
        {loadingVacancyBySegment && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {!vacancyBySegment?.data?.length && !loadingVacancyBySegment && (
          <p className="text-base">Ups, parece que no hay información acerca de esto</p>
        )}
        {(typeOfGraphs === 1 || typeOfGraphs === 5 || typeOfGraphs === 6) &&
          vacancyBySegment?.data?.length &&
          !loadingVacancyBySegment && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Segmento</td>
                  <td className="py-2 text-center font-sans text-base">Total</td>
                </tr>
              </thead>
              <tbody>
                {vacancyBySegment.data?.map((item, index) => (
                  <tr key={`${item?.value + item?.segment + index}`} className="bg-gray100 text-sm">
                    <td className="text-center font-sans text-lg">{item?.segment}</td>
                    <td className="text-center font-sans text-lg">{item?.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        {typeOfGraphs === 2 && vacancyBySegment?.data?.length && !loadingVacancyBySegment && (
          <React.Suspense fallback="cargando...">
            <StackedChart data={vacancyBySegment?.data || []} seriesToMake={vacancyBySegment?.series || []} />
          </React.Suspense>
        )}
        {typeOfGraphs === 3 && vacancyBySegment?.data?.length && !loadingVacancyBySegment && (
          <React.Suspense fallback="cargando...">
            <StackedChart data={vacancyBySegment?.data || []} seriesToMake={vacancyBySegment?.series || []} />
          </React.Suspense>
        )}
        {typeOfGraphs === 4 && vacancyBySegment?.data?.length && !loadingVacancyBySegment && (
          <React.Suspense fallback="cargando...">
            <StackedChart data={vacancyBySegment?.data || []} seriesToMake={vacancyBySegment?.series || []} />
          </React.Suspense>
        )}
      </div>
      <div className="col-span-2 mt-4 flex h-[500px] w-full flex-col rounded-2xl bg-white px-4 py-2 drop-shadow-lg">
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">Balance de mercado</p>
          </div>
        </div>
        {loadingVacancyAndUsersSegments && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {vacancyAndUsersSegment?.data?.userSegments?.length === 0 &&
          vacancyAndUsersSegment?.data?.vacanciesSegment?.length === 0 &&
          !loadingVacancyAndUsersSegments && (
            <p className="text-base">Ups, parece que no hay información acerca de esto</p>
          )}
        {vacancyAndUsersSegment?.data?.userSegments?.usersData?.length !== 0 &&
          vacancyAndUsersSegment?.data?.vacanciesSegment?.length !== 0 &&
          !loadingVacancyAndUsersSegments && (
            <div className="flex gap-x-8">
              <div className="w-full px-4">
                <p className="pb-2 text-base">Cantidad de usuarios por segmento</p>
                <table className="w-full">
                  <thead className="bg-cream">
                    <tr>
                      <td className="py-2 text-center font-sans text-base">Segmento</td>
                      <td className="py-2 text-center font-sans text-base">Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    {vacancyAndUsersSegment.data?.usersSegments?.usersData?.map((item, index) => (
                      <tr key={`${item?.usersSegment + index}`} className="bg-gray100 text-sm">
                        <td className="text-center font-sans text-lg">{item?.usersSegment}</td>
                        <td className="text-center font-sans text-lg">{item?.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-full px-4">
                <p className="pb-2 text-base">Cantidad de vacantes por segmento</p>
                <table className="w-full">
                  <thead className="bg-cream">
                    <tr>
                      <td className="py-2 text-center font-sans text-base">Segmento</td>
                      <td className="py-2 text-center font-sans text-base">Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    {vacancyAndUsersSegment.data?.vacanciesSegments?.vacanciesData?.map((item, index) => (
                      <tr key={`${item?.vacancySegment + index}`} className="bg-gray100 text-sm">
                        <td className="text-center font-sans text-lg">{item?.vacancySegment}</td>
                        <td className="text-center font-sans text-lg">{item?.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
      </div>
      <div className="col-span-2 mt-4 flex h-max w-full flex-col rounded-2xl bg-white px-4 py-2 drop-shadow-lg">
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">Respuesta de usuarios</p>
            <p className="text-sm">Respuesta a {idVacancy !== '' ? 'vacante' : 'empresa'} </p>
          </div>
        </div>
        <div className="flex gap-x-2 px-4">
          <div className="h-96 w-1/4 overflow-auto">
            {loadingCompanies && (
              <div className="flex h-full w-full items-center justify-center">
                <CircularProgress className="text-purple" />
              </div>
            )}
            {companies?.data?.length ? (
              <table className="w-full px-4">
                <thead className="bg-cream">
                  <tr>
                    <td className="py-2 text-center font-sans text-base">Empresa</td>
                  </tr>
                </thead>
                <tbody>
                  {companies.data
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    ?.map((item) => (
                      <tr
                        onClick={() => {
                          setIdCompany(item?.id);
                          setIdVacancy('');
                        }}
                        key={`${item?.id}`}
                        className="cursor-pointer bg-gray100 text-sm"
                      >
                        <td className="text-center font-sans text-lg">{item?.name}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <p className="text-base">Ups, parece que no hay información acerca de esto</p>
            )}
          </div>
          <div className="h-96 w-1/4 overflow-auto">
            {loadingVacancies && (
              <div className="flex h-full w-full items-start justify-center">
                <CircularProgress className="text-purple" />
              </div>
            )}
            {!loadingVacancies && vacancies?.data?.length && (idCompany !== '' || idCompany !== null) && (
              <table className="w-full px-4">
                <thead className="bg-cream">
                  <tr>
                    <td className="py-2 text-center font-sans text-base">Vacantes</td>
                  </tr>
                </thead>
                <tbody>
                  {vacancies.data
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    ?.map((item) => (
                      <tr
                        onClick={() => setIdVacancy(item?.id)}
                        key={`${item?.id}`}
                        className="cursor-pointer bg-gray100 text-sm"
                      >
                        <td className="text-center font-sans text-lg">{item?.name}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="w-1/2">
            {loadingVacanciesResponse && (
              <div className="flex h-full w-full items-start justify-center">
                <CircularProgress className="text-purple" />
              </div>
            )}
            {!loadingVacanciesResponse && vacanciesResponse?.data?.length && idCompany !== '' && (
              <table className="w-full px-4">
                <thead className="bg-cream">
                  <tr>
                    <td className="py-2 text-center font-sans text-base">Tipo</td>
                    <td className="py-2 text-center font-sans text-base">Total</td>
                  </tr>
                </thead>
                <tbody>
                  {vacanciesResponse.data?.map((item) => (
                    <tr key={`${item?.label}`} className="cursor-pointer bg-gray100 text-sm">
                      <td className="text-center font-sans text-lg">
                        {item?.label === 'ratioAcceptedByUser' && 'Porcentaje de aceptados por el usuario'}
                        {item?.label === 'ratioRejectedByUser' && 'Porcentaje de rechazados por el usuario'}
                        {item?.label === 'counterAcceptedByUser' && 'Total de aceptaciones por el usuario'}
                        {item?.label === 'counterRejectedByUser' && 'Total de rechazos por el usuario'}
                        {item?.label === 'contestationCount' && 'Total de respuestas por el usuario'}
                      </td>
                      <td className="text-center font-sans text-lg">
                        {(item?.label === 'ratioAcceptedByUser' || item?.label === 'ratioRejectedByUser') &&
                          `${item?.value}%`}
                        {item?.label !== 'ratioAcceptedByUser' &&
                          item?.label !== 'ratioRejectedByUser' &&
                          `${item?.value}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAnalytics;
