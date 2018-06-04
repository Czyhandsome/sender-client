import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import {TaskService} from './task/task.service';
import {TaskComponent} from './task/task.component';
import {StatusService} from './status/status.service';
import {StatusComponent} from './status/status.component';
import {FormsModule} from '@angular/forms';
import {AuthInterceptor} from './auth/auth.interceptor';
import {RouterModule} from '@angular/router';
import {RouteConfig} from './router/route.config';
import {LoginComponent} from './login/login.component';
import {RoutineComponent} from './routine/routine.component';
import {MainComponent} from './main/main.component';
import {RoutineService} from './routine/routine.service';
import {PushComponent} from './push/push.component';
import {TaskPreviewComponent} from './task/all-fetch/task-preview.component';
import { MassImportComponent } from './mass-import/mass-import.component';
import { FlushMessageComponent } from './flush-message/flush-message.component';
import { LocationComponent } from './location/location.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    StatusComponent,
    LoginComponent,
    RoutineComponent,
    MainComponent,
    PushComponent,
    TaskPreviewComponent,
    MassImportComponent,
    FlushMessageComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      RouteConfig.appRoutes
    )
  ],
  providers: [
    AuthService,
    TaskService,
    StatusService,
    RoutineService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
