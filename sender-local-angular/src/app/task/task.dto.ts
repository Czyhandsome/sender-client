import {Order} from './order';

/**
 * 执行任务时获取的任务DTO
 */
export interface TaskDto {
  // 任务id
  taskId: string;

  // 订单列表
  orders: Array<Order>;

  // 预期收入
  expectedIncome: number;

  // 剩余的距离
  remainingDistance: number;
}
