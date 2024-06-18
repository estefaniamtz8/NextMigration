import React from 'react';
import { TextField, Stack, Typography } from '@mui/material';

/**
 * @description Input component
 * @param {object} args
 * @param {string} args.placeHolder - Placeholder of input
 * @param {string} args.value - Value of input
 * @param {function} args.onChange - Function to call when the input changes
 * @param {string} args.type - Type of input
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
 * @param {string} args.boxShadow - Box shadow of input
 * @param {function} args.onKeyPress - Function to call when the input is pressed
 * @returns {React.ReactNode}
 * */

function InputElement(args) {
  const {
    placeHolder = '',
    value = '',
    onChange = () => {},
    type = 'text',
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
    boxShadow = 'none',
    className = '',
    onKeyPress = () => {},
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
        value={value}
        {...(keyElement ? { key: keyElement } : {})}
        onChange={onChange}
        autoComplete={autoComplete}
        type={type}
        name={name}
        disabled={disabled}
        error={error}
        helperText={errorMessage}
        className={className}
        sx={{
          borderWidth: '1px',
          borderColor: 'inputs.border',
          borderStyle: 'solid',
          ...(boxShadow !== 'none' ? { boxShadow } : {}),
        }}
        onKeyPress={onKeyPress}
        onBlur={onBlur}
        variant={variant}
        InputProps={{
          sx: {
            color: colorInput,
          },
          endAdornment,
        }}
      />
    </Stack>
  );
}

export default InputElement;
