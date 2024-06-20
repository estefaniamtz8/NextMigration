import React, { useState } from 'react';
import Wrapper from 'components/Wrapper';
import InputElement from 'components/Elements/Input';
import { Button, Stack, Typography } from '@mui/material';
import Image from 'assets/Imagen 56.png';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import toast from 'react-hot-toast';
import { sendPasswordResetEmailMain } from '../../services/firebase';

function Login() {
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    email: '',
  });

  const [attempts, setAttempts] = useState(0);

  const onChange = React.useCallback(
    (e) =>
      setState((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      })),
    []
  );

  const goToBack = React.useCallback(() => {
    navigate(-1);
  }, []);

  const onSend = async () => {
    if (attempts > 3) {
      toast.error('Has pasado los intentos disponibles. Contacta al departamento de TI');
    } else {
      await sendPasswordResetEmailMain(state?.email);
      setAttempts((prevState) => prevState + 1);
      toast.success('Se ha mandado el correo');
    }
  };

  return (
    <Wrapper centerChildren paddingChildren={4} nameOfPage="Login" urlImage={Image}>
      <form>
        <Stack spacing={2} width="350px">
          <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer' }} onClick={goToBack}>
            <Stack>
              <IoMdArrowBack color="#FFF" size={30} />
            </Stack>
            <Typography variant="p" color="text.primary">
              Regresar
            </Typography>
          </Stack>
          <Typography variant="bold" sx={{ color: 'text.primary' }} fontSize="30px">
            Restablecer contraseña
          </Typography>
          <InputElement
            title="Correo electrónico empresarial"
            placeHolder="correo@empresa.io"
            value={state.email}
            onChange={onChange}
            name="email"
            type="email"
            isRequiredInTitle
            colorTitle="text.primary"
            colorInput="text.main"
          />

          <Button
            sx={{
              width: '100%',
              border: 2,
              borderColor: 'buttons.white.border',
              borderRadius: '8px',
              backgroundColor: 'buttons.white.background',
              color: 'buttons.white.color',
              mt: '40px !important',
            }}
            onClick={onSend}
          >
            Enviar correo de recuperación
          </Button>

          <Typography onClick={onSend} sx={{ color: 'text.orange', cursor: 'pointer' }} variant="p" textAlign="center">
            Reenviar correo
          </Typography>
        </Stack>
      </form>
    </Wrapper>
  );
}

export default Login;
