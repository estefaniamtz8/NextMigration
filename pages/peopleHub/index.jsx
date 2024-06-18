import React, { Suspense } from 'react';
import Container from 'components/Container';
// import WatchProfile from 'components/pages/Home/Profile/WatchProfile';
import { useDispatch, useSelector } from 'react-redux';
// import ModalAddProfile from 'components/pages/Home/modalAddProfile';
import { usersClientSearch } from 'services/appSearch/userSearch';
import { setUsersRedux } from 'redux/actions/users_actions';
import { fetchDataPostAsync } from 'services/axios/fetchs';
import { urlPageCandidate } from 'utils/environment';
import { adaptArrayToSelect } from 'utils/functions/general';
import Origin from 'utils/constants/origin.json';
import dayjs from 'dayjs';
import { Pagination } from '@mui/material';
import useProtection from 'routes/useProtection';
import { setFiltersRedux } from 'redux/actions/filters_actions';
// import ModalInviteVacancy from './modalInviteVacancy';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import HeaderPeople from './headerPeople';
import { loader } from '../../redux/actions/loader_actions';
import { addCustomEvent, notificationMassive } from '../../services/notifications';

const PopoverLazy = React.lazy(() => import('./filters'));
const TableLazy = React.lazy(() => import('./table'));
const ModalPersonalizedMessageLeadsLazy = React.lazy(() =>
  import('components/pages/Home/modalPersonalizedMessageLeads')
);
const ModalEmailReportLazy = React.lazy(() => import('components/pages/Home/modalEmailReport'));
const ModalDeleteCandidateLazy = React.lazy(() => import('components/pages/Home/modalDeleteCandidate'));
const ModalPersonalizedMessageLazy = React.lazy(() => import('components/pages/Home/modalPersonalizedMessage'));
const ModalInviteVacancyLazy = React.lazy(() => import('./modalInviteVacancy'));
const WatchProfileLazy = React.lazy(() => import('components/pages/Home/Profile/WatchProfile'));
const ActionPopoverLazy = React.lazy(() => import('components/Elements/Popovers/ActionPopover'));
const MatchRangePopoverLazy = React.lazy(() => import('components/Elements/Popovers/MatchRangePopover'));
const DocumentsFilterPopoverLazy = React.lazy(() => import('components/Elements/Popovers/DocumentsFilterPopover'));
const DocumentsPopoverLazy = React.lazy(() => import('components/Elements/Popovers/DocumentsPopover'));

const initialFilterState = {
  textSearch: '',
  date: null,
  page: 1,
  numPages: 1,
  viability: 'all',
  pageSize: 40,
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
  matches: [0, 100],
  address: null,
  tagFilter: [],
  groupFilter: [],
};
function Home() {
  const usersRedux = useSelector((state) => state.users?.usersGeneral);
  const filtersRedux = useSelector((state) => state?.filters?.filters);
  const searchDataRedux = useSelector((state) => state.filters?.dataSearch);
  const dispatch = useDispatch();
  const [dataTable, setDataTable] = React.useState(usersRedux || []);
  const [searchData, setSearchData] = React.useState(searchDataRedux || []);
  const [openModalInvited, setOpenModalInvited] = React.useState(false);
  const [candidate, setCandidate] = React.useState({});
  const [filter, setFilter] = React.useState(filtersRedux || initialFilterState);
  const [rangeFilterMatches, setRangeFilterMatches] = React.useState([0, 100]);
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
  const [dataPopoverDocuments, setDataPopoverDocuments] = React.useState({
    anchorEl: null,
    open: false,
    data: null,
  });
  const [dataPopoverDocumentsFilters, setDataPopoverDocumentsFilters] = React.useState({
    anchorEl: null,
    open: false,
  });
  const [dataPopoverMatches, setDataPopoverMatches] = React.useState({
    anchorEl: null,
    open: false,
  });
  const [openModalCandidate, setOpenModalCandidate] = React.useState(false);
  const [openModalEmailGeneral, setOpenModalEmailGeneral] = React.useState(false);
  const [openModalDeleteCandidate, setOpenModalDeleteCandidate] = React.useState(false);
  const [openModalPersonalizedMessage, setOpenModalPersonalizedMessage] = React.useState(false);

  const [openModalPersonalizedMessageLeads, setOpenModalPersonalizedMessageLeads] = React.useState(false);

  const [idCandidate, setIdCandidate] = React.useState('');

  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState([]);

  const documentsPopoverDefault = [
    {
      name: 'Documento Migratorio',
      abbreviation: 'DM',
      value: 'hasDocuments',
    },
    {
      name: 'RFC',
      abbreviation: 'RFC',
      value: 'rfc',
    },
    {
      name: 'Numero de Seguro Social',
      abbreviation: 'NSS',
      value: 'nss',
    },
    {
      name: 'CURP',
      abbreviation: 'CURP',
      value: 'curp',
    },
    { name: 'Acta de nacimiento', abbreviation: 'AN', value: 'acta' },
    {
      name: 'Certificado de estudios',
      abbreviation: 'CE',
      value: 'gradeCertification',
    },
    {
      name: 'Carta de antecedentes no penales',
      abbreviation: 'CANP',
      value: 'criminalRecord',
    },
    {
      name: 'Pasaporte',
      abbreviation: 'Pasaporte',
      value: 'passport',
    },
    {
      name: 'Licencia de conducir',
      abbreviation: 'Licencia',
      value: 'licence',
    },
    {
      name: 'Curriculum',
      abbreviation: 'CV',
      value: 'cv',
    },
    {
      name: 'Identificacion Oficial de tu pais',
      abbreviation: 'IOP',
      value: 'officialIdentificationCountry',
    },
  ];

  const excelExport = () => {
    setOpenModalEmailGeneral(true);
  };
  function onChangeInputFilter({ target }) {
    const { value, name } = target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
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
        page: 1,
      }));
    },
    [filter]
  );

  const handleClose = () => {
    setDataPopover({
      ...dataPopover,
      open: false,
      data: null,
    });
  };
  const handleCloseFilter = () => {
    setDataPopoverFilter({
      ...dataPopoverFilter,
      open: false,
      data: null,
    });
  };

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
    setDataTable([]);
    setSearchData([]);
    // usersClientSearch(textSearch, options).then((res) => {
    //   // console.log('Respuesta Elastic', res);
    //   dispatch(setDataSearchRedux(res));
    //   dispatch(setUsersRedux(res?.hits));
    //   setDataTable(res?.hits);
    //   setSearchData(res);
    // });
    return usersClientSearch(textSearch, options);
  };

  const onClosed = React.useCallback(() => {
    setOpenModalCandidate(false);
    setCandidate({});
  }, [openModalCandidate]);

  const { mutate: mutateAddCustomEvent } = useMutation({
    mutationFn: addCustomEvent,
  });

  const onClickCompleteYourProfileIntrare = React.useCallback(async () => {
    try {
      if (dataPopover?.data?.email) {
        const info = await fetchDataPostAsync('/aperture/noticationComplete', {
          ...dataPopover.data,
          email: 'l.ramirez@intrare.mx',
          dataTemplate: {
            name: dataPopover?.data?.names,
            link: `${urlPageCandidate}/resumen`,
          },
        });
        if (info?.success) {
          mutateAddCustomEvent({
            userID: dataPopover?.data?.userID,
            templateID: 'notification-complete-profile',
            name: 'Notificación para completar perfil',
            description: 'Se mandó una notificación para completar perfil',
            type: 'mail',
          });
        }
      }
      const info = await fetchDataPostAsync('/user/send-whatsapp', {
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
          templateName: 'complete_profile',
          code: 'es',
          channelId: '389bc40c-14a5-4a07-8d9b-6dbb728d0b1a',
        },
      });
      if (info?.success) {
        mutateAddCustomEvent({
          userID: dataPopover?.data?.userID,
          templateID: 'notification-complete-profile',
          name: 'Notificación para completar perfil',
          description: 'Se mandó una notificación para completar perfil',
          type: 'whatsapp',
        });
      }
      toast.success('Notificación enviada exitosamente.');
    } catch (e) {
      toast.error('Error en el servidor, favor de avisar al departamente de IT code: 501');
    }
  }, [dataPopover]);

  const onClickCompleteYourProfileIntrareMassive = async () => {
    try {
      await notificationMassive(selectedUsers);
      setSelectedUsers([]);
      toast.success('Notificación enviada exitosamente.');
    } catch (e) {
      toast.error('Error en el servidor, favor de avisar al departamento de IT code: 501');
    }
  };

  const onClickInviteVacant = (data) => {
    setCandidate(data);
    setOpenModalInvited(true);
  };

  const onClickInviteUsersToVacant = () => {
    setOpenModalInvited(true);
  };

  const onCloseModalInvited = () => {
    setOpenModalInvited(false);
  };

  const onCloseModalDeleteCandidate = () => {
    setOpenModalDeleteCandidate(false);
  };

  const onClosedMatchesFilterModal = () => {
    setDataPopoverMatches({
      ...dataPopoverMatches,
      open: false,
    });
  };

  function adaptOptionUser(value) {
    return value?.map((item) => {
      if (typeof item === 'object') {
        return item;
      }
      return { value: item, label: item };
    });
  }
  const onClickDeleteCandidate = (data) => {
    setCandidate(data);
    setOpenModalDeleteCandidate(true);
  };

  const onClickDeleteCandidates = () => {
    setOpenModalDeleteCandidate(true);
  };

  const handleCloseDocuments = () => {
    setDataPopoverDocuments({
      ...dataPopoverDocuments,
      open: false,
      data: null,
    });
    setIdCandidate('');
  };
  const documentsPopover = dataTable?.filter((item) => item?.userID === idCandidate)?.[0]?.documentsStatus || [];

  function getCircleColorWithName(name) {
    const documentStatus = documentsPopover?.filter((item) => item?.name === name)?.[0]?.status;
    switch (documentStatus) {
      case 'necesito ayuda':
        return (
          <div
            style={{
              width: '1vw',
              height: '1vw',
              borderRadius: '50%',
              backgroundColor: 'rgba(138,136,136,0.49)',
            }}
          />
        );
      case 'si':
        return (
          <div
            style={{
              width: '1vw',
              height: '1vw',
              borderRadius: '50%',
              backgroundColor: '#68E1A9',
            }}
          />
        );
      case 'no':
      default:
        return (
          <div
            style={{
              width: '1vw',
              height: '1vw',
              borderRadius: '50%',
              backgroundColor: '#EF5243',
            }}
          />
        );
    }
  }

  const handleChangeViability = async (event) => {
    dispatch(loader(true));
    const { data, userID, affectID } = event;
    try {
      const res = await fetchDataPostAsync('/user/update-general-profile', {
        data,
        userID,
        affectID,
      });
      if (res?.success) {
        const newUsersArray = dataTable?.map((user) => {
          if (user?.userID === affectID) {
            return {
              ...user,
              ...data,
            };
          }
          return user;
        });
        dispatch(loader(false));
        toast.success('Status Actualizado');
        setDataTable(newUsersArray);
        // dispatch(setUsersRedux(newUsersArray));
        return newUsersArray;
      }
      if (!res?.success) {
        toast.error('Ha ocurrido un error');
        dispatch(loader(false));
      }
    } catch (e) {
      toast.error('Ha ocurrido un error');
      dispatch(loader(false));
      return e;
    }
    dispatch(loader(false));
    return null;
  };

  const { data: dataSearch } = useQuery({
    queryFn: loadSearch,
    queryKey: ['search', filter],
    refetchOnWindowFocus: false,
    enabled: !!filter,
  });

  const changeViabilityMutation = useMutation({
    mutationFn: handleChangeViability,
    mutationKey: ['search'],
  });
  // React.useEffect(() => {
  //   loadSearch();
  // }, [filter]);
  React.useEffect(() => {
    if (dataSearch?.hits) {
      setDataTable(dataSearch?.hits);
      if (dataTable !== dataSearch?.hits && dataSearch?.hits?.length > 0) {
        setSearchData(dataSearch);
      }
    }
  }, [dataSearch, openModalCandidate]);
  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (JSON.stringify(filtersRedux) !== JSON.stringify(filter)) {
      setFilter(filtersRedux);
    }
  }, [openModalCandidate]);

  // React.useEffect(() => {
  //   setDataTable(usersRedux);
  // }, [usersRedux]);

  React.useEffect(() => {
    if (!dataPopoverMatches?.open) {
      setFilter((prev) => ({
        ...prev,
        matches: rangeFilterMatches,
      }));
    }
  }, [dataPopoverMatches]);

  return (
    <>
      <WatchProfileLazy pagesInfo={filter} onClosed={onClosed} openModalCandidate={openModalCandidate} />

      <Container>
        <ModalEmailReportLazy open={openModalEmailGeneral} onClosed={() => setOpenModalEmailGeneral(false)} />
        <ModalInviteVacancyLazy
          open={openModalInvited}
          onClose={onCloseModalInvited}
          candidate={candidate}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <ModalDeleteCandidateLazy
          open={openModalDeleteCandidate}
          onClose={onCloseModalDeleteCandidate}
          candidate={candidate}
          setDataTable={setDataTable}
          handleClose={handleClose}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <ModalPersonalizedMessageLazy
          open={openModalPersonalizedMessage}
          onClose={() => setOpenModalPersonalizedMessage(false)}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <ModalPersonalizedMessageLeadsLazy
          open={openModalPersonalizedMessageLeads}
          onClose={() => setOpenModalPersonalizedMessageLeads(false)}
        />
        <MatchRangePopoverLazy
          dataPopoverMatches={dataPopoverMatches}
          onClosedMatchesFilterModal={onClosedMatchesFilterModal}
          rangeFilterMatches={rangeFilterMatches}
          setRangeFilterMatches={setRangeFilterMatches}
        />
        <DocumentsFilterPopoverLazy
          dataPopoverDocumentsFilters={dataPopoverDocumentsFilters}
          setDataPopoverDocumentsFilters={setDataPopoverDocumentsFilters}
          filter={filter}
          setFilter={setFilter}
        />

        <DocumentsPopoverLazy
          documentsPopoverDefault={documentsPopoverDefault}
          dataPopoverDocuments={dataPopoverDocuments}
          handleCloseDocuments={handleCloseDocuments}
          getCircleColorWithName={getCircleColorWithName}
        />
        <main className="relative grid h-[calc(100vh-60px)] grid-cols-[20%_80%] items-center justify-center bg-cream p-0">
          <PopoverLazy
            originJson={originJson}
            adaptOptionUser={adaptOptionUser}
            onChangedDates={onChangedDates}
            handleCloseFilter={handleCloseFilter}
            dataPopoverFilter={dataPopoverFilter}
            onChangeInputFilter={onChangeInputFilter}
            setFilter={setFilter}
            filter={filter}
          />

          <article className="absolute z-20 m-auto h-[calc(100vh-80px)] w-[90vw] self-center justify-self-center p-[10px]">
            <HeaderPeople
              setFilter={setFilter}
              filter={filter}
              setOpenModalPersonalizedMessageLeads={setOpenModalPersonalizedMessageLeads}
              setDataPopoverFilter={setDataPopoverFilter}
              setRangeFilterMatches={setRangeFilterMatches}
              initialFilterState={initialFilterState}
              excelExport={excelExport}
              onChangeInputFilter={onChangeInputFilter}
            />

            {/* Table */}
            {selectedUsers?.length > 0 && (
              <div className="absolute bottom-10 left-1/2 z-30 flex w-[50rem] -translate-x-1/2 -translate-y-1/2 transform items-center gap-x-2 rounded-lg bg-purple300 px-4 py-3 drop-shadow-lg">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <p className="text-sm text-purple">{selectedUsers?.length > 99 ? '99+' : selectedUsers?.length}</p>
                </div>
                <p className="text-sm text-white">
                  {selectedUsers?.length === 1 && 'seleccionado'} {selectedUsers?.length > 1 && 'seleccionados'}
                </p>
                <div className="h-4 w-px bg-white" />
                <button
                  onClick={() => onClickCompleteYourProfileIntrareMassive()}
                  type="button"
                  className="w-max cursor-pointer rounded border-0 bg-white p-2 text-sm text-purple outline-none"
                >
                  Notificar completar perfil
                </button>
                <button
                  onClick={() => onClickDeleteCandidates()}
                  type="button"
                  className="w-max cursor-pointer rounded border-[1px] border-solid border-white bg-purple300 p-2 text-sm text-white outline-none"
                >
                  Eliminar usuarios
                </button>
                <button
                  onClick={() => setOpenModalPersonalizedMessage(true)}
                  type="button"
                  className="w-max cursor-pointer rounded border-0 bg-white p-2 text-sm text-purple outline-none"
                >
                  Enviar WhatsApp personalizado
                </button>
                <button
                  onClick={() => onClickInviteUsersToVacant()}
                  type="button"
                  className="w-max cursor-pointer rounded border-[1px] border-solid border-white bg-purple300 p-2 text-sm text-white outline-none"
                >
                  Invitar a vacante
                </button>
              </div>
            )}
            <article className="h-[calc(90%-50px)] w-full overflow-auto rounded-2xl">
              <ActionPopoverLazy
                dataPopover={dataPopover}
                handleClose={handleClose}
                onClickCompleteYourProfileIntrare={onClickCompleteYourProfileIntrare}
                onClickInviteVacant={onClickInviteVacant}
                onClickDeleteCandidate={onClickDeleteCandidate}
              />

              <Suspense fallback={<div>Cargando...</div>}>
                <TableLazy
                  selectAll={selectAll}
                  setSelectAll={setSelectAll}
                  filter={filter}
                  setSelectedUsers={setSelectedUsers}
                  selectedUsers={selectedUsers}
                  dataTable={dataTable}
                  dataPopoverMatches={dataPopoverMatches}
                  setOpenModalCandidate={setOpenModalCandidate}
                  onClosedMatchesFilterModal={onClosedMatchesFilterModal}
                  setDataPopoverDocumentsFilters={setDataPopoverDocumentsFilters}
                  dataPopoverDocumentsFilters={dataPopoverDocumentsFilters}
                  setDataPopoverDocuments={setDataPopoverDocuments}
                  setIdCandidate={setIdCandidate}
                  setDataPopover={setDataPopover}
                  handleChangeViability={changeViabilityMutation.mutate}
                  setDataPopoverMatches={setDataPopoverMatches}
                />
              </Suspense>
            </article>
            {/* Pagination */}

            <Pagination
              count={searchData?.nbPages}
              shape="rounded"
              color="pagination"
              sx={{
                color: '#000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10px',
                '& .MuiPaginationItem-root:hover': {
                  backgroundColor: '#cccccc',
                },
                '.MuiPaginationItem-page.Mui-selected': {
                  color: '#FFF',
                },
                '.MuiPaginationItem-page': {
                  color: '#000',
                },
                '.MuiPaginationItem-icon': {
                  color: '#000',
                },
                '.MuiPaginationItem-ellipsis': {
                  color: '#000',
                },
              }}
              page={filter?.page}
              onChange={(e, page) =>
                setFilter((prev) => ({
                  ...prev,
                  page,
                }))
              }
            />
          </article>
        </main>
      </Container>
    </>
  );
}

export default useProtection(Home);
