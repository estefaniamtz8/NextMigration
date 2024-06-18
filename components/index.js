import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import history from 'utils/history';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import themeSettings from 'theme';
import { onAuthStateChanged } from 'firebase/auth';
import { dbAuth } from 'services/firebase';
import { getUserData, isAdmin } from 'utils/functions/user';
import { Provider } from 'react-redux';
import configureStore from 'redux/reducers';
import { logout, setDataUser } from 'redux/actions/auth_actions';
import amusing from 'utils/constants/amusing.json';
import { CircularProgress, Stack, StyledEngineProvider, Typography } from '@mui/material';
import App from 'pages/App/App';

import './styles/index.css';

import '@progress/kendo-theme-default/dist/all.css';
import '@progress/kendo-react-pdf';

import 'assets/fonts/SofiaPro/SofiaProBoldAz.otf';
import 'assets/fonts/HelvFE Bold.ttf';
import 'assets/fonts/helvetica-bold.otf';
import 'assets/fonts/HelvLight Regular.ttf';
import 'assets/fonts/circular-std-medium-500.ttf';
import 'assets/tailwind.css';
import toast from 'react-hot-toast';
import { setDefaultOptions } from 'date-fns';
import { es } from 'date-fns/locale';

setDefaultOptions({ locale: es });

const theme = createTheme(themeSettings);

const store = configureStore();

const min = 1;
const max = 15;
const random = Math.floor(Math.random() * (+max - +min)) + +min;

const loading = (
  <Stack alignItems="center" justifyContent="center" spacing={2} width="100%" height="100%">
    <Typography variant="h4" textAlign="center" fontSize="2rem">
      {amusing.amusing[random]}
    </Typography>
    <CircularProgress />
  </Stack>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(loading);

function renderApp() {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter history={history}>
          <ThemeProvider theme={theme}>
            <StyledEngineProvider injectFirst>
              <App />
            </StyledEngineProvider>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

const callback = (user) => {
  if (user) {
    const hasCompany = isAdmin(user);
    const data = getUserData(user);
    store.dispatch(setDataUser(data));
    if (hasCompany) {
      if (history?.location?.pathname) {
        history.push(history?.location?.pathname);
      } else {
        history.push('/');
      }
    } else {
      store.dispatch(logout());
      history.push('/login');
      toast.error('Su usuario no tiene los permisos requeridos.');
    }
  }
  renderApp();
};

onAuthStateChanged(dbAuth, callback);
