import {Injectable} from '@angular/core';
import {ApiConfig} from '../config/api.config';
import {AuthService} from '../auth/auth.service';
import {webSocket, WebSocketSubject, WebSocketSubjectConfig} from 'rxjs/webSocket';
import {Observable} from 'rxjs/Observable';
import {filter, map} from 'rxjs/operators';
import {PayloadObject} from '../entity/payload.object';
import {HttpClient} from '@angular/common/http';
import {GenericMsg} from '../entity/generic-msg';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  private subject: WebSocketSubject<PayloadObject<any>>;

  constructor(private auth: AuthService,
              private http: HttpClient) {
  }

  public connect() {
    const config: WebSocketSubjectConfig<PayloadObject<any>> = {
      url: ApiConfig.WEBSOCKET_URL(this.auth.getSenderId()),
      serializer: payload => JSON.stringify(payload),
      deserializer: event => {
        try {
          const data = event.data;
          return JSON.parse(data);
        } catch (error) {
          return null;
        }
      }
    };
    this.subject = webSocket(config);
  }

  public taskObserver(): Observable<PayloadObject<any>> {
    return this.subject;
  }

  public disconnect() {
    this.subject.unsubscribe();
  }

  /**
   * 接受任务
   * @param {string} taskId 任务id
   */
  public accept(taskId: string): Observable<GenericMsg<any>> {
    const url = ApiConfig.acceptTaskUrl(this.auth.getSenderId(), taskId);
    return this.http.post<GenericMsg<any>>(url, {});
  }

  /**
   * 拒绝任务
   * @param {string} taskId 任务id
   */
  public reject(taskId: string): Observable<GenericMsg<any>> {
    const url = ApiConfig.rejectTaskUrl(this.auth.getSenderId(), taskId);
    return this.http.post<GenericMsg<any>>(url, {});
  }
}
