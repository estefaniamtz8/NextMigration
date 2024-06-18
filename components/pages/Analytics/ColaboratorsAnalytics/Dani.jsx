import { CircularProgress } from '@mui/material';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineDiversity3 } from 'react-icons/md';
import {
  getAnalyticsColaboratorsMatchesAnswered,
  getAnalyticsColaboratorsMatchesPercentage,
  getAnalyticsColaboratorsMatchesResponse,
  getAnalyticsColaboratorsUsersByCommunityViability,
  getAnalyticsColaboratorsViabilityUsersBySegment,
  getAnalyticsColaboratorsViabilityUsersByState,
} from '../../../../services/analytics';

// eslint-disable-next-line react/prop-types
const Dani = ({ range, typeOfGraphs }) => {
  const { data: matchesResponse, isLoading: loadingMatchesResponse } = useQuery({
    queryFn: () => getAnalyticsColaboratorsMatchesResponse({ ...range, type: typeOfGraphs }),
    queryKey: ['dani-MatchesResponse', range, typeOfGraphs],
  });

  const { data: matchesPercentage, isLoading: loadingMatchesPercentage } = useQuery({
    queryFn: () => getAnalyticsColaboratorsMatchesPercentage({ ...range, type: typeOfGraphs }),
    queryKey: ['dani-MatchesPercentage', range, typeOfGraphs],
  });

  const { data: usersByCommunityViability, isLoading: loadingUsersByCommunityViability } = useQuery({
    queryFn: () => getAnalyticsColaboratorsUsersByCommunityViability({ ...range, type: typeOfGraphs }),
    queryKey: ['dani-UsersByCommunityViability', range, typeOfGraphs],
  });

  const { data: viabilityUsersBySegment, isLoading: loadingViabilityUsersBySegment } = useQuery({
    queryFn: () => getAnalyticsColaboratorsViabilityUsersBySegment({ ...range, type: typeOfGraphs }),
    queryKey: ['dani-ViabilityUsersBySegment', range, typeOfGraphs],
  });

  const { data: viabilityUsersByState, isLoading: loadingViabilityUsersByState } = useQuery({
    queryFn: () => getAnalyticsColaboratorsViabilityUsersByState({ ...range, type: typeOfGraphs }),
    queryKey: ['dani-ViabilityUsersByState', range, typeOfGraphs],
  });

  const { data: matchesAnswered, isLoading: loadingMatchesAnswered } = useQuery({
    queryFn: () => getAnalyticsColaboratorsMatchesAnswered({ ...range, type: typeOfGraphs }),
    queryKey: ['dani-matchesAnswered', range, typeOfGraphs],
  });

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-4 pb-4 pt-8">
      <div className="col-span-1 flex h-max min-h-[400px] w-full flex-col rounded-2xl bg-white px-4 py-2 drop-shadow-lg">
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">Usuarios por comunidad viables</p>
            <p className="text-sm">Cantidad de usuarios</p>
          </div>
        </div>
        {loadingUsersByCommunityViability && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {!usersByCommunityViability?.data?.length && !loadingUsersByCommunityViability && (
          <p className="text-base">Ups, parece que no hay información acerca de esto</p>
        )}
        {(typeOfGraphs === 1 || typeOfGraphs === 5 || typeOfGraphs === 6) &&
          usersByCommunityViability?.data?.length &&
          !loadingUsersByCommunityViability && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Grupo</td>
                  <td className="py-2 text-center font-sans text-base">Total</td>
                </tr>
              </thead>
              <tbody>
                {usersByCommunityViability.data?.map((item, index) => (
                  <tr key={`${item?.value + index}`} className="bg-gray100 text-sm">
                    <td className="text-center font-sans text-lg">{item?.label}</td>
                    <td className="text-center font-sans text-lg">{item?.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        {(typeOfGraphs === 2 || typeOfGraphs === 3 || typeOfGraphs === 4) &&
          usersByCommunityViability?.data?.length &&
          !loadingUsersByCommunityViability && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Grupo</td>
                  <td className="py-2 text-center font-sans text-base">Periodo</td>
                  <td className="py-2 text-center font-sans text-base">Total</td>
                </tr>
              </thead>
              <tbody>
                {usersByCommunityViability.data?.map((item, index) => (
                  <tr key={`${item?.label + item?.period + index}`} className="bg-gray100 text-sm">
                    <td className="text-center font-sans text-lg">{item?.label}</td>
                    <td className="text-center font-sans text-lg">{item?.period}</td>
                    <td className="text-center font-sans text-lg">{item?.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
      <div className="col-span-1 flex h-max min-h-[400px] w-full flex-col rounded-2xl bg-white px-4 py-2 drop-shadow-lg">
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">Usuarios por segmento</p>
            <p className="text-sm">Cantidad de usuarios</p>
          </div>
        </div>
        {loadingViabilityUsersBySegment && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {!viabilityUsersBySegment?.data?.length && !loadingViabilityUsersBySegment && (
          <p className="text-base">Ups, parece que no hay información acerca de esto</p>
        )}
        {(typeOfGraphs === 1 || typeOfGraphs === 5 || typeOfGraphs === 6) &&
          viabilityUsersBySegment?.data?.length &&
          !loadingViabilityUsersBySegment && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Segmento</td>
                  <td className="py-2 text-center font-sans text-base">Viables</td>
                  <td className="py-2 text-center font-sans text-base">No viables</td>
                  <td className="py-2 text-center font-sans text-base">En proceso</td>
                </tr>
              </thead>
              <tbody>
                {viabilityUsersBySegment.data?.map((item, index) => (
                  <tr key={`${item?.value + index}`} className="bg-gray100 text-sm">
                    <td className="text-center font-sans text-lg">{item?.segmento}</td>
                    <td className="text-center font-sans text-lg">
                      {item?.data?.find((item) => item?.category === 'viable')?.value}
                    </td>
                    <td className="text-center font-sans text-lg">
                      {item?.data?.find((item) => item?.category === 'noViable')?.value}
                    </td>
                    <td className="text-center font-sans text-lg">
                      {item?.data?.find((item) => item?.category === 'inProcess')?.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        {(typeOfGraphs === 2 || typeOfGraphs === 3 || typeOfGraphs === 4) &&
          viabilityUsersBySegment?.data?.length &&
          !loadingViabilityUsersBySegment && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Segmento</td>
                  <td className="py-2 text-center font-sans text-base">Periodo</td>
                  <td className="py-2 text-center font-sans text-base">Viable</td>
                  <td className="py-2 text-center font-sans text-base">No viable</td>
                  <td className="py-2 text-center font-sans text-base">En proceso</td>
                </tr>
              </thead>
              <tbody>
                {viabilityUsersBySegment.data?.map((item, index) => (
                  <tr key={`${item?.segment + item?.period + index}`} className="bg-gray100 text-sm">
                    <td className="text-center font-sans text-lg">{item?.segment}</td>
                    <td className="text-center font-sans text-lg">{item?.period}</td>
                    <td className="text-center font-sans text-lg">{item?.viable}</td>
                    <td className="text-center font-sans text-lg">{item?.noViable}</td>
                    <td className="text-center font-sans text-lg">{item?.inProcess}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
      <div className="col-span-1 flex h-max min-h-[400px] w-full flex-col rounded-2xl bg-white px-4 py-2 drop-shadow-lg">
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
        {!matchesResponse?.data?.length && !loadingMatchesResponse && (
          <p className="text-base">Ups, parece que no hay información acerca de esto</p>
        )}
        {(typeOfGraphs === 1 || typeOfGraphs === 5 || typeOfGraphs === 6) &&
          matchesResponse?.data?.length &&
          !loadingMatchesResponse && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Tipo</td>
                  <td className="py-2 text-center font-sans text-base">Total</td>
                </tr>
              </thead>
              <tbody>
                {matchesResponse.data?.map((item, index) => (
                  <tr key={`${item?.value + index}`} className="bg-gray100 text-sm">
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
        {(typeOfGraphs === 2 || typeOfGraphs === 3 || typeOfGraphs === 4) &&
          matchesResponse?.data?.length &&
          !loadingMatchesResponse && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Tipo</td>
                  <td className="py-2 text-center font-sans text-base">Periodo</td>
                  <td className="py-2 text-center font-sans text-base">Total</td>
                </tr>
              </thead>
              <tbody>
                {matchesResponse.data
                  ?.sort((a, b) => a?.period < b?.period)
                  ?.map((item, index) => (
                    <tr key={`${item?.label + item?.period + index}`} className="bg-gray100 text-sm">
                      <td className="text-center font-sans text-lg">
                        {item?.type === 'invitation' && 'Invitación'}
                        {item?.type === 'Algorithm' && 'Algoritmo'}
                      </td>
                      <td className="text-center font-sans text-lg">{item?.period}</td>
                      <td className="text-center font-sans text-lg">{item?.value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
      </div>
      <div className="col-span-1 flex h-max min-h-[400px] w-full flex-col rounded-2xl bg-white px-4 py-2 drop-shadow-lg">
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">Respuesta a matches por tipos</p>
          </div>
        </div>
        {loadingMatchesAnswered && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {!matchesAnswered?.data?.length && !loadingMatchesAnswered && (
          <p className="text-base">Ups, parece que no hay información acerca de esto</p>
        )}
        {(typeOfGraphs === 1 || typeOfGraphs === 5 || typeOfGraphs === 6) &&
          matchesAnswered?.data?.length &&
          !loadingMatchesAnswered && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Respuesta</td>
                  <td className="py-2 text-center font-sans text-base">Total</td>
                </tr>
              </thead>
              <tbody>
                {matchesAnswered.data?.map((item, index) => (
                  <tr key={`${item?.value + index}`} className="bg-gray100 text-sm">
                    <td className="text-center font-sans text-lg">
                      {item?.state === 'rejected' && 'Rechazado'}
                      {item?.state === 'accepted' && 'Aceptado'}
                      {item?.state === 'unanswered' && 'Sin responder'}
                    </td>
                    <td className="text-center font-sans text-lg">{item?.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        {(typeOfGraphs === 2 || typeOfGraphs === 3 || typeOfGraphs === 4) &&
          matchesAnswered?.data?.length &&
          !loadingMatchesAnswered && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Respuesta</td>
                  <td className="py-2 text-center font-sans text-base">Periodo</td>
                  <td className="py-2 text-center font-sans text-base">Total</td>
                </tr>
              </thead>
              <tbody>
                {matchesAnswered.data
                  ?.sort((a, b) => {
                    if (a.state !== b.state) {
                      if (a.state < b.state) return -1;
                      if (a.state > b.state) return 1;
                    }
                    return a.period - b.period;
                  })
                  ?.map((item, index) => (
                    <tr key={`${item?.state + index}`} className="bg-gray100 text-sm">
                      <td className="text-center font-sans text-lg">
                        {item?.state === 'rejected' && 'Rechazado'}
                        {item?.state === 'accepted' && 'Aceptado'}
                        {item?.state === 'unanswered' && 'Sin responder'}
                      </td>
                      <td className="text-center font-sans text-lg">{item?.period}</td>
                      <td className="text-center font-sans text-lg">{item?.value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
      </div>
      <div className="col-span-1 flex min-h-[400px] w-full flex-col rounded-2xl bg-white px-4 py-2 drop-shadow-lg">
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">% de usuarios con matches</p>
          </div>
        </div>
        {loadingMatchesPercentage && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {matchesPercentage?.data === null && !loadingMatchesPercentage && (
          <p className="text-base">Ups, parece que no hay información acerca de esto</p>
        )}
        {matchesPercentage?.data !== null && !loadingMatchesPercentage && (
          <p className="text-center text-xl 2xl:text-2xl">{matchesPercentage?.data}%</p>
        )}
      </div>
      <div className="col-span-2 flex h-max min-h-[400px] w-full flex-col overflow-x-scroll rounded-2xl bg-white px-4 py-2 drop-shadow-lg">
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">Usuarios por estado</p>
            <p className="text-sm">Cantidad de usuarios</p>
          </div>
        </div>
        {loadingViabilityUsersByState && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {!viabilityUsersByState?.data?.length && !loadingViabilityUsersByState && (
          <p className="text-base">Ups, parece que no hay información acerca de esto</p>
        )}
        {(typeOfGraphs === 1 || typeOfGraphs === 5 || typeOfGraphs === 6) &&
          viabilityUsersByState?.data?.length &&
          !loadingViabilityUsersByState && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Estado</td>
                  <td className="py-2 text-center font-sans text-base">Viable</td>
                  <td className="py-2 text-center font-sans text-base">No viable</td>
                  <td className="py-2 text-center font-sans text-base">En proceso</td>
                </tr>
              </thead>
              <tbody>
                {viabilityUsersByState.data?.map((item, index) => (
                  <tr key={`${item?.value + index}`} className="bg-gray100 text-sm">
                    <td className="text-center font-sans text-lg">{item?.state}</td>
                    <td className="text-center font-sans text-lg">
                      {item?.data?.find((subItem) => subItem?.viability === 'viable')?.value}
                    </td>
                    <td className="text-center font-sans text-lg">
                      {item?.data?.find((subItem) => subItem?.viability === 'noViable')?.value}
                    </td>
                    <td className="text-center font-sans text-lg">
                      {item?.data?.find((subItem) => subItem?.viability === 'inProcess')?.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        {(typeOfGraphs === 2 || typeOfGraphs === 3 || typeOfGraphs === 4) &&
          viabilityUsersByState?.data?.length &&
          !loadingViabilityUsersByState && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                {typeOfGraphs === 2 && (
                  <tr>
                    <td className="py-2 text-center font-sans text-base">Estado</td>
                    <td className="w-32 py-2 text-center font-sans text-base">Status</td>
                    {viabilityUsersByState?.periods?.map((period) => (
                      <td key={period} className="py-2 text-center font-sans text-base">
                        {period}
                      </td>
                    ))}
                  </tr>
                )}
                {typeOfGraphs === 3 && (
                  <tr>
                    <td className="py-2 text-center font-sans text-base">Estado</td>
                    <td className="w-32 py-2 text-center font-sans text-base">Status</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 1</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 2</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 3</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 4</td>
                  </tr>
                )}
                {typeOfGraphs === 4 && (
                  <tr>
                    <td className="py-2 text-center font-sans text-base">Estado</td>
                    <td className="py-2 text-center font-sans text-base">Status</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 1</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 2</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 3</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 4</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 5</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 6</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 7</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 8</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 9</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 10</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 11</td>
                    <td className="py-2 text-center font-sans text-base">Periodo 12</td>
                  </tr>
                )}
              </thead>
              <tbody>
                {viabilityUsersByState.data?.map((item, index) => (
                  <>
                    <tr key={`${item?.state + item?.info[index]?.period + index}`} className="bg-gray100 text-sm">
                      <td rowSpan={3} className="text-center font-sans text-lg">
                        {item?.state}
                      </td>
                      <td className="text-center font-sans text-lg">No viable</td>
                      {item?.info?.map((subItem) => (
                        <td key={`${subItem?.period + index}`} className="text-center font-sans text-lg">
                          {subItem?.data?.find((subsubItem) => subsubItem?.viability === 'noViable')?.value}
                        </td>
                      ))}
                    </tr>
                    <tr key={`${item?.state + item?.info[index]?.period + index}`} className="bg-gray100 text-sm">
                      <td className="text-center font-sans text-lg">Viable</td>
                      {item?.info?.map((subItem) => (
                        <td key={`${subItem?.period + index}`} className="text-center font-sans text-lg">
                          {subItem?.data?.find((item) => item?.viability === 'viable')?.value}
                        </td>
                      ))}
                    </tr>
                    <tr key={`${item?.state + item?.info[index]?.period + index}`} className="bg-gray100 text-sm">
                      <td className="text-center font-sans text-lg">En proceso</td>
                      {item?.info?.map((subItem) => (
                        <td key={`${subItem?.period + index}`} className="text-center font-sans text-lg">
                          {subItem?.data?.find((item) => item?.viability === 'inProcess')?.value}
                        </td>
                      ))}
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  );
};

export default Dani;
