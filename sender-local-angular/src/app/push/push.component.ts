import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {PushService} from './push.service';
import {Subscription} from 'rxjs/Subscription';
import {TaskPreview} from './task.preview';
import {isSuccess} from '../entity/generic-msg';
import {timer} from 'rxjs';
import {ALARM, MERGE_FINISH, MERGE_ORDER_IN, QUICK_CALL_PUSH, TASK_PUSH} from '../entity/payload.object';
import {log} from '../logger';
import {QuickcallPreview} from "./quickcall-preview";

const initialMsg = '当前没有任务推送!';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.css']
})
@Injectable()
export class PushComponent implements OnInit, OnDestroy {
  public pushTask: TaskPreview;
  public quickcall: QuickcallPreview;
  public message = initialMsg;

  public handTaskId: string;

  private subscription: Subscription;

  constructor(private push: PushService) {
  }

  /**
   * 接受任务
   */
  public accept(pushTask: TaskPreview) {
    if (pushTask != null) {
      this.acceptHand(pushTask.id);
    }
  }

  /**
   * 手动拒绝任务
   * @param {string} taskId 任务id
   */
  public acceptHand(taskId: string) {
    this.push.acceptTask(taskId)
      .subscribe((msg) => {
        if (isSuccess(msg)) {
          this.changeMsg(`${new Date()} ==> 接受任务{${taskId}成功!`);
          this.pushTask = null;
        } else {
          this.changeMsg(`${new Date()} ==> 接受任务{${taskId}失败! 原因: ${msg.msg}`);
        }
      });
  }

  /**
   * 拒绝任务
   */
  public reject(pushTask: TaskPreview) {
    if (pushTask != null) {
      const taskId = pushTask.id;
      this.push.rejectTask(this.pushTask.id)
        .subscribe((msg) => {
          if (isSuccess(msg)) {
            this.changeMsg(`${new Date()} ==> 拒绝任务{${taskId}成功!`);
            this.pushTask = null;
          } else {
            this.changeMsg(`${new Date()} ==> 拒绝任务{${taskId}失败! 原因: ${msg.msg}`);
          }
        });
    }
  }

  /**
   * 接受一键呼叫
   * @param {QuickcallPreview} quickcall
   */
  public acceptQuickcall(quickcall: QuickcallPreview) {
    if (quickcall != null) {
      const quickcallId = quickcall.id;
      this.acceptQuickcallHand(quickcallId);
    } else {
      this.changeMsg('Quickcall为空!');
    }
  }

  // 手动接受quickcall
  public acceptQuickcallHand(quickcallId: string) {
    this.push.acceptQuickcall(quickcallId)
      .subscribe((msg) => {
        if (isSuccess(msg)) {
          this.changeMsg(`${new Date()} ==> 接受一键呼叫{${quickcallId}成功!`);
          this.quickcall = null;
        } else {
          this.changeMsg(`${new Date()} ==> 接受一键呼叫{${quickcallId}失败! 原因: ${msg.msg}`);
        }
      });
  }

  /**
   * 拒绝一键呼叫
   * @param {QuickcallPreview} quickcall
   */
  public rejectQuickcall(quickcall: QuickcallPreview) {
    if (quickcall != null) {
      const id = quickcall.id;
      this.push.rejectQuickcall(id)
        .subscribe((msg) => {
          if (isSuccess(msg)) {
            this.changeMsg(`${new Date()} ==> 拒绝一键呼叫{${id}成功!`);
            this.quickcall = null;
          } else {
            this.changeMsg(`${new Date()} ==> 拒绝一键呼叫{${id}失败! 原因: ${msg.msg}`);
          }
        });
    } else {
      this.changeMsg('Quickcall为空!');
    }
  }

  // 修改信息
  private changeMsg(msg: string) {
    // Log
    log(msg);
    this.message = msg;
    timer(1500)
      .subscribe(() => this.message = initialMsg);
  }

  ngOnInit() {
    this.push.connect();
    this.subscription = this.push.taskObserver()
      .subscribe(payload => {
        if (payload != null) {
          switch (payload.type) {
            case TASK_PUSH:
              this.message = '当前有任务推送!';
              this.pushTask = payload.object;
              log(`任务{${this.pushTask.id}推送!`);
              break;
            case MERGE_ORDER_IN:
              this.message = '当前任务有新订单拼入!';
              log(`新订单拼入任务了!`);
              break;
            case MERGE_FINISH:
              this.message = '拼单时间结束了!';
              log(`拼单时间结束!`);
              break;
            case ALARM:
              this.message = '重新推送消息来了, 请及时处理任务推送!';
              log(`收到任务推送提醒消息`);
              break;
            case QUICK_CALL_PUSH:
              this.message = '当前有一键呼叫推送!';
              this.quickcall = payload.object;
              log(`一键呼叫{${this.quickcall.id}推送!`);
              break;
          }
        }
      });
  }

  ngOnDestroy() {
    this.push.disconnect();
  }

}
