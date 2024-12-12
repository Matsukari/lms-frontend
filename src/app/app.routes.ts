import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SocialComponent } from './pages/social/social.component';
import { AuthGuard } from './guards/auth.guard';
import { ViewComponent } from './layout/view/view.component';
import { GroupComponent } from './pages/group/group.component';
import { TaskComponent } from './pages/task/task.component';
import { PostComponent } from './pages/post/post.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ResourcesComponent as GroupResourcesComponent } from './components/group/resources/resources.component';
import { ResourcesComponent as SchoolResourcesComponent } from './components/school/resources/resources.component';
import { ResourcesComponent as UserResourcesComponent } from './pages/resources/resources.component';
import { TasksComponent } from './components/group/tasks/tasks.component';
import { EventsComponent } from './components/group/events/events.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CommunityComponent } from './pages/community/community.component';
import { LiveComponent } from './pages/live/live.component';
import { SchoolComponent } from './pages/school/school.component';
import { CommentsComponent } from './pages/task/comments/comments.component';
import { SubmissionsComponent } from './pages/task/submissions/submissions.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { UpdatesComponent as SchoolUpdatesComponent } from './components/school/updates/updates.component';
import { AboutComponent as SchoolAboutComponent } from './components/school/about/about.component';
import { StaffComponent } from './components/school/staff/staff.component';
import { StudentComponent as SchoolStudentComponent } from './components/school/student/student.component';

export const routes: Routes = [
  {
    path: "",
    component: ViewComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "profile", component: ProfileComponent },
      { path: "resources", component: UserResourcesComponent },
      {
        path: "school", component: SchoolComponent, children: [
          { path: "", redirectTo: "updates", pathMatch: "full" },
          { path: "updates", component: SchoolUpdatesComponent, data: { icon: "person_play" } },
          { path: "about", component: SchoolAboutComponent, data: { icon: "account_tree" } },
          { path: "staff", component: StaffComponent, data: { icon: "groups_2" } },
          { path: "student", component: SchoolStudentComponent, data: { icon: "groups_2" } },
          { path: "resources", component: SchoolResourcesComponent, data: { icon: "groups_2" } },
        ]
      },
      {
        path: "groups", component: GroupsComponent, children: [
          { path: "", redirectTo: "clubs", pathMatch: "full" },
          { path: "clubs", component: GroupListComponent, data: { type: "CLUB", icon: "person_play" } },
          { path: "orgs", component: GroupListComponent, data: { type: "ORGANIZATION", icon: "account_tree" } },
          { path: "customs", component: GroupListComponent, data: { type: "CASUAL", icon: "groups_2" } },
        ]
      },
      {
        path: "group/:id", component: GroupComponent, children: [
          { path: "", redirectTo: "events", pathMatch: "full" },
          { path: "tasks", component: TasksComponent },
          { path: "resources", component: GroupResourcesComponent },
          { path: "events", component: EventsComponent },
        ]
      },
      { path: "post/:id", component: PostComponent },
      {
        path: "task/:id", component: TaskComponent, children: [
          { path: "", redirectTo: "comments", pathMatch: "full" },
          { path: "comments", component: CommentsComponent },
          { path: "submissions", component: SubmissionsComponent },
        ]
      },
      {
        path: "social", component: SocialComponent, children: [
          { path: "", redirectTo: "community", pathMatch: "full" },
          { path: "community", component: CommunityComponent },
          { path: "live", component: LiveComponent },
        ]
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ]
  },
  { path: "login", component: LoginComponent },
];
