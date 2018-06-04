import {TaskType} from '../task/task.type';
import {Address} from './address';
import {RoutineStatus} from './routine.status';

/**
 * 行程类
 */
export interface Routine {
  routineId: string;
  senderId: string;
  beginAddress: Address;
  endAddress: Address;
  dueTime: number;
  taskTypes: Array<TaskType>;
  routineStatus: RoutineStatus;
}
