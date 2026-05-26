import * as Yup from 'yup';

// TODO: сделать получение через api
export const WORK_TYPES = [
  { value: '1', label: 'Кладка перегородок' },
  { value: '2', label: 'Монтаж опалубки' },
  { value: '3', label: 'Бетонные работы' },
  { value: '4', label: 'Штукатурка' },
  { value: '5', label: 'Покраска' },
];

export const UNITS = [
  { value: 'м³', label: 'м³' },
  { value: 'м²', label: 'м²' },
  { value: 'пог.м', label: 'пог.м' },
  { value: 'шт', label: 'шт' },
];

export const validationSchema = Yup.object({
  date: Yup.date().typeError('Выберите дату').required('Обязательное поле'),
  volume: Yup.number()
    .typeError('Введите число')
    .positive('Объём должен быть положительным')
    .required('Обязательное поле'),
  unit: Yup.string().required('Обязательное поле'),
  workerName: Yup.string()
    .min(2, 'Минимум 2 символа')
    .required('Обязательное поле'),
  workTypeId: Yup.number()
    .typeError('Выберите вид работы')
    .positive('Выберите вид работы')
    .required('Обязательное поле'),
});

export const initialValues = {
  volume: 0,
  date: null,
  unit: 'м³',
  workTypeId: 0,
  workerName: '',
};
