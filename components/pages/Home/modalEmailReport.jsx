import React, { useState } from 'react';
import Modal, { HeaderModal } from 'components/Elements/Modal';
import { MdClose } from 'react-icons/md';
import toast from 'react-hot-toast';
import { fetchDataPostAsync } from '../../../services/axios/fetchs';

const ModalEmailReport = ({ open, onClosed }) => {
  const [email, setEmail] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchDataPostAsync(`/aperture/report/register`, { email });
      toast.success('Se enviará el reporte en un tiempo aproximado de 1 hora.');
      onClosed();
    } catch (error) {
      toast.error('Error al enviar el reporte');
    }
  };

  const onChangeInput = (e) => {
    setEmail(e.target.value);
  };

  return (
    <Modal
      open={open}
      withoutFooter
      style={{
        width: '45vw',
        height: 'auto',
      }}
    >
      <HeaderModal>
        <header className="grid h-[50px] grid-cols-[1fr_50px] rounded-l-md rounded-r-md bg-light-four">
          <h1 className="flex items-center justify-center text-[1.5em] font-light">Enviar Reporte</h1>
          <div className="m-auto cursor-pointer" onClick={onClosed}>
            <MdClose size={25} color="#1F1F1F" />
          </div>
        </header>
      </HeaderModal>

      <main className="flex h-[20vh] flex-wrap gap-x-[40px] gap-y-[10px] p-[10px]">
        <form className="flex w-full flex-col flex-wrap" onSubmit={onSubmit}>
          <label className="pb-2 text-[1.3em]" htmlFor="email">
            Email <em className="text-red"> * </em>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Escribe tu correo al cual recibirás el reporte."
            value={email}
            onChange={onChangeInput}
            className="w-full rounded-md border-none bg-gray100 px-3 py-3 font-sans text-sm outline-none"
            autoComplete="off"
            required
          />
          <div className="mt-4 flex w-full justify-center">
            <button className="cursor-pointer rounded-md border-none bg-purple px-5 py-2 text-white" type="submit">
              Enviar reporte
            </button>
          </div>
        </form>
      </main>
    </Modal>
  );
};

export default ModalEmailReport;
