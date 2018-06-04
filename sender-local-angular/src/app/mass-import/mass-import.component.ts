import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DOMAIN_URL} from '../config/api.config';
import {GenericMsg, isSuccess} from '../entity/generic-msg';
import {BcLinkTaskService} from './bc-link-task.service';
import {FlushMessageComponent} from '../flush-message/flush-message.component';

@Component({
  selector: 'app-mass-import',
  templateUrl: './mass-import.component.html',
  styleUrls: ['./mass-import.component.css']
})
export class MassImportComponent implements OnInit {
  // 订单类型
  orderTypeString = 'directOrders';
  // 要导入的订单
  order1 = {
    'starter': {
      'name': '测试万平',
      'phonenumber': '13966716001',
      'longitude': 117.310954,
      'latitude': 31.831635,
      'addressName': '创客云谷',
      'addressDetail': '3楼'
    },
    'receiver': {
      'name': '测试万平收件人',
      'phonenumber': '13966716001',
      'longitude': 117.282285,
      'latitude': 31.865395,
      'addressName': '三孝口',
      'addressDetail': '4栋606'
    },
    'item': {
      'name': '羊毛',
      'type': '衣物',
      'size': 'SMALL',
      'weight': '0.5',
      'remark': '易皱衣物'
    }
  };

  // 大商户信息
  bigCustomers = [
    {id: '3c99830b-536c-11e8-abca-00163f00a4fe', phone: '055165616758', numOrders: 1},
    {id: '1dfb8147-4482-450e-a983-3682bd706fd1', phone: '18408242354', numOrders: 1},
    {id: '21a544a4-ff84-4fda-b3df-bf1168d3de48', phone: '18949203682', numOrders: 1}
  ];

  // 要验证的订单id
  public orderId: string;

  // 提示信息
  @ViewChild(FlushMessageComponent)
  private flush: FlushMessageComponent;

  constructor(private http: HttpClient,
              private bcLinkTask: BcLinkTaskService) {
    bcLinkTask.orderIdSubject()
      .subscribe((orderId) => {
        this.orderId = orderId;
        this.changeMsg(`订单id{${orderId}}接收成功!`);
      });
  }

  ngOnInit() {
  }

  // 一键导入多个订单
  oneClickImport(bcId, numOrders) {
    for (let i = 0; i < numOrders; i++) {
      this.importOrder(bcId, this.order1, this.orderTypeString);
    }
  }

  // 导入订单
  private importOrder(bcId, order, orderTypeString) {
    if (orderTypeString) {
      const url =
        `${DOMAIN_URL}/api/public/bigcustomer/${bcId}/importedOrders/${orderTypeString}?ak=123456`;
      this.http.post<GenericMsg<any>>(url, order)
        .subscribe(msg => {
          if (isSuccess(msg)) {
            this.changeMsg(`导入订单成功! ${JSON.stringify(msg.data)}`);
          } else {
            this.changeMsg(`导入订单失败! ${msg.msg}`);
          }
        }, error => {
          this.changeMsg(`导入订单失败! ${JSON.stringify(error)}`);
        });
    }
  }

  // 验证快递员
  verifySender(bcId: string, orderId: string) {
    const url = `${DOMAIN_URL}/api/public/bigcustomer/${bcId}/importedOrders`
      + `/verifySender/orderId/${orderId}/code/858346?ak=123456`;
    this.http.post<GenericMsg<any>>(url, {})
      .subscribe((msg) => {
        if (isSuccess(msg)) {
          this.changeMsg('验证快递员成功!');
        } else {
          this.changeMsg(`验证快递员失败!${msg.msg}`);
        }
      }, (error) => {
        this.changeMsg(`验证快递员失败!${JSON.stringify(error)}`);
      });
  }

  // 显示信息
  private changeMsg(msg: string) {
    this.flush.changeMsg(msg);
  }
}
