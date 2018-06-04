import {TaskType} from './task.type';
import {TaskStatus} from './task.status';

export interface CurrentTask {
  taskId: string;
  taskStatus: TaskStatus;
  taskType: TaskType;
  remark: string;
}
