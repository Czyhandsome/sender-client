import {Component, Injectable, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PushService} from './push.service';
import {Subscription} from 'rxjs/Subscription';
import {TaskPreview} from './task.preview';
import {isSuccess} from '../entity/generic-msg';
import {ALARM, MERGE_FINISH, MERGE_ORDER_IN, QUICK_CALL_PUSH, TASK_PUSH} from '../entity/payload.object';
import {log} from '../logger';
import {QuickcallPreview} from "./quickcall-preview";
import {CurrentPushingPreview} from "./current-pushing-preview";
import {FlushMessageComponent} from "../flush-message/flush-message.component";

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.css']
})
@Injectable()
export class PushComponent implements OnInit, OnDestroy {
  public pushTask: TaskPreview;
  public quickcall: QuickcallPreview;

  // 通知闪烁消息
  @ViewChild(FlushMessageComponent)
  private flush: FlushMessageComponent;

  // 手动接受任务输入的id
  handTaskId: string;
  // 手动接受一键呼叫输入的id
  handQuickcallId: string;

  private subscription: Subscription;

  constructor(private pushService: PushService) {
  }

  // 手动获取当前推送的任务或一键呼叫
  public handUpdateTaskOrQuickcall() {
    this.pushService.getCurrentPushing()
      .subscribe(gMsg => {
        if (isSuccess(gMsg)) {
          this.updatePushing(gMsg.data);
        } else {
          log(gMsg.msg);
        }
      }, error => {
        log(JSON.stringify(error));
      });
  }

  private updatePushing(gMsg: CurrentPushingPreview) {
    if (gMsg.taskPreview != null) {
      this.newTaskPush(gMsg.taskPreview);
    } else if (gMsg.quickcallPreview != null) {
      this.newQuickcallPush(gMsg.quickcallPreview);
    } else {
      this.changeMsg('当前没有推送数据');
    }
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
    this.pushService.acceptTask(taskId)
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
      this.pushService.rejectTask(this.pushTask.id)
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
    this.pushService.acceptQuickcall(quickcallId)
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
      this.pushService.rejectQuickcall(id)
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
    // Flush
    this.flush.changeMsg(msg);
  }

  ngOnInit() {
    this.pushService.connect();
    this.subscription = this.pushService.taskObserver()
      .subscribe(payload => {
        if (payload != null) {
          switch (payload.type) {
            case TASK_PUSH:
              this.newTaskPush(payload.object);
              break;
            case QUICK_CALL_PUSH:
              this.newQuickcallPush(payload.object);
              break;
            case MERGE_ORDER_IN:
              this.changeMsg('当前任务有新订单拼入!');
              break;
            case MERGE_FINISH:
              this.changeMsg('拼单时间结束了!');
              break;
            case ALARM:
              this.changeMsg('重新推送消息来了, 请及时处理任务推送!');
              break;
          }
        }
      });
  }

  // 处理新任务推送
  private newTaskPush(task: TaskPreview) {
    this.pushTask = task;
    this.changeMsg(`任务{${this.pushTask.id}推送!`);
  }

  // 处理新一键呼叫推送
  private newQuickcallPush(quickcall: QuickcallPreview) {
    this.quickcall = quickcall;
    this.changeMsg(`一键呼叫{${this.quickcall.id}推送!`);
  }

  ngOnDestroy() {
    this.pushService.disconnect();
  }

}
