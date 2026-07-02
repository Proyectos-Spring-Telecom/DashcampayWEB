import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
let VerDocumentoOperadorComponent = class VerDocumentoOperadorComponent {
    constructor(router, route, sanitizer) {
        this.router = router;
        this.route = route;
        this.sanitizer = sanitizer;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.titulo = 'Documento';
        this.esImagen = false;
        const nav = this.router.getCurrentNavigation();
        const state = nav?.extras?.state ?? {};
        this.url = state.url || this.route.snapshot.queryParamMap.get('url') || '';
        this.titulo = state.titulo || this.route.snapshot.queryParamMap.get('titulo') || 'Documento';
        if (this.url) {
            this.esImagen = this.isImageUrl(this.url);
            if (this.esImagen) {
                this.urlImgSanitizada = this.sanitizer.bypassSecurityTrustUrl(this.url);
                this.urlSanitizada = undefined;
            }
            else {
                this.urlSanitizada = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
                this.urlImgSanitizada = undefined;
            }
        }
    }
    ngOnInit() { }
    abrirNuevaPestana() {
        if (this.url)
            window.open(this.url, '_blank', 'noopener');
    }
    volver() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }
    isImageUrl(u) {
        return /\.(png|jpe?g|webp|gif|bmp|svg)(\?.*)?$/i.test(u);
    }
};
VerDocumentoOperadorComponent = __decorate([
    Component({
        selector: 'vex-ver-documento-operador',
        templateUrl: './ver-documento-operador.component.html',
        styleUrls: ['./ver-documento-operador.component.scss']
    })
], VerDocumentoOperadorComponent);
export { VerDocumentoOperadorComponent };
//# sourceMappingURL=ver-documento-operador.component.js.map