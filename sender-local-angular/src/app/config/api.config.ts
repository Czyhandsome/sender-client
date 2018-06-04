// ***** 常量 *****//
const aliczy = '47.98.99.234';
const local = '192.168.100.103';

// IP地址
let IP = local;
// 端口号
const PORT = 8080;

// 主页地址
export let DOMAIN_URL = `http://${IP}:${PORT}`;

export class ApiConfig {
  // ********** 权限的URL ********** //
  public static authUrl() {
    return `${DOMAIN_URL}/api/public/sender/login`;
  }

  // ********** 修改IP地址 ********** //
  public static changeToLocal() {
    ApiConfig.changeUrl(local);
  }

  public static changeToTest() {
    ApiConfig.changeUrl(aliczy);
  }

  private static changeUrl(ip) {
    IP = ip;
    DOMAIN_URL = `http://${IP}:${PORT}`;
  }

  // ********** WebSocket的URL ********** //
  public static WEBSOCKET_URL(senderId: string): string {
    return `ws://${IP}:${PORT}/ws?userId=${senderId}`;
  }

  // ********** 判断一个url是否需要token认证 ********** //
  static needAuthentication(url: string): boolean {
    const api = url.replace(DOMAIN_URL, '');
    const isPublic = api.startsWith('/public') || api.startsWith('/api/public');
    return !isPublic;
  }

  // ********** Task ********** //
  static currentTaskUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/tasks/currentTask`;
  }

  static currentStatusUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/status`;
  }

  // ********** Sender Status ********** //
  static beReadyUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/status/ready`;
  }

  static beRestingUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/status/resting`;
  }

  // ********** Routine ********** //
  // 快递员创建行程
  static createRoutineUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/routines`;
  }

  // 快递员取消行程
  static cancelRoutineUrl(senderId: string, routineId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/routines/${routineId}/cancel`;
  }

  // 快递员获取当前行程
  static currentRoutineUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/routines/current`;
  }

  // ********** Sender Location ********** //
  static updateLocationUrl(senderId: string): string {
    return `${DOMAIN_URL}/api/sender/${senderId}/locations`;
  }

  // ********** 任务 ********** //
  // 快递员接受任务
  static acceptTaskUrl(senderId: string, taskId: string) {
    return `${DOMAIN_URL}/api/sender/${senderId}/tasks/${taskId}/receive`;
  }

  // 快递员拒绝任务
  static rejectTaskUrl(senderId: string, taskId: string) {
    return `${DOMAIN_URL}/api/sender/${senderId}/tasks/${taskId}/reject`;
  }

  // 获取所有要取的任务
  static getAllFetchOrdersUrl(senderId: string, taskId: string) {
    return `${DOMAIN_URL}/api/sender/${senderId}/tasks/${taskId}/orders/allFetch`;
  }

  // 获取所有要送的任务
  static getAllSendOrdersUrl(senderId: string, taskId: string) {
    return `${DOMAIN_URL}/api/sender/${senderId}/tasks/${taskId}/orders/allSend`;
  }

  // 开始取件
  static startFetchOrderUrl(senderId: string, taskId: string, orderId: string)
    : string {
    return `${DOMAIN_URL}/api/sender/${senderId}/tasks/${taskId}` +
      `/orders/${orderId}/startFetch`;
  }

  // 结束取件
  static endFetchOrderUrl(senderId: string, taskId: string, orderId: string)
    : string {
    return `${DOMAIN_URL}/api/sender/${senderId}/tasks/${taskId}` +
      `/orders/${orderId}/endFetch`;
  }

  // 开始送件
  static startSendOrderUrl(senderId: string, taskId: string, orderId: string)
    : string {
    return `${DOMAIN_URL}/api/sender/${senderId}/tasks/${taskId}` +
      `/orders/${orderId}/startSend`;
  }

  // 验证快递员
  static verifyReceiverUrl(senderId: string,
                           taskId: string,
                           orderId: string,
                           code: string)
    : string {
    return `${DOMAIN_URL}/api/sender/${senderId}/tasks/${taskId}` +
      `/orders/${orderId}/verifyReceiver/code/${code}`;
  }

  // 结束送件
  static endSendOrderUrl(senderId: string, taskId: string, orderId: string)
    : string {
    return `${DOMAIN_URL}/api/sender/${senderId}/tasks/${taskId}` +
      `/orders/${orderId}/stopSend`;
  }
}
