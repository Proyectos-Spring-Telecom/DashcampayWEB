import { __decorate } from "tslib";
import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
let SearchComponent = class SearchComponent {
    constructor(layoutService, searchService) {
        this.layoutService = layoutService;
        this.searchService = searchService;
        this.show$ = this.layoutService.searchOpen$;
        this.searchCtrl = new UntypedFormControl();
        this.destroyRef = inject(DestroyRef);
    }
    ngOnInit() {
        this.searchService.isOpenSubject.next(true);
        this.searchCtrl.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((value) => this.searchService.valueChangesSubject.next(value));
        this.show$
            .pipe(filter((show) => show), takeUntilDestroyed(this.destroyRef))
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
    ngOnDestroy() {
        this.layoutService.closeSearch();
        this.searchCtrl.setValue(undefined);
        this.searchService.isOpenSubject.next(false);
    }
};
__decorate([
    ViewChild('searchInput', { static: true })
], SearchComponent.prototype, "input", void 0);
SearchComponent = __decorate([
    Component({
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
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=search.component.js.map