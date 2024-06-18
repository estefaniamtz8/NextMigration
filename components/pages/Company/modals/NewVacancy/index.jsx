import React from 'react';
// import { useCreateWork } from "context/createVacancy";
// import dayjs from "dayjs";
// import ConstantsVacancy from "utils/constants/newVacancy.json";
// import { useSelector } from "react-redux";
// import useJobs from "hook/createdVacancy";

import { FormSkeleton } from 'components/Elements/Skeleton';
import { useVacancyData, useVacancyActions } from 'store';

import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Sidenav from './sidenav';
import Actions from './actions';
import ModalLayout from '../Layout';
import { nextSteps } from './constants';
import { fetchDataPostAsync } from '../../../../../services/axios/fetchs';
import { useCreateWork } from '../../../../../context/createVacancy';
import { setCompaniesRedux } from '../../../../../redux/actions/companies_actions';
import { getProfessions, insertProfession } from '../../../../../services/professions';

const Vacancy = React.lazy(() => import('../../forms/Vacancy'));
const Extras = React.lazy(() => import('../../forms/Extras'));
const Documents = React.lazy(() => import('../../forms/Documents'));

function ModalNewOpportunity(args) {
  const { open, onClosed } = args;
  const companies = useSelector((state) => state?.companies) || [];
  const {
    modelJobsCompany: { companyData },
    onSetSelectedCompany,
  } = useCreateWork();
  const dispatch = useDispatch();
  const vacancyData = useVacancyData();
  const { reset } = useVacancyActions();
  const {
    modelJobsCompany: { jobs = [] },
    onSetModelJobs,
  } = useCreateWork();
  const [step, setStep] = React.useState('vacancy');

  const { data: professionsData } = useQuery({
    queryFn: () => getProfessions(),
    queryKey: ['professions'],
  });

  /*
  const {
    auth: {
      user
    }
  } = useSelector(rdx => rdx);

  const { onPublish } = useJobs({});

  const { state: values } = useCreateWork();
  */
  const onClose = () => {
    reset();
    setStep('vacancy');
    onClosed();
  };

  async function onSubmit() {
    const valueSubmit = {
      benefitsWork: vacancyData?.extras?.benefitsWork || [],
      salary: {
        type: vacancyData?.basicInfo?.salaryType, // ahora se puede ingresar el salario exacto o el rango
        visibility: vacancyData?.basicInfo?.salaryVisibility, // para saber si se muestra el salario o no
        min:
          vacancyData?.basicInfo?.salaryType === 'range'
            ? parseInt(vacancyData?.basicInfo?.minSalary, 10) || parseInt(vacancyData?.basicInfo?.total, 10)
            : 0, // en caso de ser rango el minimo
        max: vacancyData?.basicInfo?.salaryType === 'range' ? parseInt(vacancyData?.basicInfo?.maxSalary, 10) : 0, // en caso de ser rango el máximo
        total: vacancyData?.basicInfo?.salaryType !== 'range' ? parseInt(vacancyData?.basicInfo?.total, 10) : 0, // en caso de no ser rango el salario final
        scheme: vacancyData?.extras?.salaryScheme || '', // si es 100% nomina, etc..
      },
      createdAt: dayjs().valueOf(),
      daysWork: [],
      educationWork: [],
      experienceInIndustriesWork: vacancyData?.experienceInIndustriesWork || [],
      experienceWork: vacancyData?.experienceWork || [],
      functions: vacancyData?.basicInfo?.functions || [],
      location: vacancyData?.basicInfo?.location,
      fullLocation: vacancyData?.basicInfo?.fullLocation || [],
      modalityWork: [],
      jobDescription: vacancyData?.basicInfo?.jobDescription || '',
      name: vacancyData?.basicInfo?.name,
      owner:
        vacancyData?.documents?.responsible.split(',')?.length >= 0
          ? vacancyData?.documents?.responsible.split(',')[0]
          : '',
      owners: vacancyData?.documents?.responsible.split(','),
      payFormWork: [],
      position: vacancyData?.basicInfo?.position || '',
      addressComponents: vacancyData?.basicInfo?.addressComponents,
      // currencyWork: { label: values?.currencyWork, value: values?.currencyWork },
      // skillsWork: values?.skillsWork.map((ben) => ({ label: ben, value: ben })),
      status: 'active',
      timeWork: [],
      turnWork: [],
      typePosition: [],
      scholarship: vacancyData?.basicInfo?.scholarship || '',
      internalID: vacancyData?.extras?.internalID || '',
      placesAvailable: vacancyData?.extras?.placesAvailable || 0,
      diffusionImage: vacancyData?.extras?.diffusionImage || '',
      // userAction: {
      //   email: user?.email,
      //   name: user?.displayName || 'Admin',
      //   photo: user?.photoURL || '',
      //   userID: user?.uid,
      // },
      // userID: user?.uid,
      companyID: vacancyData?.companyID,
      IDCompany: vacancyData?.companyID,
      documentsWork: vacancyData?.documents?.docs || [],
      languagesWork: vacancyData?.basicInfo?.languagesWork?.details || [],
    };
    const data = new FormData();

    Object.keys(valueSubmit)?.map((key) => {
      data.append(
        key,
        typeof valueSubmit?.[key] !== 'string' || typeof valueSubmit?.[key] !== 'number'
          ? JSON.stringify(valueSubmit?.[key])
          : valueSubmit?.[key]
      );
      return 1;
    });

    data.append('cover', vacancyData?.basicInfo.cover);

    if (
      professionsData?.professions?.filter((profession) => profession?.value === vacancyData?.basicInfo?.position)
        ?.length === 0
    ) {
      await insertProfession({ profession: vacancyData?.basicInfo?.position });
    }
    const result = await fetchDataPostAsync('/aperture/jobs/new_one', data);

    if (result?.success) {
      onSetModelJobs('jobs', [...jobs, result?.vacancy]);
      onSetModelJobs('jobsBackUp', [...jobs, result?.vacancy]);
      const newData = companies?.map((item) => {
        if (item?.docID === companyData?.docID) {
          return {
            ...item,
            countVacanciesActive: item?.countVacanciesActive + 1,
          };
        }
        return item;
      });
      dispatch(setCompaniesRedux(newData));
      onSetSelectedCompany({
        ...companyData,
        countVacanciesActive: companyData?.countVacanciesActive + 1,
      });
      onClose();
      toast.success('Vacantes Publicada.');
    } else {
      toast.error('Error al publicar la vacante');
    }

    /*
    // Recordar que la base de datos es diferente y toma en cuenta el value y el label
    await onPublish(valueSubmit, onClosed);
    */
  }

  const onBeforeSubmit = React.useCallback(() => {
    if (nextSteps[step]?.next) {
      return setStep(nextSteps[step].next);
    }
    return onSubmit();
  }, [step, vacancyData]);

  const Steps = {
    vacancy: {
      form: 'vacancy-form',
      component: <Vacancy onSubmit={onBeforeSubmit} professions={professionsData?.professions} />,
    },
    extras: {
      form: 'extras-form',
      component: <Extras returnHandleChange={() => setStep('vacancy')} onSubmit={onBeforeSubmit} />,
    },
    documents: {
      form: 'documents-form',
      component: <Documents returnHandleChange={() => setStep('extras')} onSubmit={onBeforeSubmit} />,
    },
  };

  const ActiveStep = Steps[step];

  return (
    <ModalLayout
      open={open}
      onClose={onClose}
      title="Nueva Vacante"
      maxWidth="xl"
      containerMaxWidth="sm"
      actions={
        <Actions
          currentForm={ActiveStep.form}
          label={step !== 'documents' ? 'Siguiente' : 'Publicar Vacante'}
          onSave={() => console.log('SAVE DRAFT')}
        />
      }
      sidenav={<Sidenav active={step} formToValidate={nextSteps[step]?.form} />}
    >
      <React.Suspense fallback={<FormSkeleton />}>{ActiveStep.component}</React.Suspense>
    </ModalLayout>
  );
}

export default ModalNewOpportunity;
