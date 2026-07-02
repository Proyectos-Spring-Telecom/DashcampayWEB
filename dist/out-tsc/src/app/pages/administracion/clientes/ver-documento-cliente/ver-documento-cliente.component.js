import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
let VerDocumentoClienteComponent = class VerDocumentoClienteComponent {
    constructor(router, route, sanitizer) {
        this.router = router;
        this.route = route;
        this.sanitizer = sanitizer;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.titulo = 'Documento';
        const nav = this.router.getCurrentNavigation();
        const state = nav?.extras?.state ?? {};
        this.url = state.url || this.route.snapshot.queryParamMap.get('url') || '';
        this.titulo = state.titulo || this.route.snapshot.queryParamMap.get('titulo') || 'Documento';
        // LOG para verificar que sí llega
        console.log('[VerDocumento] url:', this.url);
        console.log('[VerDocumento] titulo:', this.titulo);
        if (this.url) {
            this.urlSanitizada = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
        }
    }
    abrirNuevaPestana() {
        if (this.url)
            window.open(this.url, '_blank', 'noopener');
    }
    ngOnInit() {
    }
    volver() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }
};
VerDocumentoClienteComponent = __decorate([
    Component({
        selector: 'vex-ver-documento-cliente',
        templateUrl: './ver-documento-cliente.component.html',
        styleUrl: './ver-documento-cliente.component.scss',
        animations: [fadeInRight400ms],
    })
], VerDocumentoClienteComponent);
export { VerDocumentoClienteComponent };
//# sourceMappingURL=ver-documento-cliente.component.js.map