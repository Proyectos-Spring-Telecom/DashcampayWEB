import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
let VerDocumentoVehiculoComponent = class VerDocumentoVehiculoComponent {
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
VerDocumentoVehiculoComponent = __decorate([
    Component({
        selector: 'vex-ver-documento-vehiculo',
        templateUrl: './ver-documento-vehiculo.component.html',
        styleUrl: './ver-documento-vehiculo.component.scss',
        animations: [fadeInRight400ms],
    })
], VerDocumentoVehiculoComponent);
export { VerDocumentoVehiculoComponent };
//# sourceMappingURL=ver-documento-vehiculo.component.js.map