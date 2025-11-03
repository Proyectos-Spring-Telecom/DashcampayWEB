import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'vex-config-panel-toggle',
  templateUrl: './config-panel-toggle.component.html',
  styleUrls: ['./config-panel-toggle.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule]
})
export class ConfigPanelToggleComponent implements OnInit {
  @Output() openConfig = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
