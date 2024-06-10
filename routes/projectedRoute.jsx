import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function RequireAuth({ children }) {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!auth.user) {
      router.replace('/login');
    }
  }, [auth.user, router]);

  return auth.user ? children : null;
}

export default RequireAuth;

//react-router-dom especifico de react