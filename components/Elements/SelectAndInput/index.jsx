import React from 'react';
import { TextField, Stack, Typography, Autocomplete } from '@mui/material';

/**
 * @description Input component
 * @param {object} args
 * @param {string} args.placeHolder - Placeholder of input
 * @param {string} args.value - Value of input
 * @para, {Object} args.valueSelect - Value of select
 * @param {function} args.onChange - Function to call when the input changes
 * @param {function} args.onChangeSelect - Function to call when the code changes
 * @param {string} args.name - Name of input
 * @param {string} args.nameSelect - Name of select
 * @param {boolean} args.disabled - Disable input
 * @param {boolean} args.error - Show error
 * @param {string} args.errorMessage - Message of error
 * @param {function} args.onBlur - Function to call when the input loses focus
 * @param {React.ReactNode} args.endAdornment - Adornment of input
 * @param {string} args.title - Title of input
 * @param {string} args.variant - Variant of input
 * @param {boolean} args.variantTitle - Variant of title
 * @param {boolean} args.hiddenLabel - Hide label
 * @param {boolean} args.isRequiredInTitle - Show required in title
 * @param {string} args.colorTitle - Color of title
 * @param {string} args.colorInput - Color of input
 * @param {string} args.autoComplete - Auto complete
 * @param {string} args.keyElement - Key of input (Optional)
 * @param {array} args.options - Options of select
 * @param {string} args.bgcolorSelect - Background color of select
 * @param {boolean} args.noBorder - No border in elements
 * @param {string} args.placeHolderSelect - Placeholder of select
 * @param {string} args.bgcolor - Background color of input
 * @returns {React.ReactNode}
 * */

function SelectAndInput(args) {
  const {
    placeHolder = '',
    value = '',
    valueSelect = null,
    onChange = () => {},
    onChangeSelect = () => {},
    name = '',
    nameSelect = '',
    disabled = false,
    error = false,
    errorMessage = '',
    onBlur = () => {},
    endAdornment = null,
    title = '',
    variant = 'standard',
    variantTitle = '',
    hiddenLabel = false,
    isRequiredInTitle = false,
    colorTitle = 'text.main',
    colorInput = 'text.main',
    autoComplete = 'off',
    keyElement = '',
    options = [],
    bgcolorSelect = 'selects.white.main',
    noBorder = false,
    placeHolderSelect = '',
    bgcolor = 'selects.white.main',
    width= '100%',
    widthSelect = '100%',
    widthInput = '100%'
  } = args;

  const hasVariant = variantTitle && variantTitle.length > 0;
  const hasTitle = title && title.length > 0;

  const titleRender = React.useMemo(() => {
    if (hasTitle && hasVariant) {
      return (
        <Typography variant={variantTitle} sx={{ color: colorTitle }}>
          {title} {isRequiredInTitle ? <strong style={{ color: 'rgb(255, 0, 0)' }}>*</strong> : null}
        </Typography>
      );
    }
    if (hasTitle) {
      return (
        <Typography sx={{ color: colorTitle }}>
          {title} {isRequiredInTitle ? <strong style={{ color: 'rgb(255, 0, 0)' }}>*</strong> : null}
        </Typography>
      );
    }
    return null;
  }, [title, variantTitle]);

  return (
    <Stack width={width} spacing={1}>
      {titleRender}
      <Stack direction="row">
        <Autocomplete
          id="code-countries"
          freeSolo
          name={nameSelect}
          autoHighlight
          placeholder={placeHolderSelect}
          value={valueSelect}
          onChange={(event, value) => {
            onChangeSelect({
              target: {
                name: nameSelect,
                value,
              },
            });
          }}
          disableClearable
          getOptionLabel={(option) => option.label.toString()}
          options={options}
          sx={{
            borderRadius: '4px',
            width: widthSelect || 150,
            bgcolor: bgcolorSelect,
            alignItems: 'center',
            display: 'flex',
            '& .MuiInput-root': {
              color: 'text.main',
              bgcolor: bgcolorSelect,
              '&::before': {
                borderBottom: noBorder ? 'none' : '1px solid rgba(0, 0, 0, 0.42)',
              },
              '&::after': {
                borderBottom: noBorder ? 'none' : '2px solid #000B0C',
              },
            },
          }}
          ListboxProps={{
            sx: {
              '& .MuiAutocomplete-option': {
                color: 'text.main',
              },
            },
          }}
          renderInput={(params) =>
            <TextField
              hiddenLabel
              {...params}
              variant={variant} label=""
              InputProps={{
                ...params?.InputProps,
                notched: false,
                disableUnderline: true,
              }}
            />}
        />
        <TextField
          hiddenLabel={hiddenLabel}
          placeholder={placeHolder}
          value={value}
          {...(keyElement ? { key: keyElement } : {})}
          onChange={onChange}
          autoComplete={autoComplete}
          type="number"
          name={name}
          disabled={disabled}
          error={error}
          helperText={errorMessage}
          onBlur={onBlur}
          variant={variant}
          InputProps={{
            disableUnderline: true,
            sx: {
              width: widthInput || 'auto',
              color: colorInput,
              bgcolor,
              border: '1px solid #DBDBDB',
              borderRadius: 'none',
              marginLeft: '10px',
              '&::before': {
                border: 'none',
              },
              '&::after': {
                borderBottom: noBorder ? 'none' : '2px solid #000B0C',
              },
            },
            endAdornment,
          }}
        />
      </Stack>
    </Stack>
  );
}

export default SelectAndInput;
