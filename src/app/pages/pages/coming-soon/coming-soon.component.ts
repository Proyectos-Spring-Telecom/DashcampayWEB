import { Component, OnInit } from '@angular/core';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'vex-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
  animations: [fadeInUp400ms],
  standalone: true,
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class ComingSoonComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
