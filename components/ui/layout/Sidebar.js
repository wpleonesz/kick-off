import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  CalendarOutlined,
  TeamOutlined,
  TrophyOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState('dashboard');

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => router.push('/dashboard'),
    },
    {
      key: 'bookings',
      icon: <CalendarOutlined />,
      label: 'Reservas',
      onClick: () => router.push('/dashboard/bookings'),
    },
    {
      key: 'courts',
      icon: <TrophyOutlined />,
      label: 'Canchas',
      onClick: () => router.push('/dashboard/courts'),
    },
    {
      key: 'teams',
      icon: <TeamOutlined />,
      label: 'Equipos',
      onClick: () => router.push('/dashboard/teams'),
    },
    {
      type: 'divider',
    },
    {
      key: 'admin',
      icon: <SettingOutlined />,
      label: 'Administración',
      children: [
        {
          key: 'users',
          label: 'Usuarios',
          onClick: () => router.push('/dashboard/admin/users'),
        },
        {
          key: 'approvals',
          label: 'Aprobaciones',
          onClick: () => router.push('/dashboard/admin/approvals'),
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Perfil',
      onClick: () => router.push('/dashboard/profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Cerrar Sesión',
      onClick: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/auth/login');
      },
      style: { color: '#ff4d4f' },
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
      style={{
        background: '#001529',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '18px',
          fontWeight: 'bold',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          padding: '0 16px',
        }}
      >
        {!collapsed ? 'Kick Off' : 'KO'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onSelect={(e) => setSelectedKey(e.key)}
        items={menuItems}
        style={{ border: 'none' }}
      />
    </Sider>
  );
};

export default Sidebar;
