import React from 'react';
import Lottie from 'lottie-react';
import teamWork from 'assets/lotties/Teamwork.json';
import { Divider } from '@mui/material';
import Sidebar from '../Sidebar';
import CommonButton from '../../CommonButton';

const ConfirmSidebar = ({ showInvitation, handleSidebars, name, inviteToVacancies }) => {
  return (
    <Sidebar size="30%" sizeAlt="100%" open={showInvitation}>
      <div className="flex h-full flex-col justify-between px-6 pt-8 text-[black]">
        <h1 className="pb-12 text-xl font-medium text-black">
          Baia, que suerte la de {name}, antes de finalizar tenemos que confirmar
        </h1>
        <Divider className="-mx-6" />
        <div className="m-auto flex h-[55%] w-[60%] flex-col gap-4">
          <Lottie animationData={teamWork} className="h-56 w-56 self-center" />
          <div>
            <span className="text-base">Estás 100% seguro que quieres mandar estas invitaciones?</span>
            <p className="pt-2 font-founders text-sm text-black">
              Recuerda que al hacer esto se le notifica al usuario estas invitaciones, y que una vez hecho no se pueden
              eliminar dichas de su lista
            </p>
          </div>
        </div>
        <Divider className="-mx-6" />
        <div className="flex justify-around py-8">
          <button
            onClick={handleSidebars}
            className="cursor-pointer border-none bg-transparent text-purple300"
            type="button"
          >
            Quiero Reconsiderar
          </button>
          <CommonButton onClick={inviteToVacancies} width="12rem" text="Confirmo las invitaciones" />
        </div>
      </div>
    </Sidebar>
  );
};

export default ConfirmSidebar;
