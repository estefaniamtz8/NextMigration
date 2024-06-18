import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import ModalBuilder, { ActionsModal } from '../../Elements/Modal';
import { FontsData } from '../../../styles/palette';
import logo from '../../../assets/intrareLogotipo.png';
import { fetchDataGetAsync, fetchDataPostAsync } from '../../../services/axios/fetchs';
import { sendPersonalizedWhatsApp } from '../../../services/messages';

function ModalPersonalizedMessage(args) {
  const { open, onClose, selectedUsers, setSelectedUsers } = args;

  const regex = /{{(.*?)}}/g;

  const [value, setValue] = useState('');

  const [templateName, setTemplateName] = useState('');

  const adminData = useSelector((state) => state?.admins?.me);

  const [section, setSection] = useState('personalized');

  const [templates, setTemplates] = useState([]);

  const [selectedTemplate, setSelectedTemplate] = useState({});

  const onSendPersonalizedWhatsapp = async () => {
    try {
      await sendPersonalizedWhatsApp({
        users: selectedUsers,
        message: value?.replace(/\n/g, ' '),
      });
      setValue('');
      onClose();
      setSelectedUsers([]);
      toast.success('Se han enviado los mensajes exitosamente.');
    } catch (e) {
      toast.error('Error en el servidor, favor de avisar al departamente de IT code: 501');
    }
  };

  const onSave = async () => {
    try {
      if (!templateName) {
        return toast.error('Es necesario un nombre de plantilla');
      }
      if (!value) {
        return toast.error('Es necesario agregar un mensaje personalizado');
      }
      if (templates?.find((templates) => templates.name === templateName)) {
        return toast.error('Ya hay una plantilla con este nombre, por favor coloca uno diferente');
      }
      if (templates?.find((templates) => templates.message === value)) {
        return toast.error(
          `Ya hay una plantilla con este mensaje, te invitamos a usarla. Nombre ${
            templates?.find((templates) => templates.message === value).name
          }`
        );
      }
      await fetchDataPostAsync('/aperture/user/saveTemplate', {
        data: { name: templateName, message: value, admin: adminData },
      });
      setTemplateName('');
      return toast.success('Se ha guardado con éxito la plantilla.');
    } catch (e) {
      return toast.error('Error en el servidor');
    }
  };

  useEffect(() => {
    setValue('');
    setTemplateName('');
    fetchDataGetAsync('/aperture/user/templates').then((data) => {
      setTemplates(data?.body?.templates || []);
    });
  }, [section]);

  return (
    <ModalBuilder
      open={open}
      onClose={onClose}
      isTitleCenter
      alignFooter="center"
      title="Enviar mensaje personalizado"
      width="60vw"
      height="70vh"
      autoHeigth
      styledTitle={{
        fontFamily: FontsData?.reg,
        fontSize: '1.6em',
      }}
    >
      <div className="flex flex-col gap-y-3">
        <div className="flex w-max gap-x-2 self-center rounded-full bg-purple">
          <p
            onClick={() => {
              setSection('personalized');
            }}
            className={`cursor-pointer px-2 py-1 text-sm ${
              section === 'personalized' ? 'rounded-l-full rounded-t-full bg-purple text-white' : 'bg-white text-black'
            }`}
          >
            Mensaje personalizado
          </p>
          <p
            onClick={() => {
              setSection('templates');
            }}
            className={`cursor-pointer px-2 py-1 text-sm ${
              section === 'templates' ? 'rounded-r-full rounded-t-full bg-purple text-white' : 'bg-white text-black'
            }`}
          >
            Plantillas
          </p>
        </div>
        {section === 'personalized' && (
          <div className="grid grid-cols-2 gap-4 px-8">
            <div className="flex w-full flex-col gap-y-3">
              <h1 className="font-sans font-medium">Mensaje personalizado</h1>
              <p className="text-sm ">Recuerda que tu mensaje no puede contener saltos de línea</p>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={6}
                placeholder="Aquí va tu mensaje personalizado"
                className="max-h-60 min-h-20 w-4/5 resize-none rounded-lg border-none bg-cream px-4 py-2 font-sans outline-none"
              />
              <div className="flex items-center gap-x-2">
                <input
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  type="text"
                  placeholder="Nombre de la plantilla"
                  className="ronuded-lg border-none bg-cream px-2 py-1.5 font-sans outline-none"
                />
                <button
                  className="w-max cursor-pointer rounded-lg border-none bg-purple px-2 py-1.5 text-white outline-none"
                  type="button"
                  onClick={onSave}
                >
                  Gurdar como plantilla
                </button>
              </div>
              <h1 className="font-sans font-medium">Variables disponibles</h1>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <p className="text-sm">
                  <b className="text-purple">{`{{names}}`}</b>: Nombre/s
                </p>
                <p className="text-sm">
                  <b className="text-purple">{`{{lastNames}}`}</b>: Apellidos
                </p>
                <p className="text-sm">
                  <b className="text-purple">{`{{email}}`}</b>: Email
                </p>
                <p className="text-sm">
                  <b className="text-purple">{`{{codePhone}}`}</b>: Lada
                </p>
                <p className="text-sm">
                  <b className="text-purple">{`{{phone}}`}</b>: Teléfono
                </p>
              </div>
              <h1 className="font-sans font-medium">Ejemplo de uso</h1>
              <div className="flex gap-x-2 gap-y-2">
                <p className="text-sm">{`Tu correo es {{email}}`}</p>
                <p className="text-sm">= Tu correo es luis@intrare.mx</p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-y-3">
              <h1 className="self-center font-sans font-medium">Preview</h1>
              <div>
                <div className="flex min-h-10 w-full items-center gap-x-3 rounded-t-lg bg-[#085F54] px-4 py-4">
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
                      <p className="w-full break-words text-left text-sm">¡Mucho éxito!</p>
                      <p className="text-right text-xs text-[#bbbbbb]">{new Date().toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {section === 'templates' && (
          <div className="grid grid-cols-2 gap-4 px-8">
            <div className="flex w-full flex-col gap-y-3">
              <h1 className="text-center font-sans font-medium">Plantillas</h1>
              <div className="flex flex-col items-center gap-y-2.5">
                {templates?.map((template) => (
                  <button
                    className={`w-3/4 cursor-pointer rounded-full py-2.5 outline-none ${
                      selectedTemplate?.name === template?.name
                        ? 'border-[2px] border-solid border-transparent bg-purple text-white'
                        : 'border-[2px] border-solid border-purple bg-white text-purple'
                    }`}
                    onClick={() => {
                      setSelectedTemplate(template);
                      setValue(template?.message);
                    }}
                    type="button"
                  >
                    {template?.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col gap-y-3">
              <h1 className="self-center font-sans font-medium">Preview</h1>
              <div>
                <div className="flex min-h-10 w-full items-center gap-x-3 rounded-t-lg bg-[#085F54] px-4 py-4">
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
        )}
      </div>
      <ActionsModal className="bg-purple">
        <button
          onClick={onClose}
          type="button"
          className="m-0 cursor-pointer rounded-lg border-none bg-pink px-[20px] py-[10px] text-base text-white outline-none"
        >
          Cancelar
        </button>
        <button
          className="m-0 cursor-pointer rounded-lg border-none bg-white px-[20px] py-[10px] text-base text-purple"
          type="button"
          onClick={onSendPersonalizedWhatsapp}
        >
          Enviar
        </button>
      </ActionsModal>
    </ModalBuilder>
  );
}

export default ModalPersonalizedMessage;
