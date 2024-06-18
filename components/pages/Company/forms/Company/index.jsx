import React from 'react';
import PropTypes from 'prop-types';
import { Stack, FormLabel, CircularProgress, Paper, MenuItem } from '@mui/material';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import InputWithLabel, {
  TextareaWithLabel,
  SelectWithLabel,
  CheckboxWithLabel,
} from 'components/Elements/InputWithLabel';
import FileInput from 'components/Elements/FileInput';
import palette, { FontsData } from 'styles/palette';

import { phoneInpuStyles } from './styles';
import initialState from './constants';
import PhoneElement from '../../../../Elements/PhoneInput';

function Company(props) {
  const { industries, formId, onSubmit, company, allCompany, isEdit } = props;

  const [state, setState] = React.useState({
    ...initialState,
    ...(company || {}),
    ...(allCompany || {}),
  });

  const onChangeInput = React.useCallback(({ target }) => {
    const { name, value } = target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const onChangeInputFile = React.useCallback((e, type) => {
    e.preventDefault();
    const file = e.target.files ? e.target.files[0] : null;
    e.target.value = null;
    return setState((prevState) => ({
      ...prevState,
      ...(type === 'logo' ? { logoNew: file } : { coverNew: file }),
    }));
  }, []);

  const onRemoveFile = React.useCallback((e, type) => {
    e.preventDefault();
    return setState((prevState) => ({
      ...prevState,
      ...(type === 'logo' ? { logo: null, logoNew: null } : { cover: null, coverNew: null }),
    }));
  }, []);

  async function handleSelect(address) {
    const results = await geocodeByAddress(address);
    const coords = await getLatLng(results[0]);
    onChangeInput({
      target: {
        name: 'fullLocation',
        value: {
          location: results?.[0]?.formatted_address || '',
          lat: coords.lat,
          lng: coords.lng,
        },
      },
    });
    setState((prevState) => ({ ...prevState, location: results?.[0]?.formatted_address || '' }));
  }

  const onBeforeSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    const objFinal = {
      ...state,
      industries: JSON.stringify([state?.industry] || [state?.industries[0]] || ['']),
      acceptTerms: true,
      fullLocation: JSON.stringify(state?.fullLocation || {}),
      cover: JSON.stringify(state?.cover),
      phone: JSON.stringify(state?.phone),
      logoExpireDay: JSON.stringify(state?.logoExpireDay || {}),
    };
    Object.keys(objFinal)?.map((key) => {
      data.append(key, objFinal?.[key]);
      return 1;
    });
    onSubmit(data);
  };

  const status = [
    { value: 'active', label: 'Activa' },
    { value: 'waiting', label: 'Pendiente o en aprobación' },
    { value: 'closed', label: 'Cerrada' },
  ];

  return (
    <form id={formId} onSubmit={onBeforeSubmit}>
      <Stack spacing={2} direction="column" sx={{ padding: '1rem 0' }}>
        <CheckboxWithLabel
          direction="row"
          htmlFor="fromProgram"
          label="Parte de programa DE&I Intrare?"
          id="fromProgram"
          name="fromProgram"
          checked={typeof state?.fromProgram === 'string' ? state.fromProgram === 'true' : state?.fromProgram}
          onChange={(e) => setState((prevState) => ({ ...prevState, fromProgram: e.target.checked }))}
          sx={{ padding: '3px' }}
        />
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
          <InputWithLabel
            htmlFor="companyName"
            label="Nombre de la empresa"
            id="companyName"
            name="companyName"
            type="text"
            placeholder="Escribe el nombre de la empresa"
            value={state?.companyName}
            onChange={onChangeInput}
            variant="outlined"
            color="secondary"
            size="small"
            autoComplete="off"
            required
          />
          <InputWithLabel
            htmlFor="owner"
            label="Persona encargada de la cuenta"
            id="owner"
            name="owner"
            placeholder="Nombre y apellido"
            value={state?.owner}
            onChange={onChangeInput}
            variant="outlined"
            color="secondary"
            size="small"
            autoComplete="off"
            required
          />
        </Stack>
        {!isEdit && (
          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            <InputWithLabel
              htmlFor="email"
              label="Correo empresarial"
              name="email"
              type="email"
              placeholder="ejemplo@empresa.io"
              value={state?.email}
              onChange={onChangeInput}
              variant="outlined"
              color="secondary"
              size="small"
              autoComplete="off"
              required
            />
            <InputWithLabel
              htmlFor="password"
              label="Contraseña"
              id="password"
              name="password"
              placeholder="Escribe tu contraseña"
              type="password"
              value={state.password}
              onChange={onChangeInput}
              variant="outlined"
              color="secondary"
              size="small"
              inputProps={{ minLength: '6' }}
              autoComplete="off"
              required
            />
          </Stack>
        )}
        <Stack spacing={1} direction="column" sx={{ width: '100%' }}>
          <FormLabel htmlFor="location" required>
            Ubicación
          </FormLabel>
          <PlacesAutocomplete
            value={state?.location || ''}
            onChange={(location) => setState((prevState) => ({ ...prevState, location }))}
            onSelect={handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div style={{ position: 'relative' }}>
                <input
                  placeholder="Escribe tu dirección"
                  name="location"
                  type="text"
                  value={state?.location || ''}
                  onChange={onChangeInput}
                  style={{
                    background: palette.bgMain,
                    borderRadius: '8px',
                    border: 'none',
                    padding: '0.8rem',
                    width: '100%',
                    outline: 'none',
                    fontFamily: FontsData.circularStd,
                    fontSize: '0.8rem',
                    height: '38px',
                  }}
                  {...getInputProps({
                    placeholder: 'Buscar ubicación ...',
                  })}
                />
                <Paper
                  sx={{
                    overflowWrap: 'break-word',
                    overflow: 'hidden',
                    width: '100%',
                    position: 'absolute',
                    left: 0,
                    background: '#FFF',
                    zIndex: 2,
                  }}
                  className="autocomplete-dropdown-container"
                >
                  {loading && (
                    <Stack padding="5px" direction="row" justifyContent="center">
                      <CircularProgress />
                    </Stack>
                  )}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <MenuItem
                          sx={{
                            '&.Mui-selected, &.Mui-selected:hover': {
                              backgroundColor: palette.purple300,
                            },
                            '&.MuiMenuItem-root:hover': {
                              color: palette.white,
                              backgroundColor: palette.purple300,
                            },
                            whiteSpace: 'normal',
                            textAlign: 'start',
                            justifyItems: 'start',
                            width: '100%',
                          }}
                        >
                          {suggestion.description}
                        </MenuItem>
                      </div>
                    );
                  })}
                </Paper>
              </div>
            )}
          </PlacesAutocomplete>
          <SelectWithLabel
            htmlFor="status"
            label="Estatus"
            options={status}
            maxRows="2"
            id="status"
            multiple={false}
            name="status"
            placeholder="Selecciona una opción"
            value={state?.status || 'waiting'}
            onChange={onChangeInput}
            aria-placeholder="Seleccione una opción"
            variant="outlined"
            color="secondary"
            size="small"
            required
          />
        </Stack>
        <TextareaWithLabel
          htmlFor="companyDescription"
          label="Descripción de la empresa"
          id="companyDescription"
          name="companyDescription"
          placeholder="Escribe una descripción"
          minRows={9}
          value={state.companyDescription}
          onChange={onChangeInput}
          required
        />
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
          <Stack spacing={1} direction="column" sx={{ width: '100%' }}>
            <FormLabel htmlFor="phoneNumber" required>
              Teléfono
            </FormLabel>
            <PhoneElement
              autoComplete="on"
              name="phoneNumber"
              onChange={(e) => {
                setState((prev) => ({ ...prev, phone: { ...prev.phone, phoneNumber: e.target.value } }));
              }}
              onChangeCode={(args) => {
                const { codeCountry, iso2 } = args;
                setState((prev) => ({ ...prev, phone: { ...prev.phone, phoneCode: codeCountry, iso2 } }));
              }}
              value={parseInt(state?.phone?.phoneNumber?.replace(/['"]+/g, ''), 10)}
              valueCode={state?.phone?.phoneCode}
              styledInput={phoneInpuStyles.input}
              styledSxTextFiel={{
                width: '100%',
              }}
              styledSelect={phoneInpuStyles.select}
            />
          </Stack>
          <SelectWithLabel
            htmlFor="industry"
            label="Industria"
            options={industries}
            maxRows="2"
            id="industry"
            multiple={false}
            name="industry"
            placeholder="Selecciona una opción"
            value={state?.industry || state?.industries?.[0]?.label || state?.industries || ''}
            onChange={onChangeInput}
            aria-placeholder="Seleccione una opción"
            variant="outlined"
            color="secondary"
            size="small"
            required
          />
        </Stack>
        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
          <FileInput
            type="company"
            htmlFor="logo"
            label="Logo de la empresa"
            file={state.logo || state?.logoNew || null}
            onRemoveFile={(e) => onRemoveFile(e, 'logo')}
            onChange={(e) => onChangeInputFile(e, 'logo')}
          />
          <FileInput
            type="company"
            htmlFor="cover"
            label="Imagen de portada"
            file={state.cover || state?.coverNew || null}
            onRemoveFile={(e) => onRemoveFile(e, 'cover')}
            onChange={(e) => onChangeInputFile(e, 'cover')}
          />
        </Stack>
      </Stack>
    </form>
  );
}

Company.defaultProps = {
  industries: [],
  formId: 'create-company-form',
  company: null,
  allCompany: null,
};

Company.propTypes = {
  industries: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  company: PropTypes.shape(),
  formId: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  allCompany: PropTypes.shape(),
  isEdit: PropTypes.bool.isRequired,
};

export default Company;
