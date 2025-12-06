import { useState } from 'react';
import { Row, Col, Button, Tag, Space } from 'antd';
import { PlusOutlined, FilterOutlined } from '@ant-design/icons';
import { DashboardLayout } from '@components/ui/layout';
import { DataGrid } from '@components/ui/common';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      court: 'Cancha Central',
      user: 'Juan Pérez',
      date: '2025-12-06',
      time: '10:00 - 12:00',
      status: 'Confirmada',
      amount: 100000,
    },
    {
      id: 2,
      court: 'Cancha Los Andes',
      user: 'María García',
      date: '2025-12-06',
      time: '14:00 - 16:00',
      status: 'Pendiente',
      amount: 80000,
    },
    {
      id: 3,
      court: 'Cancha Sur',
      user: 'Carlos López',
      date: '2025-12-07',
      time: '09:00 - 11:00',
      status: 'Cancelada',
      amount: 120000,
    },
  ]);

  const columns = [
    {
      title: 'Cancha',
      dataIndex: 'court',
      key: 'court',
      width: 150,
    },
    {
      title: 'Usuario',
      dataIndex: 'user',
      key: 'user',
      width: 150,
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: 'Hora',
      dataIndex: 'time',
      key: 'time',
      width: 130,
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (amount) => `$${amount.toLocaleString()}`,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        let color;
        if (status === 'Confirmada') color = 'green';
        else if (status === 'Pendiente') color = 'orange';
        else color = 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const handleEdit = (record) => {
    console.log('Editar reserva:', record);
  };

  const handleDelete = (record) => {
    setBookings(bookings.filter((b) => b.id !== record.id));
  };

  const handleView = (record) => {
    console.log('Ver reserva:', record);
  };

  return (
    <DashboardLayout>
      <div>
        <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
          <Col>
            <h1 style={{ margin: 0 }}>Gestión de Reservas</h1>
          </Col>
          <Col>
            <Space>
              <Button icon={<FilterOutlined />} size="large">
                Filtrar
              </Button>
              <Button type="primary" icon={<PlusOutlined />} size="large">
                Nueva Reserva
              </Button>
            </Space>
          </Col>
        </Row>

        <DataGrid
          title="Reservas"
          columns={columns}
          data={bookings}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          pageSize={10}
          rowKey="id"
        />
      </div>
    </DashboardLayout>
  );
};

export default BookingsPage;
