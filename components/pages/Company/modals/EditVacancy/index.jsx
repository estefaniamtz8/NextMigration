import React from 'react';
import { Box, Modal } from '@mui/material';
import { PiTextAaBold } from 'react-icons/pi';
import { BsFingerprint } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { GoPaste } from 'react-icons/go';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { FormSkeleton } from '../../../../Elements/Skeleton';
import { nextSteps } from '../NewVacancy/constants';
import { useVacancyData } from '../../../../../store';
import { fetchDataPostAsync } from '../../../../../services/axios/fetchs';
import { useCreateWork } from '../../../../../context/createVacancy';
import { getProfessions, insertProfession } from '../../../../../services/professions';
// import { fetchDataPostAsync } from '../../../../../services/axios/fetchs';

const Vacancy = React.lazy(() => import('../../forms/Vacancy'));
const Extras = React.lazy(() => import('../../forms/Extras'));
const Documents = React.lazy(() => import('../../forms/Documents'));

function EditVacancyModal({ editVacancy, setEditVacancy }) {
  const [step, setStep] = React.useState('vacancy');
  const vacancyData = useVacancyData();
  // const { reset } = useVacancyActions();
  const {
    modelJobsCompany: { jobs = [] },
    onSetModelJobs,
  } = useCreateWork();
  // const onClose = () => {
  //   reset();
  //   setStep('vacancy');
  //   // onClosed();
  // };

  const { data: professionsData } = useQuery({
    queryFn: () => getProfessions(),
    queryKey: ['professions'],
  });

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
      timeWork: [],
      turnWork: [],
      typePosition: [],
      scholarship: vacancyData?.basicInfo?.scholarship || '',
      internalID: vacancyData?.extras?.internalID || '',
      placesAvailable: vacancyData?.extras?.placesAvailable || [],
      diffusionImage: vacancyData?.extras?.diffusionImage || '',
      // userAction: {
      //   email: user?.email,
      //   name: user?.displayName || 'Admin',
      //   photo: user?.photoURL || '',
      //   userID: user?.uid,
      // },
      // userID: user?.uid,
      documentsWork: vacancyData?.documents?.docs || [],
      languagesWork: vacancyData?.basicInfo?.languagesWork?.details || [],
      companyID: vacancyData?.basicInfo?.companyID,
      jobID: vacancyData?.basicInfo?.jobID,
      IDCompany: vacancyData?.basicInfo?.IDCompany,
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
    data.append('coverNew', vacancyData?.basicInfo.coverNew || {});
    if (
      professionsData?.professions?.filter((profession) => profession?.value === vacancyData?.basicInfo?.position)
        ?.length === 0
    ) {
      await insertProfession({ profession: vacancyData?.basicInfo?.position });
    }
    const result = await fetchDataPostAsync('/aperture/jobs/edit_vacancy', data);
    if (result?.success) {
      const updateJobs = jobs?.map((job) => {
        if (job?.jobID === result?.vacancy?.jobID) {
          return {
            ...result?.vacancy,
            createdAt: job?.createdAt,
            docID: job?.jobID,
            status: job?.status,
            vacancyID: job?.vacancyID,
          };
        }
        return job;
      });
      onSetModelJobs('jobs', updateJobs);
      onSetModelJobs('jobsBackUp', updateJobs);
      setStep('vacancy');
      setEditVacancy({
        ...editVacancy,
        modal: false,
      });
      toast.success('Vacantes Editada.');
    } else {
      toast.error('Error al editar la vacante.');
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
    <Modal className="flex w-full items-center justify-center outline-none" open={editVacancy?.modal || false}>
      <Box className="w-[60rem] rounded-lg bg-white xl:w-[82rem]">
        <Box className="relative w-full bg-gray100 py-4">
          <h1 className="mx-[15rem] text-xl font-medium text-purple xl:mx-[21rem]">Editar vacante</h1>
          <MdClose
            onClick={() => setEditVacancy({ ...editVacancy, modal: false })}
            className="absolute right-4 top-4 cursor-pointer"
            size={20}
          />
        </Box>
        <Box>
          <Box className="grid h-[80vh] max-h-[80vh] grid-cols-[25%_55%] overflow-y-scroll px-6 py-4 xl:grid-cols-[25%_45%]">
            <Box className="flex w-48 flex-col">
              <Box className="flex w-full items-center gap-x-4">
                <Box
                  onClick={() => setStep('vacancy')}
                  className={`flex h-12 w-20 cursor-pointer items-center justify-center rounded-lg ${
                    step === 'vacancy' ? 'bg-purple' : 'rounded-lg border-[1px] border-solid border-black'
                  }`}
                >
                  <PiTextAaBold className={`${step === 'vacancy' ? 'text-white' : 'text-black'}`} size={30} />
                </Box>
                <span className={`w-full text-sm ${step === 'vacancy' ? 'text-purple' : 'text-black'}`}>Vacante</span>
              </Box>
              <Box className="flex w-[50px] justify-center">
                <Box className="h-12 w-[1.5px] bg-black" />
              </Box>
              <Box className="flex w-full items-center gap-x-4">
                <Box
                  onClick={() => setStep('extras')}
                  className={`flex h-12 w-20 cursor-pointer items-center justify-center rounded-lg ${
                    step === 'extras' ? 'bg-purple' : 'rounded-lg border-[1px] border-solid border-black'
                  }`}
                >
                  <GoPaste className={`${step === 'extras' ? 'text-white' : 'text-black'}`} size={30} />
                </Box>
                <span className={`w-full text-sm ${step === 'extras' ? 'text-purple' : 'text-black'}`}>Extras</span>
              </Box>
              <Box className="flex w-[50px] justify-center">
                <Box className="h-12 w-[1.5px] bg-black" />
              </Box>
              <Box onClick={() => setStep('documents')} className="flex w-full items-center gap-x-4">
                <Box
                  className={`flex h-12 w-20 cursor-pointer items-center justify-center rounded-lg ${
                    step === 'documents' ? 'bg-purple' : 'rounded-lg border-[1px] border-solid border-black'
                  }`}
                >
                  <BsFingerprint className={`${step === 'documents' ? 'text-white' : 'text-black'}`} size={30} />
                </Box>
                <span className={`w-full text-sm ${step === 'documents' ? 'text-purple' : 'text-black'}`}>
                  Documentos y sellos
                </span>
              </Box>
            </Box>
            <Box>
              <React.Suspense fallback={<FormSkeleton />}>{ActiveStep.component}</React.Suspense>
            </Box>
          </Box>
        </Box>
        <Box className="flex w-full items-center justify-center bg-gray100 pb-6 pt-6">
          <button
            form={ActiveStep.form}
            className="w-max cursor-pointer rounded-lg border-none bg-purple px-16 py-3 text-white"
            type="submit"
          >
            Siguiente
          </button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditVacancyModal;
