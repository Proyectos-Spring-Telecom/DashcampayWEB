import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vexStripHtml',
  standalone: true
})
export class VexStripHtmlPipe implements PipeTransform {
  transform(html: string | undefined): string {
    if (!html) {
      return '';
    }

    return html?.replace(/<[^>]*>?/gm, '');
  }
}
