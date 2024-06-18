import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import palette from 'styles/palette';

import { createFilterOptions } from '@mui/material';
import textareaStyles from './styles';
import commonPropTypes, { defaultProps, selectPropTypes } from './types';

const InputWithLabel = React.forwardRef(({ label, width = '100%', htmlFor, direction, ...props }, ref) => (
  <Stack spacing={1} direction={direction} sx={{ width }}>
    <FormLabel htmlFor={htmlFor} required={props.required}>
      {label}
    </FormLabel>
    <Input id={htmlFor} name={htmlFor} ref={ref} {...props} />
  </Stack>
));

InputWithLabel.displayName = 'InputWithLabel';
InputWithLabel.defaultProps = defaultProps;
InputWithLabel.propTypes = commonPropTypes;

export default InputWithLabel;

export const TextareaWithLabel = React.forwardRef(({ label, htmlFor, direction, ...props }, ref) => (
  <Stack spacing={1} direction={direction} sx={{ width: '100%' }}>
    <FormLabel htmlFor={htmlFor} required={props.required}>
      {label}
    </FormLabel>
    <TextareaAutosize id={htmlFor} name={htmlFor} ref={ref} style={textareaStyles} {...props} />
  </Stack>
));

TextareaWithLabel.displayName = 'TextareaWithLabel';
TextareaWithLabel.defaultProps = defaultProps;
TextareaWithLabel.propTypes = commonPropTypes;

export const SelectWithLabel = React.forwardRef(({ label, htmlFor, direction, options, ...props }, ref) => (
  <Stack spacing={1} direction={direction} sx={{ width: '100%' }}>
    <FormLabel htmlFor={htmlFor} required={props.required}>
      {label}
    </FormLabel>
    <Select
      id={htmlFor}
      name={htmlFor}
      ref={ref}
      labelId={htmlFor}
      sx={props.asChips ? { height: 'auto !important' } : {}}
      renderValue={(selected) => {
        if (selected.length === 0) {
          return props.placeholder;
        }
        if (props.multiple && props.asChips) {
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={options.find((opt) => opt.value === value)?.label || value}
                  sx={{ backgroundColor: palette.red300, color: palette.blackText }}
                />
              ))}
            </Box>
          );
        }
        return props.multiple
          ? selected.map((value) => options.find((opt) => opt.value === value)?.label || value).join(', ')
          : options.find((opt) => opt.value === selected)?.label || selected;
      }}
      displayEmpty
      {...props}
    >
      <MenuItem disabled value="">
        {props.placeholder}
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </Stack>
));

SelectWithLabel.displayName = 'SelectWithLabel';
SelectWithLabel.defaultProps = defaultProps;
SelectWithLabel.propTypes = selectPropTypes;

const filter = createFilterOptions();

export const AutocompleteWithLabel = React.forwardRef(({ label, htmlFor, direction, options, ...props }, ref) => (
  <Stack spacing={1} direction={direction} sx={{ width: '100%' }}>
    <FormLabel htmlFor={htmlFor} required={props.required}>
      {label}
    </FormLabel>
    <Autocomplete
      id={htmlFor}
      name={htmlFor}
      ref={ref}
      labelId={htmlFor}
      options={options}
      getOptionLabel={(option) => option.label}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.label);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            label: `${inputValue}`,
            add: true,
            value: inputValue,
          });
        }

        return filtered;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={props.placeholder}
          variant={props.variant}
          color={props.color}
          size={props.size}
        />
      )}
      renderOption={(props, option) =>
        option?.add ? <li {...props}>{`Añadir "${option.label}"`}</li> : <li {...props}>{option.label}</li>
      }
      {...props}
    />
  </Stack>
));

AutocompleteWithLabel.displayName = 'AutocompleteWithLabel';
AutocompleteWithLabel.defaultProps = defaultProps;
AutocompleteWithLabel.propTypes = selectPropTypes;

export const CheckboxWithLabel = React.forwardRef(({ label, htmlFor, direction, ...props }, ref) => (
  <Stack spacing={1} alignItems="center" direction={direction} sx={{ width: '100%' }}>
    <Checkbox id={htmlFor} name={htmlFor} ref={ref} {...props} />
    <FormLabel htmlFor={htmlFor} required={props.required}>
      {label}
    </FormLabel>
  </Stack>
));

CheckboxWithLabel.displayName = 'CheckboxWithLabel';
CheckboxWithLabel.defaultProps = defaultProps;
CheckboxWithLabel.propTypes = commonPropTypes;
