import {TaskType} from '../task/task.type';

export interface TaskPreview {
  id: string;
  taskType: TaskType;
  orderQuantity: number;
  expectedIncome: number;
  fetchTime: number;
  sendTime: number;
  remark: string;
}
