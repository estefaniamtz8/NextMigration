// components/CommonChip.js
import React from 'react';

const CommonChip = (args) => {
  const { title, color } = args;
  return (
    <div
      style={{ backgroundColor: color }}
      className="flex h-[25px] w-max min-w-fit items-center justify-center rounded-xl p-0.5 px-4 text-xs"
    >
      {title}
    </div>
  );
};

export default CommonChip;

