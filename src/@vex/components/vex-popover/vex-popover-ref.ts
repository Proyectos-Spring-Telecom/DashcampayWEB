import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { TemplateRef, Type } from '@angular/core';

export interface VexPopoverCloseEvent<T = any> {
  type: 'backdropClick' | 'close';
  data: T | undefined;
}

export type VexPopoverContent = TemplateRef<any> | Type<any> | string | any;

export class VexPopoverRef<T = any> {
  private afterClosed = new Subject<VexPopoverCloseEvent<T>>();
  afterClosed$ = this.afterClosed.asObservable();

  constructor(
    public overlay: OverlayRef,
    public content: VexPopoverContent,
    public data: T | undefined
  ) {
    overlay.backdropClick().subscribe(() => {
      this._close('backdropClick', undefined);
    });
  }

  close(data?: T) {
    this._close('close', data);
  }

  private _close(type: VexPopoverCloseEvent['type'], data?: T) {
    this.overlay.dispose();
    this.afterClosed.next({
      type,
      data
    });
    this.afterClosed.complete();
  }
}
