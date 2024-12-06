import { Component, signal } from '@angular/core';
import { UiStateService } from '../../services/ui-state.service';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UploadService } from '../../services/upload.service';

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
    private uploadService: UploadService,
  ) { }
  ngOnInit() {
    setTimeout(() => {
      //this.uiState.openSidenav(false);
    }, 100);
    this.userService.getLoggedUser().subscribe((user: any) => {
      this.user = user;
      this.form = new FormGroup({
        email: new FormControl(user.email),
        sex: new FormControl(user.profile.sex),
        age: new FormControl(user.profile.age),
        desc: new FormControl(user.profile.bio),
        birthday: new FormControl(user.profile.birthday),
        religion: new FormControl(user.profile.religion),
        address: new FormControl(user.profile.address),
        pfp: new FormControl(user.profile.pfp ? user.profile.pfp : "notha"),
      })
    })
  }
  openSidenav() {
    this.uiState.openSidenav(true);
  }
  saveBio() {
    this.userService.updateProfile(this.user.profile.id, { data: { "bio": this.form.get("desc").value } }).subscribe(result => {
      this.uiState.openSnackBar("Saved profile changes!", {
        duration: 2 * 1000
      })
    });
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      files.forEach(file => {
        this.uploadService.uploadFile(file).subscribe((result: any) => {
          this.form.get("pfp").setValue(result.url);
          this.userService.updateProfile(this.user.profile.id, { data: { "pfp": result.url } }).subscribe(result => {
            this.uiState.openSnackBar("Saved profile changes!", {
              duration: 2 * 1000
            })
          });
        });
      })
    }
  }
}
