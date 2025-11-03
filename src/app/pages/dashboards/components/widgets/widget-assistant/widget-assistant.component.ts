import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'vex-widget-assistant',
  templateUrl: './widget-assistant.component.html',
  styleUrls: ['./widget-assistant.component.scss'],
  standalone: true,
  imports: [MatIconModule]
})
export class WidgetAssistantComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
