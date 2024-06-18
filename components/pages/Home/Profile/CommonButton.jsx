import React from 'react';

const CommonButton = (args) => {
  const { text, width, onClick, disabled, type = 'button' } = args;
  return (
    <button
      /* eslint-disable react/button-has-type */
      type={type || 'button'}
      style={{ width: width || 'auto' }}
      className="h-[2rem] cursor-pointer rounded-md border-none bg-purple px-8 py-0 text-white disabled:cursor-not-allowed disabled:opacity-50"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CommonButton;

