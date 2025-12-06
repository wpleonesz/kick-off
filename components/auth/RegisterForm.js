import { useState } from 'react';
import { Form, Button, Spin, Alert, Card, Space, Divider } from 'antd';
import { useForm } from 'react-hook-form';
import { registerResolver } from '@validations/auth';
import authService from '@services/auth.service';
import { TextInput, PasswordInput, SelectInput } from '@components/ui/common';

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: registerResolver,
  });

  const selectedRole = watch('role');

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      // Enviar sin confirmPassword (la API no la necesita)
      const { confirmPassword, ...payload } = data;
      const result = await authService.register(payload);

      if (result.ok) {
        setSuccess(true);
        reset();
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 2000);
      } else {
        setError(result.error || 'Error al registrarse');
      }
    } catch (err) {
      setError(err.message || 'Error al registrarse');
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
      <Card style={{ width: '100%', maxWidth: '500px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2>Crear Cuenta</h2>
          <p style={{ color: '#666' }}>Regístrate para acceder a kick-off</p>
        </div>

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            closable
            style={{ marginBottom: '20px' }}
          />
        )}

        {success && (
          <Alert
            message="¡Éxito!"
            description="Tu cuenta ha sido creada. Redirigiendo..."
            type="success"
            showIcon
            style={{ marginBottom: '20px' }}
          />
        )}

        <Spin spinning={loading}>
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
            <TextInput
              name="name"
              label="Nombre Completo"
              placeholder="Juan Pérez"
              control={control}
              errors={errors}
              required
              disabled={loading}
            />

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

            <SelectInput
              name="role"
              label="Rol de Usuario"
              placeholder="Selecciona tu rol"
              control={control}
              errors={errors}
              required
              disabled={loading}
              options={[
                { label: 'Jugador', value: 'PLAYER' },
                { label: 'Dueño de Cancha', value: 'OWNER' },
              ]}
            />

            {selectedRole === 'OWNER' && (
              <Alert
                message="Cuenta pendiente de aprobación"
                description="Como dueño de cancha, tu cuenta deberá ser aprobada por un administrador antes de poder acceder."
                type="info"
                showIcon
                style={{ marginBottom: '20px' }}
              />
            )}

            <PasswordInput
              name="password"
              label="Contraseña"
              placeholder="••••••"
              control={control}
              errors={errors}
              required
              disabled={loading}
            />

            <PasswordInput
              name="confirmPassword"
              label="Confirmar Contraseña"
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
              Registrarse
            </Button>

            {/* Link a Login */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <span>¿Ya tienes cuenta? </span>
              <a href="/auth/login">Inicia sesión aquí</a>
            </div>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default RegisterForm;
