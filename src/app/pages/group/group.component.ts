import { ApplicationRef, Component, ComponentRef, createComponent, ElementRef, Injector, Input, Renderer2, signal, ViewChild, ViewContainerRef, WritableSignal } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabNav, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { GroupAboutPanelComponent } from '../../components/group-about-panel/group-about-panel.component';
import { UiStateService } from '../../services/ui-state.service';

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
    { name: "Resources", icon: "task", url: "resources" },
  ];
  group = signal(null);
  posts = signal(null);
  activeTab: any;
  aboutPanel: ComponentRef<GroupAboutPanelComponent>;
  @ViewChild("nav", {read: ElementRef}) nav!: ElementRef;


  @Input()
  set id(groupId: string) {
    this.groupService.getGroup(groupId, true, true, true).subscribe((data: any) => {
      this.group.set(data);
      this.posts.set(data.posts);
      if (this.group().type == "CLASS") {
        this.tabs.splice(1, 0, { name: "Tasks", icon: "task", url: "tasks" });
      }
      this.aboutPanel = this.ui.pushSideContentTop(GroupAboutPanelComponent, {group: this.group()});
    });
  }
  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private ui: UiStateService,
  ) { }
  ngOnInit() {
    this.route.firstChild.url.subscribe(url => {
      this.activeTab = url;
    })
    //const scroll = localStorage.getItem("groupScroll");
    //window.scrollTo(0, +scroll);
  }
  ngAfterViewInit() {
    const nav = this.nav.nativeElement as HTMLElement;
    nav.style.top = this.ui.getHeaderHeight().toString() + "px";
  }
  ngOnDestroy() {
    this.ui.popSideContent(this.aboutPanel);
  }
  taskIsOverdue(task: any) {
    return new Date().toISOString() > task.due_at;
  }
}
