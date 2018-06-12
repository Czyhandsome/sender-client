/**
 * 一键呼叫
 */
import {Contact} from "../task/order";

export interface Quickcall {
  // 一键呼叫id
  quickcallId: string;
  // 商户id
  customerId: string;
  // 商户电话号码
  customerPhoneNumber: string;
  // 商户姓名
  customerName: string;
  // 快递员id
  senderId: string;
  // 快递员电话号码
  senderPhoneNumber: string;
  // 快递员姓名
  senderName: string;
  // 起点地址
  starter: Contact;
  // 一键呼叫类型
  quickcallType: string;
  // 交通工具
  vehicle: string;
  tip: string;
  remark: string;
  quickcallStatus: string;
  createTime: string;
}
