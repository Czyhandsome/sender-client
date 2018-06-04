import {LoginComponent} from '../login/login.component';
import {MainComponent} from '../main/main.component';
import {TaskPreviewComponent} from '../task/all-fetch/task-preview.component';

export class RouteConfig {
  public static appRoutes = [
    {path: 'login', component: LoginComponent},
    {
      path: 'main',
      component: MainComponent,
      children: [
        {
          path: 'all-fetch',
          component: TaskPreviewComponent
        }
      ]
    }
  ];
}
