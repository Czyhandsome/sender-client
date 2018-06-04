/**
 * 快递员状态
 */
export enum SenderStatus {
  // 离线
  OFF_LINE = 'OFF_LINE',
  // 就绪
  READY = 'READY',
  // 行程中
  IN_ROUTINE = 'IN_ROUTINE',
  // 休息
  RESTING = 'RESTING',
  // 推送中
  PUSHING = 'PUSHING',
  // 取件中
  FETCHING = 'FETCHING',
  // 送件中
  SENDING = 'SENDING'
}
