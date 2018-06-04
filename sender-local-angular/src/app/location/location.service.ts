import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConfig} from '../config/api.config';
import {AuthService} from '../auth/auth.service';
import {SenderLocation} from './sender.location';
import {GenericMsg} from '../entity/generic-msg';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  public updateLocation(senderLocation: SenderLocation): Observable<GenericMsg<any>> {
    const url = ApiConfig.updateLocationUrl(this.auth.getSenderId());
    return this.http.post<GenericMsg<any>>(url, senderLocation);
  }
}
