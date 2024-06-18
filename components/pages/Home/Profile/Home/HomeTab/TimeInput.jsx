import React from 'react';
import { Stack, TextField } from '@mui/material';

const TimeInput = (args) => {
  const { description, value, onChange } = args;
  return (
    <Stack
      className="rounded-lg bg-cream px-2 py-2 "
      sx={{ flexDirection: 'row', alignItems: 'center', width: '70px', borderBottom: '1px solid' }}
    >
      <TextField
        onChange={onChange}
        value={value}
        inputProps={{ maxLength: 2 }}
        sx={{
          '& input': {
            color: 'black',
            padding: '0',
            fontSize: '14px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
      />
      <p className="text-xs text-black">{description}</p>
    </Stack>
  );
};

export default TimeInput;
