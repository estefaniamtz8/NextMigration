import React, { useEffect } from 'react';
import { useCreateWork } from 'context/createVacancy';
import { MdKeyboardArrowLeft, MdOutlineDone } from 'react-icons/md';
import DefaultImage from 'assets/intrareLogotipo.png';
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';
import { BsEye, BsThreeDotsVertical } from 'react-icons/bs';
import { useMutation } from '@tanstack/react-query';

import { useVacancyActions } from 'store';
import palette from 'styles/palette';
import { fetchDataPostAsync } from 'services/axios/fetchs';
import { useDispatch, useSelector } from 'react-redux';
import { setCompaniesRedux } from 'redux/actions/companies_actions';
import { Button, Popover } from '@mui/material';
import { CloudDownloadOutlined } from '@mui/icons-material';
// import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { duplicateVacancy } from 'services/vacancies';
import ModalVacancyInfo from './modals/Vacancy';
import Status from '../Connection/status';
// import ModalCompany from './modals/Company';
import EditVacancyModal from './modals/EditVacancy';
// import AddCreditsModal from './modals/AddCredits';
import { getTransactionsInfo, updateInsertBillingInfo } from './billingFunctions';
import XYInterval from '../Analytics/components/Charts/XYInvertal';
// eslint-disable-next-line import/no-named-as-default
import { loader } from '../../../redux/actions/loader_actions';
// import axe from '../../../assets/AXE.png';
// import visa from '../../../assets/VISA.png';
// import mastercard from '../../../assets/Mastercard.svg.png';
const ModalCompanyLazy = React.lazy(() => import('./modals/Company'));
const AddCreditsModalLazy = React.lazy(() => import('./modals/AddCredits'));

const ModalCompanyVacancies = function (args) {
  const { onToggleModalNewOpportunity } = args;
  const RefExport = React.useRef(null);
  const dispatch = useDispatch();
  const companies = useSelector((state) => state?.companies) || [];
  const [filter, setFilter] = React.useState({
    textSearch: '',
    date: null,
  });
  const [openModalInfo, setOpenModalInfo] = React.useState(false);
  const [modalInfo, setModalInfo] = React.useState({});
  const [openEditCompany, setOpenEditCompany] = React.useState(false);
  const [allDataCompany, setAllDataCompany] = React.useState({});
  const [openCreditsModal, setCreditsModal] = React.useState(false);
  const { setVacancy, setExtras, setDocuments } = useVacancyActions();
  const adminData = useSelector((state) => state?.admins?.me);

  const {
    modelJobsCompany: { jobs = [], jobsBackUp = [], companyData },
    onSetSelectedCompany,
  } = useCreateWork();

  const [billingInfo, setBillingInfo] = React.useState(allDataCompany?.billingInfo);

  const [dataGeneral, setDataGeneral] = React.useState(jobs || []);

  const [activeSection, setActiveSection] = React.useState('home');

  const [transactionsInfo, setTransactionsInfo] = React.useState({});

  const { mutate: mutateDuplicateVacancy } = useMutation({
    mutationFn: duplicateVacancy,
    // eslint-disable-next-line consistent-return
    onSuccess: (data) => {
      if (data?.job) {
        setDataGeneral((prevState) => [data.job, ...prevState]);
        dispatch(loader(false));
        toast.success('Vacante duplicada con éxito', { duration: 4500 });
      }
    },
    onError: () => {
      dispatch(loader(false));
      toast.error('Ha ocurrido un error', { duration: 4200 });
    },
  });

  React.useEffect(() => {
    getTransactionsInfo(companyData?.companyID).then((data) => {
      setTransactionsInfo(data);
    });
  }, [companyData?.companyID]);

  // const [card] = React.useState('AXE');

  function onToggleModalInfo() {
    setOpenModalInfo(!openModalInfo);
  }

  const viewNameTd = (value, job) => (
    <td
      className="flex w-full items-center gap-x-2 pl-4 text-[14px]"
      onClick={() => {
        setModalInfo(job);
        onToggleModalInfo();
      }}
    >
      {/* <span id="circle" /> */}
      <BsEye className="icon" size={17} color={palette.blackText} />
      <p className="w-[calc(100%-50px)] overflow-hidden text-ellipsis whitespace-nowrap text-start">{value}</p>
    </td>
  );

  // const excelExport = () => {
  //   if (RefExport.current !== null) {
  //     RefExport.current.save();
  //   }
  // };

  // const onChangedDates = React.useCallback(
  //   (event) => {
  //     const newDates = {
  //       startDate: null,
  //       endDate: null,
  //     };
  //     if (event[0]) {
  //       newDates.startDate = dayjs(new Date(event[0])).valueOf();
  //     }
  //     if (event[1]) {
  //       newDates.endDate = dayjs(new Date(event[1])).valueOf();
  //     }
  //     setFilter((prevState) => ({
  //       ...prevState,
  //       ...newDates,
  //     }));
  //   },
  //   [filter]
  // );
  // function onClear() {
  //   setFilter({
  //     textSearch: '',
  //     date: null,
  //   });
  // }

  const [dataPopover, setDataPopover] = React.useState({
    anchorEl: null,
    open: false,
  });

  const [editVacancy, setEditVacancy] = React.useState({
    modal: false,
    vacancy: {},
  });

  const handleClose = () => {
    setDataPopover({
      ...dataPopover,
      open: false,
    });
  };

  function onChangeInputFilter({ target }) {
    const { value, name } = target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onSearchText(valueArray) {
    const { textSearch, endDate, startDate, minSalary, maxSalary, payFormWork, modalityWork, timeWork, status } =
      filter;

    return valueArray
      ?.filter((item) => (!textSearch ? item : item?.name?.toLowerCase().indexOf(textSearch?.toLowerCase()) > -1))
      ?.filter((item) => (!payFormWork ? item : item?.payFormWork?.value === payFormWork))
      ?.filter((item) => (!modalityWork ? item : item?.modalityWork?.value === modalityWork))
      ?.filter((item) => (!timeWork ? item : item?.timeWork?.value === timeWork))
      ?.filter((item) => (!status ? item : item?.status === status))
      ?.filter((item) => (!startDate && !endDate ? item : item?.createdAt >= startDate && item?.createdAt <= endDate))
      ?.filter((item) =>
        !minSalary && !maxSalary ? item : +item?.salaryWork >= +minSalary && +item?.salaryWork <= +maxSalary
      )
      ?.sort((a, b) => b?.createdAt - a?.createdAt);
  }

  function getValidStatus(status) {
    switch (status) {
      case 'Active':
      case 'Activa':
      case 'active':
        return 'active';
      case 'Inactive':
      case 'Inactiva':
      case 'inactive':
        return 'inactive';
      case 'Closed':
      case 'Cerrada':
      case 'closed':
        return 'closed';
      case 'Paused':
      case 'Pausada':
      case 'paused':
        return 'paused';
      default:
        return 'error';
    }
  }
  function onUpdateActiveVacancies(status, actualStatus) {
    if (status === 'active') {
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
    }
    if (actualStatus === 'active') {
      const newData = companies?.map((item) => {
        if (item?.docID === companyData?.docID) {
          return {
            ...item,
            countVacanciesActive: item?.countVacanciesActive - 1,
          };
        }
        return item;
      });
      dispatch(setCompaniesRedux(newData));
      onSetSelectedCompany({
        ...companyData,
        countVacanciesActive: companyData?.countVacanciesActive - 1,
      });
    }
  }
  async function handleChangeStatus(event) {
    const { status, jobID, actualStatus } = event;
    try {
      const res = await fetchDataPostAsync('/ats/vacancy/update-status', {
        status,
        jobID,
        actualStatus,
        companyID: companyData?.docID,
      });
      if (res?.success) {
        toast.success('Status Actualizado');
        setDataGeneral(dataGeneral.map((item) => (item.jobID === jobID ? { ...item, status } : item)));
        onUpdateActiveVacancies(status, actualStatus);
      }
      if (!res?.success) {
        toast.error(res?.message);
      }
    } catch (err) {
      toast.error('Ha ocurrido un error');
    }
  }

  async function onCloseVacancy({ vacancy }) {
    try {
      const res = await fetchDataPostAsync('/ats/vacancy/update-status', {
        status: 'closed',
        actualStatus: vacancy?.status,
        jobID: vacancy?.jobID,
        companyID: companyData?.docID,
      });
      if (res?.success) {
        toast.success('Status Actualizado');
        setDataGeneral(
          dataGeneral.map((item) => (item.jobID === vacancy?.jobID ? { ...item, status: 'closed' } : item))
        );
        onUpdateActiveVacancies('closed', vacancy?.status);
      }
      if (!res?.success) {
        toast.error(res?.message);
      }
    } catch (err) {
      toast.error('Ha ocurrido un error');
    }
    setDataPopover({
      ...dataPopover,
      open: false,
    });
  }

  function onChangeInput({ target }) {
    const { value, name } = target;
    setBillingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const parseDate = (dateString) => {
    const parts = dateString.split('/');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  };

  const updateBilling = async () => {
    if (adminData?.tablePermissions?.superUser || adminData?.tablePermissions?.companyHub) {
      const response = await updateInsertBillingInfo({ companyID: companyData?.companyID, ...billingInfo });
      if (response.success) {
        toast.success('Se han actualizado los datos');
      }
    } else {
      toast.error('No tienes los permisos suficientes para hacer esto');
    }
  };
  const uploadInvoice = async (e, invoice) => {
    const file = e.target.files[0];
    e.preventDefault();
    const data = new FormData();
    const objFinal = {
      invoice: file,
      idCompany: companyData?.companyID,
      idInvoice: invoice?.id,
    };
    Object.keys(objFinal)?.map((key) => {
      data.append(key, objFinal?.[key]);
      return 1;
    });
    const res = await fetchDataPostAsync('/ats/company/uploadInvoice', data);
    if (res.success) {
      toast.success('Se ha subido la factura con éxito');
      setTransactionsInfo((prevState) => ({
        ...prevState,
        invoices: prevState.invoices.map((item) => {
          if (item.id === invoice.id) {
            return {
              ...item,
              billFile: res?.data?.cover?.billFile,
            };
          }
          return item;
        }),
      }));
    } else {
      toast.error('Ha habido un error');
    }
  };

  async function onCloneVacancy(vacancy) {
    handleClose();
    dispatch(loader(true));
    const sendable = {
      id: vacancy?.jobID,
      companyID: companyData?.companyID || companyData?.IDCompany,
    };
    return mutateDuplicateVacancy(sendable);
  }

  React.useEffect(() => {
    setDataGeneral(onSearchText(jobsBackUp));
  }, [filter]);

  React.useEffect(() => {
    setBillingInfo(allDataCompany?.billingInfo);
  }, [allDataCompany]);

  React.useEffect(() => {
    setDataGeneral(onSearchText(jobsBackUp));
  }, [jobsBackUp]);

  React.useEffect(() => {
    if (companyData?.companyID) {
      const { companyID } = companyData;
      setVacancy({ companyID });
    }
  }, []);

  React.useEffect(() => {
    setDataGeneral(jobs);
  }, [jobs]);

  React.useEffect(() => {
    if (companyData?.companyID) {
      fetchDataPostAsync('ats/company/get', { companyID: companyData?.companyID })
        .then((res) => {
          if (res?.success) {
            setAllDataCompany(res?.data);
          }
        })
        .catch(() => {
          toast.error('Ha ocurrido un error');
        });
    }
  }, [companyData?.companyID]);
  function getSalary(job) {
    if (job?.salaryWork) {
      return typeof job?.salaryWork === 'string'
        ? job?.salaryWork
        : `$ ${new Intl.NumberFormat('en', { maximumSignificantDigits: 3 }).format(job?.salaryWork)}`;
    }
    if (job?.salary) {
      return job?.salary?.total?.toString() || '';
    }
    return 'No especificado';
  }

  const { setBasicInfo } = useVacancyActions();

  useEffect(() => {
    setBasicInfo({
      name: editVacancy?.vacancy?.name,
      jobDescription: editVacancy?.vacancy?.jobDescription,
      location: editVacancy?.vacancy?.location,
      fullLocation: editVacancy?.vacancy?.fullLocation,
      scholarship: editVacancy?.vacancy?.scholarship,
      salary: editVacancy?.vacancy?.salary,
      salaryType: editVacancy?.vacancy?.salary?.type,
      minSalary: editVacancy?.vacancy?.salary?.min,
      maxSalary: editVacancy?.vacancy?.salary?.max,
      total: editVacancy?.vacancy?.salary?.total,
      salaryVisibility: editVacancy?.vacancy?.salary?.visibility,
      salaryScheme: editVacancy?.vacancy?.salary?.scheme,
      functions: editVacancy?.vacancy?.functions,
      languagesWork: {
        details: editVacancy?.vacancy?.languagesWork || [],
        values: editVacancy?.vacancy?.languagesWork?.map((language) => language.value) || [],
      },
      companyID: editVacancy?.vacancy?.companyID,
      IDCompany: editVacancy?.vacancy?.IDCompany,
      jobID: editVacancy?.vacancy?.jobID,
      cover: JSON.stringify(editVacancy?.vacancy?.cover) || null,
      position: editVacancy?.vacancy?.position,
    });
    setExtras({
      benefitsWork: editVacancy?.vacancy?.benefitsWork,
      salaryScheme: editVacancy?.vacancy?.salary?.scheme,
      internalID: editVacancy?.vacancy?.internalID,
      diffusionImage: editVacancy?.vacancy?.diffusionImage,
      placesAvailable: editVacancy?.vacancy?.placesAvailable,
    });
    setDocuments({
      docs: editVacancy?.vacancy?.documentsWork,
      responsible: editVacancy?.vacancy?.owners?.toString() || '',
    });
  }, [editVacancy?.vacancy]);

  return (
    <main className="relative grid h-[calc(100vh-60px)] grid-cols-[20%_80%] items-center justify-center bg-gray100">
      <EditVacancyModal editVacancy={editVacancy} setEditVacancy={setEditVacancy} />
      <ModalVacancyInfo
        open={openModalInfo}
        isJobXPostulations
        onOpenChange={onToggleModalInfo}
        job={modalInfo}
        company={companyData}
      />

      <AddCreditsModalLazy
        openCreditsModal={openCreditsModal}
        setCreditsModal={setCreditsModal}
        setAllDataCompany={setAllDataCompany}
        company={allDataCompany}
      />
      <ModalCompanyLazy
        open={openEditCompany}
        onClose={() => setOpenEditCompany(false)}
        company={companyData}
        setAllCompany={setAllDataCompany}
        allCompany={allDataCompany}
      />
      {/* Body General */}
      <div className="absolute top-0 h-[40vh] w-full bg-cream" />
      <main className="absolute z-20 m-auto h-[calc(100vh-60px)] w-[75vw] self-center justify-self-center p-[10px]">
        <span
          className="flex cursor-pointer items-center py-3 text-base text-black"
          onClick={() => onSetSelectedCompany(false)}
        >
          <MdKeyboardArrowLeft size={36} /> Regresar a Empresas
        </span>
        <article className="flex h-[93%] flex-col gap-y-4 overflow-auto rounded-lg bg-white py-4">
          <header className="flex items-center gap-4 gap-x-6 px-8">
            <img
              className="h-24 w-24 rounded-lg object-contain object-center"
              src={companyData?.logo?.url || companyData?.logo || DefaultImage}
              alt="Logo"
            />
            <article className="flex w-[70%] flex-col">
              <h1 className="pb-6 text-xl font-medium text-black"> {companyData?.companyName || 'Sin titulo'} </h1>
              <h2 className="text-sm font-medium">
                {' '}
                {companyData?.location || allDataCompany?.fullLocation?.location || 'Sin ubicación'}{' '}
              </h2>
              <h2 className="text-sm font-medium"> Sin Data </h2>
              <p
                onClick={() => {
                  navigator.clipboard.writeText(companyData?.companyID);
                  toast.success('Copiado al portapapeles');
                }}
                className="cursor-pointer"
              >
                ID: {companyData?.companyID}
              </p>
            </article>
            <div className="flex h-full flex-col">
              <div className="flex flex-1 justify-between">
                <span className="w-36 text-base text-black">Créditos: {allDataCompany?.credits}</span>
                <button
                  onClick={() => setCreditsModal(true)}
                  type="button"
                  className="ml-4 h-fit w-max cursor-pointer rounded-lg border-none bg-purple px-6 py-2.5 text-white"
                >
                  Abonar créditos
                </button>
              </div>
              <div className="flex self-end">
                <button
                  onClick={() => setActiveSection('home')}
                  type="button"
                  className={`w-36 cursor-pointer border-x-0 border-y-0 border-b-2 border-solid ${
                    activeSection === 'home' ? 'border-purple' : 'border-transparent'
                  }  text-black' bg-transparent text-center text-base
                `}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveSection('billing')}
                  type="button"
                  className={`w-36 cursor-pointer border-x-0 border-y-0 border-b-2 border-solid ${
                    activeSection === 'billing' ? 'border-purple' : 'border-transparent'
                  }  text-black' bg-transparent text-center text-base
                `}
                >
                  Billing
                </button>
                <button
                  type="button"
                  className="ml-4 w-max cursor-pointer self-end rounded-lg border-none bg-purple px-6 py-2.5 text-white"
                  onClick={() => setOpenEditCompany(true)}
                >
                  Editar Empresa
                </button>
              </div>
            </div>
          </header>
          {activeSection === 'billing' ? (
            <div className="pt-6">
              <div className="grid grid-cols-4">
                <div className="relative flex flex-col border-x-0 border-y-[1px] border-solid border-gray200 px-4 pb-8 pt-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-medium">
                      {allDataCompany?.atsIntegrationType === 'intrare' ? 'Startup' : 'Enterprise'}
                    </h3>
                    {/* <p className="text-sm"> */}
                    {/*  Converted at: {dayjs(allDataCompany?.createdAt).locale('es').format('DD/MMM/YYYY')} */}
                    {/* </p> */}
                  </div>
                  <p className="text-sm">Sourcing Plan</p>
                  {/* <p onClick={() => setChangePlanModal(true)} className="text-sm cursor-pointer text-purple"> */}
                  {/*  Edit */}
                  {/* </p> */}
                </div>
                <div className="relative flex flex-col border-y-[1px] border-l-[1px] border-r-0 border-solid border-gray200 px-4 pb-8 pt-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-medium">{allDataCompany?.credits} Créditos</h3>
                    {/* <p className="text-sm">Converted: 09/22/2022</p> */}
                  </div>
                  {/* <p className="text-sm ">De&Plan</p> */}
                  {/* <p className="text-sm cursor-pointer text-purple">Edit</p> */}
                </div>
                <div className="relative flex flex-col border-y-[1px] border-l-[1px] border-r-0 border-solid border-gray200 pt-4">
                  <div className="flex flex-col px-4">
                    <p className="text-sm">Subscriber LTV</p>
                    <h6 className="text-2xl font-medium">$9,288 USD</h6>
                  </div>
                  <XYInterval />
                </div>
                <div className="relative flex flex-col border-y-[1px] border-l-[1px] border-r-0 border-solid border-gray200 pt-4">
                  <div className="flex flex-col px-4">
                    <p className="text-sm">Company Retenetion</p>
                    <h6 className="text-2xl font-medium">12 months</h6>
                  </div>
                  <XYInterval />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-8 px-8 py-4">
                <div className="flex flex-col gap-y-4">
                  {/* <h6 className="text-lg font-medium">Metodos de Pago</h6> */}
                  {/* <div className="flex items-center justify-between"> */}
                  {/*  {card === 'AXE' && ( */}
                  {/*    <div className="flex w-64 items-center justify-between rounded-xl border-[1px] border-solid border-gray200 px-3 py-4"> */}
                  {/*      <img src={axe} className="h-6 w-14" alt="payment" /> */}
                  {/*      <p className="-ml-6 text-xs">**** ***** **** 7300</p> */}
                  {/*      <p className="text-xs justify-self-end">04/28</p> */}
                  {/*    </div> */}
                  {/*  )} */}
                  {/*  {card === 'VISA' && ( */}
                  {/*    <div className="flex w-64 items-center justify-between rounded-xl border-[1px] border-solid border-gray200 px-3 py-4"> */}
                  {/*      <img src={visa} className="w-12 h-6" alt="payment" /> */}
                  {/*      <p className="-ml-6 text-xs">**** ***** **** 7300</p> */}
                  {/*      <p className="text-xs justify-self-end">04/28</p> */}
                  {/*    </div> */}
                  {/*  )} */}
                  {/*  {card === 'MASTERCARD' && ( */}
                  {/*    <div className="flex w-64 items-center justify-between rounded-xl border-[1px] border-solid border-gray200 px-3 py-4"> */}
                  {/*      <img src={mastercard} className="w-10 h-6" alt="payment" /> */}
                  {/*      <p className="-ml-6 text-xs">**** ***** **** 7300</p> */}
                  {/*      <p className="text-xs justify-self-end">04/28</p> */}
                  {/*    </div> */}
                  {/*  )} */}
                  {/*  <p className="flex items-center text-sm text-purple"> */}
                  {/*    Create Custom Invoice <KeyboardArrowRight size={20} /> */}
                  {/*  </p> */}
                  {/* </div> */}
                  <h6 className="text-lg font-medium">Billing Info</h6>
                  <div className="flex w-full flex-col gap-x-3 gap-y-3">
                    <div className="flex gap-x-4">
                      <div className="flex w-1/2 flex-col gap-y-2">
                        <label className="text-sm" htmlFor="names">
                          Nombre fiscal
                        </label>
                        <input
                          onChange={onChangeInput}
                          value={billingInfo?.fiscalName}
                          className="w-full rounded-lg border-0 bg-cream px-3 py-2 font-sans text-sm outline-none"
                          type="text"
                          name="fiscalName"
                        />
                      </div>
                      <div className="flex w-1/2 flex-col gap-y-2">
                        <label className="text-sm" htmlFor="names">
                          RFC
                        </label>
                        <input
                          onChange={onChangeInput}
                          value={billingInfo?.rfc}
                          className="w-full rounded-lg border-0 bg-cream px-3 py-2 font-sans text-sm outline-none"
                          type="text"
                          name="rfc"
                        />
                      </div>
                    </div>
                    <div className="flex w-1/2 flex-col gap-y-2">
                      <label className="text-sm" htmlFor="names">
                        Correo
                      </label>
                      <input
                        onChange={onChangeInput}
                        value={billingInfo?.mail}
                        className="w-full rounded-lg border-0 bg-cream px-3 py-2 font-sans text-sm outline-none"
                        type="text"
                        name="mail"
                      />
                    </div>
                    <div className="flex w-full flex-col gap-y-2">
                      <label className="text-sm" htmlFor="names">
                        Dirección
                      </label>
                      <input
                        onChange={onChangeInput}
                        value={billingInfo?.fiscalAddress}
                        className="w-full rounded-lg border-0 bg-cream px-3 py-2 font-sans text-sm outline-none"
                        type="text"
                        name="fiscalAddress"
                      />
                    </div>
                    {(adminData?.tablePermissions?.superUser || adminData?.tablePermissions?.companyHub) && (
                      <button
                        onClick={updateBilling}
                        type="button"
                        className="mt-3 w-1/2 cursor-pointer rounded-lg border-0 bg-purple px-3 py-2 font-sans text-sm text-white outline-none"
                      >
                        Actualizar
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <table className="w-full table-auto border-collapse text-center">
                    <thead className="border-none bg-gray100">
                      <tr className="border-none">
                        <th className="w-1/3 border-none py-6 text-base font-medium">Producto</th>
                        <th className="border-none py-6 text-base font-medium">Costo</th>
                        <th className="py-6 text-base font-medium">Fecha</th>
                        <th className="py-6 text-base font-medium">Factura</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionsInfo?.invoices
                        ?.sort((a, b) => parseDate(b?.purchaseDate) - parseDate(a?.purchaseDate))
                        ?.map((invoice) => (
                          <tr
                            key={invoice?.id}
                            className="border-b-1 border-x-0 border-t-0 border-solid border-gray100 bg-white"
                          >
                            <td className="flex items-center gap-x-2 py-6 text-sm">
                              <div className="h-3 w-3 rounded-full bg-green" />
                              {invoice?.purchaseCredits > 0 ? `Compra créditos (${invoice?.purchaseCredits})` : 'Otra'}
                            </td>
                            <td className="text-sm">${invoice?.purchaseCredits * 200}</td>
                            <td className="text-sm">{invoice?.purchaseDate}</td>
                            <td className="flex items-center justify-center">
                              {invoice?.billFile ? (
                                <div className="flex items-center gap-x-2">
                                  <MdOutlineDone size={20} className="main text-green" />
                                  <a
                                    className="cursor-pointer decoration-0"
                                    rel="noreferrer"
                                    target="_blank"
                                    href={invoice?.billFile}
                                  >
                                    <BsEye size={20} className="text-purple" />
                                  </a>
                                </div>
                              ) : (
                                <>
                                  <label htmlFor={`fileInput_${invoice.id}`} className="cursor-pointer">
                                    <CloudDownloadOutlined size={24} />
                                  </label>
                                  <input
                                    id={`fileInput_${invoice.id}`}
                                    type="file"
                                    accept=".pdf"
                                    className="hidden"
                                    onChange={async (e) => {
                                      await uploadInvoice(e, invoice);
                                    }}
                                  />
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <>
              <main className="grid grid-cols-5 items-center pt-7">
                <article className="flex h-[10rem] flex-col items-center justify-center border-y-[1px] border-l-0 border-r-[1px] border-solid border-[#0000001f]">
                  <h2 className="text-2xl font-medium text-black"> {companyData?.countVacanciesActive || 0} </h2>
                  <h3 className="pt-4 text-sm font-medium text-black"> Vacantes Activas </h3>
                </article>

                <article className="flex h-[10rem] flex-col items-center justify-center border-y-[1px] border-l-0 border-r-[1px] border-solid border-[#0000001f]">
                  <h2 className="text-2xl font-medium text-black"> {allDataCompany?.matchesToAccept?.length || 0} </h2>
                  <h3 className="pt-4 text-sm font-medium text-black"> Matches Recibidos </h3>
                </article>

                <article className="flex h-[10rem] flex-col items-center justify-center border-y-[1px] border-l-0 border-r-[1px] border-solid border-[#0000001f]">
                  <h2 className="text-2xl font-medium text-black"> {allDataCompany?.matchesPending?.length || 0} </h2>
                  <h3 className="pt-4 text-sm font-medium text-black"> Matches Pendientes </h3>
                </article>

                <article className="flex h-[10rem] flex-col items-center justify-center border-y-[1px] border-l-0 border-r-[1px] border-solid border-[#0000001f]">
                  <h2 className="text-2xl font-medium text-black">
                    {allDataCompany?.matchesAcceptedByUsers?.length}/{allDataCompany?.matchesRefusedByUsers?.length}
                  </h2>
                  <h3 className="pt-4 text-sm font-medium text-black"> Ratio Acep / Rechaz </h3>
                </article>

                <article className="flex h-[10rem] flex-col items-center justify-center border-y-[1px] border-l-0 border-r-[1px] border-solid border-[#0000001f]">
                  <img className="h-12 w-12" src={DefaultImage} alt="Logo" />
                  <h3 className="pt-4 text-sm font-medium text-black"> Connection </h3>
                </article>
              </main>

              {/* table One Search */}

              <div className="flex justify-between px-8">
                <input
                  name="textSearch"
                  className="w-[30%] min-w-[300px] rounded-lg border-[1px] border-gray300 bg-white px-4 py-2.5 font-sans text-sm text-black outline-none placeholder:text-black"
                  placeholder="Buscar vacante"
                  onChange={onChangeInputFilter}
                  value={filter?.textSearch}
                />
                <ExcelExport
                  data={dataGeneral}
                  ref={RefExport}
                  fileName={`Reporte de  vacantes de la empresa ${companyData?.companyName}.xlsx`}
                >
                  <ExcelExportColumn key={1} title="Nombre de vacante" field="name" width={200} />
                  <ExcelExportColumn key={2} title="Tipo de posición" field="typePosition.label" width={200} />
                  <ExcelExportColumn key={3} title="Salario" field="salaryWork" width={200} />
                  <ExcelExportColumn key={4} title="Forma de pago" field="payFormWork.label" width={200} />
                  <ExcelExportColumn key={5} title="Modalidad" field="modalityWork.label" width={200} />
                  <ExcelExportColumn key={6} title="Contrato" field="timeWork.label" width={200} />
                </ExcelExport>

                <button
                  className="ml-4 w-max cursor-pointer rounded-lg border-none bg-purple px-7 py-2 text-white"
                  onClick={onToggleModalNewOpportunity}
                  type="button"
                >
                  Crear Vacante
                </button>
              </div>

              {/* Table general vacancies */}
              <article className="h-[calc(90%-50px)] w-full">
                <Popover
                  id={dataPopover?.data?.docID}
                  open={dataPopover?.open}
                  anchorEl={dataPopover?.anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                  }}
                >
                  <main
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      padding: '10px 0px',
                    }}
                  >
                    <Button
                      style={{ width: '100%' }}
                      onClick={() => {
                        setEditVacancy({ ...editVacancy, modal: true, vacancy: dataPopover?.vacancy });
                        handleClose();
                      }}
                      variant="text"
                    >
                      Editar vacante
                    </Button>
                    <Button
                      style={{ width: '100%' }}
                      onClick={() => onCloneVacancy(dataPopover?.vacancy)}
                      variant="text"
                    >
                      Duplicar vacante
                    </Button>
                    <Button
                      style={{ color: 'red', width: '100%' }}
                      onClick={() => {
                        onCloseVacancy({ vacancy: dataPopover?.vacancy }).then();
                      }}
                      variant="text"
                    >
                      Eliminar vacante
                    </Button>
                    {/* <button type="button"> Recordatorio de vacantes enviadas </button> */}
                  </main>
                </Popover>
                <table
                  className={`h-[calc(50%-150px)] w-full overflow-auto rounded-sm ${
                    dataGeneral?.length > 0 && 'bg-gray100'
                  }`}
                >
                  <thead className="h-[60px] items-center justify-center rounded-t-lg bg-gray250 text-black">
                    <tr className="grid h-full grid-cols-[calc(25%-20px)_calc(20%-10px)_calc(15%-5px)_15%_15%_8%]">
                      <td className="flex items-center pl-12 text-left text-[14px] font-light"> Nombre </td>
                      <td className="flex items-center text-[14px] font-light"> Tipo de posición </td>
                      <td className="flex items-center text-[14px] font-light"> Salario </td>
                      <td className="flex items-center text-[14px] font-light"> Matches Recibidos </td>
                      <td className="flex items-center text-[14px] font-light"> Activo </td>
                      <td className="flex items-center text-[14px] font-light"> Actions </td>
                    </tr>
                  </thead>
                  <tbody>
                    {dataGeneral
                      ?.map((dg) => ({ ...dg, status: dg?.status === 'Activa' ? 'active' : dg?.status }))
                      ?.map((job, idx) => (
                        <tr className="grid h-full cursor-pointer grid-cols-[calc(25%-20px)_calc(20%-10px)_calc(15%-5px)_15%_15%_8%] bg-white">
                          {viewNameTd(job?.name, { ...job, idx: idx + 1 })}
                          <td className="flex w-full items-center overflow-hidden text-ellipsis whitespace-nowrap text-[14px]">
                            {job?.typePosition?.label || 'N/A'}
                          </td>
                          <td className="flex w-full items-center overflow-hidden text-ellipsis whitespace-nowrap text-[14px]">
                            {getSalary(job)}
                          </td>
                          <td className="flex w-full items-center overflow-hidden text-ellipsis whitespace-nowrap text-[14px]">
                            {job?.matchesToAccept?.length || 0} Matches
                          </td>
                          <td className="flex w-full items-center">
                            <Status jobID={job?.docID} state={getValidStatus(job?.status)} funct={handleChangeStatus} />
                          </td>
                          <td
                            className="flex w-full items-center"
                            onClick={(event) => {
                              setDataPopover({
                                anchorEl: event.currentTarget,
                                open: true,
                                vacancy: job,
                              });
                            }}
                          >
                            <BsThreeDotsVertical className="cursor-pointer text-gray" size={20} />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </article>
            </>
          )}
        </article>
      </main>
    </main>
  );
};

export default ModalCompanyVacancies;

// <FilterContainer>

//   <Stack
//     spacing={2}
//     sx={{
//       width: '60px',
//       height: '60px',
//       borderRadius: '10px',
//       backgroundColor: palette.blueMain,
//       marginLeft: '10px',
//       marginTop: '10px',
//       padding: '5px',
//     }}
//   >
//     <img
//       src={companyData?.logo}
//       alt="Logo de empresa"
//       style={{
//         width: '50px',
//         height: '50px',
//         objectFit: 'contain',
//       }}
//     />
//   </Stack>
//   <h1 id="TitleMain"> {companyData?.companyName} </h1>

//
//   <hr />
//
//   <section
//     style={{
//       overflow: 'auto',
//       height: '56vh',
//       padding: '10px',
//     }}
//   >
//     <h2> Filtros avanzados </h2>
//
//     <ButtonGeneral type="button" onClick={onClear}>
//       Limpiar filtro
//     </ButtonGeneral>
//
//     <ContainerInputFilter columns="2">
//       <label> Salario </label>
//       <section>
//         <ContainerInputGeneral
//           style={{
//             position: 'relative',
//           }}
//         >
//           <label htmlFor="minSalary"> Min. </label>
//           <input
//             id="minSalary"
//             name="minSalary"
//             placeholder="10,000"
//             type="number"
//             onChange={onChangeInputFilter}
//             value={filter?.minSalary || ''}
//           />
//         </ContainerInputGeneral>
//         <ContainerInputGeneral
//           style={{
//             position: 'relative',
//           }}
//         >
//           <label htmlFor="maxSalary"> Max. </label>
//           <input
//             id="maxSalary"
//             name="maxSalary"
//             placeholder="10,000"
//             type="number"
//             onChange={onChangeInputFilter}
//             value={filter?.maxSalary || ''}
//           />
//         </ContainerInputGeneral>
//       </section>
//     </ContainerInputFilter>
//
//     <ContainerInputFilter columns="1">
//       <label> Forma de pago </label>
//       <Select
//         id="payFormWork"
//         name="payFormWork"
//         placeholder="Selecciona una opción"
//         onChange={onChangeInputFilter}
//         value={filter?.payFormWork || ''}
//         style={{
//           height: '40px',
//           backgroundColor: palette.grayLight,
//           color: 'black',
//         }}
//       >
//         <MenuItem value=""> Seleccionar una opción </MenuItem>
//         {Constants?.general?.payForm?.map((value) => (
//           <MenuItem value={value?.value}> {value?.label} </MenuItem>
//         ))}
//       </Select>
//     </ContainerInputFilter>
//
//     <ContainerInputFilter columns="1">
//       <label> Modalidad </label>
//       <Select
//         id="modalityWork"
//         name="modalityWork"
//         placeholder="Selecciona una opción"
//         onChange={onChangeInputFilter}
//         value={filter?.modalityWork || ''}
//         style={{
//           height: '40px',
//           backgroundColor: palette.grayLight,
//           color: 'black',
//         }}
//       >
//         <MenuItem value=""> Seleccionar una opción </MenuItem>
//         {Constants?.general?.modality?.map((value) => (
//           <MenuItem value={value?.value}> {value?.label} </MenuItem>
//         ))}
//       </Select>
//     </ContainerInputFilter>
//
//     <ContainerInputFilter columns="1">
//       <label> Tipo de Contrato </label>
//       <Select
//         id="timeWork"
//         name="timeWork"
//         placeholder="Selecciona una opción"
//         onChange={onChangeInputFilter}
//         value={filter?.timeWork || ''}
//         style={{
//           height: '40px',
//           backgroundColor: palette.grayLight,
//           color: 'black',
//         }}
//       >
//         <MenuItem value=""> Seleccionar una opción </MenuItem>
//         {Constants?.general?.workTime?.map((value) => (
//           <MenuItem value={value?.value}> {value?.label} </MenuItem>
//         ))}
//       </Select>
//     </ContainerInputFilter>
//
//     <ContainerInputFilter columns="1">
//       <label> Estado </label>
//       <Select
//         id="status"
//         name="status"
//         placeholder="Selecciona una opción"
//         onChange={onChangeInputFilter}
//         value={filter?.status || ''}
//         style={{
//           height: '40px',
//           backgroundColor: palette.grayLight,
//           color: 'black',
//         }}
//       >
//         {Constants?.general?.status?.map((value) => (
//           <MenuItem value={value?.value}> {value?.label} </MenuItem>
//         ))}
//       </Select>
//     </ContainerInputFilter>
//
//     <ContainerInputFilter columns="1">
//       <label htmlFor="calendar"> Fecha </label>
//       <section>
//         <ContainerInputGeneral spanWidth="15%">
//           <CalendarContainerLocal dates={filter} handleDates={onChangedDates} />
//         </ContainerInputGeneral>
//       </section>
//     </ContainerInputFilter>
//   </section>
// </FilterContainer>

// <BodyContainer>
//   <HeaderBodyContainer>

//   </HeaderBodyContainer>
//
// </BodyContainer>
