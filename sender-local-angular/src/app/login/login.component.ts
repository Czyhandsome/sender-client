import {Component, Injectable, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {log} from '../logger';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {
  senders = [
    {phone: '18949203682', password: '123456'},
    {phone: '13966716001', password: '123456'},
    {phone: '18226626306', password: '123456'},
    {phone: '18855998280', password: '123456'},
    {phone: '15956960191', password: '123456'}
  ];

  phonenumber: string;
  password: string;

  errorMsg: string;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  doLogin() {
    this.doLoginFor(this.phonenumber, this.password);
  }

  doLoginFor(phone, password) {
    this.auth.doLogin(phone, password)
      .subscribe(() => {
        this.router.navigateByUrl('/main');
      }, error => {
        log(JSON.stringify(error));
        this.errorMsg = '登录失败!';
      });
  }
}
