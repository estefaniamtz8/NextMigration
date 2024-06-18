import React, { useEffect } from 'react';
import { urlPageCandidate } from 'utils/environment';
import { fetchDataPostAsync } from 'services/axios/fetchs';
import {
  Autocomplete,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Popover,
  TextField,
  Select,
  Tab,
  Box,
  FormControlLabel,
  Switch,
} from '@mui/material';
import CalendarContainerLocal from 'components/Elements/Calendar';
import { adaptArrayToSelect } from 'utils/functions/general';
import Origin from 'utils/constants/origin.json';
import { usersClientSearch } from 'services/appSearch/userSearch';
import dayjs from 'dayjs';
import palette, { FontsData } from 'styles/palette';
import Constants from 'utils/constants/user.json';
import newVacancyConstant from 'utils/constants/newVacancy.json';
import Countries from 'utils/constants/countries.json';
import { useDispatch, useSelector } from 'react-redux';
import { BsFilter, BsThreeDotsVertical, BsFillCircleFill } from 'react-icons/bs';
import { HiEmojiSad } from 'react-icons/hi';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import InputWithIcon from '../InputWithIcon';
// import Documents from '../Documents';
// import HomeTab from '../HomeTab';
// import MatchingHub from '../MatchingHub/MatchingHub';
import ProfileDetails from '../ProfileDetails';
import HeadPagination from '../HeadPagination';
import { setFiltersRedux } from '../../../../../../redux/actions/filters_actions';
import { setUsersRedux } from '../../../../../../redux/actions/users_actions';
import CustomTabPanel from './CustomTabs/CustomTabPanel';
import AntTabs from './CustomTabs/AntTabs';
import Postulations from '../Postulations';
import Address from '../HomeTab/Addres';
import { styleCustomFilterAutoComplete } from '../../../../../../styles/generics';
import getTags from '../../../../../../services/tags';

const HomeTabLazy = React.lazy(() => import('../HomeTab'));
const DocumentsLazy = React.lazy(() => import('../Documents'));
const MatchingHubLazy = React.lazy(() => import('../MatchingHub/MatchingHub'));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CustomTab = (args) => {
  const { person, setDataPopover } = args;
  const viability = person?.viability || 'noViable';
  function colorViability(viability) {
    switch (viability) {
      case 'viable':
        return palette.green;
      case 'noViable':
        return palette.red;
      case 'inProcess':
        return palette.gray;
      default:
        return palette.gray;
    }
  }
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex w-full items-center gap-4">
        <BsFillCircleFill size={15} color={colorViability(viability)} />
        <p className="line-clamp-2 text-left text-sm">{person?.names || person?.lastNames}</p>
      </div>
      <BsThreeDotsVertical
        onClick={(event) => {
          setDataPopover({
            anchorEl: event.currentTarget,
            open: true,
            data: person,
          });
        }}
        size={15}
        color="#e0e0e0"
      />
    </div>
  );
};

function HubPagination(args) {
  const { showDetails, setShowDetails, openModalCandidate, pagesInfo } = args;
  const filtersRedux = useSelector((state) => state?.filters?.filters);
  const searchDataRedux = useSelector((state) => state.filters?.dataSearch);
  const dispatch = useDispatch();
  const [numberOfMatches, setMatches] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const {
    users: { user: data },
  } = useSelector((rdx) => rdx);
  const initialFilter = {
    textSearch: '',
    date: null,
    page: 1,
    numPages: 1,
    viability: 'all',
    pageSize: 15,
    rfc: false,
    nss: false,
    curp: false,
    hasDocuments: false,
    acta: false,
    gradeCertification: false,
    criminalRecord: false,
    passport: false,
    licence: false,
    cv: false,
    endDate: null,
    fairFilter: false,
    languagesFilter: [],
    nationalityFilter: [],
    originFilter: [],
    startDate: null,
    tagFilter: [],
    groupFilter: [],
  };

  // const dispatch = useDispatch();
  const [filter, setFilter] = React.useState(filtersRedux || initialFilter);

  const { data: dataTags } = useQuery({
    queryFn: () => getTags(),
    queryKey: ['getTags'],
  });
  const loadSearch = () => {
    const {
      page,
      maxSalary,
      minSalary,
      startDate,
      endDate,
      textSearch,
      pageSize,
      languagesFilter,
      workDaysFilter,
      workTurnsFilter,
      nationalityFilter,
      workTimeFilter,
      modalityFilter,
      originFilter,
      academyLevelFilter,
      experienceFilter,
      positionFilter,
      viability,
      fairFilter,
      rfc,
      nss,
      curp,
      hasDocuments,
      acta,
      gradeCertification,
      criminalRecord,
      passport,
      licence,
      cv,
      matches,
      address,
      tagFilter,
      groupFilter,
    } = filter;
    dispatch(setFiltersRedux(filter));

    const appSearchFilters = {
      all: [],
      any: [],
      none: [],
    };

    // Filtro de Phone prioridad number 8
    const options = {
      page: {
        size: pageSize || 1,
        current: page || 1,
      },
      sort: [{ created_at: 'desc' }],
      search_fields: {
        id: { weight: 3 },
        names: { weight: 9 },
        code_phone: { weight: 8 },
        phone: { weight: 8 },
        last_names: { weight: 7 },
        email: { weight: 6 },
      },
    };
    // console.log('options', options);
    if (startDate && endDate) {
      appSearchFilters.all?.push({ created_at: { from: startDate, to: endDate } });
      // appSearchFilters.all?.push({ created_at: {  } });
      // appSearchFilters.all?.push({ arrive: { from: new Date(dayjs(startDate).format('YYYY-MM-DD')) } });
      // appSearchFilters.all?.push({ arrive: { to: new Date(dayjs(endDate).format('YYYY-MM-DD')) } });
    }
    // Filtro por rango salarial.
    if (maxSalary && minSalary) {
      if (minSalary) {
        appSearchFilters.all.push({ salary_minimum: { from: +minSalary } });
        if (maxSalary) {
          appSearchFilters.all.push({ salary_minimum: { to: +maxSalary } });
        }
      }
      // appSearchFilters.all.push({ salary_minimum_currency:  })
    }
    if (matches) {
      appSearchFilters.all.push({ number_of_matches: { from: matches[0], to: matches[1] + 1 } });
    }

    if (languagesFilter?.length) {
      appSearchFilters.all.push({
        languages: languagesFilter?.map((language) => language?.value),
      });
    }

    if (workDaysFilter?.length) {
      appSearchFilters.all.push({
        days_to_work: workDaysFilter?.map((language) => language?.value),
      });
    }

    if (workTurnsFilter?.length) {
      appSearchFilters.all.push({
        turns: workTurnsFilter?.map((turn) => turn?.value),
      });
    }

    if (workTimeFilter?.length) {
      appSearchFilters.all.push({
        availability: workTimeFilter?.map((turn) => turn?.value),
      });
    }

    if (modalityFilter?.length) {
      appSearchFilters.all.push({
        modality: modalityFilter?.map((turn) => turn?.value),
      });
    }
    if (viability !== 'all') {
      appSearchFilters?.all?.push({
        viability,
      });
    }
    if (academyLevelFilter?.length) {
      appSearchFilters.all.push({
        grade: academyLevelFilter?.map((turn) => turn?.value),
      });
    }
    if (nationalityFilter?.length) {
      appSearchFilters.all.push({
        nationality: nationalityFilter?.map((turn) => turn?.value),
      });
    }

    if (originFilter?.length) {
      appSearchFilters.all.push({
        origin: originFilter?.map((turn) => turn?.value),
      });
    }
    if (experienceFilter?.length) {
      appSearchFilters.all.push({
        experience_in_industries: experienceFilter?.map((turn) => turn?.value),
      });
    }
    if (positionFilter?.length) {
      appSearchFilters.all.push({
        positions: positionFilter?.map((turn) => turn?.value),
      });
    }

    // console.log(fairFilter);
    if (fairFilter) {
      appSearchFilters.all.push({
        register_fair: 'true',
      });
    }
    if (rfc) {
      appSearchFilters.none.push({
        documents_status: JSON.stringify({ name: 'rfc', status: 'si' }),
      });
    }
    if (nss) {
      appSearchFilters.none.push({
        documents_status: JSON.stringify({ name: 'nss', status: 'si' }),
      });
    }
    if (curp) {
      appSearchFilters.none.push({
        documents_status: JSON.stringify({ name: 'curp', status: 'si' }),
      });
    }
    if (hasDocuments) {
      appSearchFilters.none.push({
        documents_status: JSON.stringify({ name: 'hasDocuments', status: 'si' }),
      });
    }
    if (acta) {
      appSearchFilters.none.push({
        documents_status: JSON.stringify({ name: 'acta', status: 'si' }),
      });
    }
    if (gradeCertification) {
      appSearchFilters.none.push({
        documents_status: JSON.stringify({ name: 'gradeCertification', status: 'si' }),
      });
    }
    if (criminalRecord) {
      appSearchFilters.none.push({
        documents_status: JSON.stringify({ name: 'criminalRecord', status: 'si' }),
      });
    }
    if (passport) {
      appSearchFilters.none.push({
        documents_status: JSON.stringify({ name: 'passport', status: 'si' }),
      });
    }
    if (licence) {
      appSearchFilters.none.push({
        documents_status: JSON.stringify({ name: 'licence', status: 'si' }),
      });
    }
    if (cv) {
      appSearchFilters.none.push({
        documents_status: JSON.stringify({ name: 'cv', status: 'si' }),
      });
    }
    if (address) {
      appSearchFilters.all.push({
        location: {
          center: `${address?.lat},${address?.lng}`,
          distance: 15,
          unit: 'km',
        },
      });
    }
    if (tagFilter?.length) {
      appSearchFilters.all.push({
        tags: tagFilter?.map((tag) => tag),
      });
    }
    if (groupFilter?.length) {
      appSearchFilters.all.push({
        belonging_to_community: groupFilter?.map((group) => group?.value),
      });
    }
    if (appSearchFilters.all.length > 0) {
      options.filters = appSearchFilters;
    }
    if (appSearchFilters.any.length > 0) {
      options.filters = appSearchFilters;
    }
    if (appSearchFilters.none.length > 0) {
      options.filters = appSearchFilters;
    }
    dispatch(setUsersRedux([]));
    // usersClientSearch(textSearch, options).then((res) => {
    //   // console.log('Respuesta Elastic', res);
    //   dispatch(setDataSearchRedux(res));
    //   dispatch(setUsersRedux(res?.hits));
    //   setDataTable(res?.hits);
    //   setSearchData(res);
    // });
    return usersClientSearch(textSearch, options);
  };

  const listOfTags = dataTags?.tags?.map((tag) => tag?.value);
  const { data: dataSearch } = useQuery({
    queryFn: loadSearch,
    queryKey: ['search', filter],
    refetchOnWindowFocus: false,
    enabled: !!filter,
  });

  const tabs = [
    {
      tabId: '1.0',
      label: 'Home',
      content: <HomeTabLazy setMatches={setMatches} />,
    },
    {
      tabId: '2.0',
      label: 'Documentos',
      content: <DocumentsLazy />,
    },
    {
      tabId: '3.0',
      label: (
        <>
          <div className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-pink text-[8px]">
            <span>{numberOfMatches}</span>
          </div>
          <p>MatchingHub</p>
        </>
      ),
      content: <MatchingHubLazy setMatches={setMatches} />,
    },
    {
      tabId: '4.0',
      label: 'Postulaciones',
      content: <Postulations />,
    },
  ];
  const { typePosition } = newVacancyConstant.general;
  // const { industries } = newVacancyConstant.general;
  // const dispatch = useDispatch();
  /* eslint-disable no-unused-vars */
  const [searchData, setSearchData] = React.useState(searchDataRedux || []);
  const [openModalInvited, setOpenModalInvited] = React.useState(false);
  const [candidate, setCandidate] = React.useState({});
  const [openModalDeleteCandidate, setOpenModalDeleteCandidate] = React.useState(false);

  const [dataPopover, setDataPopover] = React.useState({
    anchorEl: null,
    open: false,
    data: null,
  });
  const [dataPopoverFilter, setDataPopoverFilter] = React.useState({
    anchorEl: null,
    open: false,
    data: null,
  });
  // const [data, setData] = React.useState({});

  const [tabValue, setTabValue] = React.useState(0);

  const indexValue = openModalCandidate?.idx - 1;
  const numberOfPage = pagesInfo?.page;
  function onChangeInputFilter({ target }) {
    const { value, name } = target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const originJson = adaptArrayToSelect(Origin?.origin);

  const onChangedDates = React.useCallback(
    (event) => {
      const newDates = {
        startDate: null,
        endDate: null,
      };
      if (event[0]) {
        newDates.startDate = dayjs(new Date(event[0])).valueOf();
      }
      if (event[1]) {
        newDates.endDate = dayjs(new Date(event[1])).valueOf();
      }
      setFilter((prevState) => ({
        ...prevState,
        ...newDates,
      }));
    },
    [filter]
  );

  const handleCloseFilter = () => {
    setDataPopoverFilter({
      ...dataPopoverFilter,
      open: false,
      data: null,
    });
  };
  const [load, setLoader] = React.useState(false);

  /* React.useEffect(() => {
    console.table(filtersRedux)
    if (filter !== filtersRedux) {
      setValue(10);
      loadSearch();
    }
  }, [filter]); */
  const handleIndexValue = React.useCallback(
    (value) => {
      setFilter((prev) => ({
        ...prev,
        page: numberOfPage,
      }));
      setValue(value);
    },
    [numberOfPage]
  );

  useEffect(() => {
    if (indexValue) {
      handleIndexValue(indexValue);
    }
  }, [handleIndexValue, indexValue]);

  function adaptOptionUser(value) {
    return value?.map((item) => {
      if (typeof item === 'object') {
        return item;
      }
      return { value: item, label: item };
    });
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClickCompleteYourProfileIntrare = React.useCallback(async () => {
    try {
      if (dataPopover?.data?.email) {
        await fetchDataPostAsync('/aperture/noticationComplete', {
          ...dataPopover.data,
          // email: 'p.gonzalez@lapieza.io',
          dataTemplate: {
            name: dataPopover?.data?.names,
            link: `${urlPageCandidate}/resumen`,
          },
        });
      } else {
        await fetchDataPostAsync('/user/send-whatsapp', {
          data: {
            fromW: 'a2a08627-8787-485b-9836-af27e10bd74b',
            namespace: 'd84dd28f_2daa_46f7_b956_cbb69dfcf1bf',
            to: dataPopover?.data?.codePhone
              ? `+${dataPopover?.data?.codePhone || ''}${dataPopover?.data?.phone || ''}`
              : dataPopover?.data?.phone,
            data: [
              {
                default: dataPopover?.data?.names || 'Candidato',
              },
              {
                default: 'https://candidates.intrare.mx/edit-profile',
              },
            ],
            templateName: 'complete_profile2',
            code: 'es',
            channelId: '389bc40c-14a5-4a07-8d9b-6dbb728d0b1a',
          },
        });
      }
      toast.success('Notificación enviada exitosamente.');
    } catch (e) {
      toast.error('Error en el servidor, favor de avisar al departamente de IT code: 501');
    }
  }, [dataPopover]);

  const onClickInviteVacant = (data) => {
    setCandidate(data);
    setOpenModalInvited(true);
  };
  const onCloseModalInvited = () => {
    setOpenModalInvited(false);
  };

  const onCloseModalDeleteCandidate = () => {
    setOpenModalDeleteCandidate(false);
  };
  const onClickDeleteCandidate = (data) => {
    setCandidate(data);
    setOpenModalDeleteCandidate(true);
  };
  const handleClose = () => {
    setDataPopover({
      ...dataPopover,
      open: false,
      data: null,
    });
  };

  React.useEffect(() => {
    if (JSON.stringify(filtersRedux) !== JSON.stringify(filter)) {
      setFilter(filtersRedux);
    }
    setSearchData(dataSearch);
  }, [openModalCandidate]);

  // console.log('searchData', searchData);
  return (
    <div className="flex w-full overflow-auto bg-white">
      <div className="flex w-[16rem] min-w-[16rem] flex-col border-y-0 border-l-0 border-r-[1px] border-solid border-gray50">
        <div className="relative flex h-[4rem] w-full items-center justify-between bg-white p-4">
          <div className="h-[2rem] w-[1.75rem]">
            <div key="filter">
              <InputWithIcon onChange={onChangeInputFilter} value={filter?.textSearch} name="textSearch" />
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <HeadPagination setFilter={setFilter} pages={filter?.page} counts={searchData?.nbPages} />
            </div>
          </div>
          <div>
            <BsFilter
              onClick={(event) => {
                setDataPopoverFilter((prevState) => ({
                  ...prevState,
                  anchorEl: event.currentTarget,
                  open: true,
                }));
              }}
              className="mx-[10px] my-0 h-[23px] w-[23px] cursor-pointer text-[#E0E0E0]"
            />
          </div>
        </div>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', overflow: 'auto' }}>
          <AntTabs orientation="vertical" value={value} onChange={handleChange} aria-label="basic tabs example">
            {dataSearch?.hits?.map((person, index) => (
              <Tab
                key={`${person?.userID} ${index + 1}`}
                label={<CustomTab setDataPopover={setDataPopover} person={person} />}
                {...a11yProps(index)}
                style={{
                  border: 'none',
                  height: '5rem',
                  width: '100%',
                  background: 'transparent',
                  borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                }}
              />
            ))}
          </AntTabs>
        </Box>
      </div>
      {dataSearch?.hits?.length !== 0 && load === false
        ? dataSearch?.hits?.map((person, index) => (
            <CustomTabPanel value={value} index={index}>
              <div style={{ background: '#F7F7F7', overflow: 'auto', flex: '1', padding: '1.5rem', height: '100%' }}>
                <ProfileDetails
                  data={data}
                  person={person}
                  showDetails={showDetails}
                  setShowDetails={setShowDetails}
                  tabValue={tabValue}
                  tabs={tabs}
                  setTab={setTabValue}
                />
              </div>
            </CustomTabPanel>
          ))
        : dataSearch?.hits?.length === 0 &&
          load === false && (
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ fontSize: '3rem' }}>¡Oh no!</h1>
                <p style={{ fontSize: '1.25rem' }}>Usuario no encontrado</p>
              </div>
              <HiEmojiSad size={50} />
            </div>
          )}
      <Popover
        open={dataPopoverFilter?.open}
        anchorEl={dataPopoverFilter?.anchorEl}
        onClose={handleCloseFilter}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
          {/* Filter Viablidda */}
          <FormControl>
            <InputLabel id="demo-simple-select-label">Viabilidad</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              style={{
                backgroundColor: palette.bgMain,
                color: palette.black,
                width: 'calc(24vw - 40px)',
              }}
              placeholder="Selecciona un tipo"
              value={filter?.viability}
              onChange={({ target }) => {
                onChangeInputFilter({
                  target: {
                    name: 'viability',
                    value: target?.value,
                  },
                });
              }}
              // variant="outlined"
              label="Viabilidad"
            >
              <MenuItem value="all">
                <div className="flex w-28 items-center gap-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-green" />
                  <p className="text-[15px] text-black">Todos</p>
                </div>
              </MenuItem>
              <MenuItem value="viable">
                <div className="flex w-28 items-center gap-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-green" />
                  <p className="text-[15px] text-black">Viable</p>
                </div>
              </MenuItem>
              <MenuItem value="noViable">
                <div className="flex w-28 items-center gap-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-red" />
                  <p className="text-[15px] text-black">No viable</p>
                </div>
              </MenuItem>
              <MenuItem value="inProcess">
                <div className="flex w-28 items-center gap-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-gray" />
                  <p className="text-[15px] text-black">En proceso</p>
                </div>
              </MenuItem>
            </Select>
          </FormControl>
          {/* Filter interest position */}
          <FormControl>
            <Autocomplete
              id="positionFilter"
              name="positionFilter"
              placeholder="Selecciona una opción"
              value={filter?.positionFilter || []}
              freeSolo
              multiple
              options={typePosition}
              limitTags={1}
              onChange={(event, value) => {
                onChangeInputFilter({
                  target: {
                    name: 'positionFilter',
                    value: adaptOptionUser(value),
                  },
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Posiciones de Interés"
                  style={{
                    backgroundColor: palette.bgMain,
                    color: palette.black,
                    width: 'calc(24vw - 40px)',
                  }}
                />
              )}
              ListboxProps={{
                sx: {
                  '& .MuiAutocomplete-option': {
                    color: 'text.main',
                  },
                },
              }}
              getOptionLabel={(option) => option?.label || option || 'Selecciona una opción'}
              sx={styleCustomFilterAutoComplete}
            />
          </FormControl>
          {/* Filter Date */}
          <FormControl>
            <CalendarContainerLocal dates={filter} handleDates={onChangedDates} />
          </FormControl>
          {/* Filter Origin */}
          <FormControl>
            <Autocomplete
              disablePortal
              id="originFilter"
              name="originFilter"
              placeholder="Selecciona una opción"
              value={filter?.originFilter || []}
              multiple
              options={originJson}
              limitTags={1}
              onChange={(event, value) => {
                onChangeInputFilter({
                  target: {
                    name: 'originFilter',
                    value,
                  },
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  hiddenLabel
                  label="Origin"
                  style={{
                    backgroundColor: palette.bgMain,
                    color: palette.black,
                    width: '100%',
                  }}
                />
              )}
              ListboxProps={{
                sx: {
                  '& .MuiAutocomplete-option': {
                    color: 'text.main',
                  },
                },
              }}
              getOptionLabel={(option) => option.label || 'Selecciona una opción'}
              sx={styleCustomFilterAutoComplete}
            />
          </FormControl>
          {/* Filter languages */}
          <FormControl>
            <InputLabel id="languagesFilter">Idiomas</InputLabel>
            <Select
              // id='demo-multiple-checkbox'
              id="languagesFilter"
              name="languagesFilter"
              label="Idiomas"
              placeholder="Selecciona una opción"
              value={filter?.languagesFilter || []}
              multiple
              onChange={onChangeInputFilter}
              renderValue={(selected) => selected?.map((select) => select?.label).join(', ')}
              style={{
                backgroundColor: palette.bgMain,
                color: palette.black,
                width: 'calc(24vw - 40px)',
              }}
            >
              {Constants?.languages?.map((document) => (
                <MenuItem key={document?.value} value={document}>
                  <Checkbox
                    checked={
                      Object.keys(filter?.languagesFilter?.find((doc) => doc?.value === document?.value) || {})?.length
                    }
                  />
                  <ListItemText primary={document?.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Filter Academy Level */}
          <FormControl>
            <InputLabel id="academyLevelFilter">Nivel Academico</InputLabel>
            <Select
              id="academyLevelFilter"
              name="academyLevelFilter"
              placeholder="Selecciona una opción"
              label="Nivel Academico"
              value={filter?.academyLevelFilter || []}
              multiple
              onChange={onChangeInputFilter}
              renderValue={(selected) => selected?.map((select) => select?.label).join(', ')}
              style={{
                width: 'calc(24vw - 40px)',
                backgroundColor: palette.bgMain,
                color: palette.black,
              }}
            >
              {Constants?.education?.map((document) => (
                <MenuItem key={document?.value} value={document}>
                  <Checkbox
                    checked={
                      Object.keys(filter?.academyLevelFilter?.find((doc) => doc?.value === document?.value) || {})
                        ?.length
                    }
                  />
                  <ListItemText primary={document?.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Filter Nationality */}
          <FormControl>
            <InputLabel id="nationalityFilter">Nacionalidad</InputLabel>
            <Select
              id="nationalityFilter"
              name="nationalityFilter"
              placeholder="Selecciona una opción"
              label="Nacionalidad"
              value={filter?.nationalityFilter || []}
              multiple
              onChange={onChangeInputFilter}
              renderValue={(selected) => selected?.map((select) => select?.label).join(', ')}
              style={{
                width: 'calc(24vw - 40px)',
                backgroundColor: palette.bgMain,
                color: palette.black,
              }}
            >
              {Countries?.countries?.map((document) => (
                <MenuItem key={document?.value} value={document}>
                  <Checkbox
                    checked={
                      Object.keys(filter?.nationalityFilter?.find((doc) => doc?.value === document?.value) || {})
                        ?.length
                    }
                  />
                  <p>{document?.label}</p>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div style={{ width: '100%' }}>
            <Address state={filter} setState={setFilter} />
          </div>
          {/* Filter Fair La pieza */}
          <FormControl>
            <FormControlLabel
              id="fairFilter"
              name="fairFilter"
              // placeholder="Selecciona una opción"
              // label="fairFilter"
              onChange={(e) => {
                setFilter((prev) => ({
                  ...prev,
                  fairFilter: e.target.checked || false,
                  page: 1,
                }));
              }}
              control={<Switch />}
              label="Perfil Feria"
            />
          </FormControl>
          {/* Filter tags */}
          <FormControl>
            <Autocomplete
              id="tagFilter"
              name="tagFilter"
              placeholder="Selecciona una opción"
              value={filter?.tagFilter || []}
              freeSolo
              multiple
              options={listOfTags}
              limitTags={1}
              onChange={(event, value) => {
                // console.log(value)
                onChangeInputFilter({
                  target: {
                    name: 'tagFilter',
                    value,
                  },
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Etiquetas"
                  style={{
                    backgroundColor: palette.bgMain,
                    color: palette.black,
                    width: 'calc(24vw - 40px)',
                  }}
                />
              )}
              ListboxProps={{
                sx: {
                  '& .MuiAutocomplete-option': {
                    color: 'text.main',
                    fontFamily: FontsData.reg,
                  },
                },
              }}
              getOptionLabel={(option) => option?.label || option || 'Selecciona una opción'}
              sx={styleCustomFilterAutoComplete}
            />
          </FormControl>
        </div>
      </Popover>
      <Popover
        id={dataPopover?.data?.docID}
        open={dataPopover?.open}
        anchorEl={dataPopover?.anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '8rem',
            justifyContent: 'space-around',
            padding: '.5rem 1rem',
          }}
        >
          <button
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            type="button"
            onClick={onClickCompleteYourProfileIntrare}
          >
            Notificación completa tu perfil
          </button>
          <button
            style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            type="button"
            onClick={() => onClickInviteVacant(dataPopover?.data)}
          >
            Invitar a vacante
          </button>
          <button
            style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer' }}
            type="button"
            onClick={() => onClickDeleteCandidate(dataPopover?.data)}
          >
            Borrar Candidato
          </button>
        </div>
      </Popover>
    </div>
  );
}

export default HubPagination;
