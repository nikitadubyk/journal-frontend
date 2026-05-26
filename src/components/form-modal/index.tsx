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

import { useCreateMutation } from '../../store';
import type { WorkLogCreateDto } from '../../types';

import { initialValues, UNITS, WORK_TYPES, validationSchema } from './config';
import dayjs from 'dayjs';

interface WorkLogFormModalProps {
  opened: boolean;
  onClose: () => void;
}

export const WorkLogFormModal = ({
  opened,
  onClose,
}: WorkLogFormModalProps) => {
  const [create] = useCreateMutation();

  const formik = useFormik<
    Omit<WorkLogCreateDto, 'date'> & { date: Date | null }
  >({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await create({
          ...values,
          workTypeId: Number(values.workTypeId),
          date: dayjs(values.date).format('YYYY-MM-DD'),
        }).unwrap();

        notifications.show({
          color: 'green',
          title: 'Успешно',
          message: 'Запись добавлена в журнал',
        });

        resetForm();
        onClose();
      } catch {
        notifications.show({
          color: 'red',
          title: 'Ошибка',
          message: 'Не удалось добавить запись. Попробуйте снова.',
        });
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Новая запись" centered>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap="sm">
          <DatePickerInput
            locale="ru"
            label="Дата"
            withAsterisk
            valueFormat="DD/MM/YYYY"
            value={formik.values.date}
            placeholder="Выберите дату"
            error={formik.touched.date && formik.errors.date}
            onBlur={() => formik.setFieldTouched('date', true)}
            onChange={(val) => formik.setFieldValue('date', val)}
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
              value={formik.values.volume}
              error={formik.touched.volume && formik.errors.volume}
              onBlur={() => formik.setFieldTouched('volume', true)}
              onChange={(val) => formik.setFieldValue('volume', val)}
            />

            <Select
              data={UNITS}
              withAsterisk
              label="Единица"
              value={formik.values.unit}
              error={formik.touched.unit && formik.errors.unit}
              onBlur={() => formik.setFieldTouched('unit', true)}
              onChange={(val) => formik.setFieldValue('unit', val)}
            />
          </Group>

          <Select
            withAsterisk
            data={WORK_TYPES}
            label="Вид работы"
            placeholder="Выберите вид работы"
            onBlur={() => formik.setFieldTouched('workTypeId', true)}
            onChange={(val) => formik.setFieldValue('workTypeId', val)}
            error={formik.touched.workTypeId && formik.errors.workTypeId}
            value={
              formik.values.workTypeId ? String(formik.values.workTypeId) : null
            }
          />

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" loading={formik.isSubmitting}>
              Добавить
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
