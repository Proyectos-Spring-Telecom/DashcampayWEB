import { Component } from '@angular/core';

@Component({
  selector: 'vex-breadcrumb',
  template: ` <ng-content></ng-content> `,
  styles: [],
  host: {
    class:
      'vex-breadcrumb body-2 text-hint leading-none hover:text-primary-600 no-underline transition duration-400 ease-out-swift'
  },
  standalone: true
})
export class VexBreadcrumbComponent {}
