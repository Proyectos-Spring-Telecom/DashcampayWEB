import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';

@Component({
  selector: 'vex-editor',
  templateUrl: './editor.component.html',
  styleUrls: [
    '../../../../../node_modules/quill/dist/quill.snow.css',
    './editor.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    QuillEditorComponent,
    ReactiveFormsModule
  ]
})
export class EditorComponent implements OnInit {
  text = `<p class="ql-align-center"><br></p><h1 class="ql-align-center"><strong class="ql-size-large" spellcheck="false">Vex Rich Text Editor</strong></h1><p><br></p><h2 class="ql-align-center">Get started with an <strong>easy to use</strong>, completely <u>customizable</u>, yet beautiful and blazing fast <strong>WYSIWYG Editor</strong> built right into Angular and the easy use of <strong>[formControl]</strong>.</h2><p><br></p><p><br></p><iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://player.vimeo.com/video/253905163" height="280" width="500"></iframe><p><br></p><p><br></p><h2 class="ql-align-center"><strong class="ql-size-large" spellcheck="false">Getting Started is Easy</strong></h2><p><br></p><pre class="ql-syntax ql-align-center" spellcheck="false">

<span class="hljs-keyword">&lt;quill-editor [formControl]=&quot;form&quot;&gt;&lt;/quill-editor&gt;</span>

</pre>`;
  form = new UntypedFormControl(this.text);

  constructor() {}

  ngOnInit() {}
}
