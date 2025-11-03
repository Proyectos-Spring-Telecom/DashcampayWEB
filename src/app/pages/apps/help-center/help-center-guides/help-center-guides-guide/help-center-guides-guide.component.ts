import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Guide } from '../help-center-guides.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'vex-help-center-guides-guide',
  templateUrl: './help-center-guides-guide.component.html',
  styleUrls: ['./help-center-guides-guide.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatDividerModule]
})
export class HelpCenterGuidesGuideComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public guide: Guide) {}

  ngOnInit() {}
}
