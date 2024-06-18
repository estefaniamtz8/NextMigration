import React from 'react';
import { MenuItem } from '@mui/material';
import NewVacancyConstants from 'utils/constants/newVacancy.json';
import RegisterSelect from './RegisterSelect';
import palette from '../../../../../../styles/palette';

const CivilState = ({ state, setState }) => {
  const { married } = NewVacancyConstants.general;

  const handleChange = (e) => {
    const jsonGeneral = married?.find((count) => count?.value === e.target.value) || {};
    setState({
      ...state,
      dataToAdmin: {
        ...state.dataToAdmin,
        married: jsonGeneral,
      },
    });
  };

  return (
    <RegisterSelect onChange={handleChange} sx={{ color: '#000' }} value={state?.dataToAdmin?.married?.value}>
      {married?.map((item) => (
        <MenuItem
          sx={{
            color: '#000',
            '&:hover': {
              backgroundColor: palette.gray300,
              color: 'black',
            },
          }}
          value={item?.value}
          key={item?.value}
        >
          {item?.label}
        </MenuItem>
      ))}
    </RegisterSelect>
  );
};

export default CivilState;
