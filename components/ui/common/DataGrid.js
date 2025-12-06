import { Table, Card, Button, Space, Popconfirm, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const DataGrid = ({
  columns = [],
  data = [],
  loading = false,
  pagination = true,
  pageSize = 10,
  onEdit,
  onDelete,
  onView,
  rowKey = 'id',
  title,
  bordered = true,
  size = 'middle',
  scroll = { x: 1200 },
}) => {
  // Agregar columna de acciones si hay callbacks
  const hasActions = onEdit || onDelete || onView;

  const actionColumn = hasActions
    ? {
        title: 'Acciones',
        key: 'actions',
        width: 120,
        fixed: 'right',
        align: 'center',
        render: (_, record) => (
          <Space>
            {onView && (
              <Button
                type="link"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => onView(record)}
                title="Ver"
              />
            )}
            {onEdit && (
              <Button
                type="link"
                size="small"
                icon={<EditOutlined />}
                onClick={() => onEdit(record)}
                title="Editar"
              />
            )}
            {onDelete && (
              <Popconfirm
                title="¿Estás seguro?"
                description="¿Eliminar este registro?"
                onConfirm={() => onDelete(record)}
                okText="Sí"
                cancelText="No"
              >
                <Button
                  type="link"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  title="Eliminar"
                />
              </Popconfirm>
            )}
          </Space>
        ),
      }
    : null;

  const tableColumns = hasActions ? [...columns, actionColumn].filter(Boolean) : columns;

  return (
    <Card title={title} style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Table
        columns={tableColumns}
        dataSource={data}
        loading={loading}
        rowKey={rowKey}
        bordered={bordered}
        size={size}
        scroll={scroll}
        pagination={
          pagination
            ? {
                pageSize,
                showSizeChanger: true,
                showTotal: (total) => `Total: ${total} registros`,
                pageSizeOptions: ['10', '20', '50', '100'],
              }
            : false
        }
      />
    </Card>
  );
};

export default DataGrid;
