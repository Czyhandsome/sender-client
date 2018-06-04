import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Injectable} from '@angular/core';
import {GenericMsg} from '../entity/generic-msg';
import {ApiConfig} from '../config/api.config';
import {map} from 'rxjs/operators';
import {CurrentTask} from './current-task';
import {TaskDto} from './task.dto';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  // 获取当前的任务
  public getCurrentTask(): Observable<CurrentTask> {
    const CURRENT_TASK_URL = ApiConfig.currentTaskUrl(this.auth.getSenderId());
    return this.http.get<GenericMsg<CurrentTask>>(CURRENT_TASK_URL)
      .pipe(map(msg => msg.data));
  }

  // 获取所有要取的订单
  public getAllFetch(taskId: string): Observable<TaskDto> {
    const url = ApiConfig.getAllFetchOrdersUrl(this.auth.getSenderId(), taskId);
    return this.http.get<GenericMsg<TaskDto>>(url)
      .pipe(map(msg => msg.data));
  }

  // 获取所有要送的订单
  public getAllSend(taskId: string): Observable<TaskDto> {
    const url = ApiConfig.getAllSendOrdersUrl(this.auth.getSenderId(), taskId);
    return this.http.get<GenericMsg<TaskDto>>(url)
      .pipe(map(msg => msg.data));
  }

  // 开始取件
  public startFetchOrder(taskId: string, orderId: string)
    : Observable<GenericMsg<any>> {
    const url = ApiConfig.startFetchOrderUrl(
      this.auth.getSenderId(), taskId, orderId
    );
    return this.http.post<GenericMsg<any>>(url, {});
  }

  // 结束取件
  public endFetchOrder(taskId: string, orderId: string, file: File)
    : Observable<GenericMsg<any>> {
    const url = ApiConfig.endFetchOrderUrl(
      this.auth.getSenderId(), taskId, orderId
    );
    const data = new FormData();
    data.append('orderPhoto', file);
    return this.http.post<GenericMsg<any>>(url, data);
  }

  // 开始送件
  public startSendOrder(taskId: string, orderId: string)
    : Observable<GenericMsg<any>> {
    const url = ApiConfig.startSendOrderUrl(
      this.auth.getSenderId(), taskId, orderId
    );
    return this.http.post<GenericMsg<any>>(url, {});
  }

  // 验证快递员
  public verifyReceiver(taskId: string, orderId: string, code: string)
    : Observable<GenericMsg<any>> {
    const url = ApiConfig.verifyReceiverUrl(
      this.auth.getSenderId(), taskId, orderId, code
    );
    return this.http.post<GenericMsg<any>>(url, {});
  }

  // 结束送件
  public endSendOrder(taskId: string, orderId: string)
    : Observable<GenericMsg<any>> {
    const url = ApiConfig.endSendOrderUrl(
      this.auth.getSenderId(), taskId, orderId
    );
    return this.http.post<GenericMsg<any>>(url, {});
  }
}
