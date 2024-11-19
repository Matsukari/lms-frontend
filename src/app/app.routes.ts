import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ViewComponent } from './layout/view/view.component';
import { GroupComponent } from './pages/group/group.component';
import { TaskComponent } from './pages/task/task.component';
import { PostComponent } from './pages/post/post.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: "",
    component: ViewComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "home", component: HomeComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "group/:id", component: GroupComponent },
      { path: "post/:id", component: PostComponent },
      { path: "task/:id", component: TaskComponent },
    ]
  },
  { path: "login", component: LoginComponent },
];
