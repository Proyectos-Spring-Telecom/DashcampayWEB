import { Component, Input, OnInit } from '@angular/core';
import { MailSidenavLink } from '../../interfaces/mail-sidenav-link.interface';
import { MatDrawer } from '@angular/material/sidenav';
import { VexLayoutService } from '@vex/services/vex-layout.service';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MailSidenavLinkComponent } from '../mail-sidenav-link/mail-sidenav-link.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'vex-mail-sidenav',
  templateUrl: './mail-sidenav.component.html',
  styleUrls: ['./mail-sidenav.component.scss'],
  animations: [stagger40ms, fadeInUp400ms],
  standalone: true,
  imports: [NgFor, MailSidenavLinkComponent]
})
export class MailSidenavComponent implements OnInit {
  @Input({ required: true }) drawer!: MatDrawer;

  links: MailSidenavLink[] = [
    {
      label: 'Inbox',
      route: ['./inbox'],
      icon: 'mat:inbox'
    },
    {
      label: 'All Mails',
      route: ['./all'],
      icon: 'mat:all_inbox'
    },
    {
      label: 'Starred',
      route: ['./starred'],
      icon: 'mat:star'
    },
    {
      label: 'Drafts',
      route: ['./drafts'],
      icon: 'mat:drafts'
    },
    {
      label: 'Sent',
      route: ['./sent'],
      icon: 'mat:send'
    }
  ];

  labelLinks: MailSidenavLink[] = [
    {
      label: 'Important',
      route: ['./important'],
      icon: 'mat:label_important'
    },
    {
      label: 'Business',
      route: ['./business'],
      icon: 'mat:business'
    },
    {
      label: 'Secret',
      route: ['./secret'],
      icon: 'mat:lock'
    }
  ];

  constructor(private layoutService: VexLayoutService) {}

  ngOnInit(): void {}

  closeDrawer() {
    if (this.layoutService.isLtLg()) {
      this.drawer?.close();
    }
  }
}
