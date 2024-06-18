import React, { useState } from 'react';

const UserAnalytics = React.lazy(() => import('./UsersAnalytics'));
const CompanyAnalytics = React.lazy(() => import('./CompanyAnalytics'));
const MatchesAnalytics = React.lazy(() => import('./MatchesAnalytics'));

const UserOps = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2022 + 1 }, (_, index) => 2022 + index);
  const months = Array.from({ length: 12 }, (_, index) => 1 + index);
  const currentMonth = new Date().getMonth();
  const segments = [1, 2, 3, 4];

  const [range, setRange] = useState({
    segment: null,
    month: null,
    year: null,
  });

  const [analyticsType, setAnalyticsType] = useState('users');

  return (
    <div className="pb-10">
      <div className="flex gap-x-4 pb-4">
        <div>
          <p className="text-sm">Semana</p>
          <select
            defaultValue={0}
            onChange={(e) => {
              if (e.target.value === 0) {
                setRange({
                  ...range,
                  segment: null,
                });
              } else {
                setRange({
                  ...range,
                  segment: e.target.value,
                });
              }
            }}
            className="rounded-lg border-0 bg-white px-4 py-1 text-sm"
          >
            <option value={0}>N/A</option>
            {segments.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-sm">Mes</p>
          <select
            defaultValue={currentMonth + 1}
            onChange={(e) => {
              if (e.target.value === 0) {
                setRange({
                  ...range,
                  month: null,
                });
              } else {
                setRange({
                  ...range,
                  month: e.target.value,
                });
              }
            }}
            className="rounded-lg border-0 bg-white px-4 py-1 text-sm"
          >
            <option value={0}>N/A</option>
            {months.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-sm">Año</p>
          <select
            defaultValue={currentYear}
            onChange={(e) => {
              setRange({
                ...range,
                year: e.target.value,
              });
            }}
            className="rounded-lg border-0 bg-white px-4 py-1 text-sm"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center gap-x-2 py-4">
        <h2
          onClick={() => {
            setAnalyticsType('users');
          }}
          className={`cursor-pointer font-sans text-xl font-normal ${
            analyticsType === 'users' ? 'text-purple' : 'text-black'
          }`}
        >
          Usuarios <span className="text-black">|</span>
        </h2>
        <h2
          onClick={() => {
            setAnalyticsType('companies');
          }}
          className={`cursor-pointer font-sans text-xl font-normal ${
            analyticsType === 'companies' ? 'text-purple' : 'text-black'
          }`}
        >
          Empresas <span className="text-black">|</span>
        </h2>
        <h2
          onClick={() => {
            setAnalyticsType('matches');
          }}
          className={`cursor-pointer font-sans text-xl font-normal ${
            analyticsType === 'matches' ? 'text-purple' : 'text-black'
          }`}
        >
          Matches <span className="text-black" />
        </h2>
      </div>
      {analyticsType === 'users' && <UserAnalytics range={range} />}
      {analyticsType === 'companies' && <CompanyAnalytics range={range} />}
      {analyticsType === 'matches' && <MatchesAnalytics range={range} />}
    </div>
  );
};

export default UserOps;
