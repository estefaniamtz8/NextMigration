import { useRouter } from 'next/router';
import { Stack, Container } from '@mui/material';
import { isExcludeRoute } from 'utils/functions/routes';
import Header from '@/components/Header'; // Cambia la ruta según la estructura de tu proyecto en Next.js

function MainContainer({ children, overflowY }) {
  const [showHeader, setShowHeader] = React.useState(true);

  const router = useRouter();

  React.useEffect(() => {
    const isExclude = isExcludeRoute(router.pathname);
    setShowHeader(!isExclude);
  }, [router.pathname]);

  return (
    <Stack width="100vw" height="100vh">
      {showHeader && <Header />}
      {!showHeader ? (
        children
      ) : (
        <Stack
          className="bg-light-four"
          sx={{
            position: 'relative',
            width: '100vw',
            height: '100%',
            padding: '0',
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 0,
              height: 300,
              width: '100%',
            },
          }}
        >
          <Container
            maxWidth="100vw"
            sx={{
              zIndex: 1,
              height: 'calc(100vh - 72px)',
              width: '100vw',
              padding: '0 !important ',
              ...(overflowY ? { overflowY: 'auto' } : {}),
            }}
          >
            {children}
          </Container>
        </Stack>
      )}
    </Stack>
  );
}

export default MainContainer;
