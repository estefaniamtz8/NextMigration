import React, { useEffect, useState } from 'react';
import { MenuItem, MenuList, Popover, Slider } from '@mui/material';
import Lottie from 'lottie-react';
import magicHat from 'assets/lotties/Magic_Hat.json';
import palette from 'styles/palette';
import FormLabel from '@mui/material/FormLabel';
import { useSelector } from 'react-redux';
import { BsFilter } from 'react-icons/bs';
import { AiFillFire } from 'react-icons/ai';
import Job from './Job';
import AddToVacancySidebar from './AddToVacancySidebar';
import SORT_OPTIONS from '../../../../MatchingHub/components/Filters/constants';

// function valuetext(value) {
//   return `${value}°C`;
// }

const MatchingHub = (args) => {
  const user = useSelector((state) => state?.users?.user);
  const data = user || {};
  const initialFilter = {
    textSearch: '',
    fit: 10,
    status: 'all',
  };
  const [showAddVacancy, setShowAddVacancy] = useState(false);
  const [filter, setFilter] = useState(initialFilter);
  ///
  const [dataPopoverFilter, setDataPopoverFilter] = useState({
    anchorEl: null,
    open: false,
    data: null,
  });

  const [matchesFiltered, setMatchesFiltered] = useState(data?.matches || []);
  const [invitationsFiltered, setInvitationsFiltered] = useState(user?.invitations || []);
  const handleMenuItemClick = (event, index, option) => {
    // setFilterOption(option)
    if (option !== '') {
      setFilter((prev) => ({
        ...prev,
        status: option,
      }));
    }
  };

  const handleChange = (event, newValue) => {
    setFilter((prev) => ({
      ...prev,
      fit: newValue,
    }));
  };
  const handleCloseFilter = () => {
    setDataPopoverFilter({
      ...dataPopoverFilter,
      open: false,
      data: null,
    });
  };
  const handleClickPopover = (event) => {
    if (!(data?.matches?.length && data?.invitations?.length)) {
      setDataPopoverFilter({
        anchorEl: event.currentTarget,
        open: true,
      });
    }
  };

  /// filters
  const loadSearch = () => {
    let filteredMatches = data?.matches?.slice() || [];
    const { textSearch, fit, status } = filter;
    filteredMatches = filteredMatches.filter((match) =>
      match.name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())
    );
    filteredMatches = filteredMatches.filter((match) => match.fit >= fit / 100);
    filteredMatches = filteredMatches.filter((match) =>
      status === 'all' ? !!match?.matchData?.status : match?.matchData?.status === status
    );
    let filteredInvitations = data?.invitations?.slice() || [];
    filteredInvitations = filteredInvitations.filter((match) =>
      match?.name?.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())
    );
    filteredInvitations = filteredInvitations.filter((invitations) =>
      status === 'all' ? !!invitations?.invitationData?.status : invitations?.invitationData?.status === status
    );

    setMatchesFiltered(filteredMatches);
    setInvitationsFiltered(filteredInvitations);
  };

  useEffect(() => {
    setMatchesFiltered([]);
    setInvitationsFiltered([]);
    loadSearch();
  }, [filter, Object.values(user?.invitations || [])?.length, user.matches, user]);

  function onChangeInputFilter({ target }) {
    const { value, name } = target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleJobInvitations = () => {
    setShowAddVacancy(true);
  };

  return (
    <div className="flex max-w-[33rem] flex-col gap-8">
      <div className="flex items-center justify-between">
        <input
          id="textSearch"
          name="textSearch"
          type="text"
          placeholder="Buscar por palabra clave"
          className={`w-80 rounded-lg border-none bg-white px-4 py-2 font-sans text-sm outline-none placeholder:text-black ${
            data?.matches?.length && data?.invitations?.length && 'border border-solid border-[#e0e0e0] bg-[#f7f7f7]'
          }`}
          value={filter?.textSearch}
          onChange={onChangeInputFilter}
          disabled={data?.matches?.length && data?.invitations?.length}
        />
        <div className="flex gap-4">
          <AiFillFire onClick={handleJobInvitations} size={20} cursor="pointer" color={palette.purple300} />
          <BsFilter
            onClick={handleClickPopover}
            size={20}
            cursor="pointer"
            color={!(data?.matches?.length && data?.invitations?.length) ? palette.purple300 : 'gray'}
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        {matchesFiltered?.length !== 0 || invitationsFiltered?.length !== 0 ? (
          <>
            {matchesFiltered
              ?.sort((a, b) => b?.createdAt - a?.createdAt)
              ?.map((match) => (
                <Job keyData={match?.jobID} match={match} info={data} />
                // <label>
                //   {match?.name} , {match?.jobID}
                // </label>
              ))}
            {invitationsFiltered
              ?.sort((a, b) => b?.createdAt - a?.createdAt)
              ?.filter((match) => match?.company !== undefined)
              ?.map((match) => (
                <Job keyData={match?.jobID} match={match} info={data} />
              ))}
          </>
        ) : (
          // <div className="flex flex-col items-center gap-4">
          <>
            <Lottie animationData={magicHat} className="h-40 w-40 self-center" />
            <span style={{ fontSize: '13px' }}> Sin matches disponibles </span>
          </>
          // </div>
        )}
      </div>
      <AddToVacancySidebar
        showAddVacancy={showAddVacancy}
        setShowAddVacancy={setShowAddVacancy}
        {...args}
        setInvitationsFiltered={setInvitationsFiltered}
      />
      <Popover
        open={dataPopoverFilter?.open}
        anchorEl={dataPopoverFilter?.anchorEl}
        onClose={handleCloseFilter}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPopover-paper': {
            color: 'black',
            width: 'auto',
          },
        }}
      >
        <MenuList>
          {SORT_OPTIONS.map((option, index) => (
            <MenuItem
              key={option.value}
              selected={option?.value === filter?.status}
              onClick={(event) => handleMenuItemClick(event, index, option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
        <FormLabel htmlFor="matchFit" style={{ paddingLeft: '20px' }}>
          Match Fit
        </FormLabel>
        <div style={{ padding: '10px 20px', width: '15rem' }}>
          <Slider
            size="small"
            name="matchFit"
            defaultValue={60}
            onChangeCommitted={handleChange}
            aria-label="matchFit"
            valueLabelDisplay="auto"
            min={0}
            max={100}
            sx={{ color: palette.purple300 }}
            value={filter?.fit}
          />
        </div>
      </Popover>
    </div>
  );
};

export default MatchingHub;
