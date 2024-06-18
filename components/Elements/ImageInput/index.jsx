import React from 'react';
import { TextField, Stack, Typography } from '@mui/material';
import { LiaDownloadSolid } from 'react-icons/lia'

/**
 * @description Input component
 * @param {object} args
 * @param {string} args.placeHolder - Placeholder of input
 * @param {string} args.value - Value of input
 * @param {function} args.onChange - Function to call when the input changes
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
 * @returns {React.ReactNode}
 * */

function ImageInputElement(args) {
  const {
    placeHolder = '',
    value = '',
    onChange = () => {},
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
    <Stack width="100%" spacing={1}>
      {titleRender}
      <TextField
        hiddenLabel={hiddenLabel}
        placeholder={placeHolder}
        {...(keyElement ? { key: keyElement } : {})}
        onChange={onChange}
        autoComplete={autoComplete}
        type="file"
        id={name}
        name={name}
        disabled={disabled}
        error={error}
        helperText={errorMessage}
        onBlur={onBlur}
        variant={variant}
        sx={{
          display: 'none !important',
        }}
        InputProps={{
          sx: {
            color: colorInput,
          },
          endAdornment,
        }}
        /* eslint-disable-next-line react/jsx-no-duplicate-props */
        inputProps={{
          accept: 'image/*',
        }}
      />
      <label htmlFor={name}>
        <Stack
          direction="row"
          bgcolor="selects.white.main"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          py={1}
          spacing={2}
        >
          <Stack>
            <LiaDownloadSolid color="#646464" size={30} />
          </Stack>
          <Typography variant="p" sx={{ color: '#646464' }}>
            {value.name || 'Seleccionar Logo'}
          </Typography>
        </Stack>
      </label>
    </Stack>
  );
}

export default ImageInputElement;
