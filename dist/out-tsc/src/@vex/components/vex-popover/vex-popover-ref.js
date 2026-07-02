import { Subject } from 'rxjs';
export class VexPopoverRef {
    constructor(overlay, content, data) {
        this.overlay = overlay;
        this.content = content;
        this.data = data;
        this.afterClosed = new Subject();
        this.afterClosed$ = this.afterClosed.asObservable();
        overlay.backdropClick().subscribe(() => {
            this._close('backdropClick', undefined);
        });
    }
    close(data) {
        this._close('close', data);
    }
    _close(type, data) {
        this.overlay.dispose();
        this.afterClosed.next({
            type,
            data
        });
        this.afterClosed.complete();
    }
}
//# sourceMappingURL=vex-popover-ref.js.map