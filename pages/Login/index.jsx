import React from 'react';
import InputElement from 'components/Elements/Input';
import PasswordInputElement from 'components/Elements/PasswordInput';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { getAuthMain } from 'services/firebase';
import { getUserData, isAdmin } from 'utils/functions/user';
import { logout, setDataUser } from 'redux/actions/auth_actions';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import adminBg from '../../assets/admin-bg.png';

function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    email: '',
    password: '',
  });

  const onChange = React.useCallback(
    (e) =>
      setState((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
    []
  );

  const goToRecoveryPassword = React.useCallback(() => {
    router.push('/forgot-password');
  }, [router]);

  const tryLogin = () => {
    if (state.email && state.password) {
      getAuthMain(state.email, state.password)
        .then(({ user }) => {
          const hasCompany = isAdmin(user);
          const data = getUserData(user);
          dispatch(setDataUser(data));
          if (hasCompany) {
            router.push('/');
          } else {
            dispatch(logout());
            toast.error('Su usuario no tiene permisos para esta plataforma.');
            return;
          }
          toast.success('Credenciales correctas');
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/user-not-found':
              toast.error('Usuario no encontrado');
              break;
            case 'auth/wrong-password':
              toast.error('Contraseña incorrecta');
              break;
            case 'auth/invalid-email':
              toast.error('Email inválido');
              break;
            case 'auth/user-disabled':
              toast.error('Usuario deshabilitado');
              break;
            case 'auth/user-token-expired':
              toast.error('Token expirado');
              break;
            case 'auth/too-many-requests':
              toast.error('Demasiados intentos');
              break;
            default:
              toast.error('Error');
          }
        });
    } else {
      toast.error('Por favor ingrese un email y contraseña');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      tryLogin();
    }
  };

  return (
    <div className="relative h-[100vh] w-full bg-cream">
      <img className="absolute left-0 top-0 h-full w-full object-cover" src={adminBg} alt="" />
      <form className="absolute left-1/2 top-1/2 max-w-[500px] transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-cream p-8">
        <Stack spacing={2} width="350px">
          <h1 className="text-[30px] text-purple">Hola, de vuelta.</h1>
          <InputElement
            placeHolder="correo@empresa.io"
            value={state.email}
            onChange={onChange}
            name="email"
            type="email"
            className="rounded-full"
            colorTitle="text.primary"
            colorInput="text.main"
            onKeyPress={handleKeyDown}
          />
          <PasswordInputElement
            placeHolder="Escribe tu contraseña"
            value={state.password}
            onChange={onChange}
            name="password"
            colorTitle="#232323"
            colorInput="#232323"
            onKeyPress={handleKeyDown}
          />
          <h4 className="mt-4 text-center text-[12px]" onClick={goToRecoveryPassword}>
            Olvidé mi contraseña
          </h4>
          <div className="grid grid-cols-[100px_1fr_100px] items-center py-4">
            <div className="h-[1px] w-full bg-[#232323]" />
            <p className="text-center text-[18px]">O</p>
            <div className="h-[1px] w-full bg-[#232323]" />
          </div>
          <button
            type="button"
            onClick={tryLogin}
            className="w-full rounded-full bg-purple py-2 text-[16px] text-white"
          >
            Iniciar sesión
          </button>
        </Stack>
      </form>
    </div>
  );
}

export default Login;
