import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { BsPeople } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { fetchDataPostAsync } from '../../../../services/axios/fetchs';

const DonutChart = React.lazy(() => import('../components/Charts/Donut'));
const ClusteredColumn = React.lazy(() => import('../components/Charts/ClusteredColumn'));

function AlgorithmAnalytics() {
  const [adminMatches, setAdminMatches] = useState({
    matchesStatus: [],
    totalMatches: 0,
    activeTable: false,
  });

  const [loading, setLoading] = useState(false);

  const [reasonRejectedMatches, setReasonsRejectedMatches] = useState({
    matchesStatus: [],
    totalMatches: 0,
    activeTable: false,
  });

  const [loadingReasons, setLoadingReasons] = useState(false);

  const [userMatches, setUserMatches] = useState({
    matchesStatus: [],
    totalMatches: 0,
    activeTable: false,
  });

  const [loadingUsers, setLoadingUsers] = useState(false);

  const [reasonRejectedMatchesUsers, setReasonsRejectedMatchesUsers] = useState({
    matchesStatus: [],
    totalMatches: 0,
    activeTable: false,
  });

  const [loadingReasonsUsers, setLoadingReasonsUsers] = useState(false);

  const [adminAcceptGroup, setAdminAcceptGroup] = useState({
    matchesStatus: [],
    totalMatches: 0,
    activeTable: false,
  });

  const [loadingAdminAcceptGroup, setLoadingAdminAcceptGroup] = useState(false);

  const [adminRejectGroup, setAdminRejectGroup] = useState({
    matchesStatus: [],
    totalMatches: 0,
    activeTable: false,
  });

  const [loadingAdminRejectGroup, setLoadingAdminRejectGroup] = useState(false);

  const [userAcceptGroup, setUserAcceptGroup] = useState({
    matchesStatus: [],
    totalMatches: 0,
    activeTable: false,
  });

  const [loadingUserAcceptGroup, setLoadingUserAcceptGroup] = useState(false);

  const [userRejectGroup, setUserRejectGroup] = useState({
    matchesStatus: [],
    totalMatches: 0,
    activeTable: false,
  });

  const [loadingUserRejectGroup, setLoadingUserRejectGroup] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2022 + 1 }, (_, index) => 2022 + index);
  const months = [
    {
      value: 1,
      label: 'Enero',
    },
    {
      value: 2,
      label: 'Febrero',
    },
    {
      value: 3,
      label: 'Marzo',
    },
    {
      value: 4,
      label: 'Abril',
    },
    {
      value: 5,
      label: 'Mayo',
    },
    {
      value: 6,
      label: 'Junio',
    },
    {
      value: 7,
      label: 'Julio',
    },
    {
      value: 8,
      label: 'Agosto',
    },
    {
      value: 9,
      label: 'Septiembre',
    },
    {
      value: 10,
      label: 'Octubre',
    },
    {
      value: 11,
      label: 'Noviembre',
    },
    {
      value: 12,
      label: 'Diciembre',
    },
  ];
  const currentMonth = new Date().getMonth();
  const segments = [1, 2, 3, 4];

  const [range, setRange] = useState({
    segment: null,
    month: (currentMonth + 1)?.toString(),
    year: currentYear?.toString(),
  });

  useEffect(() => {
    setLoading(true);
    if (adminMatches?.activeTable) {
      fetchDataPostAsync('/analytics/adminQuality', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: '1',
                accepted: data?.[0]?.value?.find((period) => period?.period === 1)?.percent,
                pending: data?.[1]?.value?.find((period) => period?.period === 1)?.percent,
                rejected: data?.[2]?.value?.find((period) => period?.period === 1)?.percent,
              };
              const period2 = {
                category: '2',
                accepted: data?.[0]?.value?.find((period) => period?.period === 2)?.percent,
                pending: data?.[1]?.value?.find((period) => period?.period === 2)?.percent,
                rejected: data?.[2]?.value?.find((period) => period?.period === 2)?.percent,
              };
              const period3 = {
                category: '3',
                accepted: data?.[0]?.value?.find((period) => period?.period === 3)?.percent,
                pending: data?.[1]?.value?.find((period) => period?.period === 3)?.percent,
                rejected: data?.[2]?.value?.find((period) => period?.period === 3)?.percent,
              };
              const period4 = {
                category: '4',
                accepted: data?.[0]?.value?.find((period) => period?.period === 4)?.percent,
                pending: data?.[1]?.value?.find((period) => period?.period === 4)?.percent,
                rejected: data?.[2]?.value?.find((period) => period?.period === 4)?.percent,
              };
              setAdminMatches({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                activeTable: true,
              });
            } else {
              setAdminMatches({
                matchesStatus: data?.map((item) => ({
                  category: item?.label
                    ?.split(/(?=[A-Z])/)
                    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' '),
                  value: item?.value[0]?.value,
                  percent: item?.value[0]?.percent,
                })),
                totalMatches: data[0]?.value[0]?.value + data[1]?.value[0]?.value,
                activeTable: true,
              });
            }
          } else {
            setAdminMatches({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: true,
            });
          }
          setLoading(false);
        })
        .catch((e) => {
          setAdminMatches({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: true,
          });
          toast.error('Error en allUser table');
          // NotificationManager.error('Error en allUser table', 'code: 500');
          setLoading(false);
          return e;
        });
    } else {
      fetchDataPostAsync('/analytics/adminQuality', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: 'Semana 1',
                accepted: data?.[0]?.value?.find((period) => period?.period === 1)?.value,
                pending: data?.[1]?.value?.find((period) => period?.period === 1)?.value,
                rejected: data?.[2]?.value?.find((period) => period?.period === 1)?.value,
              };
              const period2 = {
                category: 'Semana 2',
                accepted: data?.[0]?.value?.find((period) => period?.period === 2)?.value,
                pending: data?.[1]?.value?.find((period) => period?.period === 2)?.value,
                rejected: data?.[2]?.value?.find((period) => period?.period === 2)?.value,
              };
              const period3 = {
                category: 'Semana 3',
                accepted: data?.[0]?.value?.find((period) => period?.period === 3)?.value,
                pending: data?.[1]?.value?.find((period) => period?.period === 3)?.value,
                rejected: data?.[2]?.value?.find((period) => period?.period === 3)?.value,
              };
              const period4 = {
                category: 'Semana 4',
                accepted: data?.[0]?.value?.find((period) => period?.period === 4)?.value,
                pending: data?.[1]?.value?.find((period) => period?.period === 4)?.value,
                rejected: data?.[2]?.value?.find((period) => period?.period === 4)?.value,
              };
              setAdminMatches({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                activeTable: false,
              });
            } else {
              setAdminMatches({
                matchesStatus: data?.map((item) => ({
                  category: item?.label
                    ?.split(/(?=[A-Z])/)
                    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' '),
                  value: item?.value[0]?.value,
                  percent: item?.value[0]?.percent,
                })),
                totalMatches: data[0]?.value[0]?.value + data[1]?.value[0]?.value,
                activeTable: false,
              });
            }
          } else {
            setAdminMatches({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: false,
            });
          }
          setLoading(false);
        })
        .catch((e) => {
          setAdminMatches({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: false,
          });
          toast.error('Error en allUser table');
          // NotificationManager.error('Error en allUser table', 'code: 500');
          setLoading(false);
          return e;
        });
    }
  }, [adminMatches?.activeTable, range]);

  useEffect(() => {
    setLoadingReasons(true);
    if (reasonRejectedMatches?.activeTable) {
      fetchDataPostAsync('/analytics/adminReasonsReject', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: '1',
                distinct: data?.[0]?.value?.find((period) => period?.period === 1)?.percent,
                salary: data?.[1]?.value?.find((period) => period?.period === 1)?.percent,
                faraway: data?.[2]?.value?.find((period) => period?.period === 1)?.percent,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 1)?.percent,
              };
              const period2 = {
                category: '2',
                distinct: data?.[0]?.value?.find((period) => period?.period === 2)?.percent,
                salary: data?.[1]?.value?.find((period) => period?.period === 2)?.percent,
                faraway: data?.[2]?.value?.find((period) => period?.period === 2)?.percent,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 2)?.percent,
              };
              const period3 = {
                category: '3',
                distinct: data?.[0]?.value?.find((period) => period?.period === 3)?.percent,
                salary: data?.[1]?.value?.find((period) => period?.period === 3)?.percent,
                faraway: data?.[2]?.value?.find((period) => period?.period === 3)?.percent,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 3)?.percent,
              };
              const period4 = {
                category: '4',
                distinct: data?.[0]?.value?.find((period) => period?.period === 4)?.percent,
                salary: data?.[1]?.value?.find((period) => period?.period === 4)?.percent,
                faraway: data?.[2]?.value?.find((period) => period?.period === 4)?.percent,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 4)?.percent,
              };
              setReasonsRejectedMatches({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                series: [
                  { name: 'Algo distinto', fieldName: 'distinct' },
                  { name: 'Salario', fieldName: 'salary' },
                  { name: 'Está muy lejos', fieldName: 'faraway' },
                  { name: 'No se ajusta al perfil', fieldName: 'nomatch' },
                ],
                activeTable: true,
              });
            } else {
              setReasonsRejectedMatches({
                matchesStatus: data?.map((item) => ({
                  category: item?.label,
                  value: item?.data[0]?.value,
                  percent: item?.data[0]?.percent,
                })),
                activeTable: true,
              });
            }
          } else {
            setReasonsRejectedMatches({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: true,
            });
          }
          setLoadingReasons(false);
        })
        .catch((e) => {
          setReasonsRejectedMatches({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: true,
          });
          toast.error('Error en allUser table');
          // NotificationManager.error('Error en allUser table', 'code: 500');
          setLoadingReasons(false);
          return e;
        });
    } else {
      fetchDataPostAsync('/analytics/adminReasonsReject', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: 'Semana 1',
                distinct: data?.[0]?.value?.find((period) => period?.period === 1)?.value,
                salary: data?.[1]?.value?.find((period) => period?.period === 1)?.value,
                faraway: data?.[2]?.value?.find((period) => period?.period === 1)?.value,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 1)?.value,
              };
              const period2 = {
                category: 'Semana 2',
                distinct: data?.[0]?.value?.find((period) => period?.period === 2)?.value,
                salary: data?.[1]?.value?.find((period) => period?.period === 2)?.value,
                faraway: data?.[2]?.value?.find((period) => period?.period === 2)?.value,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 2)?.value,
              };
              const period3 = {
                category: 'Semana 3',
                distinct: data?.[0]?.value?.find((period) => period?.period === 3)?.value,
                salary: data?.[1]?.value?.find((period) => period?.period === 3)?.value,
                faraway: data?.[2]?.value?.find((period) => period?.period === 3)?.value,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 3)?.value,
              };
              const period4 = {
                category: 'Semana 4',
                distinct: data?.[0]?.value?.find((period) => period?.period === 4)?.value,
                salary: data?.[1]?.value?.find((period) => period?.period === 4)?.value,
                faraway: data?.[2]?.value?.find((period) => period?.period === 4)?.value,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 4)?.value,
              };
              setReasonsRejectedMatches({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                series: [
                  { name: 'Algo distinto', fieldName: 'distinct' },
                  { name: 'Salario', fieldName: 'salary' },
                  { name: 'Está muy lejos', fieldName: 'faraway' },
                  { name: 'No se ajusta al perfil', fieldName: 'nomatch' },
                ],
                activeTable: false,
              });
            } else {
              setReasonsRejectedMatches({
                matchesStatus: data?.map((item) => ({
                  category: item?.label,
                  value: item?.data[0]?.value,
                  percent: item?.data[0]?.percent,
                })),
                series: [],
                activeTable: false,
              });
            }
          } else {
            setReasonsRejectedMatches({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: false,
              series: [],
            });
          }
          setLoadingReasons(false);
        })
        .catch((e) => {
          setReasonsRejectedMatches({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: false,
            series: [],
          });
          toast.error('Error en allUser table');
          // NotificationManager.error('Error en allUser table', 'code: 500');
          setLoadingReasons(false);
          return e;
        });
    }
  }, [reasonRejectedMatches?.activeTable, range]);

  useEffect(() => {
    setLoadingUsers(true);
    if (userMatches?.activeTable) {
      fetchDataPostAsync('/analytics/usersQuality', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: '1',
                accepted: data?.[0]?.value?.find((period) => period?.period === 1)?.percent,
                pending: data?.[1]?.value?.find((period) => period?.period === 1)?.percent,
                rejected: data?.[2]?.value?.find((period) => period?.period === 1)?.percent,
              };
              const period2 = {
                category: '2',
                accepted: data?.[0]?.value?.find((period) => period?.period === 2)?.percent,
                pending: data?.[1]?.value?.find((period) => period?.period === 2)?.percent,
                rejected: data?.[2]?.value?.find((period) => period?.period === 2)?.percent,
              };
              const period3 = {
                category: '3',
                accepted: data?.[0]?.value?.find((period) => period?.period === 3)?.percent,
                pending: data?.[1]?.value?.find((period) => period?.period === 3)?.percent,
                rejected: data?.[2]?.value?.find((period) => period?.period === 3)?.percent,
              };
              const period4 = {
                category: '4',
                accepted: data?.[0]?.value?.find((period) => period?.period === 4)?.percent,
                pending: data?.[1]?.value?.find((period) => period?.period === 4)?.percent,
                rejected: data?.[2]?.value?.find((period) => period?.period === 4)?.percent,
              };
              setUserMatches({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                activeTable: true,
              });
            } else {
              setUserMatches({
                matchesStatus: data?.map((item) => ({
                  category: item?.label
                    ?.split(/(?=[A-Z])/)
                    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' '),
                  value: item?.value[0]?.value,
                  percent: item?.value[0]?.percent,
                })),
                totalMatches: data[0]?.value[0]?.value + data[1]?.value[0]?.value,
                activeTable: true,
              });
            }
          } else {
            setUserMatches({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: true,
            });
          }
          setLoadingUsers(false);
        })
        .catch((e) => {
          setUserMatches({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: true,
          });
          toast.error('Error en allUser table');
          // NotificationManager.error('Error en allUser table', 'code: 500');
          setLoadingUsers(false);
          return e;
        });
    } else {
      fetchDataPostAsync('/analytics/usersQuality', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: 'Semana 1',
                accepted: data?.[0]?.value?.find((period) => period?.period === 1)?.value,
                pending: data?.[1]?.value?.find((period) => period?.period === 1)?.value,
                rejected: data?.[2]?.value?.find((period) => period?.period === 1)?.value,
              };
              const period2 = {
                category: 'Semana 2',
                accepted: data?.[0]?.value?.find((period) => period?.period === 2)?.value,
                pending: data?.[1]?.value?.find((period) => period?.period === 2)?.value,
                rejected: data?.[2]?.value?.find((period) => period?.period === 2)?.value,
              };
              const period3 = {
                category: 'Semana 3',
                accepted: data?.[0]?.value?.find((period) => period?.period === 3)?.value,
                pending: data?.[1]?.value?.find((period) => period?.period === 3)?.value,
                rejected: data?.[2]?.value?.find((period) => period?.period === 3)?.value,
              };
              const period4 = {
                category: 'Semana 4',
                accepted: data?.[0]?.value?.find((period) => period?.period === 4)?.value,
                pending: data?.[1]?.value?.find((period) => period?.period === 4)?.value,
                rejected: data?.[2]?.value?.find((period) => period?.period === 4)?.value,
              };
              setUserMatches({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                activeTable: false,
              });
            } else {
              setUserMatches({
                matchesStatus: data?.map((item) => ({
                  category: item?.label
                    ?.split(/(?=[A-Z])/)
                    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' '),
                  value: item?.value[0]?.value,
                  percent: item?.value[0]?.percent,
                })),
                totalMatches: data[0]?.value[0]?.value + data[1]?.value[0]?.value,
                activeTable: false,
              });
            }
          } else {
            setUserMatches({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: false,
            });
          }
          setLoadingUsers(false);
        })
        .catch((e) => {
          setUserMatches({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: false,
          });
          toast.error('Error en allUser table');
          // NotificationManager.error('Error en allUser table', 'code: 500');
          setLoadingUsers(false);
          return e;
        });
    }
  }, [userMatches?.activeTable, range]);

  useEffect(() => {
    setLoadingReasonsUsers(true);
    if (reasonRejectedMatchesUsers?.activeTable) {
      fetchDataPostAsync('/analytics/usersReasonsReject', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: '1',
                distinct: data?.[0]?.value?.find((period) => period?.period === 1)?.percent,
                salary: data?.[1]?.value?.find((period) => period?.period === 1)?.percent,
                faraway: data?.[2]?.value?.find((period) => period?.period === 1)?.percent,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 1)?.percent,
              };
              const period2 = {
                category: '2',
                distinct: data?.[0]?.value?.find((period) => period?.period === 2)?.percent,
                salary: data?.[1]?.value?.find((period) => period?.period === 2)?.percent,
                faraway: data?.[2]?.value?.find((period) => period?.period === 2)?.percent,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 2)?.percent,
              };
              const period3 = {
                category: '3',
                distinct: data?.[0]?.value?.find((period) => period?.period === 3)?.percent,
                salary: data?.[1]?.value?.find((period) => period?.period === 3)?.percent,
                faraway: data?.[2]?.value?.find((period) => period?.period === 3)?.percent,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 3)?.percent,
              };
              const period4 = {
                category: '4',
                distinct: data?.[0]?.value?.find((period) => period?.period === 4)?.percent,
                salary: data?.[1]?.value?.find((period) => period?.period === 4)?.percent,
                faraway: data?.[2]?.value?.find((period) => period?.period === 4)?.percent,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 4)?.percent,
              };
              setReasonsRejectedMatchesUsers({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                series: [
                  { name: 'Algo distinto', fieldName: 'distinct' },
                  { name: 'Salario', fieldName: 'salary' },
                  { name: 'Está muy lejos', fieldName: 'faraway' },
                  { name: 'No se ajusta al perfil', fieldName: 'nomatch' },
                ],
                activeTable: true,
              });
            } else {
              setReasonsRejectedMatchesUsers({
                matchesStatus: data?.map((item) => ({
                  category: item?.label,
                  value: item?.data[0]?.value,
                  percent: item?.data[0]?.percent,
                })),
                activeTable: true,
              });
            }
          } else {
            setReasonsRejectedMatchesUsers({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: true,
            });
          }
          setLoadingReasonsUsers(false);
        })
        .catch((e) => {
          setReasonsRejectedMatchesUsers({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: true,
          });
          toast.error('Error en allUser table');
          // NotificationManager.error('Error en allUser table', 'code: 500');
          setLoadingReasonsUsers(false);
          return e;
        });
    } else {
      fetchDataPostAsync('/analytics/usersReasonsReject', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: 'Semana 1',
                distinct: data?.[0]?.value?.find((period) => period?.period === 1)?.value,
                salary: data?.[1]?.value?.find((period) => period?.period === 1)?.value,
                faraway: data?.[2]?.value?.find((period) => period?.period === 1)?.value,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 1)?.value,
              };
              const period2 = {
                category: 'Semana 2',
                distinct: data?.[0]?.value?.find((period) => period?.period === 2)?.value,
                salary: data?.[1]?.value?.find((period) => period?.period === 2)?.value,
                faraway: data?.[2]?.value?.find((period) => period?.period === 2)?.value,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 2)?.value,
              };
              const period3 = {
                category: 'Semana 3',
                distinct: data?.[0]?.value?.find((period) => period?.period === 3)?.value,
                salary: data?.[1]?.value?.find((period) => period?.period === 3)?.value,
                faraway: data?.[2]?.value?.find((period) => period?.period === 3)?.value,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 3)?.value,
              };
              const period4 = {
                category: 'Semana 4',
                distinct: data?.[0]?.value?.find((period) => period?.period === 4)?.value,
                salary: data?.[1]?.value?.find((period) => period?.period === 4)?.value,
                faraway: data?.[2]?.value?.find((period) => period?.period === 4)?.value,
                nomatch: data?.[3]?.value?.find((period) => period?.period === 4)?.value,
              };
              setReasonsRejectedMatchesUsers({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                series: [
                  { name: 'Algo distinto', fieldName: 'distinct' },
                  { name: 'Salario', fieldName: 'salary' },
                  { name: 'Está muy lejos', fieldName: 'faraway' },
                  { name: 'No se ajusta al perfil', fieldName: 'nomatch' },
                ],
                activeTable: false,
              });
            } else {
              setReasonsRejectedMatchesUsers({
                matchesStatus: data?.map((item) => ({
                  category: item?.label,
                  value: item?.data[0]?.value,
                  percent: item?.data[0]?.percent,
                })),
                series: [],
                activeTable: false,
              });
            }
          } else {
            setReasonsRejectedMatchesUsers({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: false,
              series: [],
            });
          }
          setLoadingReasonsUsers(false);
        })
        .catch((e) => {
          setReasonsRejectedMatchesUsers({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: false,
            series: [],
          });
          toast.error('Error en allUser table');
          // NotificationManager.error('Error en allUser table', 'code: 500');
          setLoadingReasonsUsers(false);
          return e;
        });
    }
  }, [reasonRejectedMatchesUsers?.activeTable, range]);

  useEffect(() => {
    setLoadingAdminAcceptGroup(true);
    if (adminAcceptGroup?.activeTable) {
      fetchDataPostAsync('/analytics/adminAcceptGroup', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: '1',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 1)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 1)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 1)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 1)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 1)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 1)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 1)?.percent,
              };
              const period2 = {
                category: '2',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 2)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 2)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 2)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 2)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 2)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 2)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 2)?.percent,
              };
              const period3 = {
                category: '3',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 3)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 3)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 3)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 3)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 3)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 3)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 3)?.percent,
              };
              const period4 = {
                category: '4',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 4)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 4)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 4)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 4)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 4)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 4)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 4)?.percent,
              };
              setAdminAcceptGroup({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                series: [
                  { name: 'LGBTQ+', fieldName: 'lgbtq' },
                  { name: 'Madre soltera', fieldName: 'mother' },
                  { name: 'Migrante', fieldName: 'migrant' },
                  { name: 'Mujer en SVE', fieldName: 'woman' },
                  { name: 'Ninguna de las anteriores', fieldName: 'nomatch' },
                  { name: 'Persona retornada', fieldName: 'returnedperson' },
                  { name: 'Refugiado', fieldName: 'refugee' },
                ],
                activeTable: true,
              });
            } else {
              setAdminAcceptGroup({
                matchesStatus: data?.map((item) => ({
                  category: item?.label,
                  value: item?.data[0]?.value,
                  percent: item?.data[0]?.percent,
                })),
                activeTable: true,
              });
            }
          } else {
            setAdminAcceptGroup({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: true,
            });
          }
          setLoadingAdminAcceptGroup(false);
        })
        .catch((e) => {
          setAdminAcceptGroup({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: true,
          });
          toast.error('Error en admin Accept Group table');
          // NotificationManager.error('Error en admin Accept Group table', 'code: 500');
          setLoadingAdminAcceptGroup(false);
          return e;
        });
    } else {
      fetchDataPostAsync('/analytics/adminAcceptGroup', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: 'Semana 1',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 1)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 1)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 1)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 1)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 1)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 1)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 1)?.value,
              };
              const period2 = {
                category: 'Semana 2',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 2)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 2)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 2)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 2)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 2)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 2)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 2)?.value,
              };
              const period3 = {
                category: 'Semana 3',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 3)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 3)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 3)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 3)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 3)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 3)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 3)?.value,
              };
              const period4 = {
                category: 'Semana 4',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 4)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 4)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 4)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 4)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 4)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 4)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 4)?.value,
              };
              setAdminAcceptGroup({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                series: [
                  { name: 'LGBTQ+', fieldName: 'lgbtq' },
                  { name: 'Madre soltera', fieldName: 'mother' },
                  { name: 'Migrante', fieldName: 'migrant' },
                  { name: 'Mujer en SVE', fieldName: 'woman' },
                  { name: 'Ninguna de las anteriores', fieldName: 'nomatch' },
                  { name: 'Persona retornada', fieldName: 'returnedperson' },
                  { name: 'Refugiado', fieldName: 'refugee' },
                ],
                activeTable: false,
              });
            } else {
              setAdminAcceptGroup({
                matchesStatus: data?.map((item) => ({
                  category: item?.label,
                  value: item?.data[0]?.value,
                  percent: item?.data[0]?.percent,
                })),
                series: [],
                activeTable: false,
              });
            }
          } else {
            setAdminAcceptGroup({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: false,
              series: [],
            });
          }
          setLoadingAdminAcceptGroup(false);
        })
        .catch((e) => {
          setAdminAcceptGroup({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: false,
            series: [],
          });
          toast.error('Error en Admin Accept Group table');
          // NotificationManager.error('Error en Admin Accept Group table', 'code: 500');
          setLoadingAdminAcceptGroup(false);
          return e;
        });
    }
  }, [adminAcceptGroup?.activeTable, range]);

  useEffect(() => {
    setLoadingAdminRejectGroup(true);
    if (adminRejectGroup?.activeTable) {
      fetchDataPostAsync('/analytics/adminRejectGroup', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: '1',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 1)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 1)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 1)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 1)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 1)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 1)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 1)?.percent,
              };
              const period2 = {
                category: '2',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 2)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 2)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 2)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 2)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 2)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 2)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 2)?.percent,
              };
              const period3 = {
                category: '3',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 3)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 3)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 3)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 3)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 3)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 3)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 3)?.percent,
              };
              const period4 = {
                category: '4',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 4)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 4)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 4)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 4)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 4)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 4)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 4)?.percent,
              };
              setAdminRejectGroup({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                series: [
                  { name: 'LGBTQ+', fieldName: 'lgbtq' },
                  { name: 'Madre soltera', fieldName: 'mother' },
                  { name: 'Migrante', fieldName: 'migrant' },
                  { name: 'Mujer en SVE', fieldName: 'woman' },
                  { name: 'Ninguna de las anteriores', fieldName: 'nomatch' },
                  { name: 'Persona retornada', fieldName: 'returnedperson' },
                  { name: 'Refugiado', fieldName: 'refugee' },
                ],
                activeTable: true,
              });
            } else {
              setAdminRejectGroup({
                matchesStatus: data?.map((item) => ({
                  category: item?.label,
                  value: item?.data[0]?.value,
                  percent: item?.data[0]?.percent,
                })),
                activeTable: true,
              });
            }
          } else {
            setAdminRejectGroup({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: true,
            });
          }
          setLoadingAdminRejectGroup(false);
        })
        .catch((e) => {
          setAdminRejectGroup({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: true,
          });
          toast.error('Error en admin Accept Group table');
          // NotificationManager.error('Error en admin Accept Group table', 'code: 500');
          setLoadingAdminRejectGroup(false);
          return e;
        });
    } else {
      fetchDataPostAsync('/analytics/adminRejectGroup', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: 'Semana 1',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 1)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 1)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 1)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 1)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 1)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 1)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 1)?.value,
              };
              const period2 = {
                category: 'Semana 2',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 2)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 2)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 2)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 2)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 2)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 2)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 2)?.value,
              };
              const period3 = {
                category: 'Semana 3',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 3)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 3)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 3)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 3)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 3)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 3)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 3)?.value,
              };
              const period4 = {
                category: 'Semana 4',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 4)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 4)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 4)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 4)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 4)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 4)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 4)?.value,
              };
              setAdminRejectGroup({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                series: [
                  { name: 'LGBTQ+', fieldName: 'lgbtq' },
                  { name: 'Madre soltera', fieldName: 'mother' },
                  { name: 'Migrante', fieldName: 'migrant' },
                  { name: 'Mujer en SVE', fieldName: 'woman' },
                  { name: 'Ninguna de las anteriores', fieldName: 'nomatch' },
                  { name: 'Persona retornada', fieldName: 'returnedperson' },
                  { name: 'Refugiado', fieldName: 'refugee' },
                ],
                activeTable: false,
              });
            } else {
              setAdminRejectGroup({
                matchesStatus: data?.map((item) => ({
                  category: item?.label,
                  value: item?.data[0]?.value,
                  percent: item?.data[0]?.percent,
                })),
                series: [],
                activeTable: false,
              });
            }
          } else {
            setAdminRejectGroup({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: false,
              series: [],
            });
          }
          setLoadingAdminRejectGroup(false);
        })
        .catch((e) => {
          setAdminRejectGroup({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: false,
            series: [],
          });
          toast.error('Error en Admin Accept Group table');
          // NotificationManager.error('Error en Admin Accept Group table', 'code: 500');
          setLoadingAdminRejectGroup(false);
          return e;
        });
    }
  }, [adminRejectGroup?.activeTable, range]);

  useEffect(() => {
    setLoadingUserAcceptGroup(true);
    if (userAcceptGroup?.activeTable) {
      fetchDataPostAsync('/analytics/userAcceptGroup', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: '1',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 1)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 1)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 1)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 1)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 1)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 1)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 1)?.percent,
              };
              const period2 = {
                category: '2',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 2)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 2)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 2)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 2)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 2)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 2)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 2)?.percent,
              };
              const period3 = {
                category: '3',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 3)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 3)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 3)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 3)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 3)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 3)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 3)?.percent,
              };
              const period4 = {
                category: '4',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 4)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 4)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 4)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 4)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 4)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 4)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 4)?.percent,
              };
              setUserAcceptGroup({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                series: [
                  { name: 'LGBTQ+', fieldName: 'lgbtq' },
                  { name: 'Madre soltera', fieldName: 'mother' },
                  { name: 'Migrante', fieldName: 'migrant' },
                  { name: 'Mujer en SVE', fieldName: 'woman' },
                  { name: 'Ninguna de las anteriores', fieldName: 'nomatch' },
                  { name: 'Persona retornada', fieldName: 'returnedperson' },
                  { name: 'Refugiado', fieldName: 'refugee' },
                ],
                activeTable: true,
              });
            } else {
              setUserAcceptGroup({
                matchesStatus: data?.map((item) => ({
                  category: item?.label,
                  value: item?.data[0]?.value,
                  percent: item?.data[0]?.percent,
                })),
                activeTable: true,
              });
            }
          } else {
            setUserAcceptGroup({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: true,
            });
          }
          setLoadingUserAcceptGroup(false);
        })
        .catch((e) => {
          setUserAcceptGroup({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: true,
          });
          toast.error('Error en admin Accept Group table');
          // NotificationManager.error('Error en admin Accept Group table', 'code: 500');
          setLoadingUserAcceptGroup(false);
          return e;
        });
    } else {
      fetchDataPostAsync('/analytics/userAcceptGroup', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: 'Semana 1',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 1)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 1)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 1)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 1)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 1)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 1)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 1)?.value,
              };
              const period2 = {
                category: 'Semana 2',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 2)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 2)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 2)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 2)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 2)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 2)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 2)?.value,
              };
              const period3 = {
                category: 'Semana 3',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 3)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 3)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 3)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 3)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 3)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 3)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 3)?.value,
              };
              const period4 = {
                category: 'Semana 4',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 4)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 4)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 4)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 4)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 4)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 4)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 4)?.value,
              };
              setUserAcceptGroup({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                series: [
                  { name: 'LGBTQ+', fieldName: 'lgbtq' },
                  { name: 'Madre soltera', fieldName: 'mother' },
                  { name: 'Migrante', fieldName: 'migrant' },
                  { name: 'Mujer en SVE', fieldName: 'woman' },
                  { name: 'Ninguna de las anteriores', fieldName: 'nomatch' },
                  { name: 'Persona retornada', fieldName: 'returnedperson' },
                  { name: 'Refugiado', fieldName: 'refugee' },
                ],
                activeTable: false,
              });
            } else {
              setUserAcceptGroup({
                matchesStatus: data?.map((item) => ({
                  category: item?.label,
                  value: item?.data[0]?.value,
                  percent: item?.data[0]?.percent,
                })),
                series: [],
                activeTable: false,
              });
            }
          } else {
            setUserAcceptGroup({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: false,
              series: [],
            });
          }
          setLoadingUserAcceptGroup(false);
        })
        .catch((e) => {
          setUserAcceptGroup({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: false,
            series: [],
          });
          toast.error('Error en Admin Accept Group table');
          // NotificationManager.error('Error en Admin Accept Group table', 'code: 500');
          setLoadingUserAcceptGroup(false);
          return e;
        });
    }
  }, [userAcceptGroup?.activeTable, range]);

  useEffect(() => {
    setLoadingUserRejectGroup(true);
    if (userRejectGroup?.activeTable) {
      fetchDataPostAsync('/analytics/userRejectGroup', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: '1',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 1)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 1)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 1)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 1)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 1)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 1)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 1)?.percent,
              };
              const period2 = {
                category: '2',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 2)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 2)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 2)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 2)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 2)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 2)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 2)?.percent,
              };
              const period3 = {
                category: '3',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 3)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 3)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 3)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 3)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 3)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 3)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 3)?.percent,
              };
              const period4 = {
                category: '4',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 4)?.percent,
                mother: data?.[1]?.value?.find((period) => period?.period === 4)?.percent,
                migrant: data?.[2]?.value?.find((period) => period?.period === 4)?.percent,
                woman: data?.[3]?.value?.find((period) => period?.period === 4)?.percent,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 4)?.percent,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 4)?.percent,
                refugee: data?.[6]?.value?.find((period) => period?.period === 4)?.percent,
              };
              setUserRejectGroup({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                series: [
                  { name: 'LGBTQ+', fieldName: 'lgbtq' },
                  { name: 'Madre soltera', fieldName: 'mother' },
                  { name: 'Migrante', fieldName: 'migrant' },
                  { name: 'Mujer en SVE', fieldName: 'woman' },
                  { name: 'Ninguna de las anteriores', fieldName: 'nomatch' },
                  { name: 'Persona retornada', fieldName: 'returnedperson' },
                  { name: 'Refugiado', fieldName: 'refugee' },
                ],
                activeTable: true,
              });
            } else {
              setUserRejectGroup({
                matchesStatus: data?.map((item) => ({
                  category: item?.label,
                  value: item?.data[0]?.value,
                  percent: item?.data[0]?.percent,
                })),
                activeTable: true,
              });
            }
          } else {
            setUserRejectGroup({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: true,
            });
          }
          setLoadingUserRejectGroup(false);
        })
        .catch((e) => {
          setUserRejectGroup({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: true,
          });
          toast.error('Error en admin Accept Group table');
          // NotificationManager.error('Error en admin Accept Group table', 'code: 500');
          setLoadingUserRejectGroup(false);
          return e;
        });
    } else {
      fetchDataPostAsync('/analytics/userRejectGroup', {
        data: range,
      })
        .then((data) => {
          if (data) {
            if ((range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0') {
              const period1 = {
                category: 'Semana 1',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 1)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 1)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 1)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 1)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 1)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 1)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 1)?.value,
              };
              const period2 = {
                category: 'Semana 2',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 2)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 2)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 2)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 2)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 2)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 2)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 2)?.value,
              };
              const period3 = {
                category: 'Semana 3',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 3)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 3)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 3)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 3)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 3)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 3)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 3)?.value,
              };
              const period4 = {
                category: 'Semana 4',
                lgbtq: data?.[0]?.value?.find((period) => period?.period === 4)?.value,
                mother: data?.[1]?.value?.find((period) => period?.period === 4)?.value,
                migrant: data?.[2]?.value?.find((period) => period?.period === 4)?.value,
                woman: data?.[3]?.value?.find((period) => period?.period === 4)?.value,
                nomatch: data?.[4]?.value?.find((period) => period?.period === 4)?.value,
                returnedperson: data?.[5]?.value?.find((period) => period?.period === 4)?.value,
                refugee: data?.[6]?.value?.find((period) => period?.period === 4)?.value,
              };
              setUserRejectGroup({
                matchesStatus: [period1, period2, period3, period4],
                totalMatches: [period1, period2, period3, period4],
                series: [
                  { name: 'LGBTQ+', fieldName: 'lgbtq' },
                  { name: 'Madre soltera', fieldName: 'mother' },
                  { name: 'Migrante', fieldName: 'migrant' },
                  { name: 'Mujer en SVE', fieldName: 'woman' },
                  { name: 'Ninguna de las anteriores', fieldName: 'nomatch' },
                  { name: 'Persona retornada', fieldName: 'returnedperson' },
                  { name: 'Refugiado', fieldName: 'refugee' },
                ],
                activeTable: false,
              });
            } else {
              setUserRejectGroup({
                matchesStatus: data?.map((item) => ({
                  category: item?.label,
                  value: item?.data[0]?.value,
                  percent: item?.data[0]?.percent,
                })),
                series: [],
                activeTable: false,
              });
            }
          } else {
            setUserRejectGroup({
              matchesStatus: [],
              totalMatches: 0,
              activeTable: false,
              series: [],
            });
          }
          setLoadingUserRejectGroup(false);
        })
        .catch((e) => {
          setUserRejectGroup({
            matchesStatus: [],
            totalMatches: 0,
            activeTable: false,
            series: [],
          });
          toast.error('Error en Admin Accept Group table');
          // NotificationManager.error('Error en User Reject Group table', 'code: 500');
          setLoadingUserRejectGroup(false);
          return e;
        });
    }
  }, [userRejectGroup?.activeTable, range]);

  return (
    <>
      <div className="flex gap-x-4 pb-4">
        <div>
          <p className="text-sm">Semana</p>
          <select
            defaultValue={0}
            onChange={(e) => {
              if (e.target.value === 0) {
                setRange({
                  ...range,
                  segment: null,
                });
              } else {
                setRange({
                  ...range,
                  segment: e.target.value,
                });
              }
            }}
            className="rounded-lg border-0 bg-white px-4 py-1 text-sm"
          >
            <option value={0}>N/A</option>
            {segments.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-sm">Mes</p>
          <select
            defaultValue={currentMonth + 1}
            onChange={(e) => {
              if (e.target.value === 0) {
                setRange({
                  ...range,
                  month: null,
                });
              } else {
                setRange({
                  ...range,
                  month: e.target.value,
                });
              }
            }}
            className="rounded-lg border-0 bg-white px-4 py-1 text-sm"
          >
            <option value={0}>N/A</option>
            {months.map((month) => (
              <option key={month?.label} value={month?.value}>
                {month?.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="text-sm">Año</p>
          <select
            defaultValue={currentYear}
            onChange={(e) => {
              setRange({
                ...range,
                year: e.target.value,
              });
            }}
            className="rounded-lg border-0 bg-white px-4 py-1 text-sm"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 bg-cream">
        <div className="relative flex h-[500px] w-full flex-row items-center gap-4 rounded-lg bg-white">
          <div className="absolute right-4 top-2 z-10 flex w-max gap-x-2 rounded-full bg-purple">
            <p
              onClick={() => {
                setAdminMatches({
                  ...adminMatches,
                  activeTable: true,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                adminMatches?.activeTable ? 'rounded-l-full rounded-t-full bg-purple text-white' : 'bg-white text-black'
              }`}
            >
              Tabla
            </p>
            <p
              onClick={() => {
                setAdminMatches({
                  ...adminMatches,
                  activeTable: false,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                !adminMatches?.activeTable
                  ? 'rounded-r-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Gráfica
            </p>
          </div>
          {loading && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!adminMatches?.activeTable && !loading && (
            <div className="flex h-full w-full flex-col">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches Status</p>
                </div>
              </div>
              <React.Suspense fallback="cargando...">
                {(range?.month === null || range?.month === '0') &&
                  (range?.segment === null || range?.segment === '0') && (
                    <DonutChart data={adminMatches?.matchesStatus} />
                  )}
                {(range?.segment === null || range?.segment === '0') &&
                  range?.month !== null &&
                  range?.month !== '0' && (
                    <ClusteredColumn
                      data={adminMatches?.matchesStatus}
                      seriesToMake={[
                        { name: 'Aceptados', fieldName: 'accepted' },
                        { name: 'Pendientes', fieldName: 'pending' },
                        { name: 'Rechazados', fieldName: 'rejected' },
                      ]}
                    />
                  )}
                {range?.segment !== null && range?.segment !== '0' && <DonutChart data={adminMatches?.matchesStatus} />}
              </React.Suspense>
            </div>
          )}
          {adminMatches?.activeTable && !loading && (
            <div className="flex h-full w-full flex-col items-center justify-center px-8">
              <div className="flex w-max flex-row items-center gap-4 self-start pb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches Status</p>
                </div>
              </div>
              {(range?.month === null || range?.month === '0') &&
                (range?.segment === null || range?.segment === '0') &&
                adminMatches?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {(range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0' && (
                <table className="w-full table-auto text-center">
                  <thead className="bg-cream text-base">
                    <tr>
                      <th>Semana</th>
                      <th>Aceptados</th>
                      <th>Pendientes</th>
                      <th>Rechazados</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminMatches?.matchesStatus?.map((info) => (
                      <tr className="bg-gray100 text-sm" key={info?.category}>
                        <td>{info?.category}</td>
                        <td>{info?.accepted}%</td>
                        <td>{info?.pending}%</td>
                        <td>{info?.rejected}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {range?.segment !== null &&
                range?.segment !== '0' &&
                adminMatches?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {!adminMatches?.matchesStatus?.length && (
                <p className="text-base">Ups, parece que no hay información acerca de esto</p>
              )}
            </div>
          )}
        </div>
        <div className="relative flex h-[500px] w-full flex-row items-center gap-4 rounded-lg bg-white">
          <div className="absolute right-4 top-2 z-10 flex w-max gap-x-2 rounded-full bg-purple">
            <p
              onClick={() => {
                setReasonsRejectedMatches({
                  ...reasonRejectedMatches,
                  activeTable: true,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                reasonRejectedMatches?.activeTable
                  ? 'rounded-l-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Tabla
            </p>
            <p
              onClick={() => {
                setReasonsRejectedMatches({
                  ...reasonRejectedMatches,
                  activeTable: false,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                !reasonRejectedMatches?.activeTable
                  ? 'rounded-r-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Gráfica
            </p>
          </div>
          {loadingReasons && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!reasonRejectedMatches?.activeTable && !loadingReasons && (
            <div className="flex h-full w-full flex-col">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches Rejected Reasons</p>
                </div>
              </div>
              <React.Suspense fallback="cargando...">
                {(range?.month === null || range?.month === '0') &&
                  (range?.segment === null || range?.segment === '0') && (
                    <DonutChart data={reasonRejectedMatches?.matchesStatus} />
                  )}
                {(range?.segment === null || range?.segment === '0') &&
                  range?.month !== null &&
                  range?.month !== '0' && (
                    <ClusteredColumn
                      data={reasonRejectedMatches?.matchesStatus}
                      seriesToMake={reasonRejectedMatches?.series}
                    />
                  )}
                {range?.segment !== null && range?.segment !== '0' && (
                  <DonutChart data={reasonRejectedMatches?.matchesStatus} />
                )}
              </React.Suspense>
            </div>
          )}
          {reasonRejectedMatches?.activeTable && !loadingReasons && (
            <div className="flex h-full w-full flex-col items-center justify-center px-8">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches Rejected Reasons</p>
                </div>
              </div>
              {(range?.month === null || range?.month === '0') &&
                (range?.segment === null || range?.segment === '0') &&
                reasonRejectedMatches?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {(range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0' && (
                <table className="w-full table-auto text-center">
                  <thead className="bg-cream text-base">
                    <tr>
                      <th>Semana</th>
                      <th>Algo distinto</th>
                      <th>Está muy lejos</th>
                      <th>No se ajusta al perfil</th>
                      <th>Salario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reasonRejectedMatches?.matchesStatus?.map((info) => (
                      <tr className="bg-gray100 text-sm" key={info?.category}>
                        <td>{info?.category}</td>
                        <td>{info?.distinct}%</td>
                        <td>{info?.faraway}%</td>
                        <td>{info?.nomatch}%</td>
                        <td>{info?.salary}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {range?.segment !== null &&
                range?.segment !== '0' &&
                reasonRejectedMatches?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {!reasonRejectedMatches?.matchesStatus?.length && (
                <p className="text-base">Ups, parece que no hay información acerca de esto</p>
              )}
            </div>
          )}
        </div>
        <div className="relative flex h-[500px] w-full flex-row items-center gap-4 rounded-lg bg-white">
          <div className="absolute right-4 top-2 z-10 flex w-max gap-x-2 rounded-full bg-purple">
            <p
              onClick={() => {
                setUserMatches({
                  ...userMatches,
                  activeTable: true,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                userMatches?.activeTable ? 'rounded-l-full rounded-t-full bg-purple text-white' : 'bg-white text-black'
              }`}
            >
              Tabla
            </p>
            <p
              onClick={() => {
                setUserMatches({
                  ...userMatches,
                  activeTable: false,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                !userMatches?.activeTable ? 'rounded-r-full rounded-t-full bg-purple text-white' : 'bg-white text-black'
              }`}
            >
              Gráfica
            </p>
          </div>
          {loadingUsers && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!userMatches?.activeTable && !loadingUsers && (
            <div className="flex h-full w-full flex-col">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches Status Users</p>
                </div>
              </div>
              <React.Suspense fallback="cargando...">
                {(range?.month === null || range?.month === '0') &&
                  (range?.segment === null || range?.segment === '0') && (
                    <DonutChart data={userMatches?.matchesStatus} />
                  )}
                {(range?.segment === null || range?.segment === '0') &&
                  range?.month !== null &&
                  range?.month !== '0' && (
                    <ClusteredColumn
                      data={userMatches?.matchesStatus}
                      seriesToMake={[
                        { name: 'Aceptados', fieldName: 'accepted' },
                        { name: 'Pendientes', fieldName: 'pending' },
                        { name: 'Rechazados', fieldName: 'rejected' },
                      ]}
                    />
                  )}
                {range?.segment !== null && range?.segment !== '0' && <DonutChart data={userMatches?.matchesStatus} />}
              </React.Suspense>
            </div>
          )}
          {userMatches?.activeTable && !loadingUsers && (
            <div className="flex h-full w-full flex-col items-center justify-center px-8">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches Status Users</p>
                </div>
              </div>
              {(range?.month === null || range?.month === '0') &&
                (range?.segment === null || range?.segment === '0') &&
                userMatches?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {(range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0' && (
                <table className="w-full table-auto text-center">
                  <thead className="bg-cream text-base">
                    <tr>
                      <th>Semana</th>
                      <th>Aceptados</th>
                      <th>Pendientes</th>
                      <th>Rechazados</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userMatches?.matchesStatus?.map((info) => (
                      <tr className="bg-gray100 text-sm" key={info?.category}>
                        <td>{info?.category}</td>
                        <td>{info?.accepted}%</td>
                        <td>{info?.pending}%</td>
                        <td>{info?.rejected}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {range?.segment !== null &&
                range?.segment !== '0' &&
                userMatches?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {!userMatches?.matchesStatus?.length && (
                <p className="text-base">Ups, parece que no hay información acerca de esto</p>
              )}
            </div>
          )}
        </div>
        <div className="relative flex h-[500px] w-full flex-row items-center gap-4 rounded-lg bg-white">
          <div className="absolute right-4 top-2 z-10 flex w-max gap-x-2 rounded-full bg-purple">
            <p
              onClick={() => {
                setReasonsRejectedMatchesUsers({
                  ...reasonRejectedMatchesUsers,
                  activeTable: true,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                reasonRejectedMatchesUsers?.activeTable
                  ? 'rounded-l-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Tabla
            </p>
            <p
              onClick={() => {
                setReasonsRejectedMatchesUsers({
                  ...reasonRejectedMatchesUsers,
                  activeTable: false,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                !reasonRejectedMatchesUsers?.activeTable
                  ? 'rounded-r-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Gráfica
            </p>
          </div>
          {loadingReasonsUsers && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!reasonRejectedMatchesUsers?.activeTable && !loadingReasonsUsers && (
            <div className="flex h-full w-full flex-col">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches Rejected Reasons Users</p>
                </div>
              </div>
              <React.Suspense fallback="cargando...">
                {(range?.month === null || range?.month === '0') &&
                  (range?.segment === null || range?.segment === '0') && (
                    <DonutChart data={reasonRejectedMatchesUsers?.matchesStatus} />
                  )}
                {(range?.segment === null || range?.segment === '0') &&
                  range?.month !== null &&
                  range?.month !== '0' && (
                    <ClusteredColumn
                      data={reasonRejectedMatchesUsers?.matchesStatus}
                      seriesToMake={reasonRejectedMatchesUsers?.series}
                    />
                  )}
                {range?.segment !== null && range?.segment !== '0' && (
                  <DonutChart data={reasonRejectedMatchesUsers?.matchesStatus} />
                )}
              </React.Suspense>
            </div>
          )}
          {reasonRejectedMatchesUsers?.activeTable && !loadingReasonsUsers && (
            <div className="flex h-full w-full flex-col items-center justify-center px-8">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches Rejected Reasons Users</p>
                </div>
              </div>
              {(range?.month === null || range?.month === '0') &&
                (range?.segment === null || range?.segment === '0') &&
                reasonRejectedMatchesUsers?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {(range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0' && (
                <table className="w-full table-auto text-center">
                  <thead className="bg-cream text-base">
                    <tr>
                      <th>Semana</th>
                      <th>Algo distinto</th>
                      <th>Está muy lejos</th>
                      <th>No se ajusta al perfil</th>
                      <th>Salario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reasonRejectedMatchesUsers?.matchesStatus?.map((info) => (
                      <tr className="bg-gray100 text-sm" key={info?.category}>
                        <td>{info?.category}</td>
                        <td>{info?.distinct}%</td>
                        <td>{info?.faraway}%</td>
                        <td>{info?.nomatch}%</td>
                        <td>{info?.salary}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {range?.segment !== null &&
                range?.segment !== '0' &&
                reasonRejectedMatchesUsers?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {!reasonRejectedMatchesUsers?.matchesStatus?.length && (
                <p className="text-base">Ups, parece que no hay información acerca de esto</p>
              )}
            </div>
          )}
        </div>
        <div className="relative flex h-[500px] w-full flex-row items-center gap-4 rounded-lg bg-white">
          <div className="absolute right-4 top-2 z-10 flex w-max gap-x-2 rounded-full bg-purple">
            <p
              onClick={() => {
                setAdminAcceptGroup({
                  ...adminAcceptGroup,
                  activeTable: true,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                adminAcceptGroup?.activeTable
                  ? 'rounded-l-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Tabla
            </p>
            <p
              onClick={() => {
                setAdminAcceptGroup({
                  ...adminAcceptGroup,
                  activeTable: false,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                !adminAcceptGroup?.activeTable
                  ? 'rounded-r-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Gráfica
            </p>
          </div>
          {loadingAdminAcceptGroup && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!adminAcceptGroup?.activeTable && !loadingAdminAcceptGroup && (
            <div className="flex h-full w-full flex-col">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches Admin Accept Group</p>
                </div>
              </div>
              <React.Suspense fallback="cargando...">
                {(range?.month === null || range?.month === '0') &&
                  (range?.segment === null || range?.segment === '0') && (
                    <DonutChart data={adminAcceptGroup?.matchesStatus} />
                  )}
                {(range?.segment === null || range?.segment === '0') &&
                  range?.month !== null &&
                  range?.month !== '0' && (
                    <ClusteredColumn data={adminAcceptGroup?.matchesStatus} seriesToMake={adminAcceptGroup?.series} />
                  )}
                {range?.segment !== null && range?.segment !== '0' && (
                  <DonutChart data={adminAcceptGroup?.matchesStatus} />
                )}
              </React.Suspense>
            </div>
          )}
          {adminAcceptGroup?.activeTable && !loadingAdminAcceptGroup && (
            <div className="flex h-full w-full flex-col items-center justify-center px-8">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches Admin Accept Group</p>
                </div>
              </div>
              {(range?.month === null || range?.month === '0') &&
                (range?.segment === null || range?.segment === '0') &&
                adminAcceptGroup?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {(range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0' && (
                <table className="w-full table-auto text-center">
                  <thead className="bg-cream text-base">
                    <tr>
                      <th>Semana</th>
                      <th>LGBTQ+</th>
                      <th>Madre soltera</th>
                      <th>Migrante</th>
                      <th>Mujer en SVE</th>
                      <th>Ninguna de las anteriores</th>
                      <th>Persona retornada</th>
                      <th>Refugiado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminAcceptGroup?.matchesStatus?.map((info) => (
                      <tr className="bg-gray100 text-sm" key={info?.category}>
                        <td>{info?.category}</td>
                        <td>{info?.lgbtq}%</td>
                        <td>{info?.mother}%</td>
                        <td>{info?.migrant}%</td>
                        <td>{info?.woman}%</td>
                        <td>{info?.nomatch}%</td>
                        <td>{info?.returnedperson}%</td>
                        <td>{info?.refugee}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {range?.segment !== null &&
                range?.segment !== '0' &&
                adminAcceptGroup?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {!adminAcceptGroup?.matchesStatus?.length && (
                <p className="text-base">Ups, parece que no hay información acerca de esto</p>
              )}
            </div>
          )}
        </div>
        <div className="relative flex h-[500px] w-full flex-row items-center gap-4 rounded-lg bg-white">
          <div className="absolute right-4 top-2 z-10 flex w-max gap-x-2 rounded-full bg-purple">
            <p
              onClick={() => {
                setAdminRejectGroup({
                  ...adminRejectGroup,
                  activeTable: true,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                adminRejectGroup?.activeTable
                  ? 'rounded-l-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Tabla
            </p>
            <p
              onClick={() => {
                setAdminRejectGroup({
                  ...adminRejectGroup,
                  activeTable: false,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                !adminRejectGroup?.activeTable
                  ? 'rounded-r-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Gráfica
            </p>
          </div>
          {loadingAdminRejectGroup && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!adminRejectGroup?.activeTable && !loadingAdminRejectGroup && (
            <div className="flex h-full w-full flex-col">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches Admin Reject Group</p>
                </div>
              </div>
              <React.Suspense fallback="cargando...">
                {(range?.month === null || range?.month === '0') &&
                  (range?.segment === null || range?.segment === '0') && (
                    <DonutChart data={adminRejectGroup?.matchesStatus} />
                  )}
                {(range?.segment === null || range?.segment === '0') &&
                  range?.month !== null &&
                  range?.month !== '0' && (
                    <ClusteredColumn data={adminRejectGroup?.matchesStatus} seriesToMake={adminRejectGroup?.series} />
                  )}
                {range?.segment !== null && range?.segment !== '0' && (
                  <DonutChart data={adminRejectGroup?.matchesStatus} />
                )}
              </React.Suspense>
            </div>
          )}
          {adminRejectGroup?.activeTable && !loadingAdminRejectGroup && (
            <div className="flex h-full w-full flex-col items-center justify-center px-8">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches Admin Reject Group</p>
                </div>
              </div>
              {(range?.month === null || range?.month === '0') &&
                (range?.segment === null || range?.segment === '0') &&
                adminRejectGroup?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {(range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0' && (
                <table className="w-full table-auto text-center">
                  <thead className="bg-cream text-base">
                    <tr>
                      <th>Semana</th>
                      <th>LGBTQ+</th>
                      <th>Madre soltera</th>
                      <th>Migrante</th>
                      <th>Mujer en SVE</th>
                      <th>Ninguna de las anteriores</th>
                      <th>Persona retornada</th>
                      <th>Refugiado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminRejectGroup?.matchesStatus?.map((info) => (
                      <tr className="bg-gray100 text-sm" key={info?.category}>
                        <td>{info?.category}</td>
                        <td>{info?.lgbtq}%</td>
                        <td>{info?.mother}%</td>
                        <td>{info?.migrant}%</td>
                        <td>{info?.woman}%</td>
                        <td>{info?.nomatch}%</td>
                        <td>{info?.returnedperson}%</td>
                        <td>{info?.refugee}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {range?.segment !== null &&
                range?.segment !== '0' &&
                adminRejectGroup?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {!adminRejectGroup?.matchesStatus?.length && (
                <p className="text-base">Ups, parece que no hay información acerca de esto</p>
              )}
            </div>
          )}
        </div>
        <div className="relative flex h-[500px] w-full flex-row items-center gap-4 rounded-lg bg-white">
          <div className="absolute right-4 top-2 z-10 flex w-max gap-x-2 rounded-full bg-purple">
            <p
              onClick={() => {
                setUserAcceptGroup({
                  ...userAcceptGroup,
                  activeTable: true,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                userAcceptGroup?.activeTable
                  ? 'rounded-l-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Tabla
            </p>
            <p
              onClick={() => {
                setUserAcceptGroup({
                  ...userAcceptGroup,
                  activeTable: false,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                !userAcceptGroup?.activeTable
                  ? 'rounded-r-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Gráfica
            </p>
          </div>
          {loadingUserAcceptGroup && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!userAcceptGroup?.activeTable && !loadingUserAcceptGroup && (
            <div className="flex h-full w-full flex-col">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches User Accept Group</p>
                </div>
              </div>
              <React.Suspense fallback="cargando...">
                {(range?.month === null || range?.month === '0') &&
                  (range?.segment === null || range?.segment === '0') && (
                    <DonutChart data={userAcceptGroup?.matchesStatus} />
                  )}
                {(range?.segment === null || range?.segment === '0') &&
                  range?.month !== null &&
                  range?.month !== '0' && (
                    <ClusteredColumn data={userAcceptGroup?.matchesStatus} seriesToMake={userAcceptGroup?.series} />
                  )}
                {range?.segment !== null && range?.segment !== '0' && (
                  <DonutChart data={userAcceptGroup?.matchesStatus} />
                )}
              </React.Suspense>
            </div>
          )}
          {userAcceptGroup?.activeTable && !loadingUserAcceptGroup && (
            <div className="flex h-full w-full flex-col items-center justify-center px-8">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches User Accept Group</p>
                </div>
              </div>
              {(range?.month === null || range?.month === '0') &&
                (range?.segment === null || range?.segment === '0') &&
                userAcceptGroup?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {(range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0' && (
                <table className="w-full table-auto text-center">
                  <thead className="bg-cream text-base">
                    <tr>
                      <th>Semana</th>
                      <th>LGBTQ+</th>
                      <th>Madre soltera</th>
                      <th>Migrante</th>
                      <th>Mujer en SVE</th>
                      <th>Ninguna de las anteriores</th>
                      <th>Persona retornada</th>
                      <th>Refugiado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userAcceptGroup?.matchesStatus?.map((info) => (
                      <tr className="bg-gray100 text-sm" key={info?.category}>
                        <td>{info?.category}</td>
                        <td>{info?.lgbtq}%</td>
                        <td>{info?.mother}%</td>
                        <td>{info?.migrant}%</td>
                        <td>{info?.woman}%</td>
                        <td>{info?.nomatch}%</td>
                        <td>{info?.returnedperson}%</td>
                        <td>{info?.refugee}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {range?.segment !== null &&
                range?.segment !== '0' &&
                userAcceptGroup?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {!userAcceptGroup?.matchesStatus?.length && (
                <p className="text-base">Ups, parece que no hay información acerca de esto</p>
              )}
            </div>
          )}
        </div>
        <div className="relative flex h-[500px] w-full flex-row items-center gap-4 rounded-lg bg-white">
          <div className="absolute right-4 top-2 z-10 flex w-max gap-x-2 rounded-full bg-purple">
            <p
              onClick={() => {
                setUserRejectGroup({
                  ...userRejectGroup,
                  activeTable: true,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                userRejectGroup?.activeTable
                  ? 'rounded-l-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Tabla
            </p>
            <p
              onClick={() => {
                setUserRejectGroup({
                  ...userRejectGroup,
                  activeTable: false,
                  matchesStatus: [],
                  totalMatches: 0,
                });
              }}
              className={`cursor-pointer px-2 py-1 text-xs ${
                !userRejectGroup?.activeTable
                  ? 'rounded-r-full rounded-t-full bg-purple text-white'
                  : 'bg-white text-black'
              }`}
            >
              Gráfica
            </p>
          </div>
          {loadingUserRejectGroup && (
            <div className="flex h-full w-full items-center justify-center">
              <CircularProgress className="text-purple" />
            </div>
          )}
          {!userRejectGroup?.activeTable && !loadingUserRejectGroup && (
            <div className="flex h-full w-full flex-col">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches User Reject Group</p>
                </div>
              </div>
              <React.Suspense fallback="cargando...">
                {(range?.month === null || range?.month === '0') &&
                  (range?.segment === null || range?.segment === '0') && (
                    <DonutChart data={userRejectGroup?.matchesStatus} />
                  )}
                {(range?.segment === null || range?.segment === '0') &&
                  range?.month !== null &&
                  range?.month !== '0' && (
                    <ClusteredColumn data={userRejectGroup?.matchesStatus} seriesToMake={userRejectGroup?.series} />
                  )}
                {range?.segment !== null && range?.segment !== '0' && (
                  <DonutChart data={userRejectGroup?.matchesStatus} />
                )}
              </React.Suspense>
            </div>
          )}
          {userRejectGroup?.activeTable && !loadingUserRejectGroup && (
            <div className="flex h-full w-full flex-col items-center justify-center px-8">
              <div className="flex w-max flex-row items-center gap-4 self-start p-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-green-two p-2 2xl:h-20 2xl:w-20">
                  <BsPeople size={28} color="#FFF" />
                </div>
                <div>
                  <p className="text-base 2xl:text-xl">Matches User Reject Group</p>
                </div>
              </div>
              {(range?.month === null || range?.month === '0') &&
                (range?.segment === null || range?.segment === '0') &&
                userRejectGroup?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {(range?.segment === null || range?.segment === '0') && range?.month !== null && range?.month !== '0' && (
                <table className="w-full table-auto text-center">
                  <thead className="bg-cream text-base">
                    <tr>
                      <th>Semana</th>
                      <th>LGBTQ+</th>
                      <th>Madre soltera</th>
                      <th>Migrante</th>
                      <th>Mujer en SVE</th>
                      <th>Ninguna de las anteriores</th>
                      <th>Persona retornada</th>
                      <th>Refugiado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userRejectGroup?.matchesStatus?.map((info) => (
                      <tr className="bg-gray100 text-sm" key={info?.category}>
                        <td>{info?.category}</td>
                        <td>{info?.lgbtq}%</td>
                        <td>{info?.mother}%</td>
                        <td>{info?.migrant}%</td>
                        <td>{info?.woman}%</td>
                        <td>{info?.nomatch}%</td>
                        <td>{info?.returnedperson}%</td>
                        <td>{info?.refugee}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {range?.segment !== null &&
                range?.segment !== '0' &&
                userRejectGroup?.matchesStatus?.map((info) => (
                  <div className="flex w-full justify-between border-[1px] border-solid border-black px-8">
                    <p className="text-base font-medium">{info?.category}</p>
                    <p className="text-base font-light">{info?.percent}%</p>
                  </div>
                ))}
              {!userRejectGroup?.matchesStatus?.length && (
                <p className="text-base">Ups, parece que no hay información acerca de esto</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AlgorithmAnalytics;
