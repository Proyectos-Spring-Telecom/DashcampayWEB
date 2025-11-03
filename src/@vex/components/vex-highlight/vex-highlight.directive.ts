import {
  Directive,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { VexHighlightResult } from './vex-highlight.model';
import { VexHighlightService } from './vex-highlight.service';

@Directive({
  selector: '[vexHighlight]',
  host: {
    '[class.hljs]': 'true',
    '[innerHTML]': 'highlightedCode'
  },
  standalone: true
})
export class VexHighlightDirective implements OnChanges {
  /** Highlighted Code */
  highlightedCode?: string;

  /** An optional array of language names and aliases restricting detection to only those languages.
   * The subset can also be set with configure, but the local parameter overrides the option if set.
   */
  @Input() languages: string[] = [];

  /** Highlight code input */
  @Input('vexHighlight') code!: string;

  /** Stream that emits when code string is highlighted */
  @Output() highlighted = new EventEmitter<VexHighlightResult>();

  constructor(
    private _highlightService: VexHighlightService,
    private _zone: NgZone
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['code'] &&
      changes['code'].currentValue !== changes['code'].previousValue
    ) {
      this.highlightElement(this.code, this.languages);
    }
  }

  /**
   * Highlighting with language detection and fix markup.
   * @param code Accepts a string with the code to highlight
   * @param languages An optional array of language names and aliases restricting detection to only those languages.
   * The subset can also be set with configure, but the local parameter overrides the option if set.
   */
  highlightElement(code: string, languages: string[]) {
    this._zone.runOutsideAngular(() => {
      const res = this._highlightService.highlightAuto(code, languages);
      this.highlightedCode = res.value;
      this.highlighted.emit(res);
    });
  }
}
