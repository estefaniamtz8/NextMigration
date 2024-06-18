import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Select,
  MenuItem,
  Paper,
  Stack,
  CircularProgress,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { MdClose } from 'react-icons/md';
import palette, { FontsData } from 'styles/palette';
import dataNewGeneralVacancy from 'utils/constants/newVacancy.json';
import BaseSimpleMDE from 'react-simplemde-editor';
import InputWithLabel, { SelectWithLabel, AutocompleteWithLabel } from 'components/Elements/InputWithLabel';
import FileInput from 'components/Elements/FileInput';
import { useVacancyData, useVacancyActions } from 'store';
import SALARY_OPTIONS, { SALARY_VISIBILITY } from 'utils/constants/salary';

import Badge from './badge';
import 'easymde/dist/easymde.min.css';

function Vacancy(props) {
  const { onSubmit, professions } = props;

  const { setBasicInfo } = useVacancyActions();
  const { basicInfo } = useVacancyData();

  const onChange = (e) => {
    const { name, value } = e.target;
    setBasicInfo({
      ...basicInfo,
      [name]: typeof value === 'string' && value.includes(',') ? value.split(',') : value,
    });
  };

  const onChangeLanguages = (e) => {
    const { value } = e.target;

    setBasicInfo({
      ...basicInfo,
      languagesWork: {
        ...basicInfo.languagesWork,
        values: value,
      },
    });
  };

  const onChangeLanguageLevel = (e, lang, index) => {
    const updatedLanguages = basicInfo?.languagesWork?.details ? [...basicInfo.languagesWork.details] : [];

    if (updatedLanguages[index]) {
      updatedLanguages[index] = { value: lang, level: e.target.value };
    } else {
      updatedLanguages.push({ value: lang, level: e.target.value });
    }

    setBasicInfo({
      ...basicInfo,
      languagesWork: {
        ...basicInfo.languagesWork,
        details: updatedLanguages,
      },
    });
  };

  const onDeleteLanguage = (lang) => {
    let updatedValues = [...basicInfo.languagesWork.values];
    updatedValues = updatedValues.filter((val) => val !== lang);
    let updatedDetails = basicInfo?.languagesWork?.details ? [...basicInfo.languagesWork.details] : [];
    updatedDetails = updatedDetails.filter((detail) => detail.value !== lang);

    setBasicInfo({
      ...basicInfo,
      languagesWork: {
        values: updatedValues,
        details: updatedDetails,
      },
    });
  };

  const onChangeFile = (e) => {
    e.preventDefault();
    const file = e.target.files ? e.target.files[0] : null;
    e.target.value = null;
    setBasicInfo({ ...basicInfo, coverNew: file, cover: file });
  };

  async function handleSelect(address) {
    const results = await geocodeByAddress(address);
    const coords = await getLatLng(results[0]);
    /* eslint-disable */
    setBasicInfo({
      ...basicInfo,
      addressComponents:
        results[0]?.address_components?.length > 0
          ? `[${Object.entries(results[0]?.address_components)?.map(
              ([, document]) =>
                `{"long_name": ${
                  document?.long_name !== '' ? `${JSON.stringify(document?.long_name)}` : `" "`
                },"short_name": ${
                  document?.short_name !== '' ? `${JSON.stringify(document?.short_name)}` : `" "`
                },"types": ${
                  document?.types?.length > 0 ? `[${document?.types?.map((item) => `"${item}"`)?.toString()}]` : `"[]"`
                }}`
            )}]`
          : `'[{}]'`,
      location: results?.[0]?.formatted_address || '',
      fullLocation: {
        location: results?.[0]?.formatted_address || '',
        lat: coords.lat,
        lng: coords.lng,
      },
    });
    /* eslint-enable */
  }

  useEffect(() => {
    if (basicInfo?.location) {
      handleSelect(basicInfo?.location);
    }
  }, []);

  const onBeforeSubmit = (e) => {
    e.preventDefault();
    const filteredLanguages =
      basicInfo?.languagesWork?.details?.filter((detail) => basicInfo?.languagesWork?.values?.includes(detail.value)) ||
      [];
    setBasicInfo({
      ...basicInfo,
      languagesWork: {
        ...basicInfo.languagesWork,
        details: filteredLanguages,
      },
    });
    return onSubmit();
  };
  return (
    <form id="vacancy-form" onSubmit={onBeforeSubmit}>
      <Stack spacing={2} direction="column" sx={{ padding: '1rem 0' }}>
        <InputWithLabel
          htmlFor="internalID"
          label="Vacante"
          id="name"
          name="name"
          placeholder="Escribe el nombre de la vacante"
          value={basicInfo?.name || ''}
          onChange={onChange}
          variant="outlined"
          color="secondary"
          size="small"
          autoComplete="off"
          required
        />
        <AutocompleteWithLabel
          htmlFor="position"
          label="Puesto"
          options={professions?.filter((item) => item?.value !== 'No experiencia') || []}
          placeholder="Selecciona un puesto"
          aria-placeholder="Selecciona un puesto"
          id="position"
          name="position"
          value={{ label: basicInfo?.position || '', value: basicInfo?.position || '' }}
          onChange={(_, value) => onChange({ target: { value: value?.value, name: 'position' } })}
          variant="outlined"
          color="secondary"
          size="small"
          required
        />
        <Stack spacing={1} direction="column" sx={{ width: '100%' }}>
          <FormLabel htmlFor="jobDescription" required>
            Job Description
          </FormLabel>
          <BaseSimpleMDE
            value={basicInfo?.jobDescription?.replace(/(\r\n|\n|\\n|\r)/gm, '\n') || ''}
            onChange={(jobDescription) => {
              setBasicInfo({ ...basicInfo, jobDescription });
            }}
            style={{ borderRadius: '8px', '.editor-toolbar': { padding: '0.5rem' } }}
            textareaProps={{
              style: {
                borderTop: '1px solid #ced4da',
                background: palette.bgMain,
              },
            }}
          />
        </Stack>

        <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
          <Stack spacing={1} direction="column" sx={{ width: '100%' }}>
            <FormLabel htmlFor="location" required>
              Ubicación
            </FormLabel>
            <PlacesAutocomplete
              value={basicInfo?.location || ''}
              onChange={(location) => setBasicInfo({ ...basicInfo, location })}
              onSelect={handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div style={{ position: 'relative' }}>
                  <input
                    placeholder="Escribe tu dirección"
                    name="location"
                    type="text"
                    value={basicInfo?.location || ''}
                    onChange={onChange}
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
          </Stack>
          <SelectWithLabel
            htmlFor="scholarship"
            label="Escolaridad"
            options={dataNewGeneralVacancy?.general?.education}
            multiple={false}
            placeholder="Selecciona una opción"
            aria-placeholder="Seleccione una opción"
            id="scholarship"
            name="scholarship"
            value={basicInfo?.scholarship || []}
            onChange={onChange}
            variant="outlined"
            color="secondary"
            size="small"
            required
          />
        </Stack>

        <Stack spacing={1} direction="column" sx={{ width: '100%' }}>
          <FormLabel htmlFor="salaryType" required>
            Salario
          </FormLabel>
          <Stack spacing={1} direction="row">
            <Select
              multiple={false}
              placeholder="Selecciona una opción"
              aria-placeholder="Seleccione una opción"
              id="salaryType"
              name="salaryType"
              value={basicInfo?.salaryType || ''}
              onChange={onChange}
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ width: '100%' }}
              displayEmpty
              required
            >
              <MenuItem disabled value="">
                Selecciona una opción
              </MenuItem>
              {SALARY_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {' '}
                  {option.label}{' '}
                </MenuItem>
              ))}
            </Select>
            <Select
              multiple={false}
              placeholder="Selecciona una opción"
              aria-placeholder="Seleccione una opción"
              id="salaryVisibility"
              name="salaryVisibility"
              value={basicInfo?.salaryVisibility || ''}
              onChange={onChange}
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ width: '100%' }}
              required
              displayEmpty
            >
              <MenuItem disabled value="">
                Selecciona una opción
              </MenuItem>
              {SALARY_VISIBILITY.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {' '}
                  {option.label}{' '}
                </MenuItem>
              ))}
            </Select>
            <Input
              id={basicInfo?.salaryType === 'range' ? 'minSalary' : 'total'}
              name={basicInfo?.salaryType === 'range' ? 'minSalary' : 'total'}
              placeholder={basicInfo?.salaryType === 'range' ? 'Min' : 'Salario'}
              value={basicInfo?.salaryType === 'range' ? basicInfo?.minSalary : basicInfo?.total}
              onChange={onChange}
              variant="outlined"
              color="secondary"
              size="small"
              autoComplete="off"
              type="number"
              sx={{ width: '100%' }}
              inputProps={{ min: '0' }}
              required
            />
            {basicInfo?.salaryType === 'range' && (
              <Input
                id="maxSalary"
                name="maxSalary"
                placeholder="Max"
                value={basicInfo?.maxSalary || ''}
                onChange={onChange}
                variant="outlined"
                color="secondary"
                size="small"
                autoComplete="off"
                type="number"
                sx={{ width: '100%' }}
                required
              />
            )}
          </Stack>
        </Stack>

        <AutocompleteWithLabel
          htmlFor="functions"
          label="Habilidades requeridas para el puesto"
          options={dataNewGeneralVacancy?.general?.functions}
          multiple
          placeholder="Selecciona una opción"
          aria-placeholder="Seleccione una opción"
          id="functions"
          name="functions"
          value={basicInfo?.functions || []}
          onChange={(_, value) => onChange({ target: { value, name: 'functions' } })}
          variant="outlined"
          color="secondary"
          size="small"
          required
        />

        <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
          <SelectWithLabel
            htmlFor="languagesWork"
            label="Idioma requerido"
            options={dataNewGeneralVacancy?.general?.languages}
            multiple
            placeholder="Selecciona una opción"
            aria-placeholder="Seleccione una opción"
            id="languagesWork"
            name="languagesWork"
            value={basicInfo?.languagesWork?.values || []}
            onChange={onChangeLanguages}
            variant="outlined"
            color="secondary"
            size="small"
          />
          {basicInfo?.languagesWork?.values?.map((lang, index) => (
            <Badge fullWidth key={lang} title={lang}>
              <>
                <RadioGroup
                  row
                  aria-labelledby={lang}
                  name={lang}
                  sx={{ gap: '0.25rem' }}
                  onChange={(e) => onChangeLanguageLevel(e, lang, index)}
                  value={basicInfo?.languagesWork?.details?.find((d) => d.value === lang)?.level || ''}
                >
                  <FormControlLabel
                    value="basic"
                    control={<Radio variant="outlined" color="secondary" sx={{ padding: 0 }} required />}
                    label="Básico"
                  />
                  <FormControlLabel
                    value="fluent"
                    control={<Radio variant="outlined" color="secondary" sx={{ padding: 0 }} required />}
                    label="Conversacional"
                  />
                  <FormControlLabel
                    value="native"
                    control={<Radio variant="outlined" color="secondary" sx={{ padding: 0 }} required />}
                    label="Nativo"
                  />
                </RadioGroup>
                <MdClose
                  size={18}
                  color={palette.bgMain}
                  style={{ position: 'absolute', top: '8', right: '8', cursor: 'pointer' }}
                  onClick={() => onDeleteLanguage(lang)}
                />
              </>
            </Badge>
          ))}
        </Stack>

        <FileInput
          type="vacancy"
          height="220px"
          htmlFor="cover"
          label="Portada"
          file={basicInfo?.coverNew || basicInfo?.cover || null}
          onRemoveFile={() => setBasicInfo({ ...basicInfo, coverNew: null, cover: null })}
          onChange={onChangeFile}
        />
      </Stack>
    </form>
  );
}

Vacancy.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Vacancy;
