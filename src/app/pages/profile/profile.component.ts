import { Component } from '@angular/core';
import { UiStateService } from '../../services/ui-state.service';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any;
  form: FormGroup;
  constructor(
    private uiState: UiStateService,
    private userService: UserService,
  ) { }
  ngOnInit() {
    setTimeout(() => {
      //this.uiState.openSidenav(false);
    }, 100);
    this.userService.getLoggedUser().subscribe((user: any) => {
      this.user = user;
      this.form = new FormGroup({
        email: new FormControl(user.email),
        sex: new FormControl(user.sex),
        age: new FormControl(user.age),
        desc: new FormControl(user.bio),
        birthday: new FormControl(user.birthday),
        religion: new FormControl(user.religion),
        address: new FormControl(user.address),
        pfp: new FormControl(user.pfp),
      })

    })
  }
  openSidenav() {
    this.uiState.openSidenav(true);
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      files.forEach(file => {

        alert("CHANGED PFP");
      })
    }
  }
}
