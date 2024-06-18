import React, { useEffect, useState } from 'react';
import { GiEarthAmerica } from 'react-icons/gi';
import { MdOutlineDiversity3, MdOutlineWifiTethering } from 'react-icons/md';

import { CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';
import {
  totalCandidatesByOrigin,
  parseDiversityData,
  diversityBreakdownSeries,
  originPlatformsData,
  // lineData,
  // series
} from '../UserOps/constants';
import { fetchDataGetAsync } from '../../../../services/axios/fetchs';

// const FunnelChart = React.lazy(() => import('../components/Charts/Funnel'))
// const PieChart = React.lazy(() => import('../components/Charts/Pie'))
const DonutChart = React.lazy(() => import('../components/Charts/Donut'));
const MapChart = React.lazy(() => import('../components/Charts/Map'));
const LineChart = React.lazy(() => import('../components/Charts/Line'));
// const RadarChart = React.lazy(() => import('../components/Charts/Radar'))

const BusinessOps = () => {
  const [candidatesByOrigin, setCandidatesByOrigin] = useState({
    data: [],
    lastUpdated: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchDataGetAsync('/analytics/candidatesOrigin')
      .then((data) => {
        if (data.body) {
          setCandidatesByOrigin({
            data: data?.body?.map((candidate) => ({ id: candidate?.dateCreated, value: candidate?.usersAccumulated })),
            lastUpdated: data?.body[data?.body?.length - 1].usersAccumulated,
          });
        } else {
          setCandidatesByOrigin({
            data: [],
            lastUpdated: 0,
          });
        }
        setLoading(false);
      })
      .catch((e) => {
        setCandidatesByOrigin({
          data: [],
          lastUpdated: 0,
        });
        toast.error('Error en allUser table');
        setLoading(false);
        return e;
      });
  }, []);

  return (
    <>
      <div className="flex flex-row gap-4 py-8">
        <div className="flex h-[700px] w-full flex-col rounded-2xl bg-white">
          <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
              <GiEarthAmerica size={28} color="#FFF" />
            </div>
            <div>
              <p className="text-xl 2xl:text-2xl">{totalCandidatesByOrigin().total}</p>
              <p className="text-xs 2xl:text-sm">Total Candidatos x Origen</p>
            </div>
          </div>
          {loading ? (
            <div className="h-full w-full">
              <CircularProgress />
            </div>
          ) : (
            <React.Suspense fallback="cargando...">
              <MapChart data={candidatesByOrigin} />
            </React.Suspense>
          )}
          <p className="p-4 text-right text-xs 2xl:text-sm">
            {`Nota: hay un total de ${totalCandidatesByOrigin().withoutCountry} candidatos sin origen registrado`}
          </p>
        </div>

        {/*
      <div className="flex flex-col rounded-2xl bg-white w-1/3 h-[570px]">
        <div className="flex flex-row items-baseline gap-4 p-4 mb-3">
          <div>
            <p className="text-xs 2xl:text-sm">
              User Conversion Funnel
            </p>
            <p className="text-xl 2xl:text-2xl">
              12%
            </p>
          </div>
        </div>
        <React.Suspense fallback="cargando...">
          <FunnelChart data={funnelData} />
        </React.Suspense>
      </div>
      */}
      </div>

      <div className="page-break" id="page-break" />

      <div className="flex flex-row gap-4 py-4">
        {/*
      <div className="flex flex-col rounded-2xl bg-white w-2/4 h-[500px]">
        <div className="flex flex-row items-baseline gap-4 p-4 mb-3">
          <div className="flex items-center justify-center w-16 h-16 p-2 rounded-lg bg-green-two 2xl:h-20 2xl:w-20">
            <Visibility size={28} color="#FFF" />
          </div>
          <div>
            <p className="text-xl 2xl:text-2xl">
              {`${viabilityAveragePercent()}%`}
            </p>
            <p className="text-xs 2xl:text-sm">
              Candidate viability
            </p>
          </div>
        </div>
        <React.Suspense fallback="cargando...">
          <PieChart data={pieData()} />
        </React.Suspense>
      </div>
      */}

        <div className="flex h-[500px] w-full flex-col rounded-2xl bg-white">
          <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
              <MdOutlineDiversity3 size={28} color="#FFF" />
            </div>
            <div>
              <p className="text-xl 2xl:text-2xl">Diversity Breakdown</p>
              <p className="text-xs 2xl:text-sm">Candidate viability</p>
            </div>
          </div>
          <React.Suspense fallback="cargando...">
            <LineChart data={parseDiversityData()} series={diversityBreakdownSeries()} />
          </React.Suspense>
        </div>
      </div>

      <div className="py-4">
        <div className="flex h-[500px] w-full flex-col rounded-2xl bg-white">
          <div className="mb-3 flex flex-row items-baseline gap-4 p-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
              <MdOutlineWifiTethering size={28} color="#FFF" />
            </div>
            <div>
              <p className="text-xl 2xl:text-2xl">Referral Breakdown</p>
              <p className="text-xs 2xl:text-sm">Drilldown into</p>
            </div>
          </div>
          <div className="flex h-full flex-row items-center gap-4">
            <React.Suspense fallback="cargando...">
              <DonutChart data={originPlatformsData()} />
            </React.Suspense>
            {/*
          <React.Suspense fallback="cargando...">
            <RadarChart data={lineData} series={series} />
          </React.Suspense>
          */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessOps;
