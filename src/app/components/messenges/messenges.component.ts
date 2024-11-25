import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-messenges',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './messenges.component.html',
  styleUrl: './messenges.component.scss'
})
export class MessengesComponent {
  user: any;
  constructor(
    private userService: UserService,
  ) { }
  ngOnInit() {
    this.userService.getLoggedUser().subscribe((user: any) => {
      this.user = user;
    })
  }
}
