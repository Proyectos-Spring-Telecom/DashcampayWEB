import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'vex-toolbar-search',
  templateUrl: './toolbar-search.component.html',
  styleUrls: ['./toolbar-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule]
})
export class ToolbarSearchComponent implements OnInit {
  isOpen: boolean = false;

  @ViewChild('input', { read: ElementRef, static: true }) input?: ElementRef;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  open() {
    this.isOpen = true;
    this.cd.markForCheck();

    setTimeout(() => {
      this.input?.nativeElement.focus();
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.cd.markForCheck();
  }
}
