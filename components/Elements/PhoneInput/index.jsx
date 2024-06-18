import React from 'react';
import { v4 as uuid } from 'uuid';
import { TextField, Stack, Typography, Autocomplete } from '@mui/material';
import { getCodeCountries, countryToFlag } from 'utils/functions/getCodeContries';
import { FontsData } from 'styles/palette';

/**
 * @description Input component
 * @param {object} args
 * @param {string} args.placeHolder - Placeholder of input
 * @param {string} args.value - Value of input
 * @param {string} args.valueCode - Value code of country selected
 * @param {string} args.valueIso2 - Value iso of country selected
 * @param {function} args.onChange - Function to call when the input changes
 * @param {function} args.onChangeCode - Function to call when the code changes
 * @param {string} args.name - Name of input
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
 * @param {boolean} args.noTitle - Hide title
 * @param {string} args.backgroundInput - Background of input
 * @param {string} args.boxShadow - Box shadow of input
 * @returns {React.ReactNode}
 * */

function PhoneElement(args) {
  const {
    placeHolder = '',
    value = '',
    valueCode = '52',
    valueIso2 = 'MX',
    onChange = () => {},
    onChangeCode = () => {},
    name = '',
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
    noTitle = false,
    backgroundInput = 'inputs.background',
    boxShadow = 'none',
    widthSelect = '',
    widthInput = '',
    styledInput = {},
    styledSelect = {},
    styledSxTextFiel = {},
  } = args;

  const codes = getCodeCountries();
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
    <Stack width="100%" spacing={1}>
      {!noTitle && titleRender}
      <Stack direction="row" spacing={2}>
        <Autocomplete
          id="code-countries"
          freeSolo
          autoHighlight
          value={{
            value: valueIso2,
            label: valueCode,
          }}
          onChange={(event, value) =>
            onChangeCode({
              codeCountry: value.label,
              iso2: value.value,
            })
          }
          disableClearable
          getOptionLabel={(option) => option.label.toString()}
          options={(codes || []).map((item) => ({
            ...item,
            value: item.iso2,
            label: item.phoneCode,
          }))}
          renderOption={(props, option) => (
            <li {...props} key={uuid()}>
              <Typography sx={{ color: 'text.main' }} variant="p">
                {countryToFlag(option?.value)} {`  +${option.label}`}
              </Typography>
            </li>
          )}
          sx={{
            width: widthSelect || 150,
            borderRadius: '8px',
            alignItems: 'center',
            display: 'flex',
            '& .MuiInput-root': {
              color: 'text.main',
              fontFamily: FontsData.reg,
              fontSize: '1.3em',
            },
            ...(boxShadow !== 'none' ? { boxShadow } : {}),
            bgcolor: backgroundInput,
            ...styledSelect,
          }}
          renderInput={(params) => (
            <TextField
              hiddenLabel
              {...params}
              InputProps={{
                ...params?.InputProps,
                notched: false,
                disableUnderline: true,
              }}
              variant={variant}
              label=""
            />
          )}
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
          helperText={error ? errorMessage : ''}
          onBlur={onBlur}
          sx={{
            ...(boxShadow !== 'none' ? { boxShadow } : {}),
            bgcolor: backgroundInput,
            ...styledSxTextFiel,
          }}
          variant={variant}
          InputProps={{
            sx: {
              fontSize: '1.3em',
              width: widthInput || 'auto',
              paddingTop: '5px',
              paddingBottom: '5px',
              ...styledInput,
              color: colorInput,
            },
            endAdornment,
            notched: false,
            disableUnderline: true,
          }}
        />
      </Stack>
    </Stack>
  );
}

export default PhoneElement;
