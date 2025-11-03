import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CountryState } from '../../../../forms/form-elements/form-elements.component';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'vex-components-overview-autocomplete',
  templateUrl: './components-overview-autocomplete.component.html',
  styleUrls: ['./components-overview-autocomplete.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgFor,
    MatOptionModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    VexHighlightDirective,
    AsyncPipe
  ]
})
export class ComponentsOverviewAutocompleteComponent {
  // noinspection AngularInvalidTemplateReferenceVariable,AngularMissingRequiredDirectiveInputBinding
  autocompleteHTML = `<mat-input-container>
  <mat-label>State</mat-label>
  <input type="text" matInput [matAutocomplete]="auto" [formControl]="stateCtrl">
  <mat-autocomplete #auto="matAutocomplete">
    <mat-option *ngFor="let option of options" [value]="option">
      {{ option }}
    </mat-option>
  </mat-autocomplete>
</mat-input-container>
`;

  stateCtrl: UntypedFormControl = new UntypedFormControl();
  filteredStates$: Observable<CountryState[]> =
    this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this.filterStates(state) : this.states.slice()))
    );

  states: CountryState[] = [
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

  filterStates(name: string) {
    return this.states.filter(
      (state) => state.name.toLowerCase().indexOf(name.toLowerCase()) === 0
    );
  }
}
