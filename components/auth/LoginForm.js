import { useState, useEffect } from 'react';
import { Form, Button, Spin, Alert, Card, Divider, Space } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { loginResolver } from '@validations/auth';
import { useRouter } from 'next/router';
import authService from '@services/auth.service';
import { TextInput, PasswordInput } from '@components/ui/common';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: loginResolver,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    console.log('[LoginForm] Submitting with:', data);

    try {
      const result = await authService.login(data.email, data.password);
      console.log('[LoginForm] Auth result:', result);

      if (result.ok) {
        console.log('[LoginForm] Login successful, redirecting to dashboard');
        // La cookie se configura automáticamente en el servidor (httpOnly)
        router.push('/dashboard');
      } else {
        console.log('[LoginForm] Login failed:', result.error);
        setError(result.error || 'Credenciales inválidas');
      }
    } catch (err) {
      console.error('[LoginForm] Exception:', err);
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 20px',
        minHeight: '100vh',
      }}
    >
      {!isClient ? (
        <Card style={{ width: '100%', maxWidth: '450px' }}>
          <div
            style={{
              textAlign: 'center',
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spin />
          </div>
        </Card>
      ) : (
        <Card style={{ width: '100%', maxWidth: '450px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2>Iniciar Sesión</h2>
            <p style={{ color: '#666' }}>Bienvenido a kick-off</p>
          </div>

          {error && (
            <Alert
              message="Error de autenticación"
              description={error}
              type="error"
              showIcon
              closable
              onClose={() => setError(null)}
              style={{ marginBottom: '20px' }}
            />
          )}

          <Spin spinning={loading}>
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
              <TextInput
                name="email"
                label="Correo Electrónico"
                placeholder="tu@email.com"
                type="email"
                control={control}
                errors={errors}
                required
                disabled={loading}
              />

              <PasswordInput
                name="password"
                label="Contraseña"
                placeholder="••••••"
                control={control}
                errors={errors}
                required
                disabled={loading}
              />

              <Divider />

              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                disabled={loading}
              >
                Iniciar Sesión
              </Button>

              {/* Links adicionales */}
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Space split="|" style={{ justifyContent: 'center', width: '100%' }}>
                  <span>
                    ¿No tienes cuenta? <a href="/auth/register">Regístrate</a>
                  </span>
                </Space>
              </div>

              {/* Información para demo */}
              <div
                style={{
                  marginTop: '20px',
                  padding: '15px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                }}
              >
                <p style={{ margin: 0, fontSize: '12px', color: '#666', fontWeight: 'bold' }}>
                  Demo - Admin:
                </p>
                <p style={{ margin: '5px 0 0 0', fontSize: '12px' }}>
                  <MailOutlined /> admin@kickoff.local
                  <br />
                  <LockOutlined /> admin123
                </p>
              </div>
            </Form>
          </Spin>
        </Card>
      )}
    </div>
  );
};

export default LoginForm;
