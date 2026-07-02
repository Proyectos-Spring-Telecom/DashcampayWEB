import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { contactsData } from '../../../../../../static-data/contacts';
import { fadeInRight400ms } from "../../../../../../@vex/animations/fade-in-right.animation";
import { stagger40ms } from "../../../../../../@vex/animations/stagger.animation";
import { MatRippleModule } from '@angular/material/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
let ContactsTableMenuComponent = class ContactsTableMenuComponent {
    constructor() {
        this.items = [
            {
                type: 'link',
                id: 'all',
                icon: 'mat:view_headline',
                label: 'All Contacts'
            },
            {
                type: 'link',
                id: 'frequently',
                icon: 'mat:history',
                label: 'Frequently contacted'
            },
            {
                type: 'link',
                id: 'starred',
                icon: 'mat:star',
                label: 'Starred'
            },
            {
                type: 'subheading',
                label: 'Labels'
            },
            {
                type: 'link',
                id: 'family',
                icon: 'mat:label',
                label: 'Family',
                classes: {
                    icon: 'text-primary-600'
                }
            },
            {
                type: 'link',
                id: 'friends',
                icon: 'mat:label',
                label: 'Friends',
                classes: {
                    icon: 'text-green-600'
                }
            },
            {
                type: 'link',
                id: 'colleagues',
                icon: 'mat:label',
                label: 'Colleagues',
                classes: {
                    icon: 'text-amber-600'
                }
            },
            {
                type: 'link',
                id: 'business',
                icon: 'mat:label',
                label: 'Business',
                classes: {
                    icon: 'text-gray-600'
                }
            }
        ];
        this.filterChange = new EventEmitter();
        this.openAddNew = new EventEmitter();
        this.activeCategory = 'all';
    }
    ngOnInit() { }
    setFilter(category) {
        this.activeCategory = category;
        if (category === 'starred') {
            return this.filterChange.emit(contactsData.filter((c) => c.starred));
        }
        if (category === 'all') {
            return this.filterChange.emit(contactsData);
        }
        if (category === 'frequently' ||
            category === 'family' ||
            category === 'friends' ||
            category === 'colleagues' ||
            category === 'business') {
            return this.filterChange.emit([]);
        }
    }
    isActive(category) {
        return this.activeCategory === category;
    }
};
__decorate([
    Input()
], ContactsTableMenuComponent.prototype, "items", void 0);
__decorate([
    Output()
], ContactsTableMenuComponent.prototype, "filterChange", void 0);
__decorate([
    Output()
], ContactsTableMenuComponent.prototype, "openAddNew", void 0);
ContactsTableMenuComponent = __decorate([
    Component({
        selector: 'vex-contacts-table-menu',
        templateUrl: './contacts-table-menu.component.html',
        animations: [fadeInRight400ms, stagger40ms],
        standalone: true,
        imports: [
            MatButtonModule,
            MatIconModule,
            NgFor,
            NgIf,
            MatRippleModule,
            NgClass
        ]
    })
], ContactsTableMenuComponent);
export { ContactsTableMenuComponent };
//# sourceMappingURL=contacts-table-menu.component.js.map