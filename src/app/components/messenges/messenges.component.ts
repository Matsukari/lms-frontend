import { Component, ComponentRef, Input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../../pipes/TimeAgoPipe';
import { ChatroomComponent } from '../chatroom/chatroom.component';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'app-messenges',
  standalone: true,
  imports: [
    MatIconModule,
    TimeAgoPipe,
    ChatroomComponent,
  ],
  templateUrl: './messenges.component.html',
  styleUrl: './messenges.component.scss'
})
export class MessengesComponent {
  @Input() chatrooms: any;
  selectedRoom = signal(null);
  displayedRooms = signal([]);
  maxItemsDisplay = 10;
  chatRoom: ComponentRef<ChatroomComponent>;

  constructor(
    private ui: UiStateService,
  ) { }
  ngOnInit() {
    const reduced = this.chatrooms.slice(0, Math.min(this.chatrooms.length, this.maxItemsDisplay));
    this.displayedRooms.set(reduced);
  }
  showMoreRooms() {
    const more = this.chatrooms.slice(0, Math.min(this.chatrooms.length, this.displayedRooms().length + this.maxItemsDisplay));
    this.displayedRooms.set(more);
  }
  canBeExpanded() {
    return this.chatrooms.length > this.displayedRooms().length;
  }
  selectRoom(item: any) {
    const component = this.ui.pushAcrossHtml("view-content", ChatroomComponent, { room: item }, (component, where) => {
      where.insertBefore(component.location.nativeElement, where.firstChild);
    })
    component.instance.close.subscribe(() => {
      this.ui.popChildAcrossHtml("view-content", component);
    });
  }

}
