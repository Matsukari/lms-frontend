import { Component, signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { getServerFile } from '../../../utils/server';
import { environment } from '../../../../environments/environment.development';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent {
  dean = signal(null);
  teachers = signal(null);
  constructor(
    private userService: UserService,
  ) {}
  ngOnInit() {
    this.userService.getUser("dean").subscribe((data: any) => {
      this.dean.set(data);
    });
    this.userService.getAllUsersByRole("TEACHER").subscribe((data: any) => {
      this.teachers.set(data);
    });
  }
  serverFile(file: string) {
    return getServerFile(file);
  }
  teacherFile(file: string) {
    return environment.apiUrl + "/static/images/" + file;
  }
  handleNoImage(event: Event) {
    const element = event.target as HTMLElement;
    element.hidden = true;
    (element.nextElementSibling as HTMLElement).hidden = false;
  }
}
