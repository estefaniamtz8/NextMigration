import React from 'react';
import { IconButton, TextField, InputAdornment, Stack, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
 * @param {string} args.title - Title of input
 * @param {string} args.variant - Variant of input
 * @param {boolean} args.variantTitle - Variant of title
 * @param {boolean} args.hiddenLabel - Hide label
 * @param {boolean} args.isRequiredInTitle - Show required in title
 * @param {string} args.colorTitle - Color of title
 * @param {string} args.colorInput - Color of input
 * @param {string} args.keyElement - Key of input (Optional)
 * @param {function} args.onKeyPress - Function to call when the input is pressed
 * @returns {React.ReactNode}
 * */

const InputElement = function (args) {
  const {
    placeHolder = '',
    value = '',
    onChange = () => {},
    name = '',
    disabled = false,
    error = false,
    errorMessage = '',
    onBlur = () => {},
    title = '',
    variant = 'standard',
    variantTitle = '',
    hiddenLabel = false,
    isRequiredInTitle = false,
    colorTitle = 'text.main',
    colorInput = 'text.main',
    keyElement = '',
    className = '',
    onKeyPress = () => {},
  } = args;

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(true);
  };

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
        type={showPassword ? 'text' : 'password'}
        placeholder={placeHolder}
        value={value}
        {...(keyElement ? { key: keyElement } : {})}
        onChange={onChange}
        name={name}
        disabled={disabled}
        error={error}
        helperText={errorMessage}
        onBlur={onBlur}
        autoComplete="current-password"
        variant={variant}
        className={`${className}`}
        onKeyPress={onKeyPress}
        InputProps={{
          sx: {
            color: colorInput,
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export default InputElement;
