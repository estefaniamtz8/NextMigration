import { BsClock, BsPeople } from 'react-icons/bs';
import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MdClose, MdDone, MdOutlineDiversity3 } from 'react-icons/md';
import {
  getAnalyticsCatchment,
  getAnalyticsRegisterInfo,
  getAnalyticsTalentDistribution,
  getAnalyticsTotalRegister,
  getAnalyticsViabilityUsersByGroup,
  getAnalyticsViabilityUsersV1,
} from '../../../../services/analytics';
import PartitionedBarChart from '../components/Charts/Pivot/PartitionedBarChart';

const ColumnChart = React.lazy(() => import('../components/Charts/Column'));
const DonutChart = React.lazy(() => import('../components/Charts/Donut'));
const StackedChart = React.lazy(() => import('../components/Charts/StackedColumns'));

// eslint-disable-next-line react/prop-types
const UsersAnalytics = ({ range }) => {
  const [allUsersActiveTable, setAllUsersActiveTable] = useState(false);

  const [catchmentUserActiveTable, setCatchmentUserActiveTable] = useState(false);

  const [talentDistributionActiveTable, setTalentDistributionActiveTable] = useState(false);

  const [viabilityUsersType, setViabilityType] = useState(1);

  const { data: allUsers, isLoading: loading } = useQuery({
    queryFn: () => getAnalyticsTotalRegister(range, allUsersActiveTable),
    queryKey: ['getTotalRegister', range, allUsersActiveTable],
  });

  const { data: catchmentUser, isLoading: loadingCatchment } = useQuery({
    queryFn: () => getAnalyticsCatchment(range, catchmentUserActiveTable),
    queryKey: ['getCatchment', range, catchmentUserActiveTable],
  });

  const { data: talentDistribution, isLoading: loadingTalentDistribution } = useQuery({
    queryFn: () => getAnalyticsTalentDistribution(range),
    queryKey: ['talentDistribution', range, talentDistributionActiveTable],
  });

  const { data: viabilityUsers, isLoading: loadingViabilityUsers } = useQuery({
    queryFn: () => getAnalyticsViabilityUsersV1({ ...range, type: viabilityUsersType }),
    queryKey: ['viabilityUsersV1', range, viabilityUsersType],
  });

  const [viabilityUsersByGroupType, setViabilityUsersByType] = useState(1);

  const { data: viabilityUsersByGroup, isLoading: loadingViabilityUsersByGroup } = useQuery({
    queryFn: () => getAnalyticsViabilityUsersByGroup({ ...range, type: viabilityUsersByGroupType }),
    queryKey: ['viabilityUsersByGroup', range, viabilityUsersByGroupType],
  });

  const [registerInfoType, setRegisterInfoType] = useState(1);

  const { data: registerInfo, isLoading: loadingRegisterInfo } = useQuery({
    queryFn: () => getAnalyticsRegisterInfo({ ...range, type: registerInfoType }),
    queryKey: ['registerInfo', range, registerInfoType],
  });

  // console.log(registerInfo);

  return (
    <>
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
      <div
        className={`relative col-span-4 mt-8 flex ${
          catchmentUserActiveTable ? 'h-full' : 'h-[500px]'
        } flex-col justify-between rounded-2xl bg-white pb-4`}
      >
        <div className="absolute right-4 top-2 flex w-max gap-x-2 rounded-full bg-purple">
          <p
            onClick={() => {
              setCatchmentUserActiveTable(true);
            }}
            className={`cursor-pointer px-2 py-1 text-xs ${
              catchmentUserActiveTable ? 'rounded-l-full rounded-t-full bg-purple text-white' : 'bg-white text-black'
            }`}
          >
            Tabla
          </p>
          <p
            onClick={() => {
              setCatchmentUserActiveTable(false);
            }}
            className={`cursor-pointer px-2 py-1 text-xs ${
              !catchmentUserActiveTable ? 'rounded-r-full rounded-t-full bg-purple text-white' : 'bg-white text-black'
            }`}
          >
            Gráfica
          </p>
        </div>
        {catchmentUserActiveTable ? (
          <div className="flex flex-col">
            <div className="mb-2 flex flex-row items-center gap-4 p-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                <BsPeople size={28} color="#FFF" />
              </div>
              <div>
                <p className="text-base 2xl:text-xl">Detalle registros totales de {catchmentUser?.month}</p>
              </div>
            </div>
            {loadingCatchment ? (
              <div className="flex h-full w-full items-center justify-center">
                <CircularProgress className="text-purple" />
              </div>
            ) : (
              <table className="mx-4">
                <thead className="bg-cream">
                  <tr>
                    <td className="py-2 text-center font-sans text-base">Medio</td>
                    <td className="py-2 text-center font-sans text-base"> Canal</td>
                    <td className="py-2 text-center font-sans text-base">Total</td>
                    <td className="py-2 text-center font-sans text-base">Semana 1</td>
                    <td className="py-2 text-center font-sans text-base">Semana 2</td>
                    <td className="py-2 text-center font-sans text-base">Semana 3</td>
                    <td className="py-2 text-center font-sans text-base">Semana 4</td>
                  </tr>
                </thead>
                <tbody>
                  {catchmentUser?.data?.map((item) => (
                    <tr className="bg-gray100 text-sm">
                      <td className="pl-2">{item?.label}</td>
                      <td className="pl-2">{item?.type}</td>
                      <td className="text-center">{item?.totalValue}</td>
                      <td className="text-center">{item?.values?.find((week) => week?.period === 1)?.value || 0}</td>
                      <td className="text-center">{item?.values?.find((week) => week?.period === 2)?.value || 0}</td>
                      <td className="text-center">{item?.values?.find((week) => week?.period === 3)?.value || 0}</td>
                      <td className="text-center">{item?.values?.find((week) => week?.period === 4)?.value || 0}</td>
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
                <p className="text-base 2xl:text-xl">Detalle registros totales de {catchmentUser?.month}</p>
              </div>
            </div>
            {loadingCatchment ? (
              <div className="flex h-full w-full items-center justify-center">
                <CircularProgress className="text-purple" />
              </div>
            ) : (
              <React.Suspense fallback="cargando...">
                <DonutChart data={catchmentUser?.dataToChart?.slice(0, 10) || []} />
              </React.Suspense>
            )}
          </>
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-4 pb-4 pt-8">
        <div className="relative flex h-[500px] w-full flex-col rounded-2xl bg-white">
          <div className="absolute right-4 top-2 flex w-max gap-x-2 rounded-full bg-purple">
            <p
              onClick={() => {
                setTalentDistributionActiveTable(true);
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                talentDistributionActiveTable
                  ? 'rounded-l-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Tabla
            </p>
            <p
              onClick={() => {
                setTalentDistributionActiveTable(false);
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                !talentDistributionActiveTable
                  ? 'rounded-r-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Gráfica
            </p>
          </div>
          {talentDistributionActiveTable ? (
            <>
              <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <MdOutlineDiversity3 size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-xl 2xl:text-2xl">Categoría de registros</p>
                </div>
              </div>
              <div className="flex h-full flex-col items-center justify-center">
                {loadingTalentDistribution && (
                  <div className="flex h-full w-full items-center justify-center">
                    <CircularProgress className="text-purple" />
                  </div>
                )}
                {talentDistribution?.data?.length &&
                  !loadingTalentDistribution &&
                  talentDistribution?.data?.map((info) => (
                    <div className="flex w-4/5 justify-between border-[1px] border-solid border-black px-8">
                      <p className="text-base font-medium">{info?.category}</p>
                      <p className="text-base font-light">{info?.value}</p>
                    </div>
                  ))}
                {!talentDistribution?.data?.length && !loadingTalentDistribution && (
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
                  <p className="text-xl 2xl:text-2xl">Categoría de registros</p>
                </div>
              </div>
              {loadingTalentDistribution ? (
                <div className="flex h-full w-full items-center justify-center">
                  <CircularProgress className="text-purple" />
                </div>
              ) : (
                <React.Suspense fallback="cargando...">
                  <DonutChart data={talentDistribution?.data || []} />
                </React.Suspense>
              )}
            </>
          )}
        </div>
        <div className="relative flex h-[500px] w-full flex-col rounded-2xl bg-white">
          <div className="absolute right-4 top-2 flex items-center self-center pl-6">
            <p className="font-sans text-sm">Tipo</p>
            <select
              className="rounded-lg border-0 bg-white px-4 py-1 font-sans text-sm"
              defaultValue={1}
              onChange={(e) => setViabilityType(Number(e.target.value))}
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
          {viabilityUsersType === 1 && viabilityUsers?.data?.length && !loadingViabilityUsers && (
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
          {viabilityUsersType === 2 && viabilityUsers?.data?.length && !loadingViabilityUsers && (
            <React.Suspense fallback="cargando...">
              <StackedChart data={viabilityUsers?.data || []} seriesToMake={viabilityUsers?.series || []} />
            </React.Suspense>
          )}
          {viabilityUsersType === 3 && viabilityUsers?.data?.length && !loadingViabilityUsers && (
            <React.Suspense fallback="cargando...">
              <StackedChart data={viabilityUsers?.data || []} seriesToMake={viabilityUsers?.series || []} />
            </React.Suspense>
          )}
        </div>
        <div
          style={{ minHeight: `${viabilityUsersByGroupType * 500}px` }}
          className="relative col-span-2 flex h-full w-full flex-col rounded-2xl bg-white py-12"
        >
          <div className="absolute right-4 top-2 flex items-center self-center pl-6">
            <p className="font-sans text-sm">Tipo</p>
            <select
              className="rounded-lg border-0 bg-white px-4 py-1 font-sans text-sm"
              defaultValue={1}
              onChange={(e) => setViabilityUsersByType(Number(e.target.value))}
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
              <p className="text-xl 2xl:text-2xl">Viabilidad de usuarios por grupo</p>
            </div>
          </div>
          {loadingViabilityUsersByGroup && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!viabilityUsersByGroup?.data?.length && viabilityUsersByGroupType === 1 && !loadingViabilityUsersByGroup && (
            <p className="text-base">Ups, parece que no hay información acerca de esto</p>
          )}
          {!viabilityUsersByGroup?.data && viabilityUsersByGroupType !== 1 && !loadingViabilityUsersByGroup && (
            <p className="text-base">Ups, parece que no hay información acerca de esto</p>
          )}
          {viabilityUsersByGroupType === 1 && viabilityUsersByGroup?.data?.length && !loadingViabilityUsersByGroup && (
            <table className="w-full px-4">
              <thead className="bg-cream">
                <tr>
                  <td className="py-2 text-center font-sans text-base">Grupo</td>
                  <td className="py-2 text-center font-sans text-base"> Tipo</td>
                  <td className="py-2 text-center font-sans text-base">Total</td>
                </tr>
              </thead>
              <tbody>
                {viabilityUsersByGroup?.data?.map((item) => {
                  const key = Object.keys(item)[0];
                  const value = item[key];
                  return value?.map((item) => (
                    <tr className="bg-gray100 text-sm">
                      <td className="pl-4 font-sans text-lg">{key}</td>
                      <td className="text-center font-sans text-lg">
                        {item?.label === 'viable' ? 'Viable' : 'No viables'}
                      </td>
                      <td className="text-center font-sans text-lg">{item?.value}</td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          )}
          {viabilityUsersByGroupType === 2 && viabilityUsersByGroup?.data && !loadingViabilityUsersByGroup && (
            <div className="flex h-full w-full flex-col gap-x-10">
              <p className="text-center font-sans text-lg">Viables</p>
              <PartitionedBarChart type={2} data={viabilityUsersByGroup?.data?.viableData || []} />
              <p className="text-center font-sans text-lg">No viables</p>
              <PartitionedBarChart type={2} data={viabilityUsersByGroup?.data?.noViableData || []} />
            </div>
          )}
          {viabilityUsersByGroupType === 3 && !loadingViabilityUsersByGroup && (
            <div className="flex h-full w-full flex-col gap-x-10">
              <p className="text-center font-sans text-lg">Viables</p>
              <PartitionedBarChart type={3} data={viabilityUsersByGroup?.data?.viableData || []} />
              <p className="text-center font-sans text-lg">No viables</p>
              <PartitionedBarChart type={3} data={viabilityUsersByGroup?.data?.noViableData || []} />
            </div>
          )}
        </div>
      </div>
      <div className="py-4">
        <div className="relative flex w-full flex-col rounded-2xl bg-white pb-20 pt-8">
          <div className="absolute right-4 top-2 flex items-center self-center pl-6">
            <p className="font-sans text-sm">Tipo</p>
            <select
              className="rounded-lg border-0 bg-white px-4 py-1 font-sans text-sm"
              defaultValue={1}
              onChange={(e) => setRegisterInfoType(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          {loadingRegisterInfo ? (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          ) : (
            <div className="grid w-full grid-cols-4 items-center justify-center px-8">
              <div>
                <h5 className="text-lg font-medium">
                  Usuarios que finalizaron <MdDone size={20} className="text-gray200" />
                </h5>
                <p className="font-sans text-2xl">{registerInfo?.data?.usersFinished}</p>
              </div>
              <div>
                <h5 className="text-lg font-medium">
                  Usuarios que no finalizaron <MdClose size={25} className="text-gray200" />
                </h5>
                <p className="font-sans text-2xl">{registerInfo?.data?.usersNotFinished}</p>
              </div>
              <div>
                <h5 className="text-lg font-medium">
                  Tiempo promedio en completar <BsClock size={18} className="text-gray200" />
                </h5>
                <p className="font-sans text-2xl">{registerInfo?.data?.timeCompleteAvg}m</p>
              </div>
              <div>
                <h5 className="text-lg font-medium">Tasa de finalización</h5>
                <p className="font-sans text-2xl">{registerInfo?.data?.finalizationRate}%</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UsersAnalytics;
