import { Input, Form } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Controller } from 'react-hook-form';

const PasswordInput = ({
  name,
  label,
  placeholder,
  control,
  errors,
  required = false,
  disabled = false,
}) => {
  return (
    <Form.Item
      label={label}
      required={required}
      validateStatus={errors?.[name] ? 'error' : ''}
      help={errors?.[name]?.message}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input.Password
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            prefix={<LockOutlined />}
            size="large"
          />
        )}
      />
    </Form.Item>
  );
};

export default PasswordInput;
