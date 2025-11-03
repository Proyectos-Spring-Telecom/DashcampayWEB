import { Component, Input, OnInit } from '@angular/core';
import { MailSidenavLink } from '../../interfaces/mail-sidenav-link.interface';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'vex-mail-sidenav-link',
  templateUrl: './mail-sidenav-link.component.html',
  styleUrls: ['./mail-sidenav-link.component.scss'],
  standalone: true,
  imports: [MatRippleModule, RouterLinkActive, RouterLink, MatIconModule]
})
export class MailSidenavLinkComponent implements OnInit {
  @Input({ required: true }) link!: MailSidenavLink;

  constructor() {}

  ngOnInit(): void {}
}
