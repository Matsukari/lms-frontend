import { Component } from '@angular/core';
import { UiStateService } from '../../services/ui-state.service';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any;
  form = new FormGroup({
    email: new FormControl(""),
    mobile: new FormControl(),
    address: new FormControl(""),
    pfp: new FormControl(""),
  })
  constructor(
    private uiState: UiStateService,
    private userService: UserService,
  ) {}
  ngOnInit() {
    setTimeout(()=>{
      //this.uiState.openSidenav(false);
    }, 100);
    this.userService.getLoggedUser().subscribe((user: any)=>{
      this.user = user;
    })
  }
  openSidenav() {
    this.uiState.openSidenav(true);
  }
}
