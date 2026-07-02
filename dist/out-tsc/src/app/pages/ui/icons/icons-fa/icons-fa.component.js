var IconsFaComponent_1;
import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { iconsFA } from '../../../../../static-data/icons-fa';
import { scaleFadeIn400ms } from "../../../../../@vex/animations/scale-fade-in.animation";
import { combineLatest } from 'rxjs';
import { AsyncPipe, DOCUMENT, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
let IconsFaComponent = class IconsFaComponent {
    static { IconsFaComponent_1 = this; }
    constructor(route, breakpointObserver, document, renderer) {
        this.route = route;
        this.breakpointObserver = breakpointObserver;
        this.document = document;
        this.renderer = renderer;
        this.filteredIcons$ = combineLatest([
            this.route.queryParamMap.pipe(map((paramMap) => paramMap.get('search') ?? ''), startWith('')),
            this.breakpointObserver
                .observe(`(min-width: 600px)`)
                .pipe(map((state) => state.matches))
        ]).pipe(map(([value, isDesktop]) => {
            const filteredIcons = iconsFA.filter((iconName) => iconName.includes((value || '').toLowerCase()));
            return filteredIcons.reduce((prev, curr, index) => {
                if (isDesktop) {
                    if (index % 4 === 0) {
                        prev.push([]);
                    }
                }
                else {
                    if (index % 2 === 0) {
                        prev.push([]);
                    }
                }
                prev[prev.length - 1] = [...prev[prev.length - 1], curr];
                return prev;
            }, [[]]);
        }));
    }
    ngOnInit() {
        if (!IconsFaComponent_1.fontLoaded) {
            this.loadFont();
        }
    }
    loadFont() {
        IconsFaComponent_1.fontLoaded = true;
        const scriptElem = this.renderer.createElement('script');
        this.renderer.setAttribute(scriptElem, 'crossorigin', 'anonymous');
        this.renderer.setAttribute(scriptElem, 'src', 'https://kit.fontawesome.com/24a46da608.js');
        this.renderer.appendChild(this.document?.head, scriptElem);
    }
};
IconsFaComponent = IconsFaComponent_1 = __decorate([
    Component({
        selector: 'vex-icons-fa',
        templateUrl: './icons-fa.component.html',
        styleUrls: ['./icons-fa.component.scss'],
        animations: [scaleFadeIn400ms],
        standalone: true,
        imports: [
            CdkVirtualScrollViewport,
            CdkFixedSizeVirtualScroll,
            CdkVirtualForOf,
            NgFor,
            MatIconModule,
            NgIf,
            AsyncPipe,
            KeyValuePipe
        ]
    }),
    __param(2, Inject(DOCUMENT))
], IconsFaComponent);
export { IconsFaComponent };
//# sourceMappingURL=icons-fa.component.js.map