import {Component, OnInit, ViewChild} from '@angular/core';
import {QuickcallService} from "./quickcall.service";
import {isSuccess} from "../entity/generic-msg";
import {Quickcall} from "./quickcall";
import {FlushMessageComponent} from "../flush-message/flush-message.component";
import {log} from "../logger";

@Component({
  selector: 'app-quickcall',
  templateUrl: './quickcall.component.html',
  styleUrls: ['./quickcall.component.css']
})
export class QuickcallComponent implements OnInit {
  // 当前一键呼叫列表
  currentQuickcalls: Array<Quickcall> = [];

  // 闪烁消息
  @ViewChild(FlushMessageComponent)
  private flush: FlushMessageComponent;

  constructor(private quickcallService: QuickcallService) {
  }

  ngOnInit() {
    this.updateQuickcall();
  }

  /**
   * 更新一键呼叫
   */
  updateQuickcall() {
    this.quickcallService.getCurrentQuickcalls()
      .subscribe(msg => {
        if (isSuccess(msg)) {
          this.currentQuickcalls = msg.data['dataList'];
        }
      })
  }

  /**
   * 设置一键呼叫完成
   * @param {string} quickcallId
   */
  finishQuickcall(quickcallId: string) {
    this.quickcallService.finishQuickcall(quickcallId)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          this.message(msg.data);
          this.updateQuickcall();
        } else {
          this.message(msg.msg)
        }
      }, error => {
        this.message(JSON.stringify(error))
      })
  }

  // 设置闪烁并记录日志
  private message(msg: string) {
    this.flush.changeMsg(msg);
    log(msg);
  }

  /**
   * 设置一键呼叫不成交
   * @param {string} quickcallId
   */
  nodealQuickcall(quickcallId: string) {
    this.quickcallService.nodealQuickcall(quickcallId)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          this.message(msg.data);
          this.updateQuickcall();
        } else {
          this.message(msg.msg)
        }
      }, error => {
        this.message(JSON.stringify(error))
      });
  }
}
