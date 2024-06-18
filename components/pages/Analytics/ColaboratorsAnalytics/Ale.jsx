import { CircularProgress } from '@mui/material';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineDiversity3 } from 'react-icons/md';
import {
  getAnalyticsColaboratorsUsersByCommunity,
  getAnalyticsColaboratorsUsersByCommunityViability,
  getAnalyticsColaboratorsUsersByCommunityViabilityActive,
} from '../../../../services/analytics';

// eslint-disable-next-line react/prop-types
const Ale = ({ range, typeOfGraphs }) => {
  const { data: usersByCommunity, isLoading: loadingUsersByCommunity } = useQuery({
    queryFn: () => getAnalyticsColaboratorsUsersByCommunity({ ...range, type: typeOfGraphs }),
    queryKey: ['ale-UsersByCommunity', range, typeOfGraphs],
  });

  const { data: usersByCommunityViability, isLoading: loadingUsersByCommunityViability } = useQuery({
    queryFn: () => getAnalyticsColaboratorsUsersByCommunityViability({ ...range, type: typeOfGraphs }),
    queryKey: ['ale-UsersByCommunityViability', range, typeOfGraphs],
  });

  const { data: usersByCommunityViabilityActive, isLoading: loadingUsersByCommunityViabilityActive } = useQuery({
    queryFn: () => getAnalyticsColaboratorsUsersByCommunityViabilityActive({ ...range, type: typeOfGraphs }),
    queryKey: ['ale-UsersByCommunityViabilityActive', range, typeOfGraphs],
  });

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-4 pb-4 pt-8">
      <div className="col-span-1 flex h-max w-full flex-col rounded-2xl bg-white px-4 py-2 drop-shadow-lg">
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">Usuarios por comunidad</p>
            <p className="text-sm">Cantidad de usuarios</p>
          </div>
        </div>
        {loadingUsersByCommunity && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {!usersByCommunity?.data?.length && !loadingUsersByCommunity && (
          <p className="text-base">Ups, parece que no hay información acerca de esto</p>
        )}
        {(typeOfGraphs === 1 || typeOfGraphs === 5 || typeOfGraphs === 6) &&
          usersByCommunity?.data?.length &&
          !loadingUsersByCommunity && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Grupo</td>
                  <td className="py-2 text-center font-sans text-base">Total</td>
                </tr>
              </thead>
              <tbody>
                {usersByCommunity.data?.map((item, index) => (
                  <tr key={`${item?.value + index}`} className="bg-gray100 text-sm">
                    <td className="text-center font-sans text-lg">{item?.label}</td>
                    <td className="text-center font-sans text-lg">{item?.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        {(typeOfGraphs === 2 || typeOfGraphs === 3 || typeOfGraphs === 4) &&
          usersByCommunity?.data?.length &&
          !loadingUsersByCommunity && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Grupo</td>
                  <td className="py-2 text-center font-sans text-base">Periodo</td>
                  <td className="py-2 text-center font-sans text-base">Total</td>
                </tr>
              </thead>
              <tbody>
                {usersByCommunity.data?.map((item, index) => (
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
      <div className="col-span-1 flex h-max w-full flex-col rounded-2xl bg-white px-4 py-2 drop-shadow-lg">
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
      <div className="col-span-1 flex h-max w-full flex-col rounded-2xl bg-white px-4 py-2 drop-shadow-lg">
        <div className="mb-3 flex flex-row items-center gap-4 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
            <MdOutlineDiversity3 size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">Usuarios por comunidad viables activos</p>
            <p className="text-sm">Cantidad de usuarios</p>
          </div>
        </div>
        {loadingUsersByCommunityViabilityActive && (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress className="text-purple" />
          </div>
        )}
        {!usersByCommunityViabilityActive?.data?.length && !loadingUsersByCommunityViabilityActive && (
          <p className="text-base">Ups, parece que no hay información acerca de esto</p>
        )}
        {(typeOfGraphs === 1 || typeOfGraphs === 5 || typeOfGraphs === 6) &&
          usersByCommunityViabilityActive?.data?.length &&
          !loadingUsersByCommunityViabilityActive && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Grupo</td>
                  <td className="py-2 text-center font-sans text-base">Total</td>
                </tr>
              </thead>
              <tbody>
                {usersByCommunityViabilityActive.data?.map((item, index) => (
                  <tr key={`${item?.value + index}`} className="bg-gray100 text-sm">
                    <td className="text-center font-sans text-lg">{item?.label}</td>
                    <td className="text-center font-sans text-lg">{item?.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        {(typeOfGraphs === 2 || typeOfGraphs === 3 || typeOfGraphs === 4) &&
          usersByCommunityViabilityActive?.data?.length &&
          !loadingUsersByCommunityViabilityActive && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Grupo</td>
                  <td className="py-2 text-center font-sans text-base">Periodo</td>
                  <td className="py-2 text-center font-sans text-base">Total</td>
                </tr>
              </thead>
              <tbody>
                {usersByCommunityViabilityActive.data?.map((item, index) => (
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
    </div>
  );
};

export default Ale;
