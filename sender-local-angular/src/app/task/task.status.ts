/**
 * 任务状态
 */

export enum TaskStatus {
  // ********** 正常状态 ********** //
  // 创建后, 等待推送快递员
  WAITING = 'WAITING',

  // 正在推送快递员, 等待快递员响应
  PUSHING = 'PUSHING',
  // 正在取件
  FETCHING = 'FETCHING',
  // 正在送件
  SENDING = 'SENDING',
  // 送件结束
  FINISHED = 'FINISHED',

  // ********** 异常状态 ********** //
  // 任务因为推送超时被取消
  CANCELLED = 'CANCELLED'
}
