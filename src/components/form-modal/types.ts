import type { WorkLog, WorkLogCreateDto } from '@/types';

export interface FormValues extends Omit<
  WorkLogCreateDto,
  'date' | 'workTypeId'
> {
  date: Date | null;
  workTypeId: string;
}

export interface WorkLogFormModalProps {
  opened: boolean;
  onClose: () => void;
  initialData?: WorkLog | null;
}
