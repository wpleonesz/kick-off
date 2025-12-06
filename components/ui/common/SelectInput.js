import { Select, Form } from 'antd';
import { Controller } from 'react-hook-form';

const SelectInput = ({
  name,
  label,
  placeholder,
  options = [],
  control,
  errors,
  required = false,
  disabled = false,
  multiple = false,
  loading = false,
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
          <Select
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            mode={multiple ? 'multiple' : undefined}
            loading={loading}
            size="large"
            options={options}
          />
        )}
      />
    </Form.Item>
  );
};

export default SelectInput;
