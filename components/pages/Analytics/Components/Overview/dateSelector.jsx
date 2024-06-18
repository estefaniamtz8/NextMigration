import React from 'react';

const DateSelector = ({ range, setRange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2022 + 1 }, (_, index) => 2022 + index);
  const months = Array.from({ length: 12 }, (_, index) => 1 + index);
  const currentMonth = new Date().getMonth();
  const segments = [1, 2, 3, 4];

  return (
    <div className="flex gap-x-4 pb-4">
      <div>
        <p className="text-sm">Semana</p>
        <select
          defaultValue={0}
          onChange={(e) => {
            if (e.target.value === '0') {
              setRange({ ...range, segment: null });
            } else {
              setRange({ ...range, segment: e.target.value });
            }
          }}
          className="rounded-lg border-0 bg-white px-4 py-1 text-sm"
        >
          <option value="0">N/A</option>
          {segments.map((seg) => (
            <option key={seg} value={seg}>
              {seg}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-sm">Mes</p>
        <select
          defaultValue={currentMonth + 1}
          onChange={(e) => {
            if (e.target.value === '0') {
              setRange({ ...range, month: null });
            } else {
              setRange({ ...range, month: e.target.value });
            }
          }}
          className="rounded-lg border-0 bg-white px-4 py-1 text-sm"
        >
          <option value="0">N/A</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="text-sm">Año</p>
        <select
          defaultValue={currentYear}
          onChange={(e) => {
            setRange({ ...range, year: e.target.value });
          }}
          className="rounded-lg border-0 bg-white px-4 py-1 text-sm"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateSelector;
