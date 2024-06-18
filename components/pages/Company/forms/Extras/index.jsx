import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import { IoIosArrowBack } from 'react-icons/io'
import palette from 'styles/palette';
import InputWithLabel, { SelectWithLabel, AutocompleteWithLabel } from 'components/Elements/InputWithLabel';
import { useVacancyData, useVacancyActions } from 'store';
import Constants from 'utils/constants/newVacancy.json';
import { SALARY_SCHEMES } from 'utils/constants/salary';

function Extras(props) {
  const { returnHandleChange, onSubmit } = props;

  const { setExtras } = useVacancyActions();
  const { extras } = useVacancyData();

  const onChange = (e) => {
    const { name, value } = e.target;
    setExtras({
      ...extras,
      [name]: typeof value === 'string' && value.includes(',') ? value.split(',') : value,
    });
  };

  const onBeforeSubmit = (e) => {
    e.preventDefault();
    return onSubmit();
  };

  return (
    <form id="extras-form" onSubmit={onBeforeSubmit}>
      <Stack spacing={2} direction="column" sx={{ padding: '2rem 0' }}>
        <button
          className="bottom-0 right-[10px] flex cursor-pointer items-center border-none bg-transparent pb-2 text-start font-sans tracking-wider"
          type="button"
          onClick={returnHandleChange}
        >
          <IoIosArrowBack className="w-[24px] pr-[10px] text-black" id="getBack" /> Regresar
        </button>

        <Typography component="h3" color={palette.purple300}>
          Informacion adicional
        </Typography>

        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
          <AutocompleteWithLabel
            htmlFor="benefitsWork"
            label="Prestaciones"
            id="benefitsWork"
            name="benefitsWork"
            placeholder="Selecciona una opción"
            value={extras?.benefitsWork || []}
            options={Constants?.general?.benefits}
            multiple
            onChange={(_, value) => onChange({ target: { value, name: 'benefitsWork' } })}
            variant="outlined"
            color="secondary"
            size="small"
          />
          <SelectWithLabel
            htmlFor="salaryScheme"
            label="Esquema salarial"
            id="salaryScheme"
            name="salaryScheme"
            placeholder="Selecciona una opción"
            value={extras?.salaryScheme || []}
            options={SALARY_SCHEMES}
            multiple={false}
            onChange={onChange}
            variant="outlined"
            color="secondary"
            size="small"
          />
        </Stack>

        <Typography component="h3" color={palette.purple300}>
          Informacion interna
        </Typography>

        <InputWithLabel
          width="50%"
          htmlFor="internalID"
          label="ID Interno"
          id="internalID"
          name="internalID"
          placeholder="Escribe el id interno"
          value={extras?.internalID || ''}
          onChange={onChange}
          variant="outlined"
          color="secondary"
          size="small"
          autoComplete="off"
        />

        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
          <InputWithLabel
            width="50%"
            htmlFor="placesAvailable"
            label="Plazas Disponibles"
            id="placesAvailable"
            name="placesAvailable"
            placeholder="Plazas Disponibles"
            value={extras?.placesAvailable || ''}
            onChange={onChange}
            variant="outlined"
            color="secondary"
            size="small"
            autoComplete="off"
            type="number"
            inputProps={{ min: '0' }}
          />
        </Stack>

        <InputWithLabel
          width="50%"
          htmlFor="diffusionImage"
          label="Imagen para difusión"
          id="diffusionImage"
          name="diffusionImage"
          placeholder="Escribe la URL de la imagen"
          value={extras?.diffusionImage || ''}
          onChange={onChange}
          variant="outlined"
          color="secondary"
          size="small"
          autoComplete="off"
          type="url"
          inputProps={{ pattern: 'https://.*' }}
        />
      </Stack>
    </form>
  );
}

Extras.propTypes = {
  returnHandleChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Extras;
