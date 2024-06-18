import React from 'react';
import { CircularProgress } from '@mui/material';
import { BsPeople } from 'react-icons/bs'
import ColumnChart from '../Charts/Column';
/**
 * Component for displaying two side-by-side charts: Talento Diverso and Talento Refugiado.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.dataRefugees - Data for the 'Talento Refugiado' chart.
 * @param {Array} props.refugeesSeries - Series data for the 'Talento Refugiado' chart.
 * @param {Array} props.dataDiversity - Data for the 'Talento Diverso' chart.
 * @param {Array} props.diversitySeries - Series data for the 'Talento Diverso' chart.
 * @param {boolean} props.loading - Indicates if the data is still loading.
 * @returns {JSX.Element} The rendered component.
 */
const ChartView = ({ dataRefugees, refugeesSeries, dataDiversity, diversitySeries, loading }) => (
  <div className="flex gap-x-2">
    <div className="w-1/2 h-60">
      <div className="flex flex-row items-center gap-4 p-4 mb-2">
        <div className="flex items-center justify-center w-16 h-16 p-2 rounded-lg bg-green-two 2xl:h-20 2xl:w-20">
          <BsPeople size={28} color="#FFF" />
        </div>
        <div>
          <p className="text-base 2xl:text-xl">Talento Diverso</p>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <CircularProgress className="text-purple" />
        </div>
      ) : (
        <React.Suspense fallback="cargando...">
          <ColumnChart data={dataDiversity || []} series={diversitySeries} />
        </React.Suspense>
      )}
    </div>
    <div className="w-1/2 h-60">
      <div className="flex flex-row items-center gap-4 p-4 mb-2">
        <div className="flex items-center justify-center w-16 h-16 p-2 rounded-lg bg-green-two 2xl:h-20 2xl:w-20">
          <BsPeople size={28} color="#FFF" />
        </div>
        <div>
          <p className="text-base 2xl:text-xl">Talento Refugiado</p>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <CircularProgress className="text-purple" />
        </div>
      ) : (
        <React.Suspense fallback="cargando...">
          <ColumnChart data={dataRefugees || []} series={refugeesSeries} />
        </React.Suspense>
      )}
    </div>
  </div>
);

export default ChartView;
