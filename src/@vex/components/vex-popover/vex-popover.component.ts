import { Component, OnInit, TemplateRef } from '@angular/core';
import { VexPopoverContent, VexPopoverRef } from './vex-popover-ref';
import { popoverAnimation } from '../../animations/popover.animation';
import {
  NgComponentOutlet,
  NgSwitch,
  NgSwitchCase,
  NgTemplateOutlet
} from '@angular/common';

@Component({
  selector: 'vex-popover',
  templateUrl: './vex-popover.component.html',
  styleUrls: ['./vex-popover.component.scss'],
  animations: [popoverAnimation],
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgTemplateOutlet, NgComponentOutlet]
})
export class VexPopoverComponent implements OnInit {
  renderMethod: 'template' | 'component' | 'text' = 'component';
  content: VexPopoverContent;
  context: any;

  constructor(private popoverRef: VexPopoverRef) {}

  ngOnInit() {
    this.content = this.popoverRef.content;

    if (typeof this.content === 'string') {
      this.renderMethod = 'text';
    }

    if (this.content instanceof TemplateRef) {
      this.renderMethod = 'template';
      this.context = {
        close: this.popoverRef.close.bind(this.popoverRef)
      };
    }
  }
}
