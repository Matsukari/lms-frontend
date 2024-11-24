import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ViewComponent } from './layout/view/view.component';
import { GroupComponent } from './pages/group/group.component';
import { TaskComponent } from './pages/task/task.component';
import { PostComponent } from './pages/post/post.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResourcesComponent } from './components/group/resources/resources.component';
import { TasksComponent } from './components/group/tasks/tasks.component';
import { EventsComponent } from './components/group/events/events.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MediaComponent } from './pages/media/media.component';
import { LiveComponent } from './pages/live/live.component';
import { SchoolComponent } from './pages/school/school.component';

export const routes: Routes = [
  {
    path: "",
    component: ViewComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "profile", component: ProfileComponent },
      { path: "school", component: SchoolComponent },
      {
        path: "group/:id", component: GroupComponent, children: [
          { path: "", redirectTo: "events", pathMatch: "full" },
          { path: "tasks", component: TasksComponent },
          { path: "resources", component: ResourcesComponent },
          { path: "events", component: EventsComponent },
        ]
      },
      { path: "post/:id", component: PostComponent },
      { path: "task/:id", component: TaskComponent },
      {
        path: "", component: HomeComponent, children: [
          { path: "", redirectTo: "community", pathMatch: "full" },
          { path: "community", component: MediaComponent },
          { path: "live", component: LiveComponent },
        ]
      },
    ]
  },
  { path: "login", component: LoginComponent },
];
