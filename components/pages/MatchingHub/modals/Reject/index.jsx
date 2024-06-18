import React from 'react';
import PropTypes from 'prop-types';

import REJECT_OPTIONS from './constants';
import ModalLayout from '../Layout';

function ModalReject(props) {
  const { open, onClose, onReject } = props;
  const [rejectReason, setRejectReason] = React.useState('');

  return (
    <ModalLayout
      open={open}
      onClose={onClose}
      title="MatchingHub Actions"
      actions={
        <div className="flex items-center justify-center gap-x-8">
          <button
            className="h-full w-max cursor-pointer border-0 border-none text-purple300"
            onClick={() => onClose()}
            type="button"
          >
            Quiero reconciderar
          </button>
          <button
            className="w-max cursor-pointer rounded-lg border-0 bg-pink px-6 py-2.5 text-white"
            onClick={() => onReject(rejectReason)}
            type="button"
          >
            Rechazar Candidato
          </button>
        </div>
      }
    >
      <div className="flex min-h-[500px] flex-col items-center gap-y-4 px-28 py-12">
        <h1 className="text-lg font-medium text-purple300">
          Comprendemos que no te gusto el candidato para la vacante, dinos - que no te gusto.{' '}
        </h1>
        <p className="text-sm text-purple300">
          Seleciona uno o vario opciones, importante notar que una vez que se rechaza no hay forma de revertir esta
          acción
        </p>
        <div className="flex w-full flex-col gap-y-4 pb-8 pt-2">
          {REJECT_OPTIONS.map((opt) => (
            <div
              key={opt.value}
              className={`cursor-pointer rounded-lg p-4 ${
                opt.value === rejectReason
                  ? 'border-[1px] border-solid border-transparent bg-pink'
                  : 'border-[1px] border-solid border-black'
              }`}
              onClick={() => setRejectReason(opt.value)}
            >
              <p className="text-sm text-black">{opt.label}</p>
            </div>
          ))}
        </div>
      </div>
    </ModalLayout>
  );
}

ModalReject.defaultProps = {
  open: false,
};

ModalReject.propTypes = {
  open: PropTypes.bool,
  onReject: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalReject;
