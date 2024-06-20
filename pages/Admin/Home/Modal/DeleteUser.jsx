import { Next } from 'next'; 
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataPostAsync } from 'services/axios/fetchs';
import ModalBuilder, { ActionsModal } from 'components/Elements/Modal';
import toast from 'react-hot-toast';
import { FontsData } from '../../../../styles/palette';
import { setAdmins } from '../../../../redux/actions/admins_actions';
import { loader } from '../../../../redux/actions/loader_actions';

const DeleteUser = ({ open, onClose, userID, handleClose }) => {
  const [confirmationText, setConfirmationText] = useState('');
  const responsibleData = useSelector((state) => state.auth.user);
  const adminsRedux = useSelector((state) => state?.admins?.admins);
  const dispatch = useDispatch();

  const close = () => {
    handleClose();
    onClose();
    setConfirmationText('');
  };

  const handleConfirmationText = (e) => {
    setConfirmationText(e.target.value);
  };

  const handleDelete = async () => {
    if (confirmationText === 'Confirmar') {
      try {
        dispatch(loader(true));
        const response = await fetchDataPostAsync('/administrator/delete', {
          data: { userID, dataAdmin: responsibleData },
        });
        if (response?.success) {
          const newAdmins = adminsRedux.filter((item) => item.docID !== userID);
          dispatch(setAdmins(newAdmins));
          close();
          toast.success('Usuario eliminado');
        } else {
          toast.error('Ha ocurrido un error');
        }
        dispatch(loader(false));
      } catch (err) {
        dispatch(loader(false));
        toast.error('Ha ocurrido un error');
      }
    }
  };

  return (
    <ModalBuilder
      height="auto"
      width="40vw"
      title="Borrar Administrador"
      isTitleCenter
      open={open}
      onClose={onClose}
    >
      <h1 style={{ fontFamily: FontsData.light }}>
        Si se borra el usuario se eliminará toda la información permanentemente.
      </h1>
      <br />
      <h3 style={{ fontFamily: FontsData.light, fontSize: '2vh' }}>
        Para poder eliminar este usuario escribe "<em style={{ color: 'red' }}>Confirmar</em> " en el siguiente campo
      </h3>
      <br />
      <div>
        <input
          className="h-[calc(40px)] w-[30%] rounded-md border-[1px] border-solid border-gray300 bg-white px-4 py-2 font-sans"
          type="text"
          placeholder="Confirmar"
          onChange={handleConfirmationText}
          value={confirmationText}
        />
      </div>

      <ActionsModal>
        <button
          type="button"
          className="m-0 cursor-pointer rounded-lg border-transparent bg-purple px-[20px] py-[10px] text-base text-white outline-none"
          onClick={close}
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

export default DeleteUser;
