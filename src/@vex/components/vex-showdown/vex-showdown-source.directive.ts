import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { VexShowdownComponent } from './vex-showdown.component';
import { catchError, EMPTY } from 'rxjs';

/**
 * A angular directive to `ShowdownComponent` for make http request of markdown content.
 *
 * ### Example
 *
 * Setup as standalone
 * ```typescript
 * import { NgModule } from '@angular/core';
 * import { HttpClientModule } from '@angular/common/http';
 * import { ShowdownComponent, SourceDirective } from 'ngx-vex-showdown';
 *
 * @NgModule({
 *    declarations: [ ShowdownComponent, SourceDirective ],
 *    imports: [ HttpClientModule ]
 * })
 * export class AppModule {}
 * ```
 *
 * Bind url `src` directive
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *     selector: 'some',
 *     template: '<vex-showdown [src]="url" smartIndentationFix>**Loading...**</vex-showdown>
 * })
 * class SomeComponent {
 *     url: string = 'https://unpkg.com/ngx-showdown/README.md';
 *     // ...
 * }
 * ```
 *
 * Set static url
 * ```html
 * <vex-showdown src="README.md" [options]="{noHeaderId: true}"></vex-showdown>
 * ```
 *
 * Set template reference variable
 * ```html
 * <vex-showdown #source="source" src="README.md"></vex-showdown>
 * ```
 *
 * Listening to `error` events.
 * ```html
 * <vex-showdown #sd src="http://url.error" (error)="sd.render('# '+$event.message)"></vex-showdown>
 * ```
 */
@Directive({
  selector: 'vex-showdown[src],[vex-showdown][src]',
  exportAs: 'source',
  standalone: true
})
export class VexShowdownSourceDirective implements OnChanges {
  /**
   * The source url of the markdown content.
   *
   * __Example :__
   *
   * Set static url to `src` directive.
   * ```html
   * <vex-showdown src="https://unpkg.com/ngx-showdown/README.md"></vex-showdown>
   * ```
   *
   * Bind url to `src` directive.
   * ```html
   * <input type="text" #url placeholder="url" />
   * <button (click)="src = url.value">Load</button>
   * <vex-showdown [src]="src">**Loading...**</vex-showdown>
   * ```
   */
  @Input() src?: string;

  /**
   * On error occur.
   *
   * __Example :__
   *
   * ```html
   * <input type="text" placeholder="url" [(ngModel)]="url"/>
   * <vex-showdown [src]="url" (error)="sd.render('# Error\n> '+$event.message)">**Loading...**</vex-showdown>
   * ```
   */
  @Output() error: EventEmitter<HttpErrorResponse> = new EventEmitter();

  constructor(
    private _showdownComponent: VexShowdownComponent,
    private _http: HttpClient
  ) {}

  /**
   * A angular lifecycle method, Use to call to `load` method on src init/changes
   * @internal
   */
  ngOnChanges(): void {
    this.load();
  }

  /**
   * Load the markdown content of {@link VexShowdownSourceDirective#src} url to {@link VexShowdownComponent#value}.
   *
   * __Example :__
   *
   * ```html
   * <input type="text" #url value="source.src" placeholder="Url" />
   * <button (click)="source.load(url.value)">Load</button>
   * <vex-showdown #source="source" src="https://unpkg.com/ngx-showdown/README.md"></vex-showdown>
   * ```
   * @param url - A url of markdown content to load (it will override the current url of `SourceDirective#src`)
   */
  public load(url?: string): void {
    if (url) {
      this.src = url;
    }

    if (this.src) {
      this._http
        .get(this.src, { responseType: 'text' })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            this.error.emit(error);
            return EMPTY;
          })
        )
        .subscribe((response: string) => {
          this._showdownComponent.render(response);
        });
    }
  }
}
