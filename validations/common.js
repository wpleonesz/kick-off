import * as Yup from 'yup';

const Locale = {
  mixed: {
    required: 'Este campo es requerido',
    default: 'Campo inválido',
  },
  string: {
    email: 'Email inválido',
    min: 'Mínimo ${min} caracteres',
    max: 'Máximo ${max} caracteres',
  },
  number: {
    min: 'Mínimo ${min}',
    max: 'Máximo ${max}',
  },
};

export default Locale;
