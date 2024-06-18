import React from 'react';
import { usePagination } from '@mui/material';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const HeadPagination = ({ counts, setFilter, pages }) => {
  const itemsPerPage = 10;
  const { items } = usePagination({
    count: Math.ceil(counts / itemsPerPage),
  });

  const handleBackClick = () => {
    if (pages > 1) {
      setFilter((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }
  };

  const handleForwardClick = () => {
    if (pages < Math.ceil(counts / itemsPerPage)) {
      setFilter((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  return (
    <nav className="flex items-center text-purple300">
      {pages > 1 && (
        <IoIosArrowBack
          onClick={handleBackClick}
          type="button"
          size={20}
          cursor="pointer"
        />
      )}
      <p className="text-sm font-light">
        {pages} de {Math.ceil(counts / itemsPerPage)}
      </p>
      <IoIosArrowForward
        onClick={handleForwardClick}
        type="button"
        size={20}
        cursor="pointer"
      />
    </nav>
  );
};

export default HeadPagination;
