import React from 'react';
import { useHome } from 'context/homeContext';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { loader } from 'redux/actions/loader_actions';
// eslint-disable-next-line no-unused-vars
import { fetchDataPatchAsync } from 'services/axios/fetchs';
// eslint-disable-next-line no-unused-vars
import { MdClose } from 'react-icons/md';
import { FormControlLabel, Radio } from '@mui/material';
import Constants from 'utils/constants/user.json';
import toast from 'react-hot-toast';
import Sidebar from '../Sidebar';
import CommonButton from '../../CommonButton';
import Language from './Language';
import Gender from './Gender';
import OriginCountry from './OriginCountry';
import Grade from './Grade';
import Address from './Addres';
import CivilState from './CivilState';
import TimeToTranslate from './TimeToTranslate';
import EditLaboralExperience from './LaboralExperience';
import Preferences from './Preferences';
import EconomicExp from './EconomicExp';
import { setUserLocalRedux, setUsersRedux } from '../../../../../../redux/actions/users_actions';
import EconomicDependents from './EconomicDependents';
import palette from '../../../../../../styles/palette';

const EditProfile = (args) => {
  const { showDetails, setShowDetails, tabValue } = args;
  const {
    users: { user: data },
  } = useSelector((state) => state);
  const { users } = useSelector((state) => state);
  const [infoLocal, setInfoLocal] = React.useState(data || {});
  // eslint-disable-next-line no-unused-vars
  const [valuesHeader, setValuesHeader] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [editHeader, setEditHeader] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const { updateUser } = useHome();
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  function onChangeInput({ target }) {
    const { value, name } = target;
    setValuesHeader((prev) => ({
      ...prev,
      [name]: value,
    }));
    setInfoLocal((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onChangeBirth(event) {
    const { value } = event.target;
    const date = value;
    setInfoLocal((prev) => ({
      ...prev,
      dataToAdmin: {
        ...prev?.dataToAdmin,
        birth: date,
      },
    }));
  }

  function onChangeComarDate(event) {
    const { value } = event.target;
    const date = value;
    setInfoLocal((prev) => ({
      ...prev,
      partial: false,
      resident: false,
      dataToAdmin: {
        ...prev?.dataToAdmin,
        dateRequestComar: date,
      },
    }));
  }
  async function onUpdateInit() {
    try {
      dispatch(loader(true));
      const newData = {
        ...infoLocal,
        dataToAdmin: {
          ...infoLocal?.dataToAdmin,
        },
      };
      delete newData?.documents;
      delete newData?.matches;
      delete newData?.documentsFiles;
      delete newData?.invitations;

      const response = await fetchDataPatchAsync('aperture/user/second', { data: newData });
      if (response?.success) {
        dispatch(loader(false));
        dispatch(
          setUserLocalRedux({
            ...data,
            ...newData,
          })
        );
        const updateUsers = users?.usersGeneral?.map((user) => {
          if (user?.userID === data?.uid) {
            return {
              ...user,
              ...data,
              ...newData,
              address: newData?.address?.address,
            };
          }
          return user;
        });
        dispatch(setUsersRedux(updateUsers));
        toast.success('Datos actualizados correctamente');
        setShowDetails(false);
      } else toast.error('Error al actualizar los datos');
    } catch {
      // console.log(error);
      toast.error('Error al actualizar los datos');
    }
  }
  React.useEffect(() => {
    setInfoLocal({
      ...data,
      dataToAdmin: {
        ...data?.dataToAdmin,
      },
    });
  }, [data]);

  const birthDayFormated =
    infoLocal?.dataToAdmin?.birth && new Date(infoLocal?.dataToAdmin?.birth)?.toISOString().slice(0, 10);

  const comarDate =
    infoLocal?.dataToAdmin?.dateRequestComar &&
    new Date(infoLocal?.dataToAdmin?.dateRequestComar)?.toISOString().slice(0, 10);

  /*  const newJobs = [
      {
        label: 'Job',
        year: '1',
        month: '3'
      },
      {
        label: 'Job',
        year: '1',
        month: '3'
      }
    ] */
  return (
    <Sidebar size="auto" open={showDetails && tabValue === 0}>
      <div className="flex h-full w-[35rem] flex-col justify-between gap-4 overflow-auto p-8">
        {/* Info basica */}
        <div className="relative">
          <MdClose
            onClick={() => setShowDetails(false)}
            size={20}
            className="absolute right-0 top-2 cursor-pointer text-black"
          />
          <h1 className="text-lg font-medium text-purple300 2xl:text-xl">Información básica</h1>
          <div className="flex flex-wrap justify-between gap-2 gap-y-4 pt-4">
            <div className="flex w-[45%] flex-col justify-between gap-2">
              <label className="text-sm text-black" htmlFor="names">
                Nombres
              </label>
              <input
                className="w-full rounded-lg border-0 bg-cream px-3 py-4 font-sans text-sm"
                type="text"
                value={infoLocal?.names}
                name="names"
                onChange={onChangeInput}
              />
            </div>
            <div className="flex w-[45%] flex-col justify-between gap-2">
              <label className="text-sm text-black" htmlFor="lastNames">
                Apellidos
              </label>
              <input
                className="w-full rounded-lg border-0 bg-cream px-3 py-4 font-sans text-sm"
                id="lastNames"
                name="lastNames"
                value={infoLocal?.lastNames}
                onChange={onChangeInput}
              />
            </div>
            <div className="flex w-[45%] flex-col justify-between gap-2">
              <label className="text-sm text-black" htmlFor="wp">
                Número de WhatsApp
              </label>
              <input
                className="w-full rounded-lg border-0 bg-cream px-3 py-4 disabled:font-sans disabled:text-sm disabled:font-medium disabled:text-black"
                id="wp"
                disabled
                value={infoLocal?.phone}
              />
            </div>
            <div className="flex w-[45%] flex-col justify-between gap-2">
              <label className="text-sm text-black" htmlFor="birth">
                Fecha de nacimiento
              </label>
              <input
                className="w-full rounded-lg border-0 bg-cream px-3 py-4 font-sans text-sm disabled:font-sans disabled:text-sm"
                id="birth"
                name="birth"
                type="date"
                value={birthDayFormated}
                onChange={onChangeBirth}
              />
            </div>
            <div className="flex w-[45%] flex-col justify-between gap-2">
              <label className="text-sm text-black" htmlFor="gender">
                Género
              </label>
              <Gender state={infoLocal} setState={setInfoLocal} />
            </div>
          </div>
        </div>

        {/*  */}
        <div>
          <h1 className="text-lg font-medium text-purple300 2xl:text-xl">Información personal</h1>
          <div className="flex flex-wrap justify-between gap-2 gap-y-4 pt-4">
            <div className="flex w-[45%] flex-col justify-between gap-2">
              <label className="text-sm text-black" htmlFor="origin">
                País de origen
              </label>
              <OriginCountry state={infoLocal} setState={setInfoLocal} />
            </div>
            <div className="flex w-[45%] flex-col justify-between gap-2">
              <label className="text-sm text-black" htmlFor="grade">
                Estudios
              </label>
              <Grade state={infoLocal} setState={setInfoLocal} />
            </div>
            <div className="flex w-full flex-col justify-between gap-2 text-black">
              <label className="text-sm text-black" htmlFor="address">
                Dirección
              </label>
              <Address state={infoLocal} setState={setInfoLocal} />
            </div>
            <div className="flex w-full flex-col justify-between gap-2 text-black">
              <label htmlFor="relationOnMe">Dependientes económicos</label>
              <EconomicDependents state={infoLocal} setState={setInfoLocal} />
            </div>
            <div className="flex w-[45%] flex-col justify-between gap-2">
              <label className="text-sm text-black" id="civilState" htmlFor="wp">
                Estado civil
              </label>
              <CivilState state={infoLocal} setState={setInfoLocal} />
            </div>
          </div>
        </div>

        {/*  */}
        <div>
          <h1 className="text-lg font-medium text-purple300 2xl:text-xl">Información laboral</h1>
          <div className="flex flex-wrap justify-between gap-2 gap-y-2 pt-4">
            <div className="flex w-full flex-col justify-between gap-2">
              <label className="text-sm text-black" htmlFor="laboralExp">
                Experiencia laboral
              </label>
              <EditLaboralExperience state={infoLocal} setState={setInfoLocal} />
            </div>
            {/* <InputWithLabel style={{ width: '100%' }}> */}
            {/*  <label htmlFor="skills">Habilidades duras</label> */}
            {/*  <HardSkills state={infoLocal} setState={setInfoLocal} /> */}
            {/* </InputWithLabel> */}
            <div className="flex w-full flex-col justify-between gap-2">
              <label className="text-sm text-black" htmlFor="language">
                Idiomas
              </label>
              <Language languages={Constants?.languages} setState={setInfoLocal} state={infoLocal} />
            </div>
            <div className="flex w-full flex-col justify-between gap-2">
              <label className="text-sm text-black" htmlFor="preferences">
                Preferencias laborales
              </label>
              <Preferences state={infoLocal} setState={setInfoLocal} />
            </div>
            <div className="flex w-[45%] flex-col justify-between gap-2">
              <label className="text-sm text-black" htmlFor="timeToTranslate">
                Tiempo de traslado
              </label>
              <TimeToTranslate state={infoLocal} value={infoLocal?.dataToAdmin?.translate} setState={setInfoLocal} />
            </div>
            <div className="flex w-[45%] flex-col justify-between gap-2">
              <label className="text-sm text-black" htmlFor="economicExp">
                Espectativa económica
              </label>
              <EconomicExp state={infoLocal} setState={setInfoLocal} />
            </div>
          </div>
          {(data?.dataToAdmin?.belongingToCommunity?.includes('Refugiado') ||
            data?.dataToAdmin?.belongingToCommunity?.includes('Migrante')) && (
            <div className="pt-4">
              <h1 className="text-lg font-medium text-purple300 2xl:text-xl">Información migratoria</h1>
              <div className="flex flex-wrap justify-between gap-2 gap-y-2 pt-4">
                <div className="w-full">
                  <p className="text-sm text-black">¿Tiene residencia permanente?</p>
                  <FormControlLabel
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        color: 'black',
                        fontSize: '14px',
                      },
                      '& .MuiSvgIcon-root': {
                        color: palette.violet,
                      },
                    }}
                    onChange={() => {
                      setInfoLocal({
                        ...infoLocal,
                        resident: true,
                        partial: false,
                        dataToAdmin: {
                          ...infoLocal?.dataToAdmin,
                          dateRequestComar: null,
                        },
                      });
                    }}
                    checked={
                      infoLocal?.resident !== undefined
                        ? infoLocal?.resident === true
                        : infoLocal?.documents?.hasDocuments?.details?.resident === true
                    }
                    value="si"
                    control={<Radio />}
                    label="Sí"
                  />
                  <FormControlLabel
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        color: 'black',
                        fontSize: '14px',
                      },
                      '& .MuiSvgIcon-root': {
                        color: palette.violet,
                      },
                    }}
                    onChange={() => {
                      setInfoLocal({
                        ...infoLocal,
                        resident: false,
                        partial: false,
                        dataToAdmin: {
                          ...infoLocal?.dataToAdmin,
                          dateRequestComar: null,
                        },
                      });
                    }}
                    checked={
                      infoLocal?.resident !== undefined
                        ? !infoLocal?.resident === true
                        : !infoLocal?.documents?.hasDocuments?.details?.resident === true
                    }
                    value="no"
                    control={<Radio />}
                    label="No"
                  />
                </div>
                <div className="w-full">
                  <p className="text-sm text-black">¿Tiene TRVH?</p>
                  <FormControlLabel
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        color: 'black',
                        fontSize: '14px',
                      },
                      '& .MuiSvgIcon-root': {
                        color: palette.violet,
                      },
                    }}
                    onChange={() => {
                      setInfoLocal({
                        ...infoLocal,
                        resident: false,
                        partial: true,
                        dataToAdmin: {
                          ...infoLocal?.dataToAdmin,
                          dateRequestComar: null,
                        },
                      });
                    }}
                    checked={
                      infoLocal?.partial !== undefined
                        ? infoLocal?.partial === true
                        : infoLocal?.documents?.hasDocuments?.details?.partial === true
                    }
                    value="si"
                    control={<Radio />}
                    label="Sí"
                  />
                  <FormControlLabel
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        color: 'black',
                        fontSize: '14px',
                      },
                      '& .MuiSvgIcon-root': {
                        color: palette.violet,
                      },
                    }}
                    onChange={() => {
                      setInfoLocal({
                        ...infoLocal,
                        resident: false,
                        partial: false,
                        dataToAdmin: {
                          ...infoLocal?.dataToAdmin,
                          dateRequestComar: null,
                        },
                      });
                    }}
                    checked={
                      infoLocal?.partial !== undefined
                        ? !infoLocal?.partial === true
                        : !infoLocal?.documents?.hasDocuments?.details?.partial === true
                    }
                    value="no"
                    control={<Radio />}
                    label="No"
                  />
                </div>
                <div className="w-full">
                  <p className="text-sm text-black">Fecha de cita COMAR</p>
                  <input
                    className="w-full rounded-lg border-0 bg-cream px-3 py-4 font-sans text-sm disabled:font-sans disabled:text-sm"
                    id="comar"
                    name="comar"
                    type="date"
                    value={comarDate}
                    onChange={onChangeComarDate}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {/*  */}
        {/* <div style={{ fontSize: '14px' }}> */}
        {/*  <h1 style={{ color: palette.purple300, marginBottom: '1rem' }}>Información migratoria</h1> */}
        {/*  <div className="flex flex-wrap justify-between gap-2"> */}
        {/*    <MigrationInfo /> */}
        {/*  </div> */}
        {/* </div> */}
        <div className="flex justify-between p-4">
          <button
            className="cursor-pointer border-none bg-[transparent] text-purple"
            type="button"
            onClick={() => setShowDetails(false)}
          >
            Cancelar actualización
          </button>
          <CommonButton onClick={onUpdateInit} text="Confirmar y Guardar" />
        </div>
      </div>
    </Sidebar>
  );
};

export default EditProfile;
