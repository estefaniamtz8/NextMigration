import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import relative from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import es from 'dayjs/locale/es';
import { dateTimePickerStylesAnalytics } from '../../MatchingHub/components/Scheduler/modals/styles';

// import dateTimePickerStyles from './styles';

dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relative);
dayjs.locale(es);
dayjs.extend(utc);

const AleAnalytics = React.lazy(() => import('./Ale'));
const DaniAnalytics = React.lazy(() => import('./Dani'));

const ColaboratorsAnalytics = () => {
  const segments = [1, 2, 3, 4];

  const [typeOfGraphs, setTypeOfGraphs] = useState(1);

  const [range, setRange] = useState({
    day: dayjs(new Date())?.format(),
    segment: null,
    month: null,
    year: null,
    date1: dayjs(new Date())?.format(),
    date2: dayjs(new Date())?.format(),
  });

  const [analyticsType, setAnalyticsType] = useState('ale');

  return (
    <div className="pb-10">
      <div className="flex justify-between pb-4">
        <div className="flex gap-x-4">
          <div className="flex flex-col">
            <label htmlFor="hs-select-label" className="mb-2 text-base font-medium">
              Tipo de gráficas
            </label>
            <select
              value={typeOfGraphs}
              onChange={(e) => {
                setTypeOfGraphs(parseInt(e.target.value, 10));
              }}
              id="hs-select-label"
              className="w-42 block rounded-lg border-gray py-3 pl-2 pr-4 font-sans text-sm outline-none focus:border-purple focus:ring-purple"
            >
              <option value={1}>Diario</option>
              <option value={2}>Semana</option>
              <option value={3}>Mes</option>
              <option value={4}>Anual</option>
              <option value={5}>Intervalo de fechas</option>
              <option value={6}>Histórico</option>
            </select>
          </div>
          {typeOfGraphs === 1 && (
            <div className="flex flex-col">
              <label className="mb-2 text-base font-medium">Selecciona el día</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={['year', 'month', 'day']}
                  id="day"
                  name="day"
                  value={range.day ? dayjs(range.day) : null} // Convierte range.day a un objeto de fecha de Day.js
                  onChange={(value) => {
                    setRange({ ...range, day: value?.format('YYYY/MM/DD') });
                  }}
                  className="w-full border-gray"
                  sx={dateTimePickerStylesAnalytics}
                />
              </LocalizationProvider>
            </div>
          )}
          {typeOfGraphs === 2 && (
            <>
              <div className="flex flex-col">
                <label className="mb-2 text-base font-medium">Selecciona el mes y año</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={['year', 'month']}
                    id="month"
                    name="month"
                    onChange={(value) => {
                      setRange({ ...range, month: value.month() + 1, year: value.year() });
                    }}
                    className="w-full border-gray"
                    sx={dateTimePickerStylesAnalytics}
                  />
                </LocalizationProvider>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-base font-medium">Selecciona la semana</label>
                <select
                  defaultValue={0}
                  onChange={(e) => {
                    setRange({
                      ...range,
                      segment: parseInt(e.target.value, 10),
                    });
                  }}
                  className="block w-48 rounded-lg border-gray py-3 pl-2 pr-4 font-sans text-sm outline-none focus:border-purple focus:ring-purple"
                >
                  {segments.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {typeOfGraphs === 3 && (
            <div className="flex flex-col">
              <label className="mb-2 text-base font-medium">Selecciona el mes y año</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={['year', 'month']}
                  id="month"
                  name="month"
                  onChange={(value) => {
                    setRange({ ...range, month: value.month() + 1, year: value.year() });
                  }}
                  className="w-full border-gray"
                  sx={dateTimePickerStylesAnalytics}
                />
              </LocalizationProvider>
            </div>
          )}
          {typeOfGraphs === 4 && (
            <div className="flex flex-col">
              <label className="mb-2 text-base font-medium">Selecciona el año</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={['year']}
                  id="year"
                  name="year"
                  onChange={(value) => {
                    setRange({ ...range, year: value.year() });
                  }}
                  className="w-full border-gray"
                  sx={dateTimePickerStylesAnalytics}
                />
              </LocalizationProvider>
            </div>
          )}
          {typeOfGraphs === 5 && (
            <>
              <div className="flex flex-col">
                <label className="mb-2 text-base font-medium">Del</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={['year', 'month', 'day']}
                    id="date1"
                    name="date1"
                    value={range.date1 ? dayjs(range.date1) : null} // Convierte range.day a un objeto de fecha de Day.js
                    onChange={(value) => {
                      setRange({ ...range, date1: value.format('YYYY/MM/DD') });
                    }}
                    className="w-full border-gray"
                    sx={dateTimePickerStylesAnalytics}
                  />
                </LocalizationProvider>
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-base font-medium">Al</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={['year', 'month', 'day']}
                    id="date2"
                    name="date2"
                    value={range.date2 ? dayjs(range.date2) : null} // Convierte range.day a un objeto de fecha de Day.js
                    onChange={(value) => {
                      setRange({ ...range, date2: value.format('YYYY/MM/DD') });
                    }}
                    minDate={range.date1 ? dayjs(range.date1) : null}
                    className="w-full border-gray"
                    sx={dateTimePickerStylesAnalytics}
                  />
                </LocalizationProvider>
              </div>
            </>
          )}
        </div>
        <div className="flex w-72 gap-x-2 self-end rounded-lg border-[1px] border-solid border-gray bg-light-four px-2 py-2">
          <button
            type="button"
            onClick={() => {
              setAnalyticsType('ale');
            }}
            className={`w-32 cursor-pointer rounded-lg border-none px-2 py-1 font-sans text-base font-light ${
              analyticsType === 'ale' ? 'bg-white drop-shadow' : 'bg-transparent'
            }`}
          >
            Ale
          </button>
          <button
            type="button"
            onClick={() => {
              setAnalyticsType('dani');
            }}
            className={`w-32 cursor-pointer rounded-lg border-none px-2 py-1 font-sans text-base font-light ${
              analyticsType === 'dani' ? 'bg-white drop-shadow' : 'bg-transparent'
            }`}
          >
            Dani
          </button>
        </div>
      </div>
      {analyticsType === 'ale' && <AleAnalytics typeOfGraphs={typeOfGraphs} range={range} />}
      {analyticsType === 'dani' && <DaniAnalytics typeOfGraphs={typeOfGraphs} range={range} />}
    </div>
  );
};

export default ColaboratorsAnalytics;
