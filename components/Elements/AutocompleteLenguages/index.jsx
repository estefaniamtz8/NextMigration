import React from 'react';
import { Autocomplete, Rating, Stack, TextField, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import {FontsData} from "../../../styles/palette";

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
 * */

function MultiSelect(args) {
  const {
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
    width = '100%',
    limitTags = 2
  } = args;

  if (!options) {
    throw new Error('MultiSelect: options is required');
  }

  const hasVariant = variantTitle && variantTitle.length > 0;
  const hasTitle = title && title.length > 0;

  const titleRender = React.useMemo(() => {
    if (hasTitle && hasVariant) {
      return (
        <Typography variant={variantTitle} sx={{ color: colorTitle, fontWeight: '300', fontSize:'1.3em', fontFamily: 'typography.fontFamily' }}>
          {title} {isRequiredInTitle ? <strong style={{ color: 'rgb(255, 0, 0)' }}>*</strong> : null}
        </Typography>
      );
    }
    if (hasTitle) {
      return (
        <Typography sx={{ color: colorTitle,fontWeight: '300', fontSize:'1.3em', fontFamily: 'typography.fontFamily' }}>
          {title} {isRequiredInTitle ? <strong style={{ color: 'rgb(255, 0, 0)' }}>*</strong> : null}
        </Typography>
      );
    }
    return null;
  }, [title, variantTitle]);

  const renderRating = React.useMemo(
    () =>
      value.map((item) => (
        <Stack direction="row" width="100%" borderBottom="solid 1px #DBDBDB" py={2}>
          <Stack width="40%">
            <Typography
              variant="p"
              sx={
                {
                  fontSize: '1.5em',
                  fontFamily: FontsData.reg,
                }
              }
            >{item.label}</Typography>
          </Stack>
          <Stack width="60%">
            <Rating
              name={item.value}
              value={item.rating}
              size="large"
              max={4}
              icon={<StarIcon fontSize="inherit" color="primary.main" />}
              precision={1}
              sx={
                {
                  fontFamily: 'typography.fontFamily',
                }
              }
              onChange={(event, newValue) => {
                const newValues = value.reduce((acc, element) => {
                  if (item.value === element.value) {
                    acc.push({ ...element, rating: newValue });
                  } else {
                    acc.push(element);
                  }
                  return acc;
                }, []);
                onChange({
                  target: {
                    name,
                    value: newValues,
                  },
                });
              }}
            />
          </Stack>
        </Stack>
      )),
    [value]
  );

  return (
    <Stack width={width} spacing={1}>
      {titleRender}
      <Stack>
        <Autocomplete
          multiple={multiple}
          limitTags={limitTags}
          size="regular"
          id="fixed-tags-demo"
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
                fontFamily: FontsData.reg,
              },
            },
          }}
          renderInput={(params) => <TextField {...params} hiddenLabel label="" placeholder={placeholder} />}
          fullWidth
        />
      </Stack>
      <Stack>
        <Typography variant="body2" sx={{
          color: 'text.main',
          fontFamily: 'typography.fontFamily',
          fontSize: '1.1em',
          textAlign: 'center'
        }}>
          Niveles: básico | intermedio | avanzado | experto
        </Typography>
      </Stack>
      <Stack pt={2}>{renderRating}</Stack>
    </Stack>
  );
}

export default MultiSelect;
