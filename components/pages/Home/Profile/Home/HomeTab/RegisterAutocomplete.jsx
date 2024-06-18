import React from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Autocomplete, createFilterOptions, MenuItem, TextField } from '@mui/material';
import palette from 'styles/palette';
import AddIcon from '@mui/icons-material/Add';

const filter = createFilterOptions();
const theme = createTheme({
  components: {
    MuiAutocomplete: {
      padding: '0',
      styleOverrides: {
        inputRoot: {
          backgroundColor: palette.transparent,
          borderRadius: '0',
          padding: '0',
          color: 'black',
        },
        input: {
          color: '#000000',
          padding: '0',
          height: '2rem',
        },
        listBox: {
          color: '#000000',
        },
        option: {
          color: '#000000',
        },
        root: {
          width: '100%',
        },
      },
      '& input': {
        padding: '0',
      },
    },
  },
});
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    paddingRight: '0!important',
  },
});
/* eslint-disable react/prop-types */
const RenderOption = (props) => {
  const { option, selectedOptions = [] } = props;

  return (
    <MenuItem disabled={selectedOptions.some((selectedOption) => selectedOption.label === option?.label)} {...props}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <span>{option?.add ? `Añadir '${option?.label}'` : option.label || option}</span>
        <AddIcon sx={{ color: palette.yellowLight }} />
      </div>
    </MenuItem>
  );
};

const RegisterAutoComplete = (args) => {
  const { options, freeSolo, placeholder, selectedOptions, onClick, value, disableCloseOnSelect = false } = args;
  return (
    <ThemeProvider theme={theme}>
      <Autocomplete
        value={value}
        disableCloseOnSelect={disableCloseOnSelect}
        placeholder={placeholder}
        options={options}
        freeSolo={freeSolo}
        disableClearable
        onChange={(e, option) => {
          onClick(option?.label);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options?.some((option) => inputValue === option?.label);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              value: inputValue,
              label: `${inputValue}`,
              add: true,
            });
          }
          return filtered;
        }}
        renderOption={(props, option) => (
          <RenderOption onClick={onClick} selectedOptions={selectedOptions} option={option} {...props} />
        )}
        renderInput={(params) => (
          <CssTextField
            sx={{
              color: 'red',
              '& input': {
                padding: '0',
                fontSize: '12px',
              },
              '& fieldset': {
                border: 'none',
              },
            }}
            {...params}
            label={placeholder}
          />
        )}
        className="rounded-lg bg-cream px-4"
      />
    </ThemeProvider>
  );
};

export default RegisterAutoComplete;
