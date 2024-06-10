import { Autocomplete, Stack, TextField, Typography } from '@mui/material';

/**
 * @param {Object} args - Properties of component
 * @param {Array} args.options - Options of component
 * @param {Array} args.value - Value of component
 * @param {String} args.placeholder - Placeholder of component
 * @param {String} args.variantTitle - Variant of title
 * @param {String} args.title - Title of component
 * @param {String} args.name - Name of component
 * @param {Boolean} args.isRequiredInTitle - Is required in title
 * @param {String} args.colorTitle - Color of title
 * @param {Function} args.onChange - Function on change
 * @param {Boolean} args.multiple - Is multiple (Default: true)
 * @param {String} args.bgcolor - Background color of component
 */

function MultiSelect({
  options,
  value = [],
  placeholder = '',
  variantTitle,
  title = '',
  name = '',
  isRequiredInTitle,
  colorTitle,
  onChange = () => {},
  multiple = false,
  bgcolor = 'selects.white.main',
}) {
  if (!options) {
    throw new Error('MultiSelect: options is required');
  }

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
      <Stack>
        <Autocomplete
          multiple={multiple}
          limitTags={2}
          size="regular"
          id="multiple-limit-tags"
          options={options}
          getOptionLabel={(option) => option.label || 'Selecciona una opción'}
          defaultValue={value}
          value={value}
          onChange={(event, value) => {
            onChange({
              target: {
                name,
                value,
              },
            });
          }}
          disableClearable
          sx={{
            bgcolor,
            borderRadius: '8px',
            alignItems: 'center',
            display: 'flex',
            '& .MuiInput-root': {
              color: 'text.main',
            },
            '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
              color: 'text.main',
            },
            '& .MuiAutocomplete-tag': {
              color: 'text.main',
              '& >span': {
                color: 'text.primary',
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
          renderInput={(params) => <TextField {...params} hiddenLabel label="" placeholder={placeholder} />}
          fullWidth
        />
      </Stack>
    </Stack>
  );
}

export default MultiSelect;
