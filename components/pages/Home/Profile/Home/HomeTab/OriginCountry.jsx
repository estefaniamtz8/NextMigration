import { MenuItem } from '@mui/material';
import React from 'react';
import CountriesJson from 'utils/constants/countries.json';
import palette from 'styles/palette';
import RegisterSelect from './RegisterSelect';

const OriginCountry = (args) => {
  const { countries } = CountriesJson;
  const { state, setState } = args;

  const handleChanges = (e) => {
    const jsonNationality = countries?.find((count) => count?.value === e.target.value) || {};
    setState(() => ({
      ...state,
      dataToAdmin: {
        ...state?.dataToAdmin,
        nationality: jsonNationality,
      },
    }));
  };

  return (
    <RegisterSelect
      label="Ingrese su país de origen"
      sx={{ color: '#000' }}
      onChange={handleChanges}
      value={state?.dataToAdmin?.nationality?.label}
    >
      {countries?.map((country) => (
        <MenuItem
          sx={{
            color: '#000',
            '&:hover': {
              backgroundColor: palette.gray300,
              color: '#000',
            },
          }}
          value={country?.value}
          key={country?.name_en}
        >
          {country.label}
        </MenuItem>
      ))}
    </RegisterSelect>
  );
};

export default OriginCountry;
