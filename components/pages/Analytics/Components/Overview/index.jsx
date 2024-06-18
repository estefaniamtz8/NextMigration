import React, { useState } from 'react';
import DateSelector from 'components/pages/Analytics/components/Overview/dateSelector';
import { useQuery } from '@tanstack/react-query';
import { BsPeople } from 'react-icons/bs';
import { CircularProgress } from '@mui/material';
import { getAnalyticsTotalRegister } from '../../../../../services/analytics';

const ColumnChart = React.lazy(() => import('../Charts/Column'));

const AnalyticsOverview = () => {
  const [range, setRange] = useState({
    segment: null,
    month: null,
    year: new Date().getFullYear(),
  });

  const [allUsersActiveTable, setAllUsersActiveTable] = useState(false);

  const { data: allUsers, isLoading: loading } = useQuery({
    queryFn: () => getAnalyticsTotalRegister(range, allUsersActiveTable),
    queryKey: ['getTotalRegister', range, allUsersActiveTable],
  });
  return (
    <>
      <DateSelector range={range} setRange={setRange} />
      <div className="grid grid-cols-4 gap-4">
        <div className="relative col-span-4 flex h-96 flex-col justify-between rounded-2xl bg-white">
          <div className="absolute right-4 top-2 flex w-max gap-x-2 rounded-full bg-purple">
            <p
              onClick={() => {
                setAllUsersActiveTable(true);
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                allUsersActiveTable ? 'rounded-l-full rounded-t-full bg-purple text-white' : 'bg-white text-black'
              }`}
            >
              Tabla
            </p>
            <p
              onClick={() => {
                setAllUsersActiveTable(false);
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                !allUsersActiveTable ? 'rounded-r-full rounded-t-full bg-purple text-white' : 'bg-white text-black'
              }`}
            >
              Gráfica
            </p>
          </div>
          {allUsersActiveTable ? (
            <div className="flex h-full flex-col items-center justify-center">
              {allUsers?.data?.length ? (
                allUsers?.data?.map((info) => (
                  <div className="flex w-4/5 justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.talent}</p>
                    <p className="text-base font-light">{info?.value}</p>
                  </div>
                ))
              ) : (
                <p className="text-base">Ups, parece que no hay información acerca de esto</p>
              )}
            </div>
          ) : (
            <div className="flex gap-x-2">
              <div className="h-60 w-1/2">
                <div className="mb-2 flex flex-row items-center gap-4 p-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                    <BsPeople size={28} color="#FFF" />
                  </div>
                  <div>
                    <p className="text-base 2xl:text-xl">Talento Diverso</p>
                  </div>
                </div>
                {loading ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <CircularProgress className="text-purple" />
                  </div>
                ) : (
                  <React.Suspense fallback="cargando...">
                    <ColumnChart data={allUsers?.dataDiversity || []} series={allUsers?.diversitySeries || []} />
                  </React.Suspense>
                )}
              </div>
              <div className="h-60 w-1/2">
                <div className="mb-2 flex flex-row items-center gap-4 p-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                    <BsPeople size={28} color="#FFF" />
                  </div>
                  <div>
                    <p className="text-base 2xl:text-xl">Talento Refugiado</p>
                  </div>
                </div>
                {loading ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <CircularProgress className="text-purple" />
                  </div>
                ) : (
                  <React.Suspense fallback="cargando...">
                    <ColumnChart data={allUsers?.dataRefugees || []} series={allUsers?.refugeesSeries || []} />
                  </React.Suspense>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnalyticsOverview;
