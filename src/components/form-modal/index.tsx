import { useFormik } from 'formik';
import { DatePickerInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import {
  Group,
  Stack,
  Modal,
  Button,
  Select,
  TextInput,
  NumberInput,
} from '@mantine/core';

import { getInputProps } from '@/utils';
import { useCreateMutation, useUpdateMutation } from '@/store';

import type { FormValues, WorkLogFormModalProps } from './types';
import {
  UNITS,
  WORK_TYPES,
  getPayload,
  getInitialValues,
  validationSchema,
} from './config';

const successNotify = {
  color: 'green',
  title: 'Успешно',
  message: 'Запись обновлена',
};

export const WorkLogFormModal = ({
  opened,
  onClose,
  initialData,
}: WorkLogFormModalProps) => {
  const [create] = useCreateMutation();
  const [update] = useUpdateMutation();

  const submitForm = async (values: FormValues) => {
    const payload = getPayload(values);

    if (initialData) {
      await update({
        id: String(initialData.id),
        ...payload,
      }).unwrap();

      notifications.show(successNotify);

      return;
    }

    await create(payload).unwrap();

    notifications.show({
      ...successNotify,
      message: 'Запись добавлена в журнал',
    });
  };

  const formik = useFormik<FormValues>({
    validationSchema,
    enableReinitialize: true,
    initialValues: getInitialValues(initialData),
    onSubmit: async (values, { resetForm }) => {
      try {
        await submitForm(values);
        resetForm();
        onClose();
      } catch {
        notifications.show({
          color: 'red',
          title: 'Ошибка',
          message: 'Не удалось сохранить запись',
        });
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal
      centered
      opened={opened}
      onClose={handleClose}
      title={initialData ? 'Редактирование записи' : 'Новая запись'}
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack gap="sm">
          <DatePickerInput
            locale="ru"
            label="Дата"
            withAsterisk
            valueFormat="DD/MM/YYYY"
            placeholder="Выберите дату"
            {...getInputProps(formik, 'date')}
          />

          <TextInput
            withAsterisk
            label="ФИО работника"
            placeholder="Иванов И.И."
            {...formik.getFieldProps('workerName')}
            error={formik.touched.workerName && formik.errors.workerName}
          />

          <Group grow align="flex-start">
            <NumberInput
              min={0}
              withAsterisk
              label="Объём"
              placeholder="0"
              decimalScale={2}
              {...getInputProps(formik, 'volume')}
            />

            <Select
              data={UNITS}
              withAsterisk
              label="Единица"
              {...getInputProps(formik, 'unit')}
            />
          </Group>

          <Select
            withAsterisk
            data={WORK_TYPES}
            label="Вид работы"
            placeholder="Выберите вид работы"
            {...getInputProps(formik, 'workTypeId')}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" loading={formik.isSubmitting}>
              {initialData ? 'Сохранить' : 'Добавить'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
