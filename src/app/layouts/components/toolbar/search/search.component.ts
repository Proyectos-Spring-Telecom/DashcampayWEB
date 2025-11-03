import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { VexLayoutService } from '@vex/services/vex-layout.service';
import { filter } from 'rxjs/operators';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { SearchService } from './search.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'vex-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe
  ]
})
export class SearchComponent implements OnInit, OnDestroy {
  show$ = this.layoutService.searchOpen$;
  searchCtrl = new UntypedFormControl();

  @ViewChild('searchInput', { static: true }) input?: ElementRef;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private layoutService: VexLayoutService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.searchService.isOpenSubject.next(true);
    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.searchService.valueChangesSubject.next(value));

    this.show$
      .pipe(
        filter((show) => show),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.input?.nativeElement.focus());
  }

  close() {
    this.layoutService.closeSearch();
    this.searchCtrl.setValue(undefined);
    this.searchService.isOpenSubject.next(false);
  }

  search() {
    this.searchService.submitSubject.next(this.searchCtrl.value);
    this.close();
  }

  ngOnDestroy(): void {
    this.layoutService.closeSearch();
    this.searchCtrl.setValue(undefined);
    this.searchService.isOpenSubject.next(false);
  }
}
