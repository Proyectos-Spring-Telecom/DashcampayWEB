import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { Mail } from '../../interfaces/mail.interface';
import {
  MatCheckboxChange,
  MatCheckboxModule
} from '@angular/material/checkbox';
import { MailService } from '../../services/mail.service';
import { VexStripHtmlPipe } from '@vex/pipes/vex-strip-html/vex-strip-html.pipe';
import { VexDateFormatRelativePipe } from '@vex/pipes/vex-date-format-relative/vex-date-format-relative.pipe';
import { MailLabelComponent } from '../mail-label/mail-label.component';
import { NgClass, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'vex-mail-list-entry',
  templateUrl: './mail-list-entry.component.html',
  styleUrls: ['./mail-list-entry.component.scss'],
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    MatCheckboxModule,
    MatRippleModule,
    MatIconModule,
    NgClass,
    NgFor,
    MailLabelComponent,
    VexDateFormatRelativePipe,
    VexStripHtmlPipe
  ]
})
export class MailListEntryComponent implements OnInit {
  @Input({ required: true }) mail!: Mail;
  @Input() selected: boolean = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  hovered: boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    private mailService: MailService
  ) {}

  ngOnInit(): void {}

  isCheckboxVisible() {
    return this.selected || this.hovered;
  }

  isStarVisible() {
    return this.mail?.starred || this.isCheckboxVisible();
  }

  onMouseEnter() {
    this.hovered = true;
    this.cd.markForCheck();
  }

  onMouseLeave() {
    this.hovered = false;
    this.cd.markForCheck();
  }

  onCheckboxChange(event: MatCheckboxChange) {
    this.selectedChange.emit(event.checked);
  }

  toggleStar(event: MouseEvent) {
    event?.preventDefault();
    event?.stopPropagation();

    this.mail.starred = !this.mail.starred;
    this.cd.markForCheck();
  }

  markMailAsRead(mailId: Mail['id']) {
    this.mailService.markMailAsRead(mailId);
  }
}
