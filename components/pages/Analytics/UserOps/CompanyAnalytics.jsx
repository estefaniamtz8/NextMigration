import { MdOutlineDiversity3 } from 'react-icons/md';
import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BsPeople } from 'react-icons/bs';
import {
  getAnalyticsCompaniesStatus,
  getAnalyticsPostulationsByCompany,
  getAnalyticsTotalPostulations,
  getAnalyticsVacancyByCompany,
} from '../../../../services/analytics';

const ColumnChart = React.lazy(() => import('../components/Charts/Column'));
const ClusteredColumn = React.lazy(() => import('../components/Charts/ClusteredColumn'));

const CompanyAnalytics = ({ range }) => {
  const [vacancyCompanyActiveTable, setVacancyCompanyActiveTable] = useState(false);

  const [totalPostulationsVariants, setTotalPostulationsVariants] = useState({
    table: false,
    mode: false,
  });

  const [companiesStatusActiveTable, setCompaniesStatusActiveTable] = useState(false);

  const [postulationsByCompanyActiveTable, setPostulationsByCompanyActiveTable] = useState(false);

  const { data: vacancyCompany, isLoading: loadingVacancyCompany } = useQuery({
    queryFn: () => getAnalyticsVacancyByCompany(vacancyCompanyActiveTable),
    queryKey: ['getVacancyByCompany', vacancyCompanyActiveTable],
  });

  const { data: totalPostulations, isLoading: loadingTotalPostulations } = useQuery({
    queryFn: () => getAnalyticsTotalPostulations({ ...range, mode: totalPostulationsVariants?.mode }),
    queryKey: ['getTotalPostulations', totalPostulationsVariants, range],
  });

  const { data: companiesStatus, isLoading: loadingCompaniesStatus } = useQuery({
    queryFn: () => getAnalyticsCompaniesStatus({ ...range, mode: companiesStatusActiveTable ? 1 : 2 }),
    queryKey: ['getCompaniesStatus', companiesStatusActiveTable, range],
  });

  const { data: postulationsByCompany, isLoading: loadingPostulationsByCompany } = useQuery({
    queryFn: () => getAnalyticsPostulationsByCompany(range),
    queryKey: ['getPostulationsByCompany', postulationsByCompanyActiveTable, range],
  });

  return (
    <>
      <div className="grid grid-cols-2 gap-x-2 pb-4 pt-8">
        <div className="relative flex h-[500px] w-full flex-col rounded-2xl bg-white">
          <div className="absolute right-4 top-2 flex w-max gap-x-2 rounded-full bg-purple">
            <p
              onClick={() => {
                setVacancyCompanyActiveTable(true);
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                vacancyCompanyActiveTable ? 'rounded-l-full rounded-t-full bg-purple text-white' : 'bg-white text-black'
              }`}
            >
              Tabla
            </p>
            <p
              onClick={() => {
                setVacancyCompanyActiveTable(false);
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                !vacancyCompanyActiveTable
                  ? 'rounded-r-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Gráfica
            </p>
          </div>
          {vacancyCompanyActiveTable ? (
            <div className="flex h-full flex-col">
              <div className="mb-2 flex flex-row items-center gap-4 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <MdOutlineDiversity3 size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Vacantes por empresa</p>
                </div>
              </div>
              {loadingVacancyCompany && (
                <div className="flex h-full w-full items-center justify-center">
                  <CircularProgress className="text-purple" />
                </div>
              )}
              <div className="h-full overflow-scroll">
                {vacancyCompany?.data?.length && (
                  <table className="mx-4">
                    <thead className="bg-cream">
                      <tr>
                        <td className="py-2 font-sans text-base">Compañia</td>
                        <td className="py-2 font-sans text-base"> Nombre</td>
                        <td className="py-2 font-sans text-base">Salario</td>
                        <td className="py-2 font-sans text-base">ID</td>
                      </tr>
                    </thead>
                    <tbody>
                      {vacancyCompany?.data?.map((item) => (
                        <tr className="bg-gray100 text-sm">
                          <td className="pl-2">{item?.company}</td>
                          <td className="pl-2">{item?.vacancyName}</td>
                          <td className="text-center">{item?.salary}</td>
                          <td className="text-center">{item?.idVacany}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <MdOutlineDiversity3 size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-xl 2xl:text-2xl">Vacantes por empresa</p>
                </div>
              </div>
              {loadingVacancyCompany ? (
                <div className="flex h-full w-full items-center justify-center">
                  <CircularProgress className="text-purple" />
                </div>
              ) : (
                <React.Suspense fallback="cargando...">
                  <ColumnChart
                    data={vacancyCompany?.data || []}
                    series={vacancyCompany?.series}
                    xLabel="Fecha"
                    yLabel="Empresa"
                    yLabelDisabled
                  />
                </React.Suspense>
              )}
            </>
          )}
        </div>
        <div className="relative flex h-[500px] w-full flex-col rounded-2xl bg-white">
          <div className="absolute right-4 top-10 flex w-max gap-x-2 rounded-full bg-purple">
            <p
              onClick={() => {
                setTotalPostulationsVariants({
                  ...totalPostulationsVariants,
                  mode: true,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                totalPostulationsVariants?.mode
                  ? 'rounded-l-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Mensual
            </p>
            <p
              onClick={() => {
                setTotalPostulationsVariants({
                  ...totalPostulationsVariants,
                  mode: false,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                !totalPostulationsVariants?.mode
                  ? 'rounded-r-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Anual
            </p>
          </div>
          <div className="absolute right-4 top-2 flex w-max gap-x-2 rounded-full bg-purple">
            <p
              onClick={() => {
                setTotalPostulationsVariants({
                  ...totalPostulationsVariants,
                  table: true,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                totalPostulationsVariants?.table
                  ? 'rounded-l-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Tabla
            </p>
            <p
              onClick={() => {
                setTotalPostulationsVariants({
                  ...totalPostulationsVariants,
                  table: false,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                !totalPostulationsVariants?.table
                  ? 'rounded-r-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Gráfica
            </p>
          </div>
          {totalPostulationsVariants?.table ? (
            <>
              <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <MdOutlineDiversity3 size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-xl 2xl:text-2xl">Canalizaciones a vacantes</p>
                </div>
              </div>
              <div className="flex h-full flex-col items-center justify-center">
                {loadingTotalPostulations && (
                  <div className="flex h-full w-full items-center justify-center">
                    <CircularProgress className="text-purple" />
                  </div>
                )}
                {totalPostulations?.data?.length &&
                  !loadingTotalPostulations &&
                  totalPostulations?.data?.map((info) => (
                    <div className="flex w-4/5 justify-between border-[1px] border-solid border-black px-8">
                      <p className="text-base font-medium">{info?.label}</p>
                      <p className="text-base font-light">{info?.value}</p>
                    </div>
                  ))}
                {!totalPostulations?.data?.length && !loadingTotalPostulations && (
                  <p className="text-base">Ups, parece que no hay información acerca de esto</p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <MdOutlineDiversity3 size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-xl 2xl:text-2xl">Canalizaciones a vacantes</p>
                </div>
              </div>
              {loadingTotalPostulations ? (
                <div className="flex h-full w-full items-center justify-center">
                  <CircularProgress className="text-purple" />
                </div>
              ) : (
                <React.Suspense fallback="cargando...">
                  <ColumnChart
                    data={totalPostulations?.data || []}
                    series={totalPostulations?.series}
                    xLabel="Fecha"
                    yLabel="Cantidad"
                    yLabelDisabled
                  />
                </React.Suspense>
              )}
            </>
          )}
        </div>
      </div>
      <div
        className={`relative col-span-4 mt-8 flex ${
          companiesStatusActiveTable ? 'h-full' : 'h-[500px]'
        } flex-col justify-between rounded-2xl bg-white pb-4`}
      >
        <div className="absolute right-4 top-2 flex w-max gap-x-2 rounded-full bg-purple">
          <p
            onClick={() => {
              setCompaniesStatusActiveTable(true);
            }}
            className={`cursor-pointer px-2 py-1 text-xs ${
              companiesStatusActiveTable ? 'rounded-l-full rounded-t-full bg-purple text-white' : 'bg-white text-black'
            }`}
          >
            Tabla
          </p>
          <p
            onClick={() => {
              setCompaniesStatusActiveTable(false);
            }}
            className={`cursor-pointer px-2 py-1 text-xs ${
              !companiesStatusActiveTable ? 'rounded-r-full rounded-t-full bg-purple text-white' : 'bg-white text-black'
            }`}
          >
            Gráfica
          </p>
        </div>
        {companiesStatusActiveTable ? (
          <div className="flex flex-col">
            <div className="mb-2 flex flex-row items-center gap-4 p-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                <BsPeople size={28} color="#FFF" />
              </div>
              <div>
                <p className="text-base 2xl:text-xl">Estatus empresas</p>
              </div>
            </div>
            {loadingCompaniesStatus ? (
              <div className="flex h-full w-full items-center justify-center">
                <CircularProgress className="text-purple" />
              </div>
            ) : (
              <table className="mx-4">
                <thead className="bg-cream">
                  <tr>
                    <td className="py-2 text-center font-sans text-base">Mes</td>
                    <td className="py-2 text-center font-sans text-base"> En espera</td>
                    <td className="py-2 text-center font-sans text-base">Activo</td>
                    <td className="py-2 text-center font-sans text-base">Cerrada</td>
                  </tr>
                </thead>
                <tbody>
                  {companiesStatus?.data?.map((item) => (
                    <tr className="bg-gray100 text-sm">
                      <td className="pl-2">{item?.tag}</td>
                      <td className="pl-2 text-center">
                        {item?.data?.find((status) => status?.label === 'waiting')?.value || 0}
                      </td>
                      <td className="pl-2 text-center">
                        {item?.data?.find((status) => status?.label === 'active')?.value || 0}
                      </td>
                      <td className="pl-2 text-center">
                        {item?.data?.find((status) => status?.label === 'closed')?.value || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <>
            <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                <BsPeople size={28} color="#FFF" />
              </div>
              <div>
                <p className="text-base 2xl:text-xl">Estatus empresas</p>
              </div>
            </div>
            {loadingCompaniesStatus ? (
              <div className="flex h-full w-full items-center justify-center">
                <CircularProgress className="text-purple" />
              </div>
            ) : (
              <React.Suspense fallback="cargando...">
                <ClusteredColumn data={companiesStatus?.data || []} seriesToMake={companiesStatus?.series || []} />
              </React.Suspense>
            )}
          </>
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-2 pb-4 pt-8">
        <div className="relative flex h-[500px] w-full flex-col rounded-2xl bg-white">
          <div className="absolute right-4 top-2 flex w-max gap-x-2 rounded-full bg-purple">
            <p
              onClick={() => {
                setPostulationsByCompanyActiveTable(true);
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                postulationsByCompanyActiveTable
                  ? 'rounded-l-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Tabla
            </p>
            <p
              onClick={() => {
                setPostulationsByCompanyActiveTable(false);
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                !postulationsByCompanyActiveTable
                  ? 'rounded-r-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Gráfica
            </p>
          </div>
          {postulationsByCompanyActiveTable ? (
            <div className="flex h-full flex-col">
              <div className="mb-2 flex flex-row items-center gap-4 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <MdOutlineDiversity3 size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Canalizaciones por empresa</p>
                </div>
              </div>
              {loadingPostulationsByCompany && (
                <div className="flex h-full w-full items-center justify-center">
                  <CircularProgress className="text-purple" />
                </div>
              )}
              <div className="h-full overflow-scroll">
                {postulationsByCompany?.data?.length && (
                  <table className="mx-4">
                    <thead className="bg-cream">
                      <tr>
                        <td className="py-2 font-sans text-base">Compañia</td>
                        <td className="py-2 font-sans text-base"> No. canalizaciones</td>
                      </tr>
                    </thead>
                    <tbody>
                      {postulationsByCompany?.data?.map((item) => (
                        <tr className="bg-gray100 text-sm">
                          <td className="pl-2">{item?.label}</td>
                          <td className="pl-2">{item?.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <MdOutlineDiversity3 size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-xl 2xl:text-2xl">Canalizaciones por empresa</p>
                </div>
              </div>
              {loadingPostulationsByCompany ? (
                <div className="flex h-full w-full items-center justify-center">
                  <CircularProgress className="text-purple" />
                </div>
              ) : (
                <React.Suspense fallback="cargando...">
                  <ColumnChart
                    data={postulationsByCompany?.data || []}
                    series={postulationsByCompany?.series}
                    xLabel="Valor"
                    yLabel="Empresa"
                    yLabelDisabled
                  />
                </React.Suspense>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyAnalytics;
