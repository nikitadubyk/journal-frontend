import dayjs from 'dayjs';
import { useState } from 'react';
import { modals } from '@mantine/modals';
import { useDisclosure } from '@mantine/hooks';
import { DatePickerInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { Table, LoadingOverlay, Button, Group, Container } from '@mantine/core';

import { WorkLogFormModal } from './components';
import { useListQuery, useDeleteMutation } from './store';

export default function App() {
  const [opened, { open, close }] = useDisclosure(false);
  const [dateFilter, setDateFilter] = useState<Date | null>(null);

  const dateParam = dateFilter
    ? dayjs(dateFilter).format('YYYY-MM-DD')
    : undefined;

  const [remove] = useDeleteMutation();
  const { data, isLoading } = useListQuery(dateParam);

  const isEmpty = !isLoading && !data?.length;

  const handleDelete = (id: string) => {
    modals.openConfirmModal({
      title: 'Удаление записи',
      children: 'Вы уверены, что хотите удалить эту запись?',
      labels: { confirm: 'Удалить', cancel: 'Отмена' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await remove(id).unwrap();
          notifications.show({
            color: 'green',
            title: 'Успешно',
            message: 'Запись удалена',
          });
        } catch {
          notifications.show({
            color: 'red',
            title: 'Ошибка',
            message: 'Не удалось удалить запись. Попробуйте снова.',
          });
        }
      },
    });
  };

  const rows = data?.map((value) => (
    <Table.Tr key={value.id}>
      <Table.Td>{dayjs(value.date).format('DD/MM/YYYY')}</Table.Td>
      <Table.Td>{value.workerName}</Table.Td>
      <Table.Td>
        {value.volume} {value.unit}
      </Table.Td>
      <Table.Td>{value.workType.name}</Table.Td>
      <Table.Td>
        <Button color="red" onClick={() => handleDelete(String(value.id))}>
          Удалить
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <LoadingOverlay visible={isLoading} />

      <Container p="lg">
        <Group justify="space-between" mb="md">
          <h1 style={{ margin: 0 }}>Журнал работ</h1>
          <Button onClick={open}>+ Добавить запись</Button>
        </Group>

        <Group mb="md">
          <DatePickerInput
            locale="ru"
            value={dateFilter}
            valueFormat="DD/MM/YYYY"
            placeholder="Фильтр по дате"
            onChange={(value) => setDateFilter(dayjs(value).toDate())}
          />
          {dateFilter && (
            <Button variant="subtle" onClick={() => setDateFilter(null)}>
              Сбросить
            </Button>
          )}
        </Group>

        <WorkLogFormModal opened={opened} onClose={close} />

        {!isEmpty && (
          <Table.ScrollContainer minWidth={300}>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Дата</Table.Th>
                  <Table.Th>ФИО</Table.Th>
                  <Table.Th>Объем</Table.Th>
                  <Table.Th>Вид работы</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        )}

        {isEmpty && <h4>Список пустой</h4>}
      </Container>
    </>
  );
}
