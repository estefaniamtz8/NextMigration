import React from 'react';
import { MenuItem } from '@mui/material';
import RegisterSelect from './RegisterSelect';
import palette from '../../../../../../styles/palette';

const TimeToTranslate = ({ state, value, setState }) => {
  const options = ['30', '45', '60'];

  const handleChange = (e) => {
    setState({
      ...state,
      dataToAdmin: {
        ...state?.dataToAdmin,
        translate: e.target.value,
      },
    });
  };

  return (
    <RegisterSelect onChange={handleChange} value={value} sx={{ color: '#000' }}>
      {options.map((option) => (
        <MenuItem
          sx={{
            color: '#000',
            '&:hover': {
              backgroundColor: palette.gray300,
              color: 'black',
            },
          }}
          value={option}
          key={option}
        >
          {option} minutos
        </MenuItem>
      ))}
    </RegisterSelect>
  );
};

export default TimeToTranslate;
