var IconsIcComponent_1;
import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { scaleFadeIn400ms } from "../../../../../@vex/animations/scale-fade-in.animation";
import { combineLatest } from 'rxjs';
import { iconsIC } from '../../../../../static-data/icons-ic';
import { AsyncPipe, DOCUMENT, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
let IconsIcComponent = class IconsIcComponent {
    static { IconsIcComponent_1 = this; }
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
            const filteredIcons = iconsIC.filter((iconName) => iconName.includes((value || '').toLowerCase()));
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
        if (!IconsIcComponent_1.fontLoaded) {
            this.loadFont();
        }
    }
    loadFont() {
        IconsIcComponent_1.fontLoaded = true;
        const linkElem = this.renderer.createElement('link');
        this.renderer.setAttribute(linkElem, 'rel', 'stylesheet');
        this.renderer.setAttribute(linkElem, 'href', 'https://fonts.googleapis.com/css?family=Material+Icons+Two+Tone');
        this.renderer.appendChild(this.document?.head, linkElem);
    }
};
IconsIcComponent = IconsIcComponent_1 = __decorate([
    Component({
        selector: 'vex-icons-ic',
        templateUrl: './icons-ic.component.html',
        styleUrls: ['./icons-ic.component.scss'],
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
], IconsIcComponent);
export { IconsIcComponent };
//# sourceMappingURL=icons-ic.component.js.map