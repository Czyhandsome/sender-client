import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {GenericMsg} from "../entity/generic-msg";
import {ApiConfig} from "../config/api.config";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SenderInfoService {

  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  getSenderInfo(): Observable<GenericMsg<SenderInfo>> {
    const url = ApiConfig.getSenderInfoUrl(this.auth.getSenderId());
    return this.http.get<GenericMsg<SenderInfo>>(url);
  }

  changeVehicle(vehicle: string): Observable<GenericMsg<any>> {
    const url = ApiConfig.changeVehicleUrl(this.auth.getSenderId(), vehicle);
    return this.http.post<GenericMsg<any>>(url, {});
  }
}
