import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {GenericMsg} from '../entity/generic-msg';
import {TokenObject} from './token-object';
import {ApiConfig} from '../config/api.config';
import {Router} from '@angular/router';

const storage = sessionStorage;

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  // 执行登录
  public doLogin(phonenumber: string, password: string): Observable<string> {
    return this.http.post<GenericMsg<TokenObject>>(ApiConfig.authUrl(), {
      phonenumber: phonenumber,
      password: password
    }).pipe(map(msg => {
      const data = msg.data;
      this.saveToken(
        data.senderId,
        data.tokenObject.access_token,
        data.tokenObject.expires_in,
        data.tokenObject.expires_in
      );
      return 'success';
    }, error => {
      throw new Error('登录失败!原因: ' + error);
    }));
  }

  // 执行取消登录
  public logout() {
    this.removeToken();
    this.router.navigateByUrl('/login');
  }

  // 保存token
  private saveToken(id, token, refreshToken, expiresIn) {
    storage.setItem('id', id);
    storage.setItem('token', token);
    storage.setItem('refresh_token', refreshToken);
    const expireTime = String(new Date().getTime() + expiresIn * 1000);
    storage.setItem('expire_time', expireTime);
  }

  private removeToken() {
    storage.removeItem('id');
    storage.removeItem('token');
    storage.removeItem('refresh_token');
    storage.removeItem('expire_time');
  }

  // 获取token
  public getToken(): string {
    return storage.getItem('token');
  }

  // 获取快递员id
  public getSenderId(): string {
    return storage.getItem('id');
  }

  // 是否已经授权
  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (token == null) {
      return false;
    }
    const now = new Date().getTime();
    return now < Number(storage.getItem('expire_time'));
  }
}
