import { MenuItem } from '@mui/material';
import React from 'react';
import NewVacancyContains from 'utils/constants/newVacancy.json';
import RegisterSelect from './RegisterSelect';
import palette from '../../../../../../styles/palette';

const Gender = (args) => {
  const { state, setState } = args;
  const { genders } = NewVacancyContains.general;
  const handleChange = (e) => {
    const jsonGenders = genders?.find((count) => count?.value === e.target.value) || {};
    setState({
      ...state,
      dataToAdmin: {
        ...state?.dataToAdmin,
        gender: jsonGenders,
      },
    });
  };

  return (
    <RegisterSelect value={state?.dataToAdmin?.gender?.value} onChange={handleChange} labelId="gender">
      {genders?.map((gender) => (
        <MenuItem
          sx={{
            color: 'black',
            '&:hover': {
              backgroundColor: palette.gray300,
              color: 'black',
            },
          }}
          key={gender?.value}
          value={gender?.value}
        >
          {gender.label}
        </MenuItem>
      ))}
    </RegisterSelect>
  );
};

export default Gender;
