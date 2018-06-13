import {Component, OnInit, ViewChild} from '@angular/core';
import {DOMAIN_URL} from "../config/api.config";
import {HttpClient} from "@angular/common/http";
import {GenericMsg, isSuccess} from "../entity/generic-msg";
import {FlushMessageComponent} from "../flush-message/flush-message.component";
import {log} from "../logger";

@Component({
  selector: 'app-mass-quickcall',
  templateUrl: './mass-quickcall.component.html',
  styleUrls: ['./mass-quickcall.component.css']
})
export class MassQuickcallComponent implements OnInit {
  // 发件商户id
  customerId: string = '470daa27-306d-49c8-b20c-d6d1cd266ddc';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  // 创建一个quickcallRequest
  private remark = [
    '一箱牛奶', '《哈利波特》', '笔记本电脑', '法国香水', '苹果手机', '一瓶啤酒', '羊绒衫'
  ];
  private currentIndex: number = 0;

  quickcallRequest(): QuickcallRequest {
    this.currentIndex = (this.currentIndex + 1) % this.remark.length;
    const remark = this.remark[this.currentIndex];
    return {
      starter: {
        name: "测试发件人",
        phonenumber: "18949203682",
        longitude: 117.310206,
        latitude: 31.832006,
        addressName: "测试起点",
        addressDetail: "3楼"
      },
      vehicle: "ELECTRIC_BICYCLE",
      quickcallType: "DELIVER",
      tip: 10.00,
      remark: remark,
      payType: "ALIPAY_ANDROID"
    };
  }

  /**
   * 假接口: 直接创建一键呼叫并立刻支付
   * @param customerId
   * @param {QuickcallRequest} quickcall
   */
  createQuickcall(customerId: string, quickcall: QuickcallRequest) {
    const createQcUrl = `${DOMAIN_URL}/public/customer/${customerId}/quickcalls/createAndPay`;
    this.http.post<GenericMsg<any>>(createQcUrl, quickcall)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          this.message(JSON.stringify(msg.data));
        } else {
          this.message(msg.msg);
        }
      }, error => {
        this.message(JSON.stringify(error));
      });
  }

  // ********** 闪烁消息 ********** //
  @ViewChild(FlushMessageComponent)
  private flushMessage: FlushMessageComponent;

  private message(info: string) {
    this.flushMessage.changeMsg(info);
    log(info);
  }

}

interface QuickcallRequest {
  starter: Starter;
  vehicle: string;
  quickcallType: string;
  tip: number;
  remark: string;
  payType: string;
}

interface Starter {
  name: string;
  phonenumber: string;
  longitude: number;
  latitude: number;
  addressName: string;
  addressDetail: string;
}
