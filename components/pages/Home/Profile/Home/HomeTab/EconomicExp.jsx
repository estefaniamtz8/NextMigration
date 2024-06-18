import { FormControl, InputBase, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import palette from '../../../../../../styles/palette';

const EconomicExp = (args) => {
  const { state, setState, labelId } = args;

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
  // const { genders } = NewVacancyContains.general;
  const economicExp = [
    { label: '$5,255 - 7k', value: 5255 },
    { label: '$8k - 10k', value: 8000 },
    { label: '$11k - 15k', value: 11000 },
    { label: '$15k+', value: 15000 },
  ];

  const [tempSalary, setTempSalary] = useState({});

  const handleChange = (e) => {
    const jsonSalaries = economicExp?.find((count) => count?.value === e.target.value) || {};
    setTempSalary({});
    setState({
      ...state,
      dataToAdmin: {
        ...state?.dataToAdmin,
        salary: jsonSalaries,
      },
    });
  };

  useEffect(() => {
    if (state?.dataToAdmin?.salaryMinimum && typeof state?.dataToAdmin?.salaryMinimum === 'number') {
      const jsonSalaries = economicExp?.find((count) => count?.value === state?.dataToAdmin?.salaryMinimum) || {};
      setTempSalary(jsonSalaries);
    } else if (state?.dataToAdmin?.salaryMinimum) {
      const jsonSalaries = economicExp?.find((count) => count?.label === state?.dataToAdmin?.salaryMinimum) || {};
      setTempSalary(jsonSalaries);
    }
  }, [state?.uid]);

  return (
    <FormControl className="relative w-full" id={labelId}>
      <Select
        onChange={handleChange}
        value={state?.dataToAdmin?.salary?.value || tempSalary?.value}
        labelId={labelId}
        input={<BootstrapInput />}
      >
        {economicExp?.map((salary) => (
          <MenuItem
            sx={{
              color: 'black',
              '&:hover': {
                backgroundColor: palette.gray300,
                color: 'black',
              },
            }}
            key={salary?.value}
            value={salary?.value}
          >
            {salary.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default EconomicExp;
