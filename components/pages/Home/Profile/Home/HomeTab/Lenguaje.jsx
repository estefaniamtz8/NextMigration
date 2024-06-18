import React, { useEffect, useState } from 'react';
import { FormControlLabel, List, ListItem, MenuItem, Radio, Stack } from '@mui/material';
import palette from 'styles/palette';
import DeleteIcon from '@mui/icons-material/Delete';
import RegisterSelect from './RegisterSelect';

const Language = (args) => {
  const { languages, setState, state } = args;
  const [selectedOptions, setSelectedOption] = useState(state?.dataToAdmin?.languages || []);
  const onDelete = (option) => {
    setSelectedOption(selectedOptions.filter((selectedOption) => selectedOption !== option));
  };
  const handleOption = (e) => {
    setSelectedOption([...selectedOptions, e.target.value]);
  };

  useEffect(() => {
    setState({
      ...state,
      dataToAdmin: {
        ...state.dataToAdmin,
        languages: selectedOptions,
      },
    });
  }, [selectedOptions]);

  return (
    <>
      <RegisterSelect onChange={handleOption}>
        {languages.map((lenguage) => (
          <MenuItem
            sx={{
              color: 'black',
              '&:hover': {
                backgroundColor: palette.gray300,
                color: 'black',
              },
            }}
            key={lenguage.label}
            value={lenguage}
            disabled={selectedOptions.includes(lenguage)}
          >
            {lenguage?.label}
          </MenuItem>
        ))}
      </RegisterSelect>
      <List sx={{ display: 'flex', flexDirection: 'left', flexWrap: 'wrap', width: '100%' }}>
        {selectedOptions.map((option) => (
          <ListItem
            key={option?.value}
            sx={{ width: '100%', alignItems: 'space-between', justifyContent: 'space-between' }}
          >
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
              <p className="text-sm text-black">{option.label}</p>
              <FormControlLabel
                sx={{
                  '& .MuiFormControlLabel-label': {
                    color: 'black',
                    fontSize: '14px',
                  },
                  '& .MuiSvgIcon-root': {
                    color: palette.violet,
                  },
                }}
                onChange={() => {
                  setSelectedOption(
                    selectedOptions.map((selectedOption) => {
                      if (selectedOption === option) {
                        return { ...selectedOption, rating: 2 };
                      }
                      return selectedOption;
                    })
                  );
                }}
                checked={option?.rating === 2}
                value="2"
                control={<Radio />}
                label="Básico"
              />
              <FormControlLabel
                sx={{
                  '& .MuiFormControlLabel-label': {
                    color: 'black',
                    fontSize: '14px',
                  },
                  '& .MuiSvgIcon-root': {
                    color: palette.violet,
                  },
                }}
                onChange={() => {
                  setSelectedOption(
                    selectedOptions.map((selectedOption) => {
                      if (selectedOption === option) {
                        return { ...selectedOption, rating: 4 };
                      }
                      return selectedOption;
                    })
                  );
                }}
                checked={option?.rating === 4}
                value="4"
                control={<Radio />}
                label="Conversacional"
              />
              <FormControlLabel
                sx={{
                  '& .MuiFormControlLabel-label': {
                    color: 'black',
                    fontSize: '14px',
                  },
                  '& .MuiSvgIcon-root': {
                    color: palette.violet,
                  },
                }}
                onChange={() => {
                  setSelectedOption(
                    selectedOptions.map((selectedOption) => {
                      if (selectedOption === option) {
                        return { ...selectedOption, rating: 5 };
                      }
                      return selectedOption;
                    })
                  );
                }}
                checked={option?.rating === 5}
                value="5"
                control={<Radio />}
                label="Nativo"
              />
              {/* <Rating */}
              {/*  value={option?.rating} */}
              {/*  sx={{ */}
              {/*    '& span': { */}
              {/*      color: '#faaf00', */}
              {/*    }, */}
              {/*  }} */}
              {/* /> */}
            </Stack>
            <DeleteIcon onClick={() => onDelete(option)} sx={{ color: palette.redLight, cursor: 'pointer' }} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Language;
