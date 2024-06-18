import React, { useState } from 'react';
import DefaultLogoIntrare from 'assets/intrareLogotipo.png';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from '@mui/material';
import toast from 'react-hot-toast';
import WatchVacancySidebar from './WatchVacancySidebar';
import ProgressBar from '../../../../MatchingHub/progressBar';
import { loader } from '../../../../../../redux/actions/loader_actions';
import { fetchDataPostAsync } from '../../../../../../services/axios/fetchs';
import { setUserLocalRedux } from '../../../../../../redux/actions/users_actions';
import ModalAccept from '../../../../MatchingHub/modals/Accept';
import ModalReject from '../../../../MatchingHub/modals/Reject';

const Job = (args) => {
  const { match, info, keyData } = args;
  const dispatch = useDispatch();
  const {
    users: { user: infoRedux },
  } = useSelector((rdx) => rdx);
  const [showVacancy, setShowVacancy] = useState(false);

  // confirmation modals
  const [confirmAccept, setConfirmAccept] = React.useState(false);
  const [confirmReject, setConfirmReject] = React.useState(false);
  function getLinearProgress(decimalNumber) {
    const percentage = decimalNumber * 100;
    return <ProgressBar bgcolor="#0DC599" height="1.2vh" progress={percentage} />;
  }

  const onMatchRedux = async (matchData) => {
    const newdataMatches = [];
    // const filterData = infoRedux?.matches?.filter((match) => match?.matchData?.matchID !== matchData?.matchID);

    // eslint-disable-next-line no-restricted-syntax
    for await (const match of infoRedux?.matches) {
      if (match?.matchData?.matchID === matchData?.matchID) {
        newdataMatches.push({
          ...match,
          matchData: {
            ...match?.matchData,
            ...matchData,
          },
        });
      }
      newdataMatches.push(match);
    }

    dispatch(
      setUserLocalRedux({
        ...infoRedux,
        matches: newdataMatches,
      })
    );
  };

  const onSubmitPostulation = async () => {
    dispatch(loader(true));
    const newData = {
      userID: info?.uid || info?.uidAuthFacebook,
      docID: match?.matchData?.matchID,
    };
    fetchDataPostAsync('/aperture/match/acceptMatch', { data: newData })
      .then(async (res) => {
        if (res.success) {
          toast.success('Se ha mandado al match al usuario');
          // NotificationManager.success('Se ha mandado al match al usuario', 'Exito', 5000);
        } else {
          toast.error('Error al enviar match');
        }
        await onMatchRedux(newData);
        dispatch(loader(false));
      })
      .catch(async () => {
        await onMatchRedux(newData);
        dispatch(loader(false));
        toast.error('Error al enviar match');
      });
    setConfirmAccept(false);
  };

  const onSubmitDislike = async () => {
    dispatch(loader(true));
    const newData = {
      docID: match?.matchData?.matchID,
    };
    fetchDataPostAsync('/aperture/match/rejectMatch', { data: newData })
      .then(async (res) => {
        if (res.success) {
          toast.success('Rechazo exitoso');
        } else {
          toast.error('Error al rechazar');
        }
        await onMatchRedux(newData);
        setTimeout(() => {
          dispatch(loader(false));
        }, 1000);
      })
      .catch(async () => {
        await onMatchRedux(newData);
        setTimeout(() => {
          dispatch(loader(false));
        }, 1000);
        toast.error('Error al rechazar');
      });
    setConfirmReject(false);
  };
  function getViewButton(status) {
    switch (status) {
      case 'disliked':
        return (
          <div className="flex justify-center">
            <p className="w-[14rem] rounded-full bg-pink px-10 py-2.5 text-center text-[12px] text-white">Rechazados</p>
          </div>
        );
      case 'postulation':
        return (
          <div className="flex justify-center">
            <p className="w-[14rem] rounded-full bg-purple px-10 py-2.5 text-center text-[12px] text-white">Aceptado</p>
          </div>
        );
      case 'sent_to_user':
        return (
          <div className="flex justify-center">
            <p className="w-[14rem] rounded-full bg-purple px-10 py-2.5 text-center text-[12px] text-white">
              Enviado al usuario
            </p>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex justify-center">
            <p className="w-[14rem] rounded-full bg-pink px-10 py-2.5 text-center text-[12px] text-white">Rechazado</p>
          </div>
        );
      case 'closed':
        return (
          <div className="flex justify-center">
            <p className="w-[14rem] rounded-full bg-pink px-10 py-2.5 text-center text-[12px] text-white">Cerrada</p>
          </div>
        );

      case 'active':
      default:
        return (
          <div className="flex justify-center gap-x-2">
            <button
              onClick={() => setConfirmReject(true)}
              className="w-[7rem] cursor-pointer rounded-full border-0 bg-pink px-2 py-2.5 text-center text-[12px] text-white"
              type="button"
            >
              Rechazar
            </button>
            <button
              onClick={() => setConfirmAccept(true)}
              className="w-[7rem] cursor-pointer rounded-full border-0 bg-purple px-2 py-2.5 text-center text-[12px] text-white"
              type="button"
            >
              Aceptar
            </button>
          </div>
        );
    }
  }

  return match ? (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-white px-4 py-4" key={keyData}>
      <div className="relative flex items-center gap-3">
        <div className="flex items-center gap-4">
          <img
            className="h-20 w-20 rounded-lg object-contain object-center"
            alt="Logo de la empresa"
            src={match?.company?.logo?.url || match?.company?.logo || DefaultLogoIntrare}
          />
          <div className="flex w-[90%] flex-col gap-y-1 pt-4">
            <h1 onClick={() => setShowVacancy(true)} className="w-64 cursor-pointer text-base font-medium">
              {match?.name}
            </h1>
            {match?.salary?.type === 'range' && (
              <p className="text-xs font-medium">
                ${match?.salary?.min} - ${match?.salary?.max}
              </p>
            )}
            {match?.salary?.type === 'exact' && <p className="text-xs font-medium">${match?.salary?.total || 0}</p>}
            {typeof match?.salary === 'number' && <p className="text-xs font-medium">${match?.salary || 0}</p>}
            <p>
              {/* Ubicación: {} */}
              {match?.['Zona de trabajo'] || typeof match?.location === 'string'
                ? match?.location
                : match?.location?.location || ''}
            </p>
            {match?.fit || match?.matchData?.fit ? (
              <div className="flex w-52 gap-2">
                <p>Fit:</p>
                {getLinearProgress(match?.fit || match?.matchData?.fit)}
                <p>{match?.fit || match?.matchData?.fit * 100}%</p>
              </div>
            ) : (
              <p className="absolute right-0 top-0 rounded-b-lg rounded-tr-lg bg-purple300 px-2 py-2 text-[12px] text-sm text-white">
                Invitacion
              </p>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 right-3 text-[0.8rem]">
          <span>Publicado hace {match?.createdAt ? dayjs().diff(dayjs(match?.createdAt), 'days') : '0'} días</span>
        </div>
      </div>
      <Divider className="-mx-4 pb-4" />
      {getViewButton(match?.matchData?.status || match?.invitationData?.status)}{' '}
      <WatchVacancySidebar showVacancy={showVacancy} setShowVacancy={setShowVacancy} match={match} />
      <ModalAccept
        open={confirmAccept}
        onClose={() => setConfirmAccept(false)}
        onAccept={() => onSubmitPostulation()}
      />
      <ModalReject open={confirmReject} onClose={() => setConfirmReject(false)} onReject={() => onSubmitDislike()} />
    </div>
  ) : null;
};

export default Job;
