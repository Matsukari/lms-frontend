import { ApplicationRef, Component, ComponentRef, createComponent, ElementRef, Injector, Input, Renderer2, signal, ViewChild, ViewContainerRef, WritableSignal } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { GroupAboutPanelComponent } from '../../components/group-about-panel/group-about-panel.component';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    RouterLink,
    RouterOutlet,
    GroupAboutPanelComponent,
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent {
  tabs = [
    { name: "Events", icon: "event", url: "events" },
    { name: "Tasks", icon: "task", url: "tasks" },
    { name: "Resources", icon: "task", url: "resources" },
  ];
  group: any;
  posts: any;
  activeTab: any;
  aboutPanel: ComponentRef<GroupAboutPanelComponent>;


  @Input()
  set id(groupId: string) {
    this.groupService.getGroup(groupId, true, true, true).subscribe((data: any) => {
      this.group = data;
      this.posts = data.posts;
      this.createPanel();
    });
  }
  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private appRef: ApplicationRef,
  ) { }
  ngOnInit() {
    this.route.firstChild.url.subscribe(url => {
      this.activeTab = url;
    })
  }
  createPanel() {
    const appRef = this.appRef;
    const sideContent = document.getElementById("side-content");
    const component = createComponent(GroupAboutPanelComponent, {
      environmentInjector: appRef.injector,
    })
    component.setInput("group", this.group);
    this.aboutPanel = component;
    appRef.attachView(component.hostView);
    sideContent.insertBefore(component.location.nativeElement, sideContent.firstChild);

  }
  ngOnDestroy() {
    const sideContent = document.getElementById("side-content");
    sideContent.removeChild(this.aboutPanel.location.nativeElement);
  }
  taskIsOverdue(task: any) {
    return new Date().toISOString() > task.due_at;
  }
}
