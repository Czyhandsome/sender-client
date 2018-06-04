/**
 * 带时间的log方法
 * @param msg 日志信息
 */
export function log(msg: string) {
  console.log(`${new Date()} ==> ${msg}`);
}
