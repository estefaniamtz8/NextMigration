import React, { useEffect, useState } from 'react';
import {
  Stack,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Delete } from '@mui/icons-material';
import palette from 'styles/palette';
import RegisterAutoComplete from './RegisterAutocomplete';

const EconomicDependents = (args) => {
  const { state, setState } = args;

  const people = [
    { label: 'Padre', value: 'father', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Madre', value: 'mother', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Abuelo', value: 'grandfather', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Abuela', value: 'grandmother', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Hijo', value: 'son', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Hija', value: 'daughter', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Tio', value: 'uncle', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Tia', value: 'aunt', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Sobrino', value: 'nephew', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Sobrina', value: 'niece', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Nieto', value: 'grandson', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Nieta', value: 'granddaughter', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Amigo', value: 'friend', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Amiga', value: 'friendd', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Esposo', value: 'husband', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Esposa', value: 'wife', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Novio', value: 'boyfriend', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Novia', value: 'bride', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Primo', value: 'cousin', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Prima', value: 'cousin', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
    { label: 'Otro', value: 'other', icon: <AddIcon sx={{ color: palette.yellowLight }} /> },
  ];
  const [selectedOptions, setSelectedOption] = useState([]);
  const [newOptions, setNewOptions] = useState([]);
  const handleSetOption = (selectedOption) => {
    const objectPeople = people.find((people) => people.label === selectedOption);
    delete objectPeople.icon;
    objectPeople.liveWithMe = 'si';
    setSelectedOption([...selectedOptions, objectPeople]?.sort((a, b) => a?.label - b?.label));
    setNewOptions([...newOptions, objectPeople]?.sort((a, b) => a?.label - b?.label));
  };
  const onDelete = (option) => {
    const optionNew = selectedOptions.filter((selectedOption) => selectedOption !== option);
    setSelectedOption(optionNew);
  };

  useEffect(() => {
    setState({
      ...state,
      dataToAdmin: {
        ...state?.dataToAdmin,
        relationOfMe: selectedOptions,
      },
    });
  }, [selectedOptions]);

  useEffect(() => {
    setSelectedOption(state?.dataToAdmin?.relationOfMe);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div>
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
            setState({
              ...state,
              dataToAdmin: {
                ...state?.dataToAdmin,
                haveDependOfMe: 'si',
              },
            });
            setSelectedOption(state?.dataToAdmin?.relationOfMe);
          }}
          checked={state?.dataToAdmin?.haveDependOfMe === 'si'}
          value="si"
          control={<Radio />}
          label="Sí"
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
            setState({
              ...state,
              dataToAdmin: {
                ...state?.dataToAdmin,
                haveDependOfMe: 'no',
                relationOfMe: [],
              },
            });
            setSelectedOption([]);
          }}
          checked={state?.dataToAdmin?.haveDependOfMe === 'no'}
          value="no"
          control={<Radio />}
          label="No"
        />
      </div>

      <RegisterAutoComplete
        placeholder="Escoge una o mas opciones"
        options={people}
        selectedOptions={selectedOptions}
        onClick={handleSetOption}
      />
      <List sx={{ display: 'flex', flexDirection: 'column' }}>
        {selectedOptions
          ?.sort((a, b) => a?.value - b?.value)
          .map((option) => (
            <ListItem
              key={option}
              sx={{ flexDirection: 'column', gap: '1rem', maxWidth: '20rem', alignItems: 'start' }}
            >
              <Stack
                sx={{
                  flexDirection: 'row',
                  borderBottom: '1px solid',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <span>{option?.label}</span>
                <Button
                  onClick={() => {
                    onDelete(option);
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
              <FormControl>
                <FormLabel sx={{ fontSize: '12px!important' }}>¿Esta(s) personas viven contigo?</FormLabel>
                <RadioGroup
                  onChange={(e) => {
                    const filterData = selectedOptions?.filter((so) => so?.value !== option?.value);
                    const findData = selectedOptions?.find((so) => so?.value === option?.value);

                    setSelectedOption(() => [
                      ...filterData,
                      {
                        ...findData,
                        liveWithMe: e.target?.value,
                      },
                    ]);
                    setNewOptions(() =>
                      [
                        ...filterData,
                        {
                          ...findData,
                          liveWithMe: e.target?.value,
                        },
                      ]?.sort((a, b) => a?.label - b?.label)
                    );
                  }}
                  value={option?.liveWithMe}
                  name="radio-buttons-group"
                  sx={{ flexDirection: 'row' }}
                >
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
                    value="si"
                    control={<Radio />}
                    label="Sí"
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
                    value="no"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default EconomicDependents;
