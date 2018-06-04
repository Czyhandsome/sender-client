import {Component, Injectable} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';
import {ApiConfig, DOMAIN_URL} from './config/api.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  title = 'Hello Sender';

  domain_url = DOMAIN_URL;

  constructor(private auth: AuthService,
              private router: Router) {
    if (this.isAuthenticated()) {
      this.router.navigateByUrl('/main');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  changeToLocal() {
    if (!this.isAuthenticated()) {
      ApiConfig.changeToLocal();
      this.domain_url = DOMAIN_URL;
    }
  }

  changeToTest() {
    if (!this.isAuthenticated()) {
      ApiConfig.changeToTest();
      this.domain_url = DOMAIN_URL;
    }
  }
}
