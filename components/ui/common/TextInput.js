import { Input, Form } from 'antd';
import { Controller } from 'react-hook-form';

const TextInput = ({
  name,
  label,
  placeholder,
  type = 'text',
  control,
  errors,
  required = false,
  disabled = false,
  maxLength,
  prefix,
  suffix,
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
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            prefix={prefix}
            suffix={suffix}
            size="large"
          />
        )}
      />
    </Form.Item>
  );
};

export default TextInput;
