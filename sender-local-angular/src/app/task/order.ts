/**
 * 订单
 */

export interface Order {
  // 订单id
  orderId: string;
  // 订单验证码
  code: string;
  // 订单编号
  index: number;
  // 发件人
  starter: Contact;
  // 收件人
  receiver: Contact;
  // 订单类型
  type: string;
  // 物品信息
  item: Item;
  // 订单导航距离
  distance: number;
}

/**
 * 联系人
 */
export interface Contact {
  // 姓名
  name: string;

  // 电话号码
  phonenumber: string;

  // 经度
  longitude: string;

  // 纬度
  latitude: string;

  // 地址名称
  addressName: string;

  // 详细地址
  addressDetail: string;

  // POI Name
  poiName: string;
}

export interface Item {
  name: string;
  type: string;
  size: string;
  weight: string;
  remark: string;
}


