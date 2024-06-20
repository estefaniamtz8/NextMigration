import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import ModalBuilder from 'components/Elements/Modal';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { yupResolver } from '@hookform/resolvers/yup';
import { fetchDataPostAsync } from 'services/axios/fetchs';
import CommonSwitch from 'pages/Admin/Switch/CommonSwitch';
import { Divider, FormControlLabel, FormGroup, MenuItem, Select } from '@mui/material';
import PhoneElement from 'components/Elements/PhoneInput';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { loader } from '../../../../redux/actions/loader_actions';
import { setAdmins } from '../../../../redux/actions/admins_actions';

const addUserSchema = yup.object().shape({
  email: yup
    .string()
    .email('Por favor, ingresa un correo electrónico válido')
    .required('El correo electrónico es requerido'),
  names: yup.string().required('Por favor, ingresa tu nombre'),
  permissions: yup.string().required('Selecciona un permiso'),
  phone: yup.object().shape({
    code: yup.number('Por favor, ingresa código de país válido').required('Ingresa el código de país'),
    number: yup.number().required('Ingresa tu número de teléfono'),
  }),
  tablePermissions: yup.object().shape({
    companyHub: yup.boolean().default(false),
    datalystics: yup.boolean().default(false),
    home: yup.boolean().default(false),
    matchingHub: yup.boolean().default(false),
    peopleHub: yup.boolean().default(false),
    superUser: yup.boolean().default(false),
  }),
  type: yup.string().required('Selecciona el tipo de usuario'),
  password: yup.string().required('Ingresa una contraseña'),
});

const WatchPermissions = ({ openModalCandidate, setOpenModalCandidate }) => {
  const Admins = useSelector((state) => state?.admins?.admins || []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(addUserSchema),
  });
  const [phoneField, setFieldPhone] = useState({
    codePhone: '',
    phone: '',
  });
  const dispatch = useDispatch();

  function onChangeInput({ target }) {
    const { value, name } = target;
    setFieldPhone((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    setValue('phone.code', phoneField.codePhone);
    setValue('phone.number', phoneField.phone);
  }, [phoneField.codePhone, phoneField.phone]);

  const onSubmit = async (data) => {
    dispatch(loader(true));
    switch (data?.permissions) {
      case 'Admin':
        data.tablePermissions = {
          companyHub: true,
          datalystics: true,
          home: true,
          matchingHub: true,
          peopleHub: true,
          superUser: true,
        };
        break;
      case 'Basic':
        data.tablePermissions = {
          companyHub: true,
          datalystics: true,
          home: true,
          matchingHub: true,
          peopleHub: true,
          superUser: true,
        };
        break;
      case 'Custom':
        break;
      default:
        data.tablePermissions = {
          companyHub: false,
          datalystics: false,
          home: false,
          matchingHub: false,
          peopleHub: false,
          superUser: false,
        };
        break;
    }
    try {
      const { success, data: dataResponse } = await fetchDataPostAsync('administrator', { data });
      if (success) {
        dispatch(loader(false));
        dispatch(setAdmins([...Admins, dataResponse]));
        setOpenModalCandidate(false);
        toast.success('Usuario creado correctamente');
      } else {
        dispatch(loader(false));
        toast.error('Ha ocurrido un error');
      }
    } catch (error) {
      dispatch(loader(false));
      toast.error('Ha ocurrido un error');
      setOpenModalCandidate(false);
    }
  };

  const [views] = useState([
    {
      label: 'Home',
      checked: false,
      value: 'home',
      description: 'Allow View',
    },
    {
      label: 'PeopleHub',
      checked: false,
      value: 'peopleHub',
      description: 'Allow view',
    },
    {
      label: 'Datalytics',
      checked: false,
      value: 'datalystics',
      description: 'Allow view',
    },
    {
      label: 'CompanyHub',
      checked: false,
      value: 'companyHub',
      description: 'Allow view',
    },
    {
      label: 'MatchingHub',
      checked: false,
      value: 'matchingHub',
      description: 'Allow view',
    },
    {
      label: 'Super User',
      checked: false,
      value: 'superUser',
      description: 'Allow Delete',
    },
  ]);

  return (
    <ModalBuilder open={openModalCandidate} height="auto" width="46rem" noHeader withoutFooter>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 px-3 py-4">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-medium 2xl:text-2xl">Agregar a un nuevo usuario</h1>
            <MdClose className="cursor-pointer" onClick={() => setOpenModalCandidate(false)} size={20} />
          </div>
          <div className="flex flex-wrap justify-between">
            <div className="flex w-1/2 flex-col justify-between gap-2 text-black">
              <label className="text-sm" htmlFor="names">
                Nombres
              </label>
              <input
                {...register('names')}
                className="h-[3rem] rounded-lg border-none bg-cream pl-4 font-sans"
                id="names"
                type="text"
              />
              <p>{errors.names?.message}</p>
            </div>
            <div className="flex w-[43%] flex-col justify-between gap-2 text-black">
              <label className="text-sm" htmlFor="types">
                Tipo
              </label>
              <Select
                sx={{
                  background: '#f9f7ed',
                  width: '100%',
                }}
                className="rounded-lg"
                id="type"
                {...register('type')}
              >
                <MenuItem value="External user">External user</MenuItem>
                <MenuItem value="Internal user">Internal user</MenuItem>
              </Select>
              <p>{errors.type?.message}</p>
            </div>
            <div className="flex w-1/2 flex-col justify-between gap-2 text-black">
              <label className="text-sm" htmlFor="email">
                Correo
              </label>
              <input
                {...register('email')}
                className="h-[3rem] rounded-lg border-none bg-cream pl-4 font-sans"
                id="email"
                type="email"
              />
              <p>{errors.email?.message}</p>
            </div>
            <div className="flex w-[43%] flex-col justify-between gap-2 text-black">
              <label className="text-sm" htmlFor="password">
                Password
              </label>
              <input
                {...register('password')}
                className="h-[3rem] rounded-lg border-none bg-cream pl-4 font-sans"
                id="password"
                type="password"
              />
              <p>{errors.password?.message}</p>
            </div>
            <div id="phoneCode" className="flex w-1/2 flex-col justify-between gap-2 text-black">
              <label className="text-sm" htmlFor="phone">
                Teléfono
              </label>
              <div id="div-phone">
                <PhoneElement
                  styledInput={{
                    padding: '0',
                    width: '100%',
                    '& input': {
                      padding: '0',
                      height: '3rem!important',
                      backgroundColor: '#F9F7ED',
                      borderRadius: '10px',
                    },
                    '& .MuiInputBase-root': {
                      padding: '0',
                      width: '100%',
                    },
                  }}
                  styledSelect={{
                    width: '10rem',
                    '& input': {
                      height: '2.5rem!important',
                      borderRadius: '7px',
                      paddingLeft: '1rem!important',
                    },
                    '& .MuiInput-root': {
                      padding: '0',
                    },
                  }}
                  autoComplete="on"
                  name="phone"
                  onChange={onChangeInput}
                  onChangeCode={(args) => {
                    const { codeCountry, iso2 } = args;
                    setFieldPhone((prev) => ({ ...prev, codePhone: codeCountry, iso2 }));
                  }}
                  valueCode={phoneField.codePhone}
                  value={phoneField.phone}
                  backgroundInput="#F9F7ED"
                />
                <p>{errors.phone?.number?.message || errors.phone?.code?.message}</p>
              </div>
            </div>
            <div className="w-full pb-2 pt-4">
              <div className="flex w-1/2 flex-col justify-between gap-2 text-black">
                <label className="text-sm" htmlFor="permissions">
                  Permisos
                </label>
                <div>
                  <Select
                    sx={{
                      background: '#f9f7ed',
                      width: '100%',
                    }}
                    className="rounded-lg"
                    id="permissions"
                    {...register('permissions')}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Basic">Basic</MenuItem>
                    <MenuItem value="Custom">Custom</MenuItem>
                  </Select>
                  <p>{errors.permissions?.message}</p>
                </div>
              </div>
            </div>
          </div>
          {watch('permissions') === 'Custom' && (
            <FormGroup
              sx={{
                flexDirection: 'row',
              }}
            >
              {views.map((item) => (
                <div key={item.label} className="flex flex-col">
                  <label className="text-xs font-medium">{item.label}</label>
                  <FormControlLabel
                    control={<CommonSwitch {...register(`tablePermissions.${item.value}`)} defaultChecked />}
                    label={item.description}
                  />
                </div>
              ))}
              <p>{errors.tablePermissions?.message}</p>
            </FormGroup>
          )}
        </div>
        <Divider className="-mx-2" />
        <div className="flex items-center justify-center pb-6 pt-4">
          <button className="w-max cursor-pointer rounded-lg border-none bg-purple px-10 py-3 text-white" type="submit">
            Crear usuario
          </button>
        </div>
      </form>
    </ModalBuilder>
  );
};

export default WatchPermissions;
