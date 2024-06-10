import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminData } from 'redux/actions/admins_actions';
import { urlBase } from 'utils/environment';

const useProtection = (Component) => {
  const WrappedComponent = (props) => <Component {...props} />;

  const ComponentWithPermissions = (props) => {
    const router = useRouter();
    const [requiredPermissions, setRequiredPermissions] = useState({
      companies: true,
      analytics: true,
      '': true,
      matchinghub: true,
      people: true,
      superUser: true,
    });

    const truePermissions = Object.keys(requiredPermissions)
      .filter((key) => requiredPermissions[key])
      .map((key) => `/${key}`);

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth?.user?.uid);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.post(
            '/administrator/administrators',
            {
              uidUser: userId,
            },
            { baseURL: urlBase }
          );

          if (response?.data?.body?.success) {
            const data = response?.data?.body?.administrator;
            dispatch(setAdminData(data));
            setRequiredPermissions({
              companies: data?.tablePermissions?.companyHub,
              analytics: data?.tablePermissions?.datalystics,
              '': data?.tablePermissions?.home,
              matchinghub: data?.tablePermissions?.matchingHub,
              people: data?.tablePermissions?.peopleHub,
              superUser: data?.tablePermissions?.superUser,
            });
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserData();

      if (!truePermissions.includes(router.pathname)) {
        router.push('/');
      }
    }, [router.pathname, dispatch, userId]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithPermissions;
};

export default useProtection;


//cambia useNavigate por useRouter
//cambia useLocation por router.pathname (ubi actual)
//router.push('/') por <Navigate to="/login" />