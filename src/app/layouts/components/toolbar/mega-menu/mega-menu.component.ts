import { Component, OnInit } from '@angular/core';
import { VexPopoverRef } from '@vex/components/vex-popover/vex-popover-ref';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export interface MegaMenuFeature {
  icon: string;
  label: string;
  route: string;
}

export interface MegaMenuPage {
  label: string;
  route: string;
}

@Component({
  selector: 'vex-mega-menu',
  templateUrl: './mega-menu.component.html',
  standalone: true,
  imports: [MatButtonModule, NgFor, RouterLink, MatIconModule]
})
export class MegaMenuComponent implements OnInit {
  features: MegaMenuFeature[] = [
    {
      icon: 'mat:layers',
      label: 'Dashboard',
      route: '/'
    },
    {
      icon: 'mat:assignment',
      label: 'AIO-Table',
      route: '/apps/aio-table'
    },
    {
      icon: 'mat:contact_support',
      label: 'Help Center',
      route: '/apps/help-center'
    },
    {
      icon: 'mat:contacts',
      label: 'Contacts',
      route: '/apps/contacts/grid'
    },
    {
      icon: 'mat:assessment',
      label: 'Scrumboard',
      route: '/apps/scrumboard/1'
    },
    {
      icon: 'mat:book',
      label: 'Documentation',
      route: '/documentation'
    }
  ];

  pages: MegaMenuPage[] = [
    {
      label: 'All-In-One Table',
      route: '/apps/aio-table'
    },
    {
      label: 'Authentication',
      route: '/login'
    },
    {
      label: 'Components',
      route: '/ui/components/overview'
    },
    {
      label: 'Documentation',
      route: '/documentation'
    },
    {
      label: 'FAQ',
      route: '/pages/faq'
    },
    {
      label: 'Form Elements',
      route: '/ui/forms/form-elements'
    },
    {
      label: 'Form Wizard',
      route: '/ui/forms/form-wizard'
    },
    {
      label: 'Guides',
      route: '/pages/guides'
    },
    {
      label: 'Help Center',
      route: '/apps/help-center'
    },
    {
      label: 'Scrumboard',
      route: '/apps/scrumboard'
    }
  ];

  constructor(private popoverRef: VexPopoverRef<MegaMenuComponent>) {}

  ngOnInit() {}

  close() {
    this.popoverRef.close();
  }
}
