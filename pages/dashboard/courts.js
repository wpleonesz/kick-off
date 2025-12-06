import { useState } from 'react';
import { Row, Col, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DashboardLayout } from '@components/ui/layout';
import { DataGrid } from '@components/ui/common';

const CourtsPage = () => {
  const [courts, setCourts] = useState([
    {
      id: 1,
      name: 'Cancha Deportiva Central',
      location: 'Centro Cívico',
      capacity: 10,
      pricePerHour: 50000,
      status: 'Activa',
    },
    {
      id: 2,
      name: 'Cancha Los Andes',
      location: 'Zona Este',
      capacity: 8,
      pricePerHour: 40000,
      status: 'Activa',
    },
    {
      id: 3,
      name: 'Cancha Deportiva Sur',
      location: 'Zona Sur',
      capacity: 12,
      pricePerHour: 60000,
      status: 'Mantenimiento',
    },
  ]);

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Ubicación',
      dataIndex: 'location',
      key: 'location',
      width: 150,
    },
    {
      title: 'Capacidad',
      dataIndex: 'capacity',
      key: 'capacity',
      width: 100,
      align: 'center',
    },
    {
      title: 'Precio/Hora',
      dataIndex: 'pricePerHour',
      key: 'pricePerHour',
      width: 120,
      render: (price) => `$${price.toLocaleString()}`,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        const color = status === 'Activa' ? 'green' : 'orange';
        return <span style={{ color }}>{status}</span>;
      },
    },
  ];

  const handleEdit = (record) => {
    console.log('Editar:', record);
    // Implementar lógica de edición
  };

  const handleDelete = (record) => {
    setCourts(courts.filter((c) => c.id !== record.id));
    console.log('Eliminado:', record);
  };

  const handleView = (record) => {
    console.log('Ver detalles:', record);
  };

  return (
    <DashboardLayout>
      <div>
        <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
          <Col>
            <h1 style={{ margin: 0 }}>Gestión de Canchas</h1>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} size="large">
              Nueva Cancha
            </Button>
          </Col>
        </Row>

        <DataGrid
          title="Canchas Registradas"
          columns={columns}
          data={courts}
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

export default CourtsPage;
