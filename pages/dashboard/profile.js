import { useState, useEffect } from 'react';
import { Card, Form, Button, Spin, Alert, Divider, Row, Col } from 'antd';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DashboardLayout } from '@components/ui/layout';
import { TextInput, PasswordInput } from '@components/ui/common';

const profileSchema = yup.object({
  name: yup.string().min(2, 'Mínimo 2 caracteres').required('Nombre requerido'),
  email: yup.string().email('Email inválido').required('Email requerido'),
  phone: yup.string().min(10, 'Teléfono inválido'),
  currentPassword: yup.string(),
  newPassword: yup.string().min(6, 'Mínimo 6 caracteres'),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden'),
});

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      reset(parsedUser);
    }
  }, [reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage(null);

    try {
      // Simular actualización de perfil
      const { confirmPassword, ...payload } = data;
      console.log('Actualizando perfil:', payload);

      // Aquí iría la llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage({ type: 'success', text: 'Perfil actualizado exitosamente' });
      setUser(payload);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar el perfil' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <h1 style={{ marginBottom: '24px' }}>Mi Perfil</h1>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={16}>
            <Card title="Información Personal" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              {message && (
                <Alert
                  message={message.type === 'success' ? 'Éxito' : 'Error'}
                  description={message.text}
                  type={message.type}
                  showIcon
                  closable
                  style={{ marginBottom: '20px' }}
                />
              )}

              <Spin spinning={loading}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Form layout="vertical">
                    <TextInput
                      name="name"
                      label="Nombre Completo"
                      placeholder="Tu nombre"
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

                    <TextInput
                      name="phone"
                      label="Teléfono"
                      placeholder="+56 9 1234 5678"
                      control={control}
                      errors={errors}
                      disabled={loading}
                    />

                    <Divider />

                    <h3>Cambiar Contraseña</h3>

                    <PasswordInput
                      name="currentPassword"
                      label="Contraseña Actual"
                      placeholder="••••••"
                      control={control}
                      errors={errors}
                      disabled={loading}
                    />

                    <PasswordInput
                      name="newPassword"
                      label="Nueva Contraseña"
                      placeholder="••••••"
                      control={control}
                      errors={errors}
                      disabled={loading}
                    />

                    <PasswordInput
                      name="confirmPassword"
                      label="Confirmar Nueva Contraseña"
                      placeholder="••••••"
                      control={control}
                      errors={errors}
                      disabled={loading}
                    />

                    <Divider />

                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={loading}
                      disabled={loading}
                    >
                      Guardar Cambios
                    </Button>
                  </Form>
                </form>
              </Spin>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card title="Información de Cuenta" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div style={{ marginBottom: '16px' }}>
                <strong>Rol:</strong>
                <p>{user?.role === 'PLAYER' ? 'Jugador' : 'Dueño de Cancha'}</p>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <strong>Fecha de Registro:</strong>
                <p>05 de Diciembre, 2025</p>
              </div>
              <div>
                <strong>Estado:</strong>
                <p style={{ color: '#52c41a' }}>Activo</p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
