import dynamic from 'next/dynamic';

const RegisterFormComponent = dynamic(() => import('./RegisterForm'), {
  loading: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <p>Cargando...</p>
    </div>
  ),
  ssr: false,
});

export default RegisterFormComponent;
