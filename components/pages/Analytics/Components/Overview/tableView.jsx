import React from 'react';

const TableView = ({ data }) => (
  <div className="flex h-full flex-col items-center justify-center">
    {data?.length ? (
      data?.map((info) => (
        <div key={info.talent} className="flex w-4/5 justify-between border-[1px] border-solid border-black px-8">
          <p className="text-base font-medium">{info?.talent}</p>
          <p className="text-base font-light">{info?.value}</p>
        </div>
      ))
    ) : (
      <p className="text-base">Ups, parece que no hay información acerca de esto</p>
    )}
  </div>
);

export default TableView;
