import { Inject, Injectable } from '@angular/core';
import {
  VEX_HIGHLIGHT_OPTIONS,
  VexHighlightConfig,
  VexHighlightLanguage,
  VexHighlightOptions,
  VexHighlightResult
} from './vex-highlight.model';
import hljs from 'highlight.js/lib/core';

@Injectable()
export class VexHighlightService {
  constructor(@Inject(VEX_HIGHLIGHT_OPTIONS) options: VexHighlightOptions) {
    if (options) {
      // Register HighlightJS languages
      options
        .languages?.()
        .map((language: VexHighlightLanguage) =>
          this.registerLanguage(language.name, language.func)
        );
      if (options.config) {
        // Set global config if present
        this.configure(options.config);
      }
    }
    // Throw an error if no languages were registered.
    if (this.listLanguages().length < 1) {
      throw new Error('[HighlightJS]: No languages were registered!');
    }
  }

  /**
   * Core highlighting function.
   * @param name Accepts a language name, or an alias
   * @param value A string with the code to highlight.
   * @param ignoreIllegals When present and evaluates to a true value, forces highlighting to finish
   * even in case of detecting illegal syntax for the language instead of throwing an exception.
   * When present, the function will restart parsing from this state instead of initializing a new one
   */
  highlight(
    name: string,
    value: string,
    ignoreIllegals: boolean
  ): VexHighlightResult {
    return hljs.highlight(name, value, ignoreIllegals);
  }

  /**
   * Highlighting with language detection.
   * @param value Accepts a string with the code to highlight
   * @param languageSubset An optional array of language names and aliases restricting detection to only those languages.
   * The subset can also be set with configure, but the local parameter overrides the option if set.
   */
  highlightAuto(value: string, languageSubset: string[]): VexHighlightResult {
    return hljs.highlightAuto(value, languageSubset);
  }

  /**
   * Applies highlighting to a DOM node containing code.
   * The function uses language detection by default but you can specify the language in the class attribute of the DOM node.
   * See the class reference for all available language names and aliases.
   * @param block The element to apply highlight on.
   */
  highlightBlock(block: HTMLElement) {
    hljs.highlightBlock(block);
  }

  /**
   * Configures global options:
   */
  configure(config: VexHighlightConfig) {
    hljs.configure(config);
  }

  /**
   * Applies highlighting to all <pre><code>..</code></pre> blocks on a page.
   */
  initHighlighting() {
    hljs.initHighlighting();
  }

  /**
   * Adds new language to the library under the specified name. Used mostly internally.
   * @param name A string with the name of the language being registered
   * @param language A function that returns an object which represents the language definition.
   * The function is passed the hljs object to be able to use common regular expressions defined within it.
   */
  registerLanguage(name: string, language: any) {
    hljs.registerLanguage(name, language);
  }

  /**
   * @return The languages names list.
   */
  listLanguages(): string[] {
    return hljs.listLanguages();
  }

  /**
   * Looks up a language by name or alias.
   * @param name Language name
   * @return The language object if found, undefined otherwise.
   */
  getLanguage(name: string): any {
    return hljs.getLanguage(name);
  }
}
