import React, { useState } from 'react';
import { MdOutlineDiversity3 } from 'react-icons/md';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { BsPeople } from 'react-icons/bs';
import {
  getAnalyticsMatchesHistoric,
  getAnalyticsMatchUniqueConfirmed,
  getAnalyticsMatchUniqueGeneral,
  getAnalyticsMatchUniqueNotConfirmed,
  getAnalyticsValueMatchAccepted,
  getAnalyticsValueMatchPostulated,
  getAnalyticsValueMatchResponse,
  getAnalyticsValueMatchUsers,
} from '../../../../services/analytics';

const ColumnChart = React.lazy(() => import('../components/Charts/Column'));

const MatchesAnalytics = ({ range }) => {
  const [valueMatchUsersType, setValueMatchUsersType] = useState(1);

  const { data: valueMatchUsers, isLoading: loadingValueMatchUsers } = useQuery({
    queryFn: () => getAnalyticsValueMatchUsers({ ...range, type: valueMatchUsersType }),
    queryKey: ['valueMatchUsers', range, valueMatchUsersType],
  });

  const [valueMatchAcceptedType, setValueMatchAcceptedType] = useState(1);

  const { data: valueMatchAccepted, isLoading: loadingValueMatchAccepted } = useQuery({
    queryFn: () => getAnalyticsValueMatchAccepted({ ...range, type: valueMatchAcceptedType }),
    queryKey: ['valueMatchAccepted', range, valueMatchAcceptedType],
  });

  const [valueMatchResponseType, setValueMatchResponseType] = useState(1);

  const { data: valueMatchResponse, isLoading: loadingValueMatchResponse } = useQuery({
    queryFn: () => getAnalyticsValueMatchResponse({ ...range, type: valueMatchResponseType }),
    queryKey: ['valueMatchResponse', range, valueMatchResponseType],
  });

  const [valueMatchPostulatedType, setValueMatchPostulatedType] = useState(1);

  const { data: valueMatchPostulated, isLoading: loadingValueMatchPostulated } = useQuery({
    queryFn: () => getAnalyticsValueMatchPostulated({ ...range, type: valueMatchPostulatedType }),
    queryKey: ['valueMatchPostulated', range, valueMatchPostulatedType],
  });

  const [valueMatchUniqueGeneralType, setValueMatchUniqueGeneralType] = useState(1);

  const { data: matchUniqueGeneral, isLoading: loadingMatchUniqueGeneral } = useQuery({
    queryFn: () => getAnalyticsMatchUniqueGeneral({ ...range, type: valueMatchUniqueGeneralType, mode: 1 }),
    queryKey: ['getMatchUniqueGeneral', range, valueMatchUniqueGeneralType],
  });

  const [valueMatchUniqueConfirmedType, setValueMatchUniqueConfirmedType] = useState(1);

  const { data: matchUniqueConfirmed, isLoading: loadingMatchUniqueConfirmed } = useQuery({
    queryFn: () => getAnalyticsMatchUniqueConfirmed({ ...range, type: valueMatchUniqueConfirmedType, mode: 2 }),
    queryKey: ['getMatchUniqueConfirmed', range, valueMatchUniqueConfirmedType],
  });

  const [valueMatchUniqueNotConfirmedType, setValueMatchUniqueNotConfirmedType] = useState(1);

  const { data: matchUniqueNotConfirmed, isLoading: loadingMatchUniqueNotConfirmed } = useQuery({
    queryFn: () => getAnalyticsMatchUniqueNotConfirmed({ ...range, type: valueMatchUniqueNotConfirmedType, mode: 3 }),
    queryKey: ['getMatchUniqueNotConfirmed', range, valueMatchUniqueNotConfirmedType],
  });

  const [matchesHistoricWeekly, setMatchesHistoricWeekly] = useState(false);

  const { data: matchesHistoric, isLoading: loadingMatchesHistoric } = useQuery({
    queryFn: () => getAnalyticsMatchesHistoric({ type: matchesHistoricWeekly }),
    queryKey: ['matchesHistoric', matchesHistoricWeekly],
  });

  // console.log(matchesHistoric);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-2 gap-y-4 pb-4 pt-8">
        <div className="relative flex h-[500px] w-full flex-col rounded-2xl bg-white">
          <div className="absolute right-4 top-2 flex items-center self-center pl-6">
            <p className="font-sans text-sm">Tipo</p>
            <select
              className="rounded-lg border-0 bg-white px-4 py-1 font-sans text-sm"
              defaultValue={1}
              onChange={(e) => setValueMatchUsersType(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
              <MdOutlineDiversity3 size={28} color="#FFF" />
            </div>
            <div>
              <p className="text-xl 2xl:text-2xl">% Match Usuarios</p>
              <p className="text-sm">Usuarios/as que reciben un match con min 1 empleo en las primeras 2 semanas</p>
            </div>
          </div>
          {loadingValueMatchUsers && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!valueMatchUsers?.data < 0 && !loadingValueMatchUsers && (
            <p className="text-base">Ups, parece que no hay información acerca de esto</p>
          )}
          {valueMatchUsersType === 1 && valueMatchUsers?.data >= 0 && !loadingValueMatchUsers && (
            <p className="text-center font-sans text-2xl">{valueMatchUsers?.data}%</p>
          )}
          {valueMatchUsersType === 2 && valueMatchUsers?.data?.length && !loadingValueMatchUsers && (
            <React.Suspense fallback="cargando...">
              <ColumnChart
                data={valueMatchUsers?.data || []}
                seriesToMake={valueMatchUsers?.series || []}
                yLabelDisabled
              />
            </React.Suspense>
          )}
          {valueMatchUsersType === 3 && valueMatchUsers?.data?.length && !loadingValueMatchUsers && (
            <React.Suspense fallback="cargando...">
              <ColumnChart data={valueMatchUsers?.data || []} series={valueMatchUsers?.series || []} yLabelDisabled />
            </React.Suspense>
          )}
        </div>
        <div className="relative flex h-[500px] w-full flex-col rounded-2xl bg-white">
          <div className="absolute right-4 top-2 flex items-center self-center pl-6">
            <p className="font-sans text-sm">Tipo</p>
            <select
              className="rounded-lg border-0 bg-white px-4 py-1 font-sans text-sm"
              defaultValue={1}
              onChange={(e) => setValueMatchAcceptedType(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
              <MdOutlineDiversity3 size={28} color="#FFF" />
            </div>
            <div>
              <p className="text-xl 2xl:text-2xl">% Aceptacion de matches</p>
              <p className="text-sm">Matches aceptados / total de matches enviados</p>
            </div>
          </div>
          {loadingValueMatchAccepted && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!valueMatchAccepted?.data < 0 && !loadingValueMatchAccepted && (
            <p className="text-base">Ups, parece que no hay información acerca de esto</p>
          )}
          {valueMatchAcceptedType === 1 && valueMatchAccepted?.data >= 0 && !loadingValueMatchAccepted && (
            <p className="text-center font-sans text-2xl">{valueMatchAccepted?.data}%</p>
          )}
          {valueMatchAcceptedType === 2 && valueMatchAccepted?.data?.length && !loadingValueMatchUsers && (
            <React.Suspense fallback="cargando...">
              <ColumnChart
                data={valueMatchAccepted?.data || []}
                seriesToMake={valueMatchAccepted?.series || []}
                yLabelDisabled
              />
            </React.Suspense>
          )}
          {valueMatchAcceptedType === 3 && valueMatchAccepted?.data?.length && !loadingValueMatchAccepted && (
            <React.Suspense fallback="cargando...">
              <ColumnChart
                data={valueMatchAccepted?.data || []}
                series={valueMatchAccepted?.series || []}
                yLabelDisabled
              />
            </React.Suspense>
          )}
        </div>
        <div className="relative flex h-[500px] w-full flex-col rounded-2xl bg-white">
          <div className="absolute right-4 top-2 flex items-center self-center pl-6">
            <p className="font-sans text-sm">Tipo</p>
            <select
              className="rounded-lg border-0 bg-white px-4 py-1 font-sans text-sm"
              defaultValue={1}
              onChange={(e) => setValueMatchResponseType(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
              <MdOutlineDiversity3 size={28} color="#FFF" />
            </div>
            <div>
              <p className="text-xl 2xl:text-2xl">% Respuesta a matches</p>
              <p className="text-sm">Matches aceptan o rechazan un match</p>
            </div>
          </div>
          {loadingValueMatchResponse && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!valueMatchResponse?.data < 0 && !loadingValueMatchResponse && (
            <p className="text-base">Ups, parece que no hay información acerca de esto</p>
          )}
          {valueMatchResponseType === 1 && valueMatchResponse?.data >= 0 && !loadingValueMatchResponse && (
            <p className="text-center font-sans text-2xl">{valueMatchResponse?.data}%</p>
          )}
          {valueMatchResponseType === 2 && valueMatchResponse?.data?.length && !loadingValueMatchResponse && (
            <React.Suspense fallback="cargando...">
              <ColumnChart
                data={valueMatchResponse?.data || []}
                seriesToMake={valueMatchResponse?.series || []}
                yLabelDisabled
              />
            </React.Suspense>
          )}
          {valueMatchResponseType === 3 && valueMatchResponse?.data?.length && !loadingValueMatchResponse && (
            <React.Suspense fallback="cargando...">
              <ColumnChart
                data={valueMatchResponse?.data || []}
                series={valueMatchResponse?.series || []}
                yLabelDisabled
              />
            </React.Suspense>
          )}
        </div>
        <div className="relative flex h-[500px] w-full flex-col rounded-2xl bg-white">
          <div className="absolute right-4 top-2 flex items-center self-center pl-6">
            <p className="font-sans text-sm">Tipo</p>
            <select
              className="rounded-lg border-0 bg-white px-4 py-1 font-sans text-sm"
              defaultValue={1}
              onChange={(e) => setValueMatchPostulatedType(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
              <MdOutlineDiversity3 size={28} color="#FFF" />
            </div>
            <div>
              <p className="text-xl 2xl:text-2xl">Ratio matches por vacante</p>
              <p className="text-sm">No. de candidatos que se envían por cada vacante</p>
            </div>
          </div>
          {loadingValueMatchPostulated && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!valueMatchPostulated?.data < 0 && !loadingValueMatchPostulated && (
            <p className="text-base">Ups, parece que no hay información acerca de esto</p>
          )}
          {valueMatchPostulatedType === 1 && valueMatchPostulated?.data >= 0 && !loadingValueMatchPostulated && (
            <p className="text-center font-sans text-2xl">{valueMatchPostulated?.data}</p>
          )}
          {valueMatchPostulatedType === 2 && valueMatchPostulated?.data?.length && !loadingValueMatchPostulated && (
            <React.Suspense fallback="cargando...">
              <ColumnChart
                data={valueMatchPostulated?.data || []}
                seriesToMake={valueMatchPostulated?.series || []}
                yLabelDisabled
              />
            </React.Suspense>
          )}
          {valueMatchPostulatedType === 3 && valueMatchPostulated?.data?.length && !loadingValueMatchPostulated && (
            <React.Suspense fallback="cargando...">
              <ColumnChart
                data={valueMatchPostulated?.data || []}
                series={valueMatchPostulated?.series || []}
                yLabelDisabled
              />
            </React.Suspense>
          )}
        </div>
        <div className="relative flex h-[500px] w-full flex-col rounded-2xl bg-white">
          <div className="absolute right-4 top-2 flex items-center self-center pl-6">
            <p className="font-sans text-sm">Tipo</p>
            <select
              className="rounded-lg border-0 bg-white px-4 py-1 font-sans text-sm"
              defaultValue={1}
              onChange={(e) => setValueMatchUniqueGeneralType(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
              <MdOutlineDiversity3 size={28} color="#FFF" />
            </div>
            <div>
              <p className="text-xl 2xl:text-2xl">Matches Únicos</p>
              <p className="text-sm">General</p>
            </div>
          </div>
          {loadingMatchUniqueGeneral && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!matchUniqueGeneral?.data < 0 && !loadingMatchUniqueGeneral && (
            <p className="text-base">Ups, parece que no hay información acerca de esto</p>
          )}
          {valueMatchUniqueGeneralType === 1 && matchUniqueGeneral?.data >= 0 && !loadingMatchUniqueGeneral && (
            <p className="text-center font-sans text-2xl">{matchUniqueGeneral?.data}</p>
          )}
          {valueMatchUniqueGeneralType === 2 && matchUniqueGeneral?.data?.length && !loadingMatchUniqueGeneral && (
            <React.Suspense fallback="cargando...">
              <ColumnChart
                data={matchUniqueGeneral?.data || []}
                seriesToMake={matchUniqueGeneral?.series || []}
                yLabelDisabled
              />
            </React.Suspense>
          )}
          {valueMatchUniqueGeneralType === 3 && matchUniqueGeneral?.data?.length && !loadingMatchUniqueGeneral && (
            <React.Suspense fallback="cargando...">
              <ColumnChart
                data={matchUniqueGeneral?.data || []}
                series={matchUniqueGeneral?.series || []}
                yLabelDisabled
              />
            </React.Suspense>
          )}
        </div>
        <div className="relative flex h-[500px] w-full flex-col rounded-2xl bg-white">
          <div className="absolute right-4 top-2 flex items-center self-center pl-6">
            <p className="font-sans text-sm">Tipo</p>
            <select
              className="rounded-lg border-0 bg-white px-4 py-1 font-sans text-sm"
              defaultValue={1}
              onChange={(e) => setValueMatchUniqueConfirmedType(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
              <MdOutlineDiversity3 size={28} color="#FFF" />
            </div>
            <div>
              <p className="text-xl 2xl:text-2xl">Matches Únicos Confirmados</p>
              <p className="text-sm">Confirmados</p>
            </div>
          </div>
          {loadingMatchUniqueConfirmed && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!matchUniqueConfirmed?.data < 0 && !loadingMatchUniqueConfirmed && (
            <p className="text-base">Ups, parece que no hay información acerca de esto</p>
          )}
          {valueMatchUniqueConfirmedType === 1 && matchUniqueConfirmed?.data >= 0 && !loadingMatchUniqueConfirmed && (
            <p className="text-center font-sans text-2xl">{matchUniqueConfirmed?.data}</p>
          )}
          {valueMatchUniqueConfirmedType === 2 &&
            matchUniqueConfirmed?.data?.length &&
            !loadingMatchUniqueConfirmed && (
              <React.Suspense fallback="cargando...">
                <ColumnChart
                  data={matchUniqueConfirmed?.data || []}
                  seriesToMake={matchUniqueConfirmed?.series || []}
                  yLabelDisabled
                />
              </React.Suspense>
            )}
          {valueMatchUniqueConfirmedType === 3 &&
            matchUniqueConfirmed?.data?.length &&
            !loadingMatchUniqueConfirmed && (
              <React.Suspense fallback="cargando...">
                <ColumnChart
                  data={matchUniqueConfirmed?.data || []}
                  series={matchUniqueConfirmed?.series || []}
                  yLabelDisabled
                />
              </React.Suspense>
            )}
        </div>
        <div className="relative flex h-[500px] w-full flex-col rounded-2xl bg-white">
          <div className="absolute right-4 top-2 flex items-center self-center pl-6">
            <p className="font-sans text-sm">Tipo</p>
            <select
              className="rounded-lg border-0 bg-white px-4 py-1 font-sans text-sm"
              defaultValue={1}
              onChange={(e) => setValueMatchUniqueNotConfirmedType(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
              <MdOutlineDiversity3 size={28} color="#FFF" />
            </div>
            <div>
              <p className="text-xl 2xl:text-2xl">Matches Únicos No Confirmados</p>
              <p className="text-sm">No Confirmados</p>
            </div>
          </div>
          {loadingMatchUniqueNotConfirmed && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!matchUniqueNotConfirmed?.data < 0 && !loadingMatchUniqueNotConfirmed && (
            <p className="text-base">Ups, parece que no hay información acerca de esto</p>
          )}
          {valueMatchUniqueNotConfirmedType === 1 &&
            matchUniqueNotConfirmed?.data >= 0 &&
            !loadingMatchUniqueNotConfirmed && (
              <p className="text-center font-sans text-2xl">{matchUniqueNotConfirmed?.data}</p>
            )}
          {valueMatchUniqueNotConfirmedType === 2 &&
            matchUniqueNotConfirmed?.data?.length &&
            !loadingMatchUniqueNotConfirmed && (
              <React.Suspense fallback="cargando...">
                <ColumnChart
                  data={matchUniqueNotConfirmed?.data || []}
                  seriesToMake={matchUniqueNotConfirmed?.series || []}
                  yLabelDisabled
                />
              </React.Suspense>
            )}
          {valueMatchUniqueNotConfirmedType === 3 &&
            matchUniqueNotConfirmed?.data?.length &&
            !loadingMatchUniqueNotConfirmed && (
              <React.Suspense fallback="cargando...">
                <ColumnChart
                  data={matchUniqueNotConfirmed?.data || []}
                  series={matchUniqueNotConfirmed?.series || []}
                  yLabelDisabled
                />
              </React.Suspense>
            )}
        </div>
      </div>
      <div
        className={`relative col-span-4 mt-8 flex ${
          matchesHistoricWeekly ? 'h-full' : 'h-[500px]'
        } flex-col justify-between rounded-2xl bg-white pb-4`}
      >
        <div className="absolute right-4 top-2 flex w-max gap-x-2 rounded-full bg-purple">
          <p
            onClick={() => {
              setMatchesHistoricWeekly(true);
            }}
            className={`cursor-pointer px-2 py-1 text-xs ${
              matchesHistoricWeekly ? 'rounded-l-full rounded-t-full bg-purple text-white' : 'bg-white text-black'
            }`}
          >
            Semana
          </p>
          <p
            onClick={() => {
              setMatchesHistoricWeekly(false);
            }}
            className={`cursor-pointer px-2 py-1 text-xs ${
              !matchesHistoricWeekly ? 'rounded-r-full rounded-t-full bg-purple text-white' : 'bg-white text-black'
            }`}
          >
            Anual
          </p>
        </div>
        {matchesHistoricWeekly ? (
          <div className="flex flex-col">
            <div className="mb-2 flex flex-row items-center gap-4 p-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                <BsPeople size={28} color="#FFF" />
              </div>
              <div>
                <p className="text-base 2xl:text-xl">Histórico matches</p>
              </div>
            </div>
            {loadingMatchesHistoric ? (
              <div className="flex h-full w-full items-center justify-center">
                <CircularProgress className="text-purple" />
              </div>
            ) : (
              <div className="grid grid-cols-2 items-center justify-center gap-x-4 px-4">
                <p className="text-center text-3xl">{matchesHistoric?.data?.label}</p>
                <p className="text-center text-3xl">{matchesHistoric?.data?.value}%</p>
                <p className="text-center text-xl">Semana </p>
                <p className="text-center text-xl">Porcentaje</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                <BsPeople size={28} color="#FFF" />
              </div>
              <div>
                <p className="text-base 2xl:text-xl">Histórico matches</p>
              </div>
            </div>
            {loadingMatchesHistoric ? (
              <div className="flex h-full w-full items-center justify-center">
                <CircularProgress className="text-purple" />
              </div>
            ) : (
              <React.Suspense fallback="cargando...">
                <ColumnChart
                  yLabelPosition={-360}
                  yLabel="Semana"
                  xLabel="Porcentaje"
                  data={matchesHistoric?.data || []}
                  series={matchesHistoric?.series}
                  labelText="{valueY}%"
                />
              </React.Suspense>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MatchesAnalytics;
