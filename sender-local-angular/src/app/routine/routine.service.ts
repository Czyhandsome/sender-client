import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ApiConfig} from '../config/api.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericMsg} from '../entity/generic-msg';
import {TaskType} from '../task/task.type';
import {RoutineCommand} from './routine-command';

@Injectable()
export class RoutineService {

  constructor(private auth: AuthService,
              private http: HttpClient) {
  }

  // 获取当前的行程
  getCurrentRoutine(): Observable<GenericMsg<any>> {
    const url = ApiConfig.currentRoutineUrl(this.auth.getSenderId());
    return this.http.get<GenericMsg<any>>(url);
  }

  // 发布行程
  public publishRoutine(senderId: string): Observable<GenericMsg<any>> {
    const url = ApiConfig.createRoutineUrl(senderId);
    const routine: RoutineCommand = {
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
      dueTime: new Date().getTime() + 1000 * 60 * 5 + 1000 * 10,
      taskTypes: [TaskType.DirectTask, TaskType.MergeTask]
    };
    return this.http.post<GenericMsg<any>>(url, routine);
  }

  // 取消行程
  cancelRoutine(senderId: string, routineId: string)
    : Observable<GenericMsg<any>> {
    const url = ApiConfig.cancelRoutineUrl(senderId, routineId);
    return this.http.post<GenericMsg<any>>(url, {});
  }
}
