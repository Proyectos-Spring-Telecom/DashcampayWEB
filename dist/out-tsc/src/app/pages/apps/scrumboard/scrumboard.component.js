var ScrumboardComponent_1;
import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CdkDrag, CdkDragHandle, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { trackById } from "../../../../@vex/utils/track-by";
import { scrumboards, scrumboardUsers } from '../../../../static-data/scrumboard';
import { ScrumboardDialogComponent } from './components/scrumboard-dialog/scrumboard-dialog.component';
import { filter, map } from 'rxjs/operators';
import { FormControl, FormGroup, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { stagger80ms } from "../../../../@vex/animations/stagger.animation";
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import { VexDateFormatTokensPipe } from "../../../../@vex/pipes/vex-date-format-tokens/vex-date-format-tokens.pipe";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VexScrollbarComponent } from "../../../../@vex/components/vex-scrollbar/vex-scrollbar.component";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VexSecondaryToolbarComponent } from "../../../../@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component";
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
let ScrumboardComponent = class ScrumboardComponent {
    static { ScrumboardComponent_1 = this; }
    static { this.nextId = 100; }
    constructor(dialog, route, popover, configService) {
        this.dialog = dialog;
        this.route = route;
        this.popover = popover;
        this.configService = configService;
        this.board$ = this.route.paramMap.pipe(map((paramMap) => paramMap.get('scrumboardId')), map((scrumboardId) => scrumboardId != null ? Number.parseInt(scrumboardId) : undefined), map((scrumboardId) => scrumboards.find((board) => board.id === scrumboardId)));
        this.addCardCtrl = new UntypedFormControl();
        this.addCardForm = new FormGroup({
            title: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required]
            })
        });
        this.addListCtrl = new UntypedFormControl();
        this.isVerticalLayout$ = this.configService.select((config) => config.layout === 'vertical');
        this.trackById = trackById;
        this.scrumboardUsers = scrumboardUsers;
    }
    ngOnInit() { }
    open(board, list, card) {
        this.addCardForm.reset();
        this.dialog
            .open(ScrumboardDialogComponent, {
            data: { card, list, board },
            width: '700px',
            maxWidth: '100%',
            disableClose: false
        })
            .beforeClosed()
            .pipe(filter(Boolean))
            .subscribe((value) => {
            const index = list.children.findIndex((child) => child.id === card.id);
            if (index > -1) {
                list.children[index] = value;
            }
        });
    }
    drop(event) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
    }
    dropList(event) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        }
    }
    getConnectedList(board) {
        return board.children.map((x) => `${x.id}`);
    }
    openAddCard(list, content, origin) {
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
    openAddList(board, content, origin) {
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
    createCard(list, close) {
        if (this.addCardForm.invalid) {
            return;
        }
        const form = this.addCardForm.getRawValue();
        list.children.push({
            id: ScrumboardComponent_1.nextId++,
            title: form.title
        });
        close();
        this.addCardForm.reset();
    }
    createList(board, close) {
        if (!this.addListCtrl.value) {
            return;
        }
        board.children.push({
            id: ScrumboardComponent_1.nextId++,
            label: this.addListCtrl.value,
            children: []
        });
        close();
        this.addListCtrl.setValue(null);
    }
    toggleStar(board) {
        board.starred = !board.starred;
    }
};
ScrumboardComponent = ScrumboardComponent_1 = __decorate([
    Component({
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
], ScrumboardComponent);
export { ScrumboardComponent };
//# sourceMappingURL=scrumboard.component.js.map