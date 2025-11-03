import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertModalComponent } from './pages/pages/modal/alert-modal.component';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, AlertModalComponent],
})
export class AppComponent {}
