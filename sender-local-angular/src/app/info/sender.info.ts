/**
 * 快递员信息
 */

interface SenderInfo {
  id: string;
  name: string;
  phonenumber: string;
  idCard: string;
  bankCardNum: string;
  vehicle: string;
  senderType: string;
  linkedBigCustomerNameList: Array<string>;
}
