import { useRouter } from 'next/router';
import Login from 'pages/Login';
import RecoveryPassword from 'pages/RecoveryPassword';
import ProtectedRoute from 'routes/protectedRoute';
import { CompanyComponent } from 'pages/App/components';
import { CreateWorkProvider } from 'context/createVacancy';
import { ConnectionsContextProvider } from 'context/connectionsContext';

const RoutesApp = () => {
  const router = useRouter();

  const requireAuthentication = (Component) => {
    
    const isAuthenticated = false; 
    if (!isAuthenticated) {
      router.push('/login');
      return null;
    }
    return Component;
  };

  return (
    <>
      <Route exact path="/forgot-password" component={RecoveryPassword} />
      <Route exact path="/login" component={Login} />
      <Route
        exact
        path="/"
        component={() => requireAuthentication(<HomeV2Lazy />)}
      />
      <Route
        exact
        path="/companies"
        component={() => requireAuthentication(
          <CreateWorkProvider>
            <CompanyComponent />
          </CreateWorkProvider>
        )}
      />
      
    </>
  );
};

export default RoutesApp;

//añadir las otras rutas e importaciones 