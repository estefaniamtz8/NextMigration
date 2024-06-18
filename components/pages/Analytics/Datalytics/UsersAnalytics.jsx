import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineDiversity3 } from 'react-icons/md';
import { BiWorld } from 'react-icons/bi';
import {
  getAnalyticsMapUsers,
  getAnalyticsViabilityUsers,
  getAnalyticsViabilityUsersBySegment,
} from '../../../../services/analytics';

const StackedChart = React.lazy(() => import('../components/Charts/StackedColumns'));

// eslint-disable-next-line react/prop-types
const UsersAnalytics = ({ range, typeOfGraphs }) => {
  const { data: viabilityUsers, isLoading: loadingViabilityUsers } = useQuery({
    queryFn: () => getAnalyticsViabilityUsers({ ...range, type: typeOfGraphs }),
    queryKey: ['viabilityUsers', range, typeOfGraphs],
  });

  const { data: viabilityUsersBySegment, isLoading: loadingViabilityUsersBySegment } = useQuery({
    queryFn: () => getAnalyticsViabilityUsersBySegment({ ...range, type: typeOfGraphs }),
    queryKey: ['viabilityUsersBySegment', range, typeOfGraphs],
  });

  const [typeOfMap, setTypeOfMap] = useState({
    type: 1,
    country: 'México',
    state: 'Ciudad de México',
  });

  const { data: mapUsers, isLoading: loadingMapUsers } = useQuery({
    queryFn: () =>
      getAnalyticsMapUsers({
        ...range,
        type: typeOfGraphs,
        typeMap: typeOfMap?.type,
        country: typeOfMap?.country,
        state: typeOfMap?.state,
      }),
    queryKey: ['mapUsers', range, typeOfGraphs, typeOfMap],
  });

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-4 pb-4 pt-8">
      <div className="col-span-1 flex h-[500px] w-full flex-col rounded-2xl bg-white px-4 py-2 drop-shadow-lg">
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">Viabilidad de usuarios</p>
            <p className="text-sm">Cantidad de usuarios</p>
          </div>
        </div>
        {loadingViabilityUsers && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {!viabilityUsers?.data?.length && !loadingViabilityUsers && (
          <p className="text-base">Ups, parece que no hay información acerca de esto</p>
        )}
        {typeOfGraphs === 1 && viabilityUsers?.data?.length && !loadingViabilityUsers && (
          <table className="w-full px-4">
            <thead className="bg-cream">
              <tr>
                <td className="py-2 text-center font-sans text-base">Grupo</td>
                <td className="py-2 text-center font-sans text-base">Total</td>
              </tr>
            </thead>
            <tbody>
              {viabilityUsers.data?.map((item, index) => (
                <tr key={`${item?.value + index}`} className="bg-gray100 text-sm">
                  <td className="text-center font-sans text-lg">
                    {item?.category === 'viable' && 'Viable'}
                    {item?.category === 'noViable' && 'No Viable'}
                    {item?.category === 'inProcess' && 'En proceso'}
                  </td>
                  <td className="text-center font-sans text-lg">{item?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {typeOfGraphs === 2 && viabilityUsers?.data?.length && !loadingViabilityUsers && (
          <React.Suspense fallback="cargando...">
            <StackedChart data={viabilityUsers?.data || []} seriesToMake={viabilityUsers?.series || []} />
          </React.Suspense>
        )}
        {typeOfGraphs === 3 && viabilityUsers?.data?.length && !loadingViabilityUsers && (
          <React.Suspense fallback="cargando...">
            <StackedChart data={viabilityUsers?.data || []} seriesToMake={viabilityUsers?.series || []} />
          </React.Suspense>
        )}
        {typeOfGraphs === 4 && viabilityUsers?.data?.length && !loadingViabilityUsers && (
          <React.Suspense fallback="cargando...">
            <StackedChart data={viabilityUsers?.data || []} seriesToMake={viabilityUsers?.series || []} />
          </React.Suspense>
        )}
        {typeOfGraphs === 5 && viabilityUsers?.data?.length && !loadingViabilityUsers && (
          <table className="w-full px-4">
            <thead className="bg-cream">
              <tr>
                <td className="py-2 text-center font-sans text-base">Grupo</td>
                <td className="py-2 text-center font-sans text-base">Total</td>
              </tr>
            </thead>
            <tbody>
              {viabilityUsers.data?.map((item) => (
                <tr className="bg-gray100 text-sm">
                  <td className="text-center font-sans text-lg">
                    {item?.category === 'viable' && 'Viable'}
                    {item?.category === 'noViable' && 'No Viable'}
                    {item?.category === 'inProcess' && 'En proceso'}
                  </td>
                  <td className="text-center font-sans text-lg">{item?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {typeOfGraphs === 6 && viabilityUsers?.data?.length && !loadingViabilityUsers && (
          <table className="w-full px-4">
            <thead className="bg-cream">
              <tr>
                <td className="py-2 text-center font-sans text-base">Grupo</td>
                <td className="py-2 text-center font-sans text-base">Total</td>
              </tr>
            </thead>
            <tbody>
              {viabilityUsers.data?.map((item) => (
                <tr className="bg-gray100 text-sm">
                  <td className="text-center font-sans text-lg">
                    {item?.category === 'viable' && 'Viable'}
                    {item?.category === 'noViable' && 'No Viable'}
                    {item?.category === 'inProcess' && 'En proceso'}
                  </td>
                  <td className="text-center font-sans text-lg">{item?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div
        className={`col-span-2 flex ${
          typeOfGraphs === 1 || typeOfGraphs === 5 || typeOfGraphs === 6 ? 'h-[500px]' : 'h-full'
        } w-full flex-col rounded-2xl bg-white px-4 pb-10 pt-10 drop-shadow-lg`}
      >
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">Viabilidad de usuarios por segmento</p>
            <p className="text-sm">Cantidad de usuarios</p>
          </div>
        </div>
        {loadingViabilityUsersBySegment && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {!viabilityUsers?.data?.length && !loadingViabilityUsersBySegment && (
          <p className="text-base">Ups, parece que no hay información acerca de esto</p>
        )}
        {(typeOfGraphs === 1 || typeOfGraphs === 5 || typeOfGraphs === 6) &&
          viabilityUsers?.data?.length &&
          !loadingViabilityUsersBySegment && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Segmento</td>
                  <td className="py-2 text-center font-sans text-base">Viable</td>
                  <td className="py-2 text-center font-sans text-base">No Viable</td>
                  <td className="py-2 text-center font-sans text-base">En proceso</td>
                </tr>
              </thead>
              <tbody>
                {viabilityUsersBySegment?.data?.map((segment, index) => (
                  <tr key={`${segment?.segmento + index}`} className="bg-gray100 text-sm">
                    <td className="text-center font-sans text-lg">{segment?.segmento}</td>
                    <td className="text-center font-sans text-lg">
                      {segment?.data?.find((category) => category?.category === 'viable')?.value}
                    </td>
                    <td className="text-center font-sans text-lg">
                      {segment?.data?.find((category) => category?.category === 'noViable')?.value}
                    </td>
                    <td className="text-center font-sans text-lg">
                      {segment?.data?.find((category) => category?.category === 'inProcess')?.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        {(typeOfGraphs === 2 || typeOfGraphs === 3 || typeOfGraphs === 4) &&
          Object.entries(viabilityUsersBySegment?.data || {})?.length > 0 &&
          !loadingViabilityUsersBySegment && (
            <div className="grid grid-cols-2">
              {Object.values(viabilityUsersBySegment?.data || {})?.map((segment) => (
                <div className="h-[400px] pb-6" key={segment?.segment}>
                  <h2 className="text-center text-lg font-medium">{segment[0]?.segment}</h2>
                  <React.Suspense fallback="cargando...">
                    <StackedChart data={segment || []} seriesToMake={viabilityUsersBySegment?.series || []} />
                  </React.Suspense>
                </div>
              ))}
            </div>
          )}
      </div>

      <div className="col-span-2 flex h-full w-full flex-col rounded-2xl bg-white px-4 pb-10 pt-10 drop-shadow-lg">
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <BiWorld size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">Viabilidad de usuarios por lugar</p>
            <p className="text-sm">Cantidad de usuarios</p>
          </div>
        </div>
        {loadingMapUsers && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {!mapUsers?.data?.length && !loadingMapUsers && (
          <p className="px-4 text-base">Ups, parece que no hay información acerca de esto</p>
        )}
        {mapUsers?.data?.length && !loadingMapUsers && typeOfMap?.type === 1 && (
          <h2 className="px-4 py-2 text-lg font-medium">Vista actual: Países </h2>
        )}
        {mapUsers?.data?.length && !loadingMapUsers && typeOfMap?.type === 2 && (
          <h2 className="px-4 py-2 text-lg font-medium">Vista actual: Estados </h2>
        )}
        {mapUsers?.data?.length && !loadingMapUsers && typeOfMap?.type === 3 && (
          <h2 className="px-4 py-2 text-lg font-medium">Vista actual: Municipios </h2>
        )}

        {typeOfMap?.type === 1 && mapUsers?.data?.length && !loadingMapUsers && (
          <table className="h-full w-full px-4">
            <thead className="bg-cream">
              <tr>
                <td className="py-2 text-center font-sans text-base">País</td>
                <td className="py-2 text-center font-sans text-base">Usuarios</td>
              </tr>
            </thead>
            <tbody>
              {mapUsers?.data?.map((place) => (
                <tr key={place?.country} className="bg-gray100 text-sm">
                  <td
                    onClick={() => {
                      if (place?.country === 'México') {
                        setTypeOfMap({
                          ...typeOfMap,
                          type: 2,
                          state: 'Ciudad de México',
                        });
                      }
                    }}
                    className={`${place?.country === 'México' && 'cursor-pointer'} text-center font-sans text-lg`}
                  >
                    {place?.country}
                  </td>
                  <td className="text-center font-sans text-lg">{place?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {typeOfMap?.type === 2 && mapUsers?.data?.length && !loadingMapUsers && (
          <table className="h-full w-full px-4">
            <thead className="bg-cream">
              <tr>
                <td
                  onClick={() => {
                    setTypeOfMap({
                      ...typeOfMap,
                      type: 1,
                      country: 'México',
                      state: '',
                    });
                  }}
                  className="cursor-pointer py-2 text-center font-sans text-base"
                >
                  País
                </td>
                <td className="py-2 text-center font-sans text-base">Estado</td>
                <td className="py-2 text-center font-sans text-base">Usuarios</td>
              </tr>
            </thead>
            <tbody>
              {mapUsers?.data?.map((place) => (
                <tr key={place?.country} className="bg-gray100 text-sm">
                  <td
                    onClick={() => {
                      setTypeOfMap({
                        ...typeOfMap,
                        type: 1,
                        country: 'México',
                        state: '',
                      });
                    }}
                    className="cursor-pointer text-center font-sans text-lg"
                  >
                    {place?.country}
                  </td>
                  <td
                    onClick={() => {
                      setTypeOfMap({
                        ...typeOfMap,
                        type: 3,
                        country: 'México',
                        state: place?.state,
                      });
                    }}
                    className="cursor-pointer text-center font-sans text-lg"
                  >
                    {place?.state}
                  </td>
                  <td className="text-center font-sans text-lg">{place?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {typeOfMap?.type === 3 && mapUsers?.data?.length && !loadingMapUsers && (
          <table className="h-max w-full px-4">
            <thead className="bg-cream">
              <tr>
                <td
                  onClick={() => {
                    setTypeOfMap({
                      ...typeOfMap,
                      type: 1,
                      country: 'México',
                      state: '',
                    });
                  }}
                  className="cursor-pointer py-2 text-center font-sans text-base"
                >
                  País
                </td>
                <td
                  onClick={() => {
                    setTypeOfMap({
                      ...typeOfMap,
                      type: 2,
                      country: 'México',
                      state: '',
                    });
                  }}
                  className="cursor-pointer py-2 text-center font-sans text-base"
                >
                  Estado
                </td>
                <td className="py-2 text-center font-sans text-base">Municipio</td>
                <td className="py-2 text-center font-sans text-base">Usuarios</td>
              </tr>
            </thead>
            <tbody>
              {mapUsers?.data?.map((place) => (
                <tr key={place?.country} className="bg-gray100 text-sm">
                  <td
                    onClick={() => {
                      setTypeOfMap({
                        ...typeOfMap,
                        type: 1,
                        country: 'México',
                        state: '',
                      });
                    }}
                    className="cursor-pointer text-center font-sans text-lg"
                  >
                    {place?.country}
                  </td>
                  <td
                    onClick={() => {
                      setTypeOfMap({
                        ...typeOfMap,
                        type: 2,
                        country: 'México',
                        state: place?.state,
                      });
                    }}
                    className="cursor-pointer text-center font-sans text-lg"
                  >
                    {place?.state}
                  </td>
                  <td className="text-center font-sans text-lg">{place?.municipality}</td>
                  <td className="text-center font-sans text-lg">{place?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UsersAnalytics;
