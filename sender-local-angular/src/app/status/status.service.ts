import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericMsg} from '../entity/generic-msg';
import {AuthService} from '../auth/auth.service';
import {ApiConfig} from '../config/api.config';
import {map} from 'rxjs/operators';

@Injectable()
export class StatusService {

  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  public getCurrentStatus(): Observable<any> {
    const CURRENT_STATUS_URL = ApiConfig.currentStatusUrl(this.auth.getSenderId());
    return this.http.get<GenericMsg<any>>(CURRENT_STATUS_URL)
      .pipe(map(msg => {
        return msg.data;
      }));
  }

  public beReady(): Observable<GenericMsg<any>> {
    return this.http.post<GenericMsg<any>>(
      ApiConfig.beReadyUrl(this.auth.getSenderId()), {});
  }

  public beResting(): Observable<GenericMsg<any>> {
    return this.http.post<GenericMsg<any>>(
      ApiConfig.beRestingUrl(this.auth.getSenderId()), {});
  }
}
