import { Row, Col, Tag, Statistic } from 'antd';
import { UserOutlined, CalendarOutlined, TrophyOutlined, TeamOutlined } from '@ant-design/icons';
import { DashboardLayout } from '@components/ui/layout';
import { StatCard } from '@components/ui/common';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div>
        <h1 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: 'bold' }}>Dashboard</h1>

        {/* Stats Cards */}
        <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard title="Total Usuarios" value={148} icon={<UserOutlined />} color="#1890ff" />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard title="Reservas Hoy" value={24} icon={<CalendarOutlined />} color="#52c41a" />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Canchas Activas"
              value={12}
              icon={<TrophyOutlined />}
              color="#faad14"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Equipos Registrados"
              value={34}
              icon={<TeamOutlined />}
              color="#f5222d"
            />
          </Col>
        </Row>

        {/* Welcome Section */}
        <div
          style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <h2>Bienvenido a Kick Off</h2>
          <p style={{ color: '#666', marginTop: '12px', lineHeight: '1.6' }}>
            Este es tu dashboard personal. Aquí puedes gestionar tus reservas, canchas, equipos y
            mucho más. Usa el menú lateral para navegar a las diferentes secciones.
          </p>
          <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
            <Col>
              <Tag color="blue">Reservas activas: 5</Tag>
            </Col>
            <Col>
              <Tag color="green">Canchas disponibles: 8</Tag>
            </Col>
            <Col>
              <Tag color="orange">Pendientes de aprobación: 2</Tag>
            </Col>
          </Row>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
