import { MenuItem } from '@mui/material';
import React from 'react';
import NewVacancyConstant from 'utils/constants/newVacancy.json';
import RegisterSelect from './RegisterSelect';

const Grade = ({ setState, state }) => {
  const { education } = NewVacancyConstant.general;

  const handleChanges = (e) => {
    const jsonGrade = education?.find((count) => count?.value === e.target.value) || {};
    setState({
      ...state,
      grade: jsonGrade,
    });
  };

  return (
    <RegisterSelect
      labelId="study"
      sx={{ color: '#000' }}
      value={state?.grade?.value}
      onChange={handleChanges}
    >
      {education.map((item) => (
        <MenuItem
          sx={{
            color: '#000',
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'black',
            },
          }}
          value={item?.value}
          key={item?.value}
        >
          {item.label}
        </MenuItem>
      ))}
    </RegisterSelect>
  );
};

export default Grade;
