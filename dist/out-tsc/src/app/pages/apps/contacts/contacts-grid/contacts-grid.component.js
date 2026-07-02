import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { scaleIn400ms } from "../../../../../@vex/animations/scale-in.animation";
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { ContactsEditComponent } from '../components/contacts-edit/contacts-edit.component';
import { contactsData } from '../../../../../static-data/contacts';
import { trackById } from "../../../../../@vex/utils/track-by";
import { stagger40ms } from "../../../../../@vex/animations/stagger.animation";
import { fadeInUp400ms } from "../../../../../@vex/animations/fade-in-up.animation";
import { scaleFadeIn400ms } from "../../../../../@vex/animations/scale-fade-in.animation";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map } from 'rxjs/operators';
import { ContactsCardComponent } from '../components/contacts-card/contacts-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
let ContactsGridComponent = class ContactsGridComponent {
    constructor(dialog, route) {
        this.dialog = dialog;
        this.route = route;
        this.contacts = contactsData;
        this.filteredContacts$ = this.route.paramMap.pipe(map((paramMap) => paramMap.get('activeCategory')), map((activeCategory) => {
            switch (activeCategory) {
                case 'all': {
                    return contactsData;
                }
                case 'starred': {
                    return contactsData.filter((c) => c.starred);
                }
                default: {
                    return [];
                }
            }
        }));
        this.links = [
            {
                label: 'All Contacts',
                route: '../all'
            },
            {
                label: 'Frequently Contacted',
                route: '../frequent'
            },
            {
                label: 'Starred',
                route: '../starred'
            }
        ];
        this.trackById = trackById;
    }
    ngOnInit() { }
    openContact(id) {
        this.dialog.open(ContactsEditComponent, {
            data: id || null,
            width: '600px'
        });
    }
    toggleStar(id) {
        const contact = contactsData.find((c) => c.id === id);
        if (contact) {
            contact.starred = !contact.starred;
        }
    }
};
ContactsGridComponent = __decorate([
    Component({
        selector: 'vex-contacts-grid',
        templateUrl: './contacts-grid.component.html',
        styleUrls: ['./contacts-grid.component.scss'],
        animations: [
            scaleIn400ms,
            fadeInRight400ms,
            stagger40ms,
            fadeInUp400ms,
            scaleFadeIn400ms
        ],
        standalone: true,
        imports: [
            MatIconModule,
            MatTabsModule,
            NgFor,
            RouterLinkActive,
            RouterLink,
            MatButtonModule,
            MatTooltipModule,
            NgIf,
            ContactsCardComponent,
            AsyncPipe
        ]
    })
], ContactsGridComponent);
export { ContactsGridComponent };
//# sourceMappingURL=contacts-grid.component.js.map