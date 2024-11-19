import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { formGroupToFormData } from '../../utils/form';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  hidePassword = signal(true);
  loading = signal(false);
  profileForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
  })
  constructor(private auth: AuthService) { }
  onSubmit() {
    this.auth.login(formGroupToFormData(this.profileForm), this.loading);
  }
  toogleEye(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword);
    event.stopPropagation();
  }

}
