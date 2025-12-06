import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginFormDynamic from '@components/auth/LoginFormDynamic';

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Limpiar parámetros de query por seguridad
    if (router.asPath !== '/auth/login' && Object.keys(router.query).length > 0) {
      router.replace('/auth/login', undefined, { shallow: false });
    }
  }, [router]);

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <LoginFormDynamic />
    </div>
  );
};

export default LoginPage;
