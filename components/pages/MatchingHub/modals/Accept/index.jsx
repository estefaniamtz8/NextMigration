import React from 'react';
import PropTypes from 'prop-types';

import computerWithPen from 'assets/computer-with-pen.png';

import ModalLayout from '../Layout';

function ModalAccept(props) {
  const { open, onClose, onAccept } = props;

  return (
    <ModalLayout
      open={open}
      onClose={onClose}
      title="MatchingHub Actions"
      actions={
        <div className="flex items-center justify-center gap-x-8">
          <button
            className="h-full w-max cursor-pointer border-0 text-purple300"
            onClick={() => onClose()}
            type="button"
          >
            Quiero reconciderar
          </button>
          <button
            className="w-max cursor-pointer rounded-lg border-0 bg-green px-6 py-2.5 text-white"
            onClick={onAccept}
            type="button"
          >
            Aceptar vacante
          </button>
        </div>
      }
    >
      <div className="flex min-h-[500px] flex-col items-center gap-y-2 px-20 py-12">
        <h1 className="text-center text-lg font-medium text-purple300">
          Una vez aprobada la vacante, esta será enviada al usuario. ¿Deseas continuar?
        </h1>
        <img className="w-[220px]" src={computerWithPen} alt="computer-with-pen" />
      </div>
    </ModalLayout>
  );
}

ModalAccept.defaultProps = {
  open: false,
};

ModalAccept.propTypes = {
  open: PropTypes.bool,
  onAccept: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalAccept;
