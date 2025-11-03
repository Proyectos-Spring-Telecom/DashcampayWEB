import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VexShowdownModule } from 'src/@vex/components/vex-showdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    VexShowdownModule.forRoot({
      flavor: 'github',
      tables: true,
      openLinksInNewWindow: true,
      encodeEmails: true
    })
  ],
  exports: [VexShowdownModule]
})
export class MarkdownModule {}
