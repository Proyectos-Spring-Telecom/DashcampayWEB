import { Inject, Injectable, RendererFactory2 } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class VexPlatformService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly rendererFactory2: RendererFactory2,
    private readonly platform: Platform
  ) {
    const renderer = this.rendererFactory2.createRenderer(null, null);

    if (this.platform.BLINK) {
      renderer.addClass(this.document.body, 'is-blink');
    }
  }
}
