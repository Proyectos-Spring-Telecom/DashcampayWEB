import { __decorate, __param } from "tslib";
import { Component, Inject, ViewChild } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
let AgregarLicenciaModalComponent = class AgregarLicenciaModalComponent {
    constructor(fb, dialogRef, data, operadoresService, alerts) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.operadoresService = operadoresService;
        this.alerts = alerts;
        this.loading = false;
        this.showRequiredMsgs = false;
        // Listas para selects
        this.listaTiposLicencia = [];
        this.listaCategoriasLicencia = [];
        this.licenciaFile = null;
        this.licenciaFileName = '';
        this.licenciaPreviewUrl = null;
        this.licenciaDragging = false;
    }
    ngOnInit() {
        this.initForm();
        this.obtenerTiposLicencia();
        this.obtenerCategoriasLicencia();
    }
    initForm() {
        this.licenciaForm = this.fb.group({
            numeroLicencia: [null, Validators.required],
            fechaExpedicion: [null, Validators.required],
            fechaVencimiento: [null, Validators.required],
            idTipoLicencia: [null, Validators.required],
            idCategoriaLicencia: [null, Validators.required],
            licencia: [null, Validators.required]
        });
    }
    obtenerTiposLicencia() {
        this.operadoresService.obtenerTiposLicencia().subscribe({
            next: (response) => {
                this.listaTiposLicencia = (response.data || response || []).map((t) => ({
                    ...t,
                    id: Number(t?.idCatTipoLicencia ?? t?.IdCatTipoLicencia ?? t?.id ?? t?.Id ?? t?.ID ?? t?.idTipoLicencia ?? t?.IdTipoLicencia)
                }));
            },
            error: (error) => {
                console.error('Error al obtener tipos de licencia:', error);
                this.listaTiposLicencia = [];
            }
        });
    }
    obtenerCategoriasLicencia() {
        this.operadoresService.obtenerCategoriasLicencia().subscribe({
            next: (response) => {
                this.listaCategoriasLicencia = (response.data || response || []).map((c) => ({
                    ...c,
                    id: Number(c?.id ?? c?.Id ?? c?.ID ?? c?.idCategoriaLicencia ?? c?.IdCategoriaLicencia)
                }));
            },
            error: (error) => {
                console.error('Error al obtener categorías de licencia:', error);
                this.listaCategoriasLicencia = [];
            }
        });
    }
    openLicenciaFilePicker() {
        if (this.licenciaInput?.nativeElement) {
            this.licenciaInput.nativeElement.click();
        }
    }
    onLicenciaFileSelected(event) {
        const input = event.target;
        if (input.files && input.files.length > 0) {
            this.handleLicenciaFile(input.files[0]);
        }
    }
    handleLicenciaFile(file) {
        // Validar tamaño (máx 3 MB)
        const maxSize = 3 * 1024 * 1024; // 3 MB en bytes
        if (file.size > maxSize) {
            this.alerts.open({
                type: 'error',
                title: 'Error',
                message: 'El archivo no debe exceder 3 MB.',
                confirmText: 'Entendido'
            });
            return;
        }
        // Validar tipo (PDF o imagen)
        const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            this.alerts.open({
                type: 'error',
                title: 'Error',
                message: 'El archivo debe ser un PDF o una imagen (JPG, PNG, GIF).',
                confirmText: 'Entendido'
            });
            return;
        }
        this.licenciaFile = file;
        this.licenciaFileName = file.name;
        this.licenciaForm.patchValue({ licencia: file });
        // Si es imagen, mostrar preview
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.licenciaPreviewUrl = e.target?.result || null;
            };
            reader.readAsDataURL(file);
        }
        else {
            this.licenciaPreviewUrl = null;
        }
    }
    clearLicenciaFile(event) {
        event.stopPropagation();
        this.licenciaFile = null;
        this.licenciaFileName = '';
        this.licenciaPreviewUrl = null;
        this.licenciaForm.patchValue({ licencia: null });
        if (this.licenciaInput?.nativeElement) {
            this.licenciaInput.nativeElement.value = '';
        }
    }
    onLicenciaDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.licenciaDragging = true;
    }
    onLicenciaDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.licenciaDragging = false;
    }
    onLicenciaDrop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.licenciaDragging = false;
        if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            this.handleLicenciaFile(file);
        }
    }
    async submit() {
        this.showRequiredMsgs = true;
        if (this.licenciaForm.invalid) {
            const etiquetas = {
                numeroLicencia: 'N° Licencia',
                fechaExpedicion: 'Fecha Expedición',
                fechaVencimiento: 'Fecha Vencimiento',
                idTipoLicencia: 'Tipo de Licencia',
                idCategoriaLicencia: 'Categoría de Licencia',
                licencia: 'Licencia'
            };
            const camposFaltantes = [];
            Object.keys(this.licenciaForm.controls).forEach((key) => {
                const control = this.licenciaForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
                }
            });
            const lista = camposFaltantes.map((campo, i) => `
        <div style="padding:8px 12px; border-left:4px solid #d9534f; background:#caa8a8; text-align:center; margin-bottom:8px; border-radius:4px;">
          <strong style="color:#b02a37;">${i + 1}. ${campo}</strong>
        </div>
      `).join('');
            await this.alerts.open({
                type: 'warning',
                title: '¡Ops!',
                message: `
          <p style="text-align:center; font-size:15px; margin-bottom:16px;">
            Hay campos obligatorios sin completar.
          </p>
          <div style="max-height:350px; overflow-y:auto;">${lista}</div>
        `,
                confirmText: 'Entendido',
                backdropClose: false
            });
            return;
        }
        this.loading = true;
        const formValue = this.licenciaForm.getRawValue();
        const formData = new FormData();
        formData.append('numeroLicencia', formValue.numeroLicencia);
        formData.append('fechaExpedicion', this.formatDate(formValue.fechaExpedicion));
        formData.append('fechaVencimiento', this.formatDate(formValue.fechaVencimiento));
        formData.append('idTipoLicencia', String(formValue.idTipoLicencia));
        formData.append('idCategoriaLicencia', String(formValue.idCategoriaLicencia));
        formData.append('idOperador', String(this.data.idOperador));
        if (formValue.licencia && formValue.licencia instanceof File) {
            formData.append('licencia', formValue.licencia);
        }
        this.operadoresService.agregarLicencia(formData).subscribe({
            next: async (response) => {
                this.loading = false;
                await this.alerts.open({
                    type: 'success',
                    title: '¡Éxito!',
                    message: 'La licencia se ha registrado correctamente.',
                    confirmText: 'Aceptar'
                });
                this.dialogRef.close(true);
            },
            error: async (error) => {
                this.loading = false;
                const errorMessage = error?.error?.message || error?.message || 'Error al registrar la licencia.';
                await this.alerts.open({
                    type: 'error',
                    title: 'Error',
                    message: errorMessage,
                    confirmText: 'Entendido'
                });
            }
        });
    }
    formatDate(date) {
        if (!date)
            return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    cancelar() {
        this.dialogRef.close();
    }
};
__decorate([
    ViewChild('licenciaInput')
], AgregarLicenciaModalComponent.prototype, "licenciaInput", void 0);
AgregarLicenciaModalComponent = __decorate([
    Component({
        selector: 'vex-agregar-licencia-modal',
        standalone: true,
        imports: [
            CommonModule,
            ReactiveFormsModule,
            MatDialogModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatButtonModule,
            MatIconModule,
            MatDatepickerModule,
            MatNativeDateModule
        ],
        templateUrl: './agregar-licencia-modal.component.html',
        styleUrl: './agregar-licencia-modal.component.scss'
    }),
    __param(2, Inject(MAT_DIALOG_DATA))
], AgregarLicenciaModalComponent);
export { AgregarLicenciaModalComponent };
//# sourceMappingURL=agregar-licencia-modal.component.js.map