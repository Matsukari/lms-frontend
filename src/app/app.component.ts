import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiStateService } from './services/ui-state.service';
import { NavigationService } from './services/navigation.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private uiState: UiStateService,
    private navigation: NavigationService,
  ) {}
  ngOnInit() {
    this.uiState.init();
    this.navigation.init();
    //this.user.init();
  }
}
