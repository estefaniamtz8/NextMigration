import React, { useEffect } from 'react';
import { Stack, CircularProgress } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import 'styles/fonts/index.css';
import Routes from 'routes';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { HomeContextProvider } from 'context/homeContext';
import Loader from 'components/Loader';
import { forceRefresh } from 'utils/functions/general';
import * as am5 from '@amcharts/amcharts5';

am5.addLicense('AM5C275131198');
am5.addLicense('AM5M275131350');

// Create a client
const queryClient = new QueryClient();

export default function App() {
  const router = useRouter();
  const auth = useSelector((state) => state.auth) || {};

  useEffect(() => {
    forceRefresh().then();
    if (router.pathname === '/') {
      if (!auth?.isAuthenticated) {
        router.push('/login');
      }
    }
  }, []);

  return (
    <Stack width="100vw" height="100%">
      <QueryClientProvider client={queryClient}>
        <HomeContextProvider>
          <Toaster
            toastOptions={{
              success: {
                style: {
                  fontSize: '14px',
                  background: '#c1eaba',
                },
              },
              error: {
                style: {
                  fontSize: '14px',
                  background: '#ffdfd4',
                },
              },
            }}
          />
          <Suspense
            fallback={
              <Stack position="relative" justifyContent="center" alignItems="center" width="100%" height="100vh">
                <CircularProgress color="primary" />
              </Stack>
            }
          >
            <Routes />
            <Loader />
          </Suspense>
        </HomeContextProvider>
      </QueryClientProvider>
    </Stack>
  );
}
