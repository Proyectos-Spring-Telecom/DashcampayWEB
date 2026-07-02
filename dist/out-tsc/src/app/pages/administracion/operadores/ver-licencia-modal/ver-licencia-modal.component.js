import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
let VerLicenciaModalComponent = class VerLicenciaModalComponent {
    constructor(dialogRef, data, sanitizer) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.sanitizer = sanitizer;
        this.esImagen = false;
        if (this.data.url) {
            this.esImagen = this.isImageUrl(this.data.url);
            if (this.esImagen) {
                this.urlImgSanitizada = this.sanitizer.bypassSecurityTrustUrl(this.data.url);
                this.urlSanitizada = undefined;
            }
            else {
                this.urlSanitizada = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
                this.urlImgSanitizada = undefined;
            }
        }
    }
    ngOnInit() { }
    abrirNuevaPestana() {
        if (this.data.url) {
            window.open(this.data.url, '_blank', 'noopener');
        }
    }
    async descargar() {
        if (!this.data.url)
            return;
        try {
            // Intentar descargar usando fetch para URLs remotas
            const response = await fetch(this.data.url, {
                method: 'GET',
                mode: 'cors'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            // Obtener la extensión del archivo desde la URL o determinar por tipo
            const urlLower = this.data.url.toLowerCase();
            let extension = '';
            if (urlLower.includes('.pdf')) {
                extension = '.pdf';
            }
            else if (urlLower.includes('.jpg') || urlLower.includes('.jpeg')) {
                extension = '.jpg';
            }
            else if (urlLower.includes('.png')) {
                extension = '.png';
            }
            else if (urlLower.includes('.gif')) {
                extension = '.gif';
            }
            else {
                // Intentar obtener extensión del Content-Type
                const contentType = response.headers.get('content-type');
                if (contentType?.includes('pdf')) {
                    extension = '.pdf';
                }
                else if (contentType?.includes('jpeg') || contentType?.includes('jpg')) {
                    extension = '.jpg';
                }
                else if (contentType?.includes('png')) {
                    extension = '.png';
                }
            }
            const fileName = (this.data.titulo || 'documento').replace(/[^a-z0-9]/gi, '_').toLowerCase();
            link.href = url;
            link.download = fileName + extension;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
        catch (error) {
            console.error('Error al descargar:', error);
            // Fallback: intentar abrir en nueva pestaña si falla la descarga
            window.open(this.data.url, '_blank', 'noopener');
        }
    }
    cerrar() {
        this.dialogRef.close();
    }
    isImageUrl(u) {
        return /\.(png|jpe?g|webp|gif|bmp|svg)(\?.*)?$/i.test(u);
    }
};
VerLicenciaModalComponent = __decorate([
    Component({
        selector: 'vex-ver-licencia-modal',
        standalone: true,
        imports: [
            CommonModule,
            MatDialogModule,
            MatButtonModule,
            MatIconModule
        ],
        templateUrl: './ver-licencia-modal.component.html',
        styleUrl: './ver-licencia-modal.component.scss'
    }),
    __param(1, Inject(MAT_DIALOG_DATA))
], VerLicenciaModalComponent);
export { VerLicenciaModalComponent };
//# sourceMappingURL=ver-licencia-modal.component.js.map