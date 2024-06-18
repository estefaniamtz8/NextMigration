import React, { useState } from 'react';
import { MdOutlineDiversity3 } from 'react-icons/md';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import {
  getAnalyticsMatchesResponse,
  getAnalyticsTotalMatches,
  getAnalyticsValueOfferMatchUsers,
} from '../../../../services/analytics';

const StackedChart = React.lazy(() => import('../components/Charts/StackedColumns'));

// eslint-disable-next-line react/prop-types
const MatchesAnalytics = ({ range, typeOfGraphs }) => {
  const { data: valueTotalMatches, isLoading: loadingTotalMatches } = useQuery({
    queryFn: () => getAnalyticsTotalMatches({ ...range, type: typeOfGraphs }),
    queryKey: ['matchesTotal', range, typeOfGraphs],
  });

  const { data: valueMatchesResponse, isLoading: loadingMatchesResponse } = useQuery({
    queryFn: () => getAnalyticsMatchesResponse({ ...range, type: typeOfGraphs }),
    queryKey: ['matchesResponse', range, typeOfGraphs],
  });

  const [matchUsersSelector, setMatchUsersSelector] = useState(1);

  const { data: valueMatchesUsers, isLoading: loadingMatchesUsers } = useQuery({
    queryFn: () => getAnalyticsValueOfferMatchUsers({ ...range, typeDays: matchUsersSelector, type: typeOfGraphs }),
    queryKey: ['matchesResponseV2', range, typeOfGraphs, matchUsersSelector],
  });

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-4 pb-4 pt-8">
      <div className="relative flex h-[500px] w-full flex-col rounded-2xl bg-white">
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">Total de matches</p>
          </div>
        </div>
        {loadingTotalMatches && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {!valueTotalMatches?.data?.length && !loadingTotalMatches && (
          <p className="px-4 text-base">Ups, parece que no hay información acerca de esto</p>
        )}
        {typeOfGraphs === 1 && valueTotalMatches?.data?.length && !loadingTotalMatches && (
          <table className="w-full px-4">
            <thead className="bg-cream">
              <tr>
                <td className="py-2 text-center font-sans text-base">Tipo</td>
                <td className="py-2 text-center font-sans text-base">Total</td>
              </tr>
            </thead>
            <tbody>
              {valueTotalMatches.data?.map((item) => (
                <tr className="bg-gray100 text-sm">
                  <td className="text-center font-sans text-lg">
                    {item?.type === 'invitation' && 'Invitación'}
                    {item?.type === 'Algorithm' && 'Algoritmo'}
                  </td>
                  <td className="text-center font-sans text-lg">{item?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {typeOfGraphs === 2 && valueTotalMatches?.data?.length && !loadingTotalMatches && (
          <React.Suspense fallback="cargando...">
            <StackedChart data={valueTotalMatches?.data || []} seriesToMake={valueTotalMatches?.series || []} />
          </React.Suspense>
        )}
        {typeOfGraphs === 3 && valueTotalMatches?.data?.length && !loadingTotalMatches && (
          <React.Suspense fallback="cargando...">
            <StackedChart data={valueTotalMatches?.data || []} seriesToMake={valueTotalMatches?.series || []} />
          </React.Suspense>
        )}
        {typeOfGraphs === 4 && valueTotalMatches?.data?.length && !loadingTotalMatches && (
          <React.Suspense fallback="cargando...">
            <StackedChart data={valueTotalMatches?.data || []} seriesToMake={valueTotalMatches?.series || []} />
          </React.Suspense>
        )}
        {typeOfGraphs === 5 && valueTotalMatches?.data?.length && !loadingTotalMatches && (
          <table className="w-full px-4">
            <thead className="bg-cream">
              <tr>
                <td className="py-2 text-center font-sans text-base">Tipo</td>
                <td className="py-2 text-center font-sans text-base">Total</td>
              </tr>
            </thead>
            <tbody>
              {valueTotalMatches.data?.map((item) => (
                <tr className="bg-gray100 text-sm">
                  <td className="text-center font-sans text-lg">
                    {item?.type === 'invitation' && 'Invitación'}
                    {item?.type === 'Algorithm' && 'Algoritmo'}
                  </td>
                  <td className="text-center font-sans text-lg">{item?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {typeOfGraphs === 6 && valueTotalMatches?.data?.length && !loadingTotalMatches && (
          <table className="w-full px-4">
            <thead className="bg-cream">
              <tr>
                <td className="py-2 text-center font-sans text-base">Tipo</td>
                <td className="py-2 text-center font-sans text-base">Total</td>
              </tr>
            </thead>
            <tbody>
              {valueTotalMatches.data?.map((item) => (
                <tr className="bg-gray100 text-sm">
                  <td className="text-center font-sans text-lg">
                    {item?.type === 'invitation' && 'Invitación'}
                    {item?.type === 'Algorithm' && 'Algoritmo'}
                  </td>
                  <td className="text-center font-sans text-lg">{item?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="relative flex h-[500px] w-full flex-col rounded-2xl bg-white">
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">Respuesta a matches</p>
          </div>
        </div>
        {loadingMatchesResponse && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {!valueMatchesResponse?.data?.length && !loadingMatchesResponse && (
          <p className="px-4 text-base">Ups, parece que no hay información acerca de esto</p>
        )}
        {typeOfGraphs === 1 && valueMatchesResponse?.data?.length && !loadingMatchesResponse && (
          <table className="w-full px-4">
            <thead className="bg-cream">
              <tr>
                <td className="py-2 text-center font-sans text-base">Tipo</td>
                <td className="py-2 text-center font-sans text-base">Total</td>
              </tr>
            </thead>
            <tbody>
              {valueMatchesResponse.data?.map((item) => (
                <tr className="bg-gray100 text-sm">
                  <td className="text-center font-sans text-lg">
                    {item?.type === 'invitation' && 'Invitación'}
                    {item?.type === 'Algorithm' && 'Algoritmo'}
                  </td>
                  <td className="text-center font-sans text-lg">{item?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {typeOfGraphs === 2 && valueMatchesResponse?.data?.length && !loadingMatchesResponse && (
          <React.Suspense fallback="cargando...">
            <StackedChart data={valueMatchesResponse?.data || []} seriesToMake={valueMatchesResponse?.series || []} />
          </React.Suspense>
        )}
        {typeOfGraphs === 3 && valueMatchesResponse?.data?.length && !loadingMatchesResponse && (
          <React.Suspense fallback="cargando...">
            <StackedChart data={valueMatchesResponse?.data || []} seriesToMake={valueMatchesResponse?.series || []} />
          </React.Suspense>
        )}
        {typeOfGraphs === 4 && valueMatchesResponse?.data?.length && !loadingMatchesResponse && (
          <React.Suspense fallback="cargando...">
            <StackedChart data={valueMatchesResponse?.data || []} seriesToMake={valueMatchesResponse?.series || []} />
          </React.Suspense>
        )}
        {typeOfGraphs === 5 && valueMatchesResponse?.data?.length && !loadingMatchesResponse && (
          <table className="w-full px-4">
            <thead className="bg-cream">
              <tr>
                <td className="py-2 text-center font-sans text-base">Tipo</td>
                <td className="py-2 text-center font-sans text-base">Total</td>
              </tr>
            </thead>
            <tbody>
              {valueMatchesResponse.data?.map((item) => (
                <tr className="bg-gray100 text-sm">
                  <td className="text-center font-sans text-lg">
                    {item?.type === 'invitation' && 'Invitación'}
                    {item?.type === 'Algorithm' && 'Algoritmo'}
                  </td>
                  <td className="text-center font-sans text-lg">{item?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {typeOfGraphs === 6 && valueMatchesResponse?.data?.length && !loadingMatchesResponse && (
          <table className="w-full px-4">
            <thead className="bg-cream">
              <tr>
                <td className="py-2 text-center font-sans text-base">Tipo</td>
                <td className="py-2 text-center font-sans text-base">Total</td>
              </tr>
            </thead>
            <tbody>
              {valueMatchesResponse.data?.map((item) => (
                <tr className="bg-gray100 text-sm">
                  <td className="text-center font-sans text-lg">
                    {item?.type === 'invitation' && 'Invitación'}
                    {item?.type === 'Algorithm' && 'Algoritmo'}
                  </td>
                  <td className="text-center font-sans text-lg">{item?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="relative flex h-full w-full flex-col rounded-2xl bg-white pb-10">
        <div className="relative mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="pt-2 text-xl 2xl:text-2xl">Días que tarda un usuario en recibir matches</p>
          </div>
          <div className="absolute right-4 top-2 flex items-baseline gap-x-1 self-center pl-2">
            <p className="font-sans text-sm">Rango</p>
            <select
              className="rounded-lg border-0 bg-white px-2 py-1 font-sans text-sm"
              defaultValue={1}
              onChange={(e) => setMatchUsersSelector(Number(e.target.value))}
            >
              <option value={1}>7 días</option>
              <option value={2}>14 días</option>
              <option value={3}>30 días</option>
              <option value={4}>45 días</option>
              <option value={5}>60 días</option>
            </select>
          </div>
        </div>
        {loadingMatchesUsers && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {(!valueMatchesUsers?.data < 0 || valueMatchesUsers?.data === null || valueMatchesUsers?.data === undefined) &&
        !loadingMatchesUsers ? (
          <p className="px-4 text-base">Ups, parece que no hay información acerca de esto</p>
        ) : (
          <p className="text-center text-2xl">{valueMatchesUsers?.data}</p>
        )}
      </div>
    </div>
  );
};

export default MatchesAnalytics;
