export interface GenericMsg<DATA> {
  status: number;
  msg: string;
  data: DATA;
}

export function isSuccess(msg: GenericMsg<any>) {
  return msg.status === 1;
}
