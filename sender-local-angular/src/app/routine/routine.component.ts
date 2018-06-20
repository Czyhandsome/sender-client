import {Component, Injectable, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Routine} from './routine';
import {RoutineService} from './routine.service';
import {Subscription, timer} from 'rxjs';
import {isSuccess} from '../entity/generic-msg';
import {AuthService} from '../auth/auth.service';
import {FlushMessageComponent} from '../flush-message/flush-message.component';
import {RoutineCommand} from "./routine-command";
import {TaskType} from "../task/task.type";

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
@Injectable()
export class RoutineComponent implements OnInit, OnDestroy {
  // 当前Routine
  currentRoutines: Array<Routine>;

  private subscription: Subscription;

  // 要发布的默认Routine
  dueTimeDelaySeconds: number = 0;
  routine: RoutineCommand = {
    beginAddress: {
      'longitude': 117.310954,
      'latitude': 31.831635,
      'addressName': '创客云谷'
    },
    endAddress: {
      'longitude': 117.282285,
      'latitude': 31.865395,
      'addressName': '三孝口'
    },
    dueTime: new Date().getTime(),
    taskTypes: [TaskType.DirectTask, TaskType.MergeTask]
  };

  // 提示消息
  @ViewChild(FlushMessageComponent)
  private flush: FlushMessageComponent;

  constructor(private routineService: RoutineService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.subscription = timer(0, 2000)
      .subscribe(() => this.updateRoutine());
  }

  private updateRoutine() {
    this.routineService.getCurrentRoutine()
      .subscribe(msg => {
        if (isSuccess(msg)) {
          this.currentRoutines = msg.data;
        } else {
          console.error('获取快递员行程失败!');
        }
      });
  }

  hasRoutine() {
    return this.currentRoutines && this.currentRoutines.length > 0;
  }

  createRoutine() {
    // 更新默认routine的预约时间
    this.routine.dueTime = new Date().getTime() + this.dueTimeDelaySeconds * 1000;
    // 发送请求
    this.routineService.publishRoutine(this.auth.getSenderId(), this.routine)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          this.changeMsg(`发布行程成功! ${JSON.stringify(msg.data)}`);
          this.updateRoutine();
        } else {
          this.changeMsg(`发布行程失败! ${msg.msg}`);
        }
      }, error => {
        this.changeMsg(`发布行程失败! ${JSON.stringify(error)}`);
      });
  }

  private changeMsg(msg: string) {
    this.flush.changeMsg(msg);
  }

  cancelRoutine(routineId: string) {
    this.routineService.cancelRoutine(this.auth.getSenderId(), routineId)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          this.changeMsg(`取消行程{${routineId}}成功! `);
        } else {
          this.changeMsg(`取消行程{${routineId}}失败! ${msg.msg}`);
        }
      }, error => {
        this.changeMsg(`取消行程{${routineId}}失败! ${JSON.stringify(error)}`);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
