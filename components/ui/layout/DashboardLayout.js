import { Layout, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';
import authService from '@services/auth.service';

const { Content } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await authService.getCurrentUser();
        if (result.ok && result.data?.user) {
          setUser(result.data.user);
        } else {
          // No autenticado, redirigir a login
          router.replace('/auth/login');
        }
      } catch (err) {
        console.error('[DashboardLayout] Error checking auth:', err);
        router.replace('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          fontSize: '18px',
          color: '#666',
        }}
      >
        <Spin />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout style={{ marginLeft: collapsed ? '80px' : '250px', transition: 'margin-left 0.2s' }}>
        <TopHeader collapsed={collapsed} user={user} />
        <Content
          style={{
            margin: '24px 16px',
            padding: '24px',
            background: '#f5f5f5',
            borderRadius: '8px',
            minHeight: 'calc(100vh - 128px)',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
