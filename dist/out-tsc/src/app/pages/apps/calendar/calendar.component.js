import { __decorate } from "tslib";
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarA11y, CalendarCommonModule, CalendarDateFormatter, CalendarDayModule, CalendarEventTitleFormatter, CalendarModule, CalendarMonthModule, CalendarUtils, CalendarView, CalendarWeekModule, DateAdapter } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CalendarEditComponent } from './calendar-edit/calendar-edit.component';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { VexScrollbarComponent } from "../../../../@vex/components/vex-scrollbar/vex-scrollbar.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
const colors = {
    blue: {
        primary: '#5c77ff',
        secondary: '#FFFFFF'
    },
    yellow: {
        primary: '#ffc107',
        secondary: '#FDF1BA'
    },
    red: {
        primary: '#f44336',
        secondary: '#FFFFFF'
    }
};
let CalendarComponent = class CalendarComponent {
    constructor(dialog, snackbar) {
        this.dialog = dialog;
        this.snackbar = snackbar;
        this.view = CalendarView.Month;
        this.CalendarView = CalendarView;
        this.viewDate = new Date();
        this.refresh = new Subject();
        this.actions = [
            {
                label: '<i class="fa fa-fw fa-pencil"></i>',
                onClick: ({ event }) => {
                    this.handleEvent('Edited', event);
                }
            },
            {
                label: '<i class="fa fa-fw fa-times"></i>',
                onClick: ({ event }) => {
                    this.events = this.events.filter((iEvent) => iEvent !== event);
                    this.handleEvent('Deleted', event);
                }
            }
        ];
        this.events = [
            {
                start: subDays(startOfDay(new Date()), 1),
                end: addDays(new Date(), 1),
                title: 'A 3 day event',
                // TODO: fix these colors
                //color: colors.primary,
                actions: this.actions,
                allDay: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                },
                draggable: true
            },
            {
                start: startOfDay(new Date()),
                title: 'An event with no end date',
                //color: colors.yellow,
                actions: this.actions
            },
            {
                start: subDays(endOfMonth(new Date()), 3),
                end: addDays(endOfMonth(new Date()), 3),
                title: 'A long event that spans 2 months',
                //color: colors.primary,
                allDay: true
            },
            {
                start: addHours(startOfDay(new Date()), 2),
                end: new Date(),
                title: 'A draggable and resizable event',
                //color: colors.red,
                actions: this.actions,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                },
                draggable: true
            }
        ];
        this.activeDayIsOpen = true;
    }
    dayClicked({ date, events }) {
        if (isSameMonth(date, this.viewDate)) {
            this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen) ||
                events.length === 0);
            this.viewDate = date;
        }
    }
    eventTimesChanged({ event, newStart, newEnd }) {
        this.events = this.events.map((iEvent) => {
            if (iEvent === event) {
                return {
                    ...event,
                    start: newStart,
                    end: newEnd
                };
            }
            return iEvent;
        });
        this.handleEvent('Dropped or resized', event);
    }
    handleEvent(action, event) {
        const dialogRef = this.dialog.open(CalendarEditComponent, {
            data: event
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                event = result;
                this.snackbar.open('Updated Event: ' + event.title);
                this.refresh.next(null);
            }
        });
    }
    addEvent() {
        this.events = [
            ...this.events,
            {
                title: 'New event',
                start: startOfDay(new Date()),
                end: endOfDay(new Date()),
                color: colors.red,
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true
                }
            }
        ];
    }
    deleteEvent(eventToDelete) {
        this.events = this.events.filter((event) => event !== eventToDelete);
    }
    setView(view) {
        this.view = view;
    }
    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }
};
__decorate([
    ViewChild('modalContent', { static: true })
], CalendarComponent.prototype, "modalContent", void 0);
CalendarComponent = __decorate([
    Component({
        selector: 'vex-calendar',
        templateUrl: './calendar.component.html',
        styleUrls: ['./calendar.component.scss'],
        encapsulation: ViewEncapsulation.None,
        standalone: true,
        imports: [
            MatButtonModule,
            CalendarCommonModule,
            MatIconModule,
            VexScrollbarComponent,
            NgSwitch,
            NgSwitchCase,
            CalendarMonthModule,
            CalendarWeekModule,
            CalendarDayModule,
            CalendarModule,
            MatSnackBarModule
        ],
        providers: [
            {
                provide: DateAdapter,
                useFactory: adapterFactory
            },
            CalendarEventTitleFormatter,
            CalendarDateFormatter,
            CalendarUtils,
            CalendarA11y
        ]
    })
], CalendarComponent);
export { CalendarComponent };
//# sourceMappingURL=calendar.component.js.map