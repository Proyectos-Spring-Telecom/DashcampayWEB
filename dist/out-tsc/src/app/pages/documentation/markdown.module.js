import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VexShowdownModule } from "../../../@vex/components/vex-showdown";
let MarkdownModule = class MarkdownModule {
};
MarkdownModule = __decorate([
    NgModule({
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
], MarkdownModule);
export { MarkdownModule };
//# sourceMappingURL=markdown.module.js.map