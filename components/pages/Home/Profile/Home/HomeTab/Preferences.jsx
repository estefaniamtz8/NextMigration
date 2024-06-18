import React, { useState } from 'react';
import { Button, List, ListItem, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Delete } from '@mui/icons-material';
import palette from 'styles/palette';
import NewVacancyConstants from 'utils/constants/newVacancy.json';
import RegisterAutoComplete from './RegisterAutocomplete';

const Preferences = (args) => {
  const { setState, state } = args;
  const { typePosition } = NewVacancyConstants.general;

  const newPositions = typePosition.map((position) => ({
    label: position?.label,
    value: position?.value,
    icon: <AddIcon sx={{ color: palette.yellowLight }} />,
  }));

  const [selectedOptions, setSelectedOption] = useState([]);
  const handleSetOption = (selectedOption) => {
    let optionObject = newPositions.find((option) => option?.label === selectedOption);
    if (optionObject) {
      delete optionObject?.icon;
    } else {
      optionObject = {
        label: selectedOption,
        value: selectedOption,
      };
    }
    setState(() => ({
      ...state,
      dataToAdmin: {
        ...state?.dataToAdmin,
        positions: [...(state?.dataToAdmin?.positions || []), optionObject],
      },
    }));
    setSelectedOption([...selectedOptions, selectedOption]);
  };
  const onDelete = (option) => {
    setSelectedOption(selectedOptions.filter((selectedOption) => selectedOption !== option));
  };
  // const people = [
  //   { label: 'Ayudante general', value: 'ayudante general', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
  //   { label: 'Atención a cliente', value: 'atención a cliente', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
  // ];

  React.useEffect(() => {
    setSelectedOption(state?.dataToAdmin?.positions?.map(({ label }) => label) || []);
  }, []);
  return (
    <>
      <RegisterAutoComplete options={newPositions} selectedOptions={selectedOptions} onClick={handleSetOption} />
      <List sx={{ display: 'flex', flexDirection: 'column' }}>
        {selectedOptions?.map((position) => (
          <ListItem key={position} sx={{ flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'start' }}>
            <Stack
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <span className="text-sm text-black">{position}</span>
              <Button
                onClick={() => {
                  onDelete(position);
                }}
                sx={{
                  '&:hover': {
                    backgroundColor: palette.transparent,
                    boxShadow: 'none',
                  },
                }}
              >
                <Delete sx={{ color: palette.redLight }} />
              </Button>
            </Stack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Preferences;
