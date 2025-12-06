import { useRouter } from 'next/router';
import { Button, Space, Card, Row, Col, Divider } from 'antd';
import {
  LoginOutlined,
  UserAddOutlined,
  CalendarOutlined,
  TeamOutlined,
  TrophyOutlined,
  HomeOutlined,
} from '@ant-design/icons';

const HomePage = () => {
  const router = useRouter();

  const features = [
    { icon: <CalendarOutlined />, title: 'Reservas', desc: 'Gestiona tus reservas de canchas' },
    { icon: <TeamOutlined />, title: 'Equipos', desc: 'Organiza tus equipos y jugadores' },
    { icon: <TrophyOutlined />, title: 'Torneos', desc: 'Participa en torneos y competencias' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* Header */}
      <div
        style={{ backgroundColor: '#fff', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2
            style={{
              margin: 0,
              color: '#1890ff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <HomeOutlined style={{ fontSize: '24px' }} /> Kick Off
          </h2>
          <Space>
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => router.push('/auth/login')}
            >
              Iniciar Sesión
            </Button>
            <Button icon={<UserAddOutlined />} onClick={() => router.push('/auth/register')}>
              Registrarse
            </Button>
          </Space>
        </div>
      </div>

      {/* Hero Section */}
      <div
        style={{
          backgroundColor: '#1890ff',
          color: '#fff',
          padding: '60px 20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2.5em', margin: 0, marginBottom: '10px' }}>
          Bienvenido a Kick Off
        </h1>
        <p style={{ fontSize: '1.1em', margin: '10px 0 30px 0', opacity: 0.9 }}>
          La plataforma definitiva para gestionar reservas de canchas deportivas
        </p>
        <Space>
          <Button
            type="primary"
            size="large"
            icon={<UserAddOutlined />}
            onClick={() => router.push('/auth/register')}
          >
            Crear Cuenta
          </Button>
          <Button
            size="large"
            style={{ color: '#fff', borderColor: '#fff' }}
            onClick={() => router.push('/auth/login')}
          >
            Ya tengo cuenta
          </Button>
        </Space>
      </div>

      {/* Features Section */}
      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '1.8em' }}>
          Características Principales
        </h2>
        <Row gutter={[24, 24]}>
          {features.map((feature, idx) => (
            <Col key={idx} xs={24} sm={12} md={8}>
              <Card
                hoverable
                style={{ textAlign: 'center', height: '100%' }}
                bodyStyle={{ padding: '30px' }}
              >
                <div style={{ fontSize: '2.5em', color: '#1890ff', marginBottom: '15px' }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p style={{ color: '#666', marginBottom: 0 }}>{feature.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* CTA Section */}
      <div style={{ backgroundColor: '#fafafa', padding: '40px 20px', marginTop: '60px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>¿Listo para comenzar?</h2>
          <p style={{ marginBottom: '30px', color: '#666', fontSize: '1.05em' }}>
            Únete a miles de usuarios que ya están gestionando sus canchas de forma eficiente
          </p>
          <Button
            type="primary"
            size="large"
            icon={<UserAddOutlined />}
            onClick={() => router.push('/auth/register')}
          >
            Registrarse Ahora
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Divider style={{ margin: '40px 0 0 0' }} />
      <div
        style={{
          backgroundColor: '#fff',
          padding: '30px 20px',
          textAlign: 'center',
          color: '#666',
        }}
      >
        <p>© 2024 Kick Off. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default HomePage;
