import React, { useState } from 'react';
import { List, ListItem, Chip, MenuItem } from '@mui/material';
import palette from 'styles/palette';
import ClearIcon from '@mui/icons-material/Clear';
import DataSkills from 'utils/constants/hardSkills.json';
import RegisterSelect from './RegisterSelect';

const HardSkills = (args) => {
  const { state, setState } = args;
  const options = DataSkills?.hardSkills;
  const [selectedOptions, setSelectedOption] = useState(state?.dataToAdmin?.skills || []);
  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedOption([...selectedOptions, selectedOption]);
    setState({
      ...state,
      dataToAdmin: {
        ...state.dataToAdmin,
        skills: selectedOptions,
      },
    });
  };
  const onDelete = (option) => {
    setSelectedOption(selectedOptions.filter((selectedOption) => selectedOption !== option));
    setState({
      ...state,
      dataToAdmin: {
        ...state.dataToAdmin,
        skills: selectedOptions,
      },
    });
  };

  return (
    <>
      <RegisterSelect
        label="Seleciona uno"
        placeholder="Selecciona uno"
        value={selectedOptions[selectedOptions?.length - 1] || ''}
        sx={{
          fontFamily: palette.circle,
          color: '#000',
        }}
        onChange={() => handleOptionChange}
      >
        {options.map((hability) => (
          <MenuItem
            sx={{
              color: '#000',
              fontFamily: palette.circle,
              '&:hover': {
                backgroundColor: palette.transparent,
                color: '#000',
              },
            }}
            className="font-sans"
            disabled={
              selectedOptions.includes(hability) ||
              selectedOptions.includes('Ninguno de los anteriores') ||
              (hability === 'Ninguno de los anteriores' && selectedOptions.length !== 0)
            }
            key={hability}
            value={hability}
          >
            {hability}
          </MenuItem>
        ))}
      </RegisterSelect>
      <List sx={{ display: 'flex', flexDirection: 'left', flexWrap: 'wrap' }}>
        {selectedOptions.map((option) => (
          <ListItem key={option} sx={{ width: 'fit-content' }}>
            <Chip
              deleteIcon={
                <ClearIcon
                  sx={{
                    '&.MuiChip-deleteIcon': { color: 'text.violet' },
                    '&.MuiChip-deleteIcon:hover': { color: 'text.violet' },
                  }}
                />
              }
              sx={{ background: '#FCCFCA', color: 'text.violet' }}
              label={option}
              onDelete={() => {
                onDelete(option);
              }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default HardSkills;
