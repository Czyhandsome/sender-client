import {TaskType} from '../task/task.type';
import {Address} from './address';

export interface RoutineCommand {
  beginAddress: Address;
  endAddress: Address;
  dueTime: number;
  taskTypes: Array<TaskType>;
}
