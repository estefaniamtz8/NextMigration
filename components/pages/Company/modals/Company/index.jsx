import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { FormSkeleton } from 'components/Elements/Skeleton';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ModalLayout from '../Layout';
import dataNewGeneralVacancy from '../../../../../utils/constants/newVacancy.json';
import { fetchDataGetAsync, fetchDataPostAsync } from '../../../../../services/axios/fetchs';
import { loader } from '../../../../../redux/actions/loader_actions';
import { useCreateWork } from '../../../../../context/createVacancy';
import createCompanyMinSchema from '../../../../../utils/functions/companies';

const Company = React.lazy(() => import('../../forms/Company'));

function ModalCompany(props) {
  const { open, company, onClose, allCompany, setAllCompany } = props;
  const dispatch = useDispatch();
  const clientQuery = useQueryClient();
  async function getCompanies() {
    const rawData = await fetchDataGetAsync('/aperture/company/all', 'http://localhost:8003');
    const dataNew = rawData?.body?.companies?.sort((a, b) => b?.createdAt - a?.createdAt);
    return dataNew;
  }

  const {
    data: dataCompanies,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  });

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(loader(false));
    }
  }, [isSuccess, isLoading, dataCompanies]);

  const edit = !isEmpty(company);

  const { onSetSelectedCompany } = useCreateWork();

  async function createUpdateCompany(data) {
    if (edit) {
      dispatch(loader(true));
      // const res =
      const res = await fetchDataPostAsync('/ats/company/new-update', data);
      if (res?.success) {
        onSetSelectedCompany(res?.data);
        setAllCompany({ ...allCompany, ...res?.data });
        const companyMin = createCompanyMinSchema(res?.data);
        const updateCompanies = dataCompanies?.map((company) => {
          if (company?.companyID === companyMin?.companyID) {
            return {
              ...companyMin,
              createdAt: company?.createdAt,
            };
          }
          return company;
        });
        toast.success('Se ha actualizado la empresa');
        return updateCompanies;
      }
      toast.error('Error en la actualización de la empresa');
    } else {
      dispatch(loader(true));
      const tryRegister = await fetchDataPostAsync('/ats/company/new', data);
      if (tryRegister?.success) {
        const companyMin = createCompanyMinSchema(tryRegister?.data);
        toast.success('Se ha registrado la empresa');
        return [companyMin, ...dataCompanies];
      }
      toast.error(tryRegister?.info || 'Error al registrar empresa');
    }
    return null;
  }

  const companiesMutation = useMutation({
    mutationFn: createUpdateCompany,
    mutationKey: 'companies',
    onSuccess: () => {
      onClose();
      clientQuery.invalidateQueries('companies');
    },
    onError: () => {
      dispatch(loader(false));
    },
  });
  // const onSubmit = React.useCallback(
  //   async (data) => {
  //     if (edit) {
  //       dispatch(loader(true));
  //       // const res =
  //       const res = await fetchDataPostAsync('/ats/company/new-update', data);
  //       dispatch(loader(false));
  //       if (res.success) {
  //         onSetSelectedCompany(res.data);
  //         setAllCompany(res.data);
  //         const companyMin = createCompanyMinSchema(res?.data);
  //         const updateCompanies = companiesRedux?.map((company) => {
  //           if (company?.companyID === companyMin?.companyID) {
  //             return {
  //               ...companyMin,
  //               createdAt: company?.createdAt,
  //             };
  //           }
  //           return company;
  //         });
  //         dispatch(setCompaniesRedux(updateCompanies));
  //         onClose();
  //         NotificationManager.success('Empresa actualizada', 'Success', 3000);
  //       } else {
  //         NotificationManager.error('Error en la actualización de la empresa', 'code: 500');
  //       }
  //     } else {
  //       dispatch(loader(true));
  //       const tryRegister = await fetchDataPostAsync('/ats/company/new', data);
  //       dispatch(loader(false));
  //       if (tryRegister?.success) {
  //         const companyMin = createCompanyMinSchema(tryRegister?.data);
  //         dispatch(setCompaniesRedux([companyMin, ...companiesRedux]));
  //         onClose();
  //         NotificationManager.success('Empresa registrada', 'Success', 3000);
  //       } else {
  //         NotificationManager.error(tryRegister?.info || 'Error al registrar empresa', 'Error', 3000);
  //       }
  //     }
  //     return null;
  //   },
  //   [companiesRedux]
  // );
  return (
    <ModalLayout
      open={open}
      onClose={onClose}
      title={edit ? 'Editar empresa' : 'Crear empresa'}
      actions={
        <Button
          variant="contained"
          color="primary"
          type="submit"
          form="create-company-form"
          sx={{ maxWidth: 'max-content', height: '100%' }}
        >
          {edit ? 'Actualizar Empresa' : 'Publicar Empresa'}
        </Button>
      }
    >
      <React.Suspense fallback={<FormSkeleton />}>
        <Company
          onSubmit={companiesMutation?.mutateAsync}
          industries={dataNewGeneralVacancy?.general?.industries}
          company={company}
          allCompany={allCompany}
          isEdit={edit}
        />
      </React.Suspense>
    </ModalLayout>
  );
}

ModalCompany.defaultProps = {
  open: false,
  company: null,
  allCompany: null,
  setAllCompany: () => {},
};

ModalCompany.propTypes = {
  open: PropTypes.bool,
  company: PropTypes.shape(),
  onClose: PropTypes.func.isRequired,
  allCompany: PropTypes.shape(),
  setAllCompany: Promise.func || PropTypes.func,
};

export default ModalCompany;
