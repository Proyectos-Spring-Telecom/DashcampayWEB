import { Component, OnInit, TemplateRef } from '@angular/core';
import { ScrumboardList } from './interfaces/scrumboard-list.interface';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { ScrumboardCard } from './interfaces/scrumboard-card.interface';
import { trackById } from '@vex/utils/track-by';
import {
  scrumboards,
  scrumboardUsers
} from '../../../../static-data/scrumboard';
import { MatDialog } from '@angular/material/dialog';
import { ScrumboardDialogComponent } from './components/scrumboard-dialog/scrumboard-dialog.component';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Scrumboard } from './interfaces/scrumboard.interface';
import { VexPopoverService } from '@vex/components/vex-popover/vex-popover.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormControl,
  Validators
} from '@angular/forms';
import { stagger80ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { VexConfigService } from '@vex/config/vex-config.service';
import { Observable } from 'rxjs';
import { VexDateFormatTokensPipe } from '@vex/pipes/vex-date-format-tokens/vex-date-format-tokens.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VexScrollbarComponent } from '@vex/components/vex-scrollbar/vex-scrollbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'vex-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss'],
  animations: [stagger80ms, fadeInUp400ms],
  standalone: true,
  imports: [
    NgIf,
    VexSecondaryToolbarComponent,
    MatButtonModule,
    MatIconModule,
    NgFor,
    MatTooltipModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    CdkDragHandle,
    VexScrollbarComponent,
    NgClass,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AsyncPipe,
    VexDateFormatTokensPipe
  ]
})
export class ScrumboardComponent implements OnInit {
  static nextId = 100;

  board$ = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get('scrumboardId')),
    map((scrumboardId) =>
      scrumboardId != null ? Number.parseInt(scrumboardId) : undefined
    ),
    map((scrumboardId) =>
      scrumboards.find((board) => board.id === scrumboardId)
    )
  );

  addCardCtrl = new UntypedFormControl();
  addCardForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });
  addListCtrl = new UntypedFormControl();

  isVerticalLayout$: Observable<boolean> = this.configService.select(
    (config) => config.layout === 'vertical'
  );

  trackById = trackById;

  scrumboardUsers = scrumboardUsers;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private popover: VexPopoverService,
    private readonly configService: VexConfigService
  ) {}

  ngOnInit() {}

  open(board: Scrumboard, list: ScrumboardList, card: ScrumboardCard) {
    this.addCardForm.reset();

    this.dialog
      .open(ScrumboardDialogComponent, {
        data: { card, list, board },
        width: '700px',
        maxWidth: '100%',
        disableClose: false
      })
      .beforeClosed()
      .pipe(filter<ScrumboardCard>(Boolean))
      .subscribe((value) => {
        const index = list.children.findIndex((child) => child.id === card.id);
        if (index > -1) {
          list.children[index] = value;
        }
      });
  }

  drop(event: CdkDragDrop<ScrumboardCard[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  dropList(event: CdkDragDrop<ScrumboardList[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getConnectedList(board: Scrumboard) {
    return board.children.map((x) => `${x.id}`);
  }

  openAddCard(
    list: ScrumboardList,
    content: TemplateRef<any>,
    origin: HTMLElement
  ) {
    this.popover.open({
      content,
      origin,
      position: [
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top'
        }
      ]
    });
  }

  openAddList(
    board: Scrumboard,
    content: TemplateRef<any>,
    origin: HTMLElement
  ) {
    this.popover.open({
      content,
      origin,
      position: [
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top'
        },
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top'
        }
      ]
    });
  }

  createCard(list: ScrumboardList, close: () => void) {
    if (this.addCardForm.invalid) {
      return;
    }

    const form = this.addCardForm.getRawValue();

    list.children.push({
      id: ScrumboardComponent.nextId++,
      title: form.title
    });

    close();

    this.addCardForm.reset();
  }

  createList(board: Scrumboard, close: () => void) {
    if (!this.addListCtrl.value) {
      return;
    }

    board.children.push({
      id: ScrumboardComponent.nextId++,
      label: this.addListCtrl.value,
      children: []
    });

    close();

    this.addListCtrl.setValue(null);
  }

  toggleStar(board: Scrumboard) {
    board.starred = !board.starred;
  }
}
