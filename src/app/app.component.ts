import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiStateService } from './services/ui-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(
    private uiState: UiStateService
  ) {}
  ngOnInit() {
    this.uiState.init();
  }
}
