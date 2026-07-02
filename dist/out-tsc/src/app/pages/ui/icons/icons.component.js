import { __decorate } from "tslib";
import { Component, DestroyRef, inject } from '@angular/core';
import { scaleIn400ms } from "../../../../@vex/animations/scale-in.animation";
import { fadeInRight400ms } from "../../../../@vex/animations/fade-in-right.animation";
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
let IconsComponent = class IconsComponent {
    constructor(router) {
        this.router = router;
        this.searchCtrl = new UntypedFormControl();
        this.colorCtrl = new UntypedFormControl();
        this.color$ = this.colorCtrl.valueChanges;
        this.links = [
            {
                label: 'MATERIAL ICONS',
                route: 'ic'
            },
            {
                label: 'FONT AWESOME',
                route: 'fa'
            }
        ];
        this.destroyRef = inject(DestroyRef);
    }
    ngOnInit() {
        this.searchCtrl.valueChanges
            .pipe(debounceTime(20), takeUntilDestroyed(this.destroyRef))
            .subscribe((search) => this.router.navigate([], { queryParams: { search } }));
    }
};
IconsComponent = __decorate([
    Component({
        selector: 'vex-icons',
        templateUrl: './icons.component.html',
        styleUrls: ['./icons.component.scss'],
        animations: [scaleIn400ms, fadeInRight400ms],
        standalone: true,
        imports: [
            MatIconModule,
            MatTabsModule,
            NgFor,
            RouterLinkActive,
            RouterLink,
            ReactiveFormsModule,
            RouterOutlet,
            AsyncPipe
        ]
    })
], IconsComponent);
export { IconsComponent };
//# sourceMappingURL=icons.component.js.map