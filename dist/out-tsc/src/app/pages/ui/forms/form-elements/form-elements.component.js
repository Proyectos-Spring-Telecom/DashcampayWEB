import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { fadeInUp400ms } from "../../../../../@vex/animations/fade-in-up.animation";
import { stagger60ms } from "../../../../../@vex/animations/stagger.animation";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VexBreadcrumbsComponent } from "../../../../../@vex/components/vex-breadcrumbs/vex-breadcrumbs.component";
import { VexSecondaryToolbarComponent } from "../../../../../@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component";
let FormElementsComponent = class FormElementsComponent {
    constructor(cd) {
        this.cd = cd;
        this.selectCtrl = new UntypedFormControl();
        this.inputType = 'password';
        this.visible = false;
        this.stateCtrl = new UntypedFormControl();
        this.states = [
            {
                name: 'Arkansas',
                population: '2.978M',
                // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
                flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
            },
            {
                name: 'California',
                population: '39.14M',
                // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
                flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
            },
            {
                name: 'Florida',
                population: '20.27M',
                // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
                flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
            },
            {
                name: 'Texas',
                population: '27.47M',
                // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
                flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
            }
        ];
        this.filteredStates$ = this.stateCtrl.valueChanges.pipe(startWith(''), map((state) => (state ? this.filterStates(state) : this.states.slice())));
    }
    ngOnInit() { }
    togglePassword() {
        if (this.visible) {
            this.inputType = 'password';
            this.visible = false;
            this.cd.markForCheck();
        }
        else {
            this.inputType = 'text';
            this.visible = true;
            this.cd.markForCheck();
        }
    }
    filterStates(name) {
        return this.states.filter((state) => state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
    }
};
FormElementsComponent = __decorate([
    Component({
        selector: 'vex-form-elements',
        templateUrl: './form-elements.component.html',
        styleUrls: ['./form-elements.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [stagger60ms, fadeInUp400ms],
        standalone: true,
        imports: [
            VexSecondaryToolbarComponent,
            VexBreadcrumbsComponent,
            MatButtonModule,
            MatIconModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatOptionModule,
            NgIf,
            ReactiveFormsModule,
            MatAutocompleteModule,
            NgFor,
            MatDatepickerModule,
            MatSliderModule,
            MatRadioModule,
            MatSlideToggleModule,
            MatCheckboxModule,
            AsyncPipe
        ]
    })
], FormElementsComponent);
export { FormElementsComponent };
//# sourceMappingURL=form-elements.component.js.map