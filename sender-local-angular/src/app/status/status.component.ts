import {Component, Injectable, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StatusService} from './status.service';
import {Subscription, timer} from 'rxjs';
import {SenderStatus} from './sender.status';
import {FlushMessageComponent} from '../flush-message/flush-message.component';
import {SenderInfoService} from "../info/sender-info.service";
import {isSuccess} from "../entity/generic-msg";
import {log} from "util";
import {vehicles as vehicleList} from "../info/vehicles";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
@Injectable()
export class StatusComponent implements OnInit, OnDestroy {
  // 轮询
  private subscription: Subscription;

  // 输入的数据
  vehicle: string;
  vehicles = vehicleList;

  // 读取的数据
  currentStatus: SenderStatus;
  senderInfo: SenderInfo = null;

  @ViewChild(FlushMessageComponent)
  flush: FlushMessageComponent;

  constructor(private statusService: StatusService,
              private senderInfoService: SenderInfoService) {
    this.refreshInfo();
  }

  private refreshInfo() {
    this.senderInfoService.getSenderInfo()
      .subscribe(g => this.senderInfo = g.data,
        error => {
          this.printMsg(JSON.stringify(error))
        });
  }

  // 更改交通工具
  public changeVehicle() {
    if (this.vehicle) {
      this.senderInfoService.changeVehicle(this.vehicle)
        .subscribe(g => {
          if (isSuccess(g)) {
            this.refreshInfo();
            this.printMsg(g.data);
          } else {
            this.printMsg(g.msg);
          }
        }, error => {
          this.printMsg(JSON.stringify(error));
        })
    }
  }

  // 显示信息
  private printMsg(msg: string) {
    log(msg);
    this.flush.changeMsg(msg);
  }

  // 修改状态
  public changeStatus() {
    if (this.currentStatus === SenderStatus.RESTING || this.currentStatus === SenderStatus.OFF_LINE) {
      this.statusService.beReady()
        .subscribe(() => {
          this.refreshStatus();
        });
    } else if (this.currentStatus === SenderStatus.READY) {
      this.statusService.beResting()
        .subscribe(() => this.refreshStatus());
    }
  }

  // 更新状态
  private refreshStatus() {
    this.statusService.getCurrentStatus()
      .subscribe(status => {
        this.currentStatus = status;
        this.printMsg(`状态成功修改为${status}!`);
      });
  }

  // 静默更新状态
  private refreshStatusWithoutMsg() {
    this.statusService.getCurrentStatus()
      .subscribe(status => {
        this.currentStatus = status;
      });
  }

  ngOnInit() {
    this.subscription = timer(0, 2000)
      .subscribe(() => this.refreshStatusWithoutMsg());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
