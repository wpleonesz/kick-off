import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Locale from '@validations/common';

Yup.setLocale(Locale);

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nombre requerido')
    .min(2, 'Mínimo 2 caracteres')
    .max(100, 'Máximo 100 caracteres'),
  email: Yup.string().email('Email inválido').required('Email requerido'),
  password: Yup.string()
    .required('Contraseña requerida')
    .min(6, 'Mínimo 6 caracteres')
    .matches(/[A-Z]/, 'Debe contener una mayúscula')
    .matches(/[0-9]/, 'Debe contener un número'),
  confirmPassword: Yup.string()
    .required('Confirmar contraseña requerido')
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
  role: Yup.string().oneOf(['PLAYER', 'OWNER'], 'Rol inválido').required('Rol requerido'),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Email requerido'),
  password: Yup.string().required('Contraseña requerida').min(6, 'Mínimo 6 caracteres'),
});

export const registerResolver = yupResolver(registerSchema);
export const loginResolver = yupResolver(loginSchema);

export const authValidations = {
  registerSchema,
  loginSchema,
  registerResolver,
  loginResolver,
};

export default authValidations;
