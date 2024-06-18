import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { ImArrowUp } from 'react-icons/im';
import toast from 'react-hot-toast';
import ModalBuilder, { ActionsModal } from '../../Elements/Modal';
import palette, { FontsData } from '../../../styles/palette';
import logo from '../../../assets/intrareLogotipo.png';
import { sendPersonalizedWhatsApp } from '../../../services/messages';

function ModalPersonalizedMessageLeads(args) {
  const { open, onClose } = args;

  const regex = /{{(.*?)}}/g;

  const [value, setValue] = useState('');

  const [selectedUsers, setSelectedUsers] = useState([]);

  const [file, setFile] = React.useState(null);
  const [dragging, setDragging] = React.useState(false);
  const dropFile = React.useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(event?.target?.files?.length ? event?.target?.files : null);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        // const worksheetName = 'Vacantes'
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const headers = jsonData[0];
        const modifiedHeaders = headers.map((header) => {
          let modifiedHeader = header.trim();
          modifiedHeader = modifiedHeader.replace(/["':]/g, '');
          modifiedHeader = modifiedHeader.replace(/\s+/g, ' ');
          return modifiedHeader;
        });

        const data = jsonData
          .slice(1)
          .map((row) => {
            const obj = {};
            modifiedHeaders.forEach((header, index) => {
              const cellValue = row[index];
              if (cellValue !== undefined && cellValue !== null && cellValue !== '') {
                obj[header] = cellValue;
              }
            });
            return obj;
          })
          .filter((obj) => Object.keys(obj).length > 0)
          .map((obj) => {
            const user = {
              names: obj.Nombre,
              phone: `+${obj.Celular}`,
            };
            return user;
          });
        setSelectedUsers(data);
        toast.success(`Se han detectado ${data?.length} usuarios`);
      } catch (error) {
        toast.error('Error al leer el archivo');
      }
    };

    if (file) {
      reader.readAsBinaryString(file);
    } else {
      toast.error('No se ha seleccionado ningún archivo.');
    }
  };

  const handleDragOver = (e) => {
    setDragging(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload({ target: { files: [file] } });
    }
    setDragging(false);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const onSendPersonalizedWhatsapp = async () => {
    try {
      await sendPersonalizedWhatsApp({
        users: selectedUsers,
        message: value?.replace(/\n/g, ' '),
      });
      setValue('');
      onClose();
      setFile(null);
      setSelectedUsers([]);
      toast.success('Se han enviado los mensajes exitosamente.');
    } catch (e) {
      toast.error('Error en el servidor, favor de avisar al departamente de IT code: 501');
    }
  };

  return (
    <ModalBuilder
      open={open}
      onClose={onClose}
      isTitleCenter
      alignFooter="center"
      title="Enviar mensaje personalizado a Leads"
      width="60vw"
      height="60vh"
      autoHeigth
      styledTitle={{
        fontFamily: FontsData?.reg,
        fontSize: '1.6em',
      }}
    >
      <div className="flex flex-col gap-y-3">
        <div className="grid grid-cols-2 gap-4 px-8">
          <div className="flex w-full flex-col gap-y-3">
            <h1 className="font-sans font-medium">Mensaje personalizado</h1>
            <p className="text-sm ">Recuerda que tu mensaje no puede contener saltos de línea</p>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={6}
              placeholder="Aquí va tu mensaje personalizado"
              className="min-h-20 max-h-60 w-4/5 resize-none rounded-lg border-none bg-cream px-4 py-2 font-sans outline-none"
            />
            <h1 className="font-sans font-medium">Importar usuario para leads</h1>
            <label
              htmlFor="leads"
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              ref={dropFile}
              className="relative m-auto flex h-10 w-full max-w-lg cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray100"
            >
              <div className="absolute cursor-pointer">
                {file === null ? (
                  <div className="flex items-center gap-2">
                    {dragging ? (
                      <>
                        <ImArrowUp size={30} color={palette.purple300} />
                        <span className="text-sm text-purple300">Suelta archivo</span>
                      </>
                    ) : (
                      <>
                        <ImArrowUp size={30} color={palette.purple300} />
                        <span className="text-sm text-purple300">Subir archivo</span>
                      </>
                    )}
                  </div>
                ) : (
                  <span className="text-center text-sm text-black">{file[0]?.name || file?.name}</span>
                )}
              </div>
            </label>
            <input
              onChange={handleFileUpload}
              id="leads"
              className="hidden"
              type="file"
              accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/csv"
            />
          </div>
          <div className="flex w-full flex-col gap-y-3">
            <h1 className="self-center font-sans font-medium">Preview</h1>
            <div>
              <div className="min-h-10 flex w-full items-center gap-x-3 rounded-t-lg bg-[#085F54] px-4 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                  <img src={logo} alt="logo" className="h-8 w-8 rounded-full" />
                </div>
                <p className="text-lg text-white">Intrare</p>
              </div>
              <div className="rounded-b-lg bg-[#F2EDE5] p-4">
                <div className="justify-end">
                  <div className="w-60 rounded-lg bg-white p-2">
                    <p className="w-full break-words text-left text-sm">Hola {selectedUsers[0]?.names}</p>
                    <br />
                    <p className="w-full break-words text-left text-sm">
                      {value.replace(regex, (match, variable) =>
                        selectedUsers[0][variable.trim()] !== undefined ? selectedUsers[0][variable.trim()] : ''
                      ) || 'Aquí va tu mensaje personalizado'}
                    </p>
                    <br />
                    <p className="w-full break-words text-left text-sm">¡Mucho éxito! El equipo de Intrare</p>
                    <p className="text-right text-xs text-[#bbbbbb]">{new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ActionsModal className="bg-purple">
        <button
          onClick={onClose}
          type="button"
          className="cursor-pointer rounded-lg border-none bg-pink px-[20px] py-[10px] text-base text-white outline-none"
        >
          Cancelar
        </button>
        <button
          className="cursor-pointer rounded-lg border-none bg-white px-[20px] py-[10px] text-base text-purple"
          type="button"
          onClick={onSendPersonalizedWhatsapp}
        >
          Enviar
        </button>
      </ActionsModal>
    </ModalBuilder>
  );
}

export default ModalPersonalizedMessageLeads;
