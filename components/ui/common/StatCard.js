import { Card as AntCard, Statistic, Row, Col } from 'antd';

const StatCard = ({ title, value, icon, color = '#1890ff', format, precision }) => {
  return (
    <AntCard
      style={{
        borderRadius: '8px',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}
    >
      <Row align="middle">
        <Col xs={24} sm={12}>
          <Statistic
            title={title}
            value={value}
            precision={precision}
            valueStyle={{ color, fontSize: '24px', fontWeight: 'bold' }}
            prefix={icon && <span style={{ marginRight: '8px' }}>{icon}</span>}
          />
        </Col>
        {icon && (
          <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '40px', color, opacity: 0.2 }}>{icon}</div>
          </Col>
        )}
      </Row>
    </AntCard>
  );
};

export default StatCard;
