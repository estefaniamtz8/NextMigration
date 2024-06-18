import React from 'react';
import { MdClose } from "react-icons/md";

import { signOutMain } from 'services/firebase';
import { logout } from 'redux/actions/auth_actions';
import { useDispatch } from 'react-redux';
import ModalBuilder, { HeaderModal } from '../Elements/Modal';

const ModalSession = (args) => {
  const { open, onClose } = args;

  const dispatch = useDispatch();

  const onExit = async () => {
    await signOutMain();
    dispatch(logout());
  };

  return (
    <ModalBuilder open={open} height="30vh" withoutFooter autoWidth>
      <HeaderModal>
        <header className="relative grid h-[50px] grid-cols-[1fr_50px] rounded-t-md bg-light-four pl-[20px]">
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              margin: 'auto',
              cursor: 'pointer',
            }}
            onClick={onClose}
          >
            <MdClose size={25} color="#1F1F1F" />
          </div>
        </header>
      </HeaderModal>
      <main className="flex flex-col gap-[10px] px-[30px]">
        <h1 className="text-center font-sans text-base font-light"> ¿Seguro que quieres cerrar tu sesión? </h1>
        <section className="mx-auto my-[10px] flex w-[70%] flex-col gap-[10px]">
          <span
            className="flex w-auto cursor-pointer items-center justify-center gap-4 rounded-md bg-black px-4 py-2 font-sans text-base text-white"
            onClick={onExit}
          >
            Cerrar sesión
          </span>
          <span
            className="flex w-auto cursor-pointer items-center justify-center gap-4 rounded-md border-[1px] border-solid border-black bg-white px-4 py-2 font-sans text-base text-black"
            onClick={onClose}
          >
            Cancelar
          </span>
        </section>
      </main>
    </ModalBuilder>
  );
};

export default ModalSession;
