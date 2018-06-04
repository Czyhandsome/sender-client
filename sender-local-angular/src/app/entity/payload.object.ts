/**
 * WebSocket发来的PayloadObject
 */
export interface PayloadObject<DATA> {
  orderId: string;
  object: DATA;
  type: number;
}

// ********** 消息类型常量 ********** //
export const TASK_PUSH = 1;
export const MERGE_ORDER_IN = 2;
export const MERGE_FINISH = 3;
export const ALARM = 4;
