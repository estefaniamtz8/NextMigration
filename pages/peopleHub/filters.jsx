import React from 'react';
import CalendarContainerLocal from 'components/Elements/Calendar';
import Constants from 'utils/constants/user.json';
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  Popover,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import Countries from 'utils/constants/countries.json';
import palette, { FontsData } from 'styles/palette';
import newVacancyConstant from 'utils/constants/newVacancy.json';
import { useQuery } from '@tanstack/react-query';
import Address from '../../components/pages/Home/Profile/Home/HomeTab/Addres';
import { styleCustomFilterAutoComplete } from '../../styles/generics';
import getTags from '../../services/tags';

const Filters = (args) => {
  const {
    dataPopoverFilter = {},
    handleCloseFilter,
    filter,
    originJson,
    adaptOptionUser,
    onChangedDates,
    onChangeInputFilter,
    setFilter,
  } = args;
  const { typePosition } = newVacancyConstant.general;
  const { data: dataTags } = useQuery({
    queryFn: () => getTags(),
    queryKey: ['getTags'],
  });
  const listOfTags = dataTags?.tags?.map((tag) => tag?.value) || [];
  return (
    <Popover
      // id={dataPopoverFilter?.data?.docID}
      open={dataPopoverFilter?.open}
      anchorEl={dataPopoverFilter?.anchorEl}
      onClose={handleCloseFilter}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <main
        style={{
          padding: '20px',
          width: '24vw',
          gap: '20px',
          display: 'flex',
          flexDirection: 'flex-col',
          flexWrap: 'wrap',
        }}
      >
        {/* Filter Viablidda */}
        <FormControl>
          <InputLabel id="demo-simple-select-label">Viabilidad</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            style={{
              backgroundColor: palette.bgMain,
              color: palette.black,
              width: 'calc(24vw - 40px)',
            }}
            placeholder="Selecciona un tipo"
            value={filter?.viability}
            onChange={({ target }) => {
              onChangeInputFilter({
                target: {
                  name: 'viability',
                  value: target?.value,
                },
              });
            }}
            // variant="outlined"
            label="Viabilidad"
          >
            <MenuItem value="all">
              <div className="flex w-28 items-center gap-4">
                <div className="h-2.5 w-2.5 rounded-full bg-green" />
                <p className="text-[15px] text-black">Todos</p>
              </div>
            </MenuItem>
            <MenuItem value="viable">
              <div className="flex w-28 items-center gap-4">
                <div className="h-2.5 w-2.5 rounded-full bg-green" />
                <p className="text-[15px] text-black">Viable</p>
              </div>
            </MenuItem>
            <MenuItem value="noViable">
              <div className="flex w-28 items-center gap-4">
                <div className="h-2.5 w-2.5 rounded-full bg-red" />
                <p className="text-[15px] text-black">No viable</p>
              </div>
            </MenuItem>
            <MenuItem value="inProcess">
              <div className="flex w-28 items-center gap-4">
                <div className="h-2.5 w-2.5 rounded-full bg-gray" />
                <p className="text-[15px] text-black">En proceso</p>
              </div>
            </MenuItem>
          </Select>
        </FormControl>
        {/* Filter interest position */}
        <FormControl>
          <Autocomplete
            id="positionFilter"
            name="positionFilter"
            placeholder="Selecciona una opción"
            value={filter?.positionFilter || []}
            freeSolo
            multiple
            options={typePosition}
            limitTags={1}
            onChange={(event, value) => {
              // console.log(value)
              onChangeInputFilter({
                target: {
                  name: 'positionFilter',
                  value: adaptOptionUser(value),
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Posiciones de Interés"
                style={{
                  backgroundColor: palette.bgMain,
                  color: palette.black,
                  width: 'calc(24vw - 40px)',
                }}
              />
            )}
            ListboxProps={{
              sx: {
                '& .MuiAutocomplete-option': {
                  color: 'text.main',
                  fontFamily: FontsData.reg,
                },
              },
            }}
            getOptionLabel={(option) => option?.label || option || 'Selecciona una opción'}
            sx={styleCustomFilterAutoComplete}
          />
        </FormControl>
        {/* Filter Date */}
        <FormControl>
          <CalendarContainerLocal dates={filter} handleDates={onChangedDates} />
        </FormControl>
        {/* Filter Origin */}
        <FormControl>
          <Autocomplete
            disablePortal
            id="originFilter"
            name="originFilter"
            placeholder="Selecciona una opción"
            value={filter?.originFilter || []}
            multiple
            options={originJson}
            limitTags={1}
            onChange={(event, value) => {
              onChangeInputFilter({
                target: {
                  name: 'originFilter',
                  value,
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                hiddenLabel
                label="Origin"
                style={{
                  backgroundColor: palette.bgMain,
                  color: palette.black,
                  width: '100%',
                }}
              />
            )}
            ListboxProps={{
              sx: {
                '& .MuiAutocomplete-option': {
                  color: 'text.main',
                  fontFamily: FontsData.reg,
                },
              },
            }}
            getOptionLabel={(option) => option.label || 'Selecciona una opción'}
            sx={styleCustomFilterAutoComplete}
          />
        </FormControl>
        {/* Filter languages */}
        <FormControl>
          <InputLabel id="languagesFilter">Idiomas</InputLabel>
          <Select
            // id="demo-multiple-checkbox"
            id="languagesFilter"
            name="languagesFilter"
            label="Idiomas"
            placeholder="Selecciona una opción"
            value={filter?.languagesFilter || []}
            multiple
            onChange={onChangeInputFilter}
            renderValue={(selected) => selected?.map((select) => select?.label).join(', ')}
            style={{
              backgroundColor: palette.bgMain,
              color: palette.black,
              width: 'calc(24vw - 40px)',
            }}
          >
            {Constants?.languages?.map((document) => (
              <MenuItem key={document?.value} value={document}>
                <Checkbox
                  checked={
                    Object.keys(filter?.languagesFilter?.find((doc) => doc?.value === document?.value) || {})?.length
                  }
                />
                <ListItemText primary={document?.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Filter Academy Level */}
        <FormControl>
          <InputLabel id="academyLevelFilter">Nivel Academico</InputLabel>
          <Select
            id="academyLevelFilter"
            name="academyLevelFilter"
            placeholder="Selecciona una opción"
            label="Nivel Academico"
            value={filter?.academyLevelFilter || []}
            multiple
            onChange={onChangeInputFilter}
            renderValue={(selected) => selected?.map((select) => select?.label).join(', ')}
            style={{
              width: 'calc(24vw - 40px)',
              backgroundColor: palette.bgMain,
              color: palette.black,
            }}
          >
            {Constants?.education?.map((document) => (
              <MenuItem key={document?.value} value={document}>
                <Checkbox
                  checked={
                    Object.keys(filter?.academyLevelFilter?.find((doc) => doc?.value === document?.value) || {})?.length
                  }
                />
                <ListItemText primary={document?.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Filter Nationality */}
        <FormControl>
          <InputLabel id="nationalityFilter">Nacionalidad</InputLabel>
          <Select
            id="nationalityFilter"
            name="nationalityFilter"
            placeholder="Selecciona una opción"
            label="Nacionalidad"
            value={filter?.nationalityFilter || []}
            multiple
            onChange={onChangeInputFilter}
            renderValue={(selected) => selected?.map((select) => select?.label).join(', ')}
            style={{
              width: 'calc(24vw - 40px)',
              backgroundColor: palette.bgMain,
              color: palette.black,
            }}
          >
            {Countries?.countries?.map((document) => (
              <MenuItem key={document?.value} value={document}>
                <Checkbox
                  checked={
                    Object.keys(filter?.nationalityFilter?.find((doc) => doc?.value === document?.value) || {})?.length
                  }
                />
                <ListItemText primary={document?.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ width: '100%' }}>
          <Address state={filter} setState={setFilter} />
        </div>
        {/* Filter Fair La pieza */}
        <FormControl>
          <FormControlLabel
            id="fairFilter"
            name="fairFilter"
            // placeholder="Selecciona una opción"
            // label="fairFilter"
            onChange={(e) => {
              setFilter((prev) => ({
                ...prev,
                fairFilter: e.target.checked || false,
                page: 1,
              }));
            }}
            control={<Switch />}
            label="Perfil Feria"
          />
        </FormControl>
        {/* Filter tags */}
        <FormControl>
          <Autocomplete
            id="tagFilter"
            name="tagFilter"
            placeholder="Selecciona una opción"
            value={filter?.tagFilter || []}
            freeSolo
            multiple
            options={listOfTags}
            limitTags={1}
            onChange={(event, value) => {
              // console.log(value)
              onChangeInputFilter({
                target: {
                  name: 'tagFilter',
                  value,
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Etiquetas"
                style={{
                  backgroundColor: palette.bgMain,
                  color: palette.black,
                  width: 'calc(24vw - 40px)',
                }}
              />
            )}
            ListboxProps={{
              sx: {
                '& .MuiAutocomplete-option': {
                  color: 'text.main',
                  fontFamily: FontsData.reg,
                },
              },
            }}
            getOptionLabel={(option) => option?.label || option || 'Selecciona una opción'}
            sx={styleCustomFilterAutoComplete}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="groupFilter">Grupos</InputLabel>
          <Select
            // id="demo-multiple-checkbox"
            id="groupFilter"
            name="groupFilter"
            label="Grupos"
            placeholder="Selecciona una opción"
            value={filter?.groupFilter || []}
            multiple
            onChange={onChangeInputFilter}
            renderValue={(selected) => selected?.map((select) => select?.label).join(', ')}
            style={{
              backgroundColor: palette.bgMain,
              color: palette.black,
              width: 'calc(24vw - 40px)',
            }}
          >
            {Constants?.groups?.map((document) => (
              <MenuItem key={document?.value} value={document}>
                <Checkbox
                  checked={
                    Object.keys(filter?.groupFilter?.find((doc) => doc?.value === document?.value) || {})?.length
                  }
                />
                <ListItemText primary={document?.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </main>
    </Popover>
  );
};

export default Filters;
