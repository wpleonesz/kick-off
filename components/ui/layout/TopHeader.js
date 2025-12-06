import { Layout, Dropdown, Avatar, Button, Space, Divider } from 'antd';
import { BellOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import authService from '@services/auth.service';

const { Header } = Layout;

const TopHeader = ({ collapsed, user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await authService.logout();
    router.push('/auth/login');
  };

  const menuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Mi Perfil',
      onClick: () => router.push('/dashboard/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Configuración',
      onClick: () => router.push('/dashboard/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Cerrar Sesión',
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Header
      style={{
        background: '#fff',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: collapsed ? '80px' : '250px',
        transition: 'margin-left 0.2s',
      }}
    >
      <div />
      <Space size="large">
        <Button type="text" icon={<BellOutlined style={{ fontSize: '18px' }} />} size="large" />
        <Divider type="vertical" />
        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <Space style={{ cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
            <span>{user?.name || 'Usuario'}</span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default TopHeader;
