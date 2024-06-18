import React from 'react';
import { List, ListItem, Slide, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NewVacancyConstants from 'utils/constants/newVacancy.json';
import palette from 'styles/palette';
import TimeInput from './TimeInput';
import JobCard from './JobCard';
import RegisterAutoComplete from './RegisterAutocomplete';

const EditLaboralExperience = (args) => {
  const { state, setState } = args;
  const { experienceIndustrias = [] } = state?.dataToAdmin;
  const { industries } = NewVacancyConstants.general;
  const newJobs = industries.map((industry) => ({
    label: industry?.label,
    value: industry?.value,
    icon: <AddIcon sx={{ color: palette.yellowLight }} />,
  }));
  const [month, setMonth] = React.useState('1');
  const [year, setYear] = React.useState('0');
  const [selectOption, setSelectOption] = React.useState('');
  const [selectedOptions, setSelectedOption] = React.useState(experienceIndustrias || []);
  const handleSetOption = () => {
    const arrayNew = [
      ...(selectedOptions || []),
      {
        label: selectOption,
        value: selectOption,
        month: month || 1,
        year: year || 1,
      },
    ];
    setSelectedOption(arrayNew);

    setYear('0');
    setMonth('1');
    setSelectOption('');
  };
  const handleSelect = (value) => {
    setSelectOption(value);
    setState({
      ...state,
      dataToAdmin: {
        ...state.dataToAdmin,
        experienceIndustrias: selectedOptions,
      },
    });
  };
  const onDelete = (option) => {
    setSelectedOption(selectedOptions.filter((selectedOption) => selectedOption?.value !== option));
  };

  return (
    <>
      <Stack className="w-full rounded-lg bg-cream">
        <RegisterAutoComplete
          options={newJobs}
          selectedOptions={selectedOptions}
          onClick={handleSelect}
          value={selectOption}
          disableCloseOnSelect={false}
        />
      </Stack>
      <Stack className="flex h-[50px] flex-wrap justify-between gap-4">
        <Stack className="flex flex-row gap-x-4">
          <TimeInput description="Años" value={year} onChange={(event) => setYear(event.target.value)} />
          <TimeInput description="Meses" value={month} onChange={(event) => setMonth(event.target.value)} />
        </Stack>
        <button
          type="button"
          className="flex h-8 w-28 items-center justify-center self-end rounded-lg border-none bg-purple text-[white]"
          onClick={() => handleSetOption()}
          disabled={!selectOption}
        >
          <span>Agregar</span>
          <AddIcon sx={{ color: 'white' }} />
        </button>
      </Stack>
      <List className="flex flex-col">
        <Slide direction="left" in={selectedOptions.length > 0} mountOnEnter unmountOnExit>
          <div style={{ width: '100%' }} className="lines">
            <div className="lines__children" />
            <span className="text-sm text-black">Tus experiencias</span>
            <div className="lines__children" />
          </div>
        </Slide>
        <Stack>
          {selectedOptions.map((job) => (
            <Slide direction="left" in={selectedOptions.length > 0} mountOnEnter unmountOnExit>
              <ListItem key={job} sx={{ flexDirection: 'column', gap: '1rem', maxWidth: '20rem', alignItems: 'start' }}>
                <Stack
                  sx={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    boxShadow: '0px 0px 5px 0px #a2a2a2',
                    width: '205px',
                  }}
                >
                  <JobCard onDelete={onDelete} option={job} />
                </Stack>
              </ListItem>
            </Slide>
          ))}
        </Stack>
      </List>
    </>
  );
};

export default EditLaboralExperience;
