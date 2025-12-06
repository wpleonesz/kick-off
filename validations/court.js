import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Locale from '@validations/common';

Yup.setLocale(Locale);

const courtSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nombre requerido')
    .min(3)
    .max(100),
  address: Yup.string()
    .required('Dirección requerida')
    .min(5),
  description: Yup.string()
    .optional()
    .max(500),
  ownerId: Yup.number()
    .required('Dueño requerido'),
});

export const courtResolver = yupResolver(courtSchema);

const courtValidations = {
  courtSchema,
  courtResolver,
};

export default courtValidations;
