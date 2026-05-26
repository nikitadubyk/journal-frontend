export interface WorkType {
  id: number;
  name: string;
}

export interface WorkLog {
  id: number;
  date: string;
  unit: string;
  volume: number;
  workerName: string;
  workType: WorkType;
}

export interface WorkLogCreateDto {
  date: string;
  unit: string;
  volume: number;
  workerName: string;
  workTypeId: number;
}
