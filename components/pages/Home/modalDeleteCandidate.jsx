import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ModalBuilder, { ActionsModal } from '../../Elements/Modal';
import { FontsData } from '../../../styles/palette';
import { fetchDataPostAsync } from '../../../services/axios/fetchs';
import { loader } from '../../../redux/actions/loader_actions';
import { Version } from '../../../utils/environment';

const ModalDeleteCandidate = (args) => {
  const { open, onClose, candidate, setDataTable, handleClose, selectedUsers, setSelectedUsers } = args;
  const [confirmationText, setConfirmationText] = React.useState('');
  const responsibleData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  function close() {
    handleClose();
    onClose();
    setConfirmationText('');
  }

  const handleConfirmationText = (e) => {
    setConfirmationText(e.target.value);
  };

  function handleDelete() {
    if (confirmationText === 'Confirmar') {
      dispatch(loader(true));
      if (selectedUsers?.length > 0) {
        const data = {
          responsibleData: {
            userID: responsibleData.uid,
            email: responsibleData.email,
          },
          version: Version,
          selectedUsers,
        };
        fetchDataPostAsync('aperture/user/delete-candidates', data)
          .then((res) => {
            if (res?.success) {
              dispatch(loader(false));
              toast.success('Candidatos eliminados correctamente');
              setDataTable((prev) =>
                prev.filter((item) => !selectedUsers.some((user) => user?.userID === item.userID))
              );
              setSelectedUsers([]);
              close();
            } else {
              if (!res?.success) {
                toast.error(res.message);
              }
              dispatch(loader(false));
            }
          })
          .catch(() => {
            dispatch(loader(false));
            toast.error('Error al eliminar el candidato');
          });
      } else {
        const data = {
          responsibleData: {
            userID: responsibleData.uid,
            email: responsibleData.email,
          },
          candidateID: candidate.userID,
          version: Version,
        };
        fetchDataPostAsync('aperture/user/delete-candidate', data)
          .then((res) => {
            if (res?.success) {
              dispatch(loader(false));
              toast.success('Candidato eliminado correctamente');
              setDataTable((prev) => prev.filter((item) => item.userID !== res?.info?.deletedID));
              close();
            } else {
              if (!res?.success) toast.error(res.message);
              dispatch(loader(false));
            }
          })
          .catch(() => {
            dispatch(loader(false));
            toast.error('Error al eliminar el candidato');
          });
      }
    } else {
      toast.error('Agrega la palabra de confirmacion para continuar');
    }
  }

  return (
    <ModalBuilder width="40vw" title="Borrar Candidato" isTitleCenter open={open} onClose={onClose}>
      <h1 style={{ fontFamily: FontsData.light }}>
        Si se borra el candidato(s) se eliminara toda la informacion permanentemente
      </h1>
      <br />
      <h3 style={{ fontFamily: FontsData.light, fontSize: '2.5vh' }}>
        Para poder eliminar este candidato(s) escribe "<em style={{ color: 'red' }}>Confirmar</em>" en el siguiente campo
      </h3>
      <br />
      <div className="flex w-full flex-wrap gap-[20px]">
        <input
          className="h-[calc(40px)] w-[30%] rounded-md border-[1px] border-solid border-gray300 bg-white px-4 py-2 font-sans"
          type="text"
          placeholder="Confirmar"
          onChange={handleConfirmationText}
          style={{ width: '100%' }}
        />
      </div>

      <ActionsModal>
        <button
          type="button"
          className="m-0 cursor-pointer rounded-lg border-transparent bg-purple px-[20px] py-[10px] text-base text-white outline-none"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="m-0 cursor-pointer rounded-lg border-transparent bg-pink px-[20px] py-[10px] text-base text-white outline-none"
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </ActionsModal>
    </ModalBuilder>
  );
};

export default ModalDeleteCandidate;
