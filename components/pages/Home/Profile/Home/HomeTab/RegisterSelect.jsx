import { Select, InputBase, InputLabel, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(1),
  },
  '.css-mhmazu-MuiSelect-select-MuiInputBase-input.css-mhmazu-MuiSelect-select-MuiInputBase-input.css-mhmazu-MuiSelect-select-MuiInputBase-input':
    {
      height: '2rem',
      borderRadius: '0.5rem',
      fontSize: '14px',
    },
  '& .MuiInputBase-input': {
    position: 'relative',
    backgroundColor: 'transparent',
    borderBottom: '1px solid',
    borderRadius: '0',
    fontSize: 16,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    color: 'black',
    border: 'none',
    background: '#F9F7ED',
    height: '2rem',
    paddingLeft: '1rem',
    display: 'flex',
    alignItems: 'center',
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  '& ul': {
    paddingTop: '0',
  },
}));

const RegisterSelect = (args) => {
  const { children, label, onChange, value, labelId } = args;
  return (
    <FormControl id={labelId} fullWidth>
      <InputLabel style={{ color: '#555' }} id={labelId}>
        {label}
      </InputLabel>
      <Select onChange={onChange} value={value} labelId={labelId} input={<BootstrapInput />}>
        {children}
      </Select>
    </FormControl>
  );
};

export default RegisterSelect;
