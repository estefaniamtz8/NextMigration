import React from 'react';
import { Autocomplete, Button, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuid } from 'uuid';
import { MdClose } from 'react-icons/md';
import toast from 'react-hot-toast';
import palette, { FontsData } from '../../../styles/palette';

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
 * @param {String} args.bgcolor - Background color of component
 * @param {String} args.colorInput - Color of input
 * @param {React.ReactNode} args.endAdornment - End adornment of input
 * */

function AutocompleteExperience(args) {
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
    bgcolor = 'selects.white.main',
    colorInput = 'text.main',
    endAdornment = null,
    width = '100%',
  } = args;

  if (!options) {
    throw new Error('MultiSelect: options is required');
  }

  const [selected, setSelected] = React.useState({});
  const [month, setMonth] = React.useState('1');

  const hasVariant = variantTitle && variantTitle.length > 0;
  const hasTitle = title && title.length > 0;

  const titleRender = React.useMemo(() => {
    if (hasTitle && hasVariant) {
      return (
        <Typography
          variant={variantTitle}
          sx={{ color: colorTitle, fontWeight: '300', fontSize: '1.3em', fontFamily: 'typography.fontFamily' }}
        >
          {title} {isRequiredInTitle ? <strong style={{ color: 'rgb(255, 0, 0)' }}>*</strong> : null}
        </Typography>
      );
    }
    if (hasTitle) {
      return (
        <Typography
          sx={{ color: colorTitle, fontWeight: '300', fontSize: '1.3em', fontFamily: 'typography.fontFamily' }}
        >
          {title} {isRequiredInTitle ? <strong style={{ color: 'rgb(255, 0, 0)' }}>*</strong> : null}
        </Typography>
      );
    }
    return null;
  }, [title, variantTitle]);

  const onDeleteValue = React.useCallback(
    (deleteValue) => {
      const newValues = value.filter((item) => item.value !== deleteValue?.value);
      onChange({
        target: {
          name,
          value: newValues,
        },
      });
    },
    [value]
  );

  const onAddValue = React.useCallback(() => {
    if (!selected.value) {
      toast.error('Por favor selecciona un valor');
    } else {
      const findDataFind = value?.find((val) => val?.value === selected?.value);
      if (findDataFind) {
        toast.error('Solo se puede agregar una vez este elemento.');
      } else {
        const newValues = [...value, { ...selected, month }];
        onChange({
          target: {
            name,
            value: newValues,
          },
        });
        setSelected({});
        setMonth('1');
      }
    }
  }, [month, selected]);

  const renderValues = React.useMemo(
    () =>
      value.map((item) => (
        <Stack p={2} bgcolor="primary.main" direction="row" key={uuid()} borderRadius={2}>
          <Stack flexGrow={1}>
            <Typography
              variant="p"
              sx={{
                color: 'text.primary',
                fontFamily: FontsData.reg,
                fontSize: '1.4em',
              }}
            >
              {item.label}
            </Typography>
            <Typography
              variant="p"
              sx={{
                color: 'text.primary',
                fontFamily: FontsData.reg,
                fontSize: '1.4em',
              }}
            >
              {item.month} meses
            </Typography>
          </Stack>
          <Stack justifyContent="center" alignItems="center">
            <Stack onClick={() => onDeleteValue(item)} sx={{ cursor: 'pointer' }}>
              <MdClose size={30} color="#FFF" />
            </Stack>
          </Stack>
        </Stack>
      )),
    [value]
  );

  return (
    <Stack width={width} spacing={1}>
      {titleRender}
      <Stack>
        <Typography
          variant="p"
          sx={{
            fontFamily: FontsData.reg,
            fontSize: '1em',
            fontWeight: '400',
            color: palette.colorLight,
          }}
        >
          Posición {value.length}
        </Typography>
      </Stack>
      <Stack>
        <Autocomplete
          limitTags={2}
          size="regular"
          id="multiple-limit-tags"
          options={options}
          getOptionLabel={(option) => option.label || 'Selecciona una opción'}
          defaultValue={value}
          value={value}
          onChange={(event, value) => {
            setSelected(value);
          }}
          disableClearable
          sx={{
            bgcolor,
            borderRadius: '8px',
            alignItems: 'center',
            display: 'flex',
            fontSize: '1rem',
            '& .MuiInput-root': {
              color: 'text.main',
              fontSize: '0.6rem',
            },
            '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
              color: 'text.main',
              fontSize: '0.7rem',
            },
            '& .MuiAutocomplete-tag': {
              color: 'text.main',
              fontSize: '0.7rem',
              '& >span': {
                color: 'text.primary',
              },
            },
          }}
          ListboxProps={{
            sx: {
              '& .MuiAutocomplete-option': {
                color: 'text.main',
                fontFamily: FontsData?.reg,
                fontSize: '0.8rem',
              },
            },
          }}
          renderInput={(params) => <TextField {...params} hiddenLabel label="" placeholder={placeholder} />}
          fullWidth
        />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" pb={2} pt={2}>
        <Typography
          variant="p"
          sx={{
            fontFamily: FontsData.reg,
            fontSize: '1.2em',
            fontWeight: '400',
          }}
        >
          Meses trabajando
        </Typography>
        <TextField
          sx={{
            width: '60px',
          }}
          hiddenLabel
          value={month}
          onChange={(event) => setMonth(event.target.value)}
          type="number"
          variant="standard"
          min={0}
          InputProps={{
            sx: {
              color: colorInput,
              bgcolor,
              '&::before': {
                borderBottom: 'none',
              },
              '&::after': {
                borderBottom: 'none',
              },
            },
            endAdornment,
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon color="text.primary" />}
          onClick={onAddValue}
          sx={{
            fontFamily: FontsData.reg,
            fontSize: '1.2em',
            fontWeight: '400',
          }}
        >
          <Typography
            variant="p"
            sx={{
              color: 'text.primary',
              fontFamily: FontsData.reg,
              fontSize: '1.2em',
              fontWeight: '400',
            }}
          >
            Añadir
          </Typography>
        </Button>
      </Stack>
      {value?.length > 0 && (
        <Stack
          spacing={2}
          borderTop="solid 1px #DBDBDB"
          sx={{
            height: '38vh',
            overflow: 'auto',
            padding: '10px 10px',
          }}
        >
          {renderValues}
        </Stack>
      )}
    </Stack>
  );
}

export default AutocompleteExperience;
