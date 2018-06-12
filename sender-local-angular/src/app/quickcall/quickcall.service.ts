import {Injectable} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {GenericMsg} from "../entity/generic-msg";
import {ApiConfig} from "../config/api.config";

@Injectable({
  providedIn: 'root'
})
export class QuickcallService {

  constructor(private auth: AuthService,
              private http: HttpClient) {
  }

  /**
   * 获取当前正在进行的一键呼叫
   * @returns {Observable<GenericMsg<any>>}
   */
  getCurrentQuickcalls() {
    const url = ApiConfig.getCurrentQuickcallsUrl(this.auth.getSenderId(), 0, 10);
    return this.http.get<GenericMsg<any>>(url);
  }

  /**
   * 设置一键呼叫为成交
   * @param {string} quickcallId
   */
  finishQuickcall(quickcallId: string) {
    const url = ApiConfig.finishQuickcallUrl(this.auth.getSenderId(), quickcallId);
    return this.http.post<GenericMsg<any>>(url, {});
  }

  /**
   * 设置一键呼叫为不成交
   * @param {string} quickcallId
   */
  nodealQuickcall(quickcallId: string) {
    const url = ApiConfig.nodealQuickcallUrl(this.auth.getSenderId(), quickcallId);
    return this.http.post<GenericMsg<any>>(url, {});
  }
}
