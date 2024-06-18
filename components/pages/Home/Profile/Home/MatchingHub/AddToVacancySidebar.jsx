import React, { useState, useEffect } from 'react';
import { Checkbox, CircularProgress, Divider } from '@mui/material';
import palette from 'styles/palette';
import DefaultLogoIntrare from 'assets/intrareLogotipo.png';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataPostAsync } from 'services/axios/fetchs';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Sidebar from '../Sidebar';
import CommonButton from '../../CommonButton';
import ConfirmSidebar from './ConfirmSidebar';
import { Version } from '../../../../../../utils/environment';
import { setUserLocalRedux } from '../../../../../../redux/actions/users_actions';
import { loader } from '../../../../../../redux/actions/loader_actions';
import { getActiveVacancies } from '../../../../../../services/vacancies';
import { addCustomEvent } from '../../../../../../services/notifications';

const BpIcon = styled('span')(() => ({
  borderRadius: 3,
  width: 20,
  height: 20,
  boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: '#f5f8fa',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: `2px auto ${palette.purple300}`,
    outlineOffset: 2,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: palette.purple300,
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
});

const AddToVacancySidebar = (args) => {
  const { showAddVacancy, setShowAddVacancy, data } = args;
  let firstName;
  try {
    firstName = data?.names?.toString().split(' ')[0];
  } catch (error) {
    console.log(error);
  }

  const userState = useSelector((state) => state?.admins?.me);

  const [showInvitation, setInvitation] = useState(false);

  const { data: activeVacancies, isLoading: loading } = useQuery({
    queryFn: () => getActiveVacancies(),
    queryKey: ['getActiveVacancies'],
  });

  const [jobsFiltered, setJobsFiltered] = useState(activeVacancies?.vacancies);

  const dispatch = useDispatch();

  const [selectedJobs, setSelectedJobs] = useState([]);

  function jobIsSelected(job) {
    const thisJob = selectedJobs?.find((selectedJob) => selectedJob?.docID === job?.docID);
    return !!thisJob;
  }

  const handleCheckboxChange = (detail) => {
    if (!jobIsSelected(detail)) {
      setSelectedJobs((prev) => [...prev, detail]);
    } else {
      const newSelectedJobs = selectedJobs.filter((job) => job?.docID !== detail?.docID);
      setSelectedJobs(newSelectedJobs);
    }
  };
  const handleResetClick = () => {
    setSelectedJobs([]);
  };
  const handleSidebars = () => {
    if (!showInvitation) {
      setInvitation(true);
      setShowAddVacancy(false);
    } else {
      setInvitation(false);
      setShowAddVacancy(true);
    }
  };
  const initialFilter = {
    textSearch: '',
  };
  const [filter, setFilter] = useState(initialFilter);

  function onChangeInputFilter({ target }) {
    const { value, name } = target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const loadSearch = () => {
    let filteredMatches = [];
    const { textSearch } = filter;
    filteredMatches = activeVacancies?.vacancies?.filter((match) =>
      match?.name?.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())
    );
    setJobsFiltered(filteredMatches?.length > 0 ? [...filteredMatches] : []);
  };

  useEffect(() => {
    loadSearch();
  }, [filter, activeVacancies]);

  const { mutate: mutateAddCustomEvent } = useMutation({
    mutationFn: addCustomEvent,
  });

  const inviteToVacancies = async () => {
    dispatch(loader(true));
    // eslint-disable-next-line no-unused-vars
    const arrayVacancies = [];
    const dataArray = Object.values(selectedJobs);

    // eslint-disable-next-line no-restricted-syntax
    for await (const job of dataArray) {
      //
      const dataVacancy = activeVacancies?.vacancies?.find((vacn) => vacn.docID === job?.docID);
      arrayVacancies.push(dataVacancy);
    }
    const sendable = {
      candidate: { ...data, userID: data?.uid || data?.docID || data?.uidAuthFacebook },
      vacancies: arrayVacancies,
      admin: userState,
      version: Version,
    };

    // const onNewReloadLocal = (res) => {
    //   const invitationsLocal = data?.invitations;
    //   res?.invitations?.forEach((invitation) => {
    //     const vacancy = vacancies?.find((vac) => vac.jobID === invitation?.docID);
    //     if (vacancy) {
    //       invitationsLocal?.push({
    //         ...invitation,
    //         ...vacancy,
    //         invitationData: { ...invitation },
    //         company: vacancy?.dataCompany,
    //       });
    //     }
    //   });
    //   console.log(data, '150 ');
    //   dispatch(
    //     setUserLocalRedux({
    //       ...data,
    //       invitations: invitationsLocal,
    //     })
    //   );

    // };

    fetchDataPostAsync('/ats/invite/vacancies', sendable)
      .then((res) => {
        dispatch(loader(false));
        dispatch(setUserLocalRedux(res?.user));
        setSelectedJobs([]);
        setShowAddVacancy(false);
        setInvitation(false);
        mutateAddCustomEvent({
          userID: sendable?.candidate?.userID,
          templateID: 'invited-to-vacancy',
          name: 'Se invitó a una vacante',
          description: 'Se invitó a una vacante - Match forzado',
          type: 'whatsapp',
          metadata: {
            vacancies: arrayVacancies?.map((vacancy) => `${vacancy?.name} de ${vacancy?.companyName}`)?.toString(),
          },
        });
        toast.success('Invitación enviada');
      })
      .catch((error) => {
        dispatch(loader(false));
        toast.error('Error al enviar invitación');
        setSelectedJobs([]);
        console.log(error);
      });
  };

  return (
    <>
      <Sidebar size="30%" open={showAddVacancy}>
        <div>
          <div className="flex h-screen flex-col gap-y-2">
            <div className="border-1 flex flex-col gap-4 border-[#ebeaea] px-6 pt-8">
              <h1 className="text-xl font-medium text-black">
                Agregar a {firstName} en {selectedJobs?.length} vacantes
              </h1>
              <input
                className="w-4/6 rounded-lg border-none bg-[#f7f7f7] px-4 py-2.5 font-sans outline-none"
                name="textSearch"
                type="text"
                value={filter?.textSearch}
                onChange={onChangeInputFilter}
                placeholder="Buscar por palabra clave"
              />
            </div>
            <div className="flex h-[80%] flex-col gap-4 overflow-y-scroll px-4 py-4">
              {loading ? (
                <CircularProgress className="text-purple" />
              ) : (
                jobsFiltered
                  ?.sort((a, b) => a.name.localeCompare(b.name))
                  ?.map((detail, index) => (
                    <div
                      className="flex items-center justify-between rounded-lg bg-cream px-4 py-6"
                      key={`${detail?.vacancyID}${index + 1}`}
                    >
                      <div className="flex w-full items-center gap-x-6 gap-y-2">
                        <figure className="h-20 w-20">
                          <img
                            className="h-full w-full rounded-lg"
                            alt="Imagen de la empresa"
                            src={
                              detail?.company?.logo ||
                              detail?.dataCompany?.logo?.url ||
                              detail?.dataCompany?.logo ||
                              DefaultLogoIntrare
                            }
                          />
                        </figure>
                        <div className="flex min-h-[5rem] w-[65%] flex-col justify-between">
                          <h1 className="text-base font-medium text-black">{detail?.name}</h1>
                          <div>
                            <p className="text-black">
                              {detail?.salary?.type === 'exact' &&
                                `$${new Intl.NumberFormat('en-US').format(detail?.salary?.total)}`}
                              {detail?.salary?.type === 'range' &&
                                `$${new Intl.NumberFormat('en-US').format(
                                  detail?.salary?.min
                                )} - $${new Intl.NumberFormat('en-US').format(detail?.salary?.max)}`}
                              {detail?.salaryWork !== 0 &&
                                !detail?.salary &&
                                `$${new Intl.NumberFormat('en-US').format(detail?.salaryWork)}`}
                            </p>
                            <p className="text-black">{detail?.['Zona de trabajo']}</p>
                          </div>
                        </div>
                      </div>
                      <Checkbox
                        onChange={() => handleCheckboxChange(detail)}
                        checked={jobIsSelected(detail)}
                        inputProps={{ 'aria-label': 'controlled' }}
                        checkedIcon={<BpCheckedIcon />}
                        icon={<BpIcon />}
                      />
                    </div>
                  ))
              )}
            </div>
            <Divider />
            <div className="flex justify-between px-6 pb-4 pt-3">
              <button
                onClick={() => setShowAddVacancy(false)}
                className="cursor-pointer border-none bg-transparent text-purple300"
                type="button"
              >
                Cerrar ventana
              </button>
              <button
                onClick={handleResetClick}
                className="w-36 cursor-pointer rounded-lg border-none bg-pink py-2 text-white disabled:bg-gray"
                type="button"
                disabled={!selectedJobs?.length}
              >
                Reset
              </button>
              <CommonButton disabled={!selectedJobs?.length} onClick={handleSidebars} text="Invitar a vacantes" />
            </div>
          </div>
        </div>
      </Sidebar>
      <ConfirmSidebar
        showInvitation={showInvitation}
        setInvitation={setInvitation}
        handleSidebars={handleSidebars}
        inviteToVacancies={inviteToVacancies}
        name={firstName}
      />
    </>
  );
};

export default AddToVacancySidebar;
