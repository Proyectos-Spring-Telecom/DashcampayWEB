import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'vex-components-overview-snack-bar',
  templateUrl: './components-overview-snack-bar.component.html',
  styleUrls: ['./components-overview-snack-bar.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatTabsModule, VexHighlightDirective]
})
export class ComponentsOverviewSnackBarComponent implements OnInit {
  snackbarHTML = `<button mat-raised-button (click)="openSnackbar()">TRIGGER SNACKBAR</button>`;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {}

  openSnackbar() {
    this.snackBar.open("I'm a notification!", 'CLOSE', {
      duration: 3000,
      horizontalPosition: 'right'
    });
  }
}
