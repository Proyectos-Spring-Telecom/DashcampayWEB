import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { VexPageLayoutComponent } from "../../../../../@vex/components/vex-page-layout/vex-page-layout.component";
import { VexPageLayoutContentDirective } from "../../../../../@vex/components/vex-page-layout/vex-page-layout-content.directive";
let RegistrarTipoPasajeroComponent = class RegistrarTipoPasajeroComponent {
    constructor(fb, tiposPasajeroService, clientesService, activatedRoute, router, alerts, authService) {
        this.fb = fb;
        this.tiposPasajeroService = tiposPasajeroService;
        this.clientesService = clientesService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.alerts = alerts;
        this.authService = authService;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.submitButton = 'Guardar';
        this.loading = false;
        this.title = 'Registrar Tipo de Pasajero';
        this.listaTiposDescuento = [];
        this.listaClientes = [];
        this.loadingDependientes = false;
        const user = this.authService.getUser();
        this.idClienteUser = Number(user?.idCliente);
        this.idRolUser = Number(user?.rol?.id);
    }
    ngOnInit() {
        this.initForm();
        this.obtenerTiposDescuento();
        this.obtenerClientes();
        this.activatedRoute.params.subscribe((params) => {
            this.idTipoPasajero = params['id'];
            if (this.idTipoPasajero) {
                this.title = 'Actualizar Tipo de Pasajero';
                this.obtenerTipoPasajero();
            }
        });
    }
    initForm() {
        this.tipoPasajeroForm = this.fb.group({
            nombre: ['', Validators.required],
            idCatTipoDescuento: ['', Validators.required],
            cantidad: [null],
            idCliente: ['', Validators.required]
        });
    }
    obtenerTiposDescuento() {
        this.loadingDependientes = true;
        this.tiposPasajeroService.obtenerTiposDescuento().subscribe({
            next: (response) => {
                this.listaTiposDescuento = response.data || [];
                this.loadingDependientes = false;
            },
            error: (err) => {
                console.error('Error al obtener tipos de descuento:', err);
                this.loadingDependientes = false;
            }
        });
    }
    obtenerClientes() {
        this.loadingDependientes = true;
        this.clientesService.obtenerClientes().subscribe({
            next: (response) => {
                this.listaClientes = response.data || [];
                this.loadingDependientes = false;
                // Si el rol del usuario es 4 o mayor, establecer su idCliente y deshabilitar el campo
                if (this.idRolUser >= 4 && this.idClienteUser) {
                    this.tipoPasajeroForm.get('idCliente')?.setValue(this.idClienteUser, { emitEvent: false });
                    this.tipoPasajeroForm.get('idCliente')?.disable({ onlySelf: true });
                }
            },
            error: (err) => {
                console.error('Error al obtener clientes:', err);
                this.loadingDependientes = false;
            }
        });
    }
    obtenerTipoPasajero() {
        this.loading = true;
        this.tiposPasajeroService.obtenerTipoPasajero(this.idTipoPasajero).subscribe({
            next: (response) => {
                // La respuesta puede venir como array directo o dentro de response.data
                let dataArray = [];
                if (Array.isArray(response)) {
                    dataArray = response;
                }
                else if (Array.isArray(response?.data)) {
                    dataArray = response.data;
                }
                else if (response?.data) {
                    dataArray = [response.data];
                }
                const data = dataArray.length > 0 ? dataArray[0] : null;
                if (data) {
                    // Si el rol es >= 4, usar el idCliente del usuario, sino usar el de los datos
                    const idClienteValue = (this.idRolUser >= 4 && this.idClienteUser)
                        ? this.idClienteUser
                        : (data.idCliente ? Number(data.idCliente) : '');
                    // Convertir los valores string a número para que coincidan con los valores del formulario
                    const idCatTipoDescuentoValue = data.idCatTipoDescuento ? Number(data.idCatTipoDescuento) : '';
                    this.tipoPasajeroForm.patchValue({
                        nombre: data.nombre || '',
                        idCatTipoDescuento: idCatTipoDescuentoValue,
                        cantidad: data.cantidad != null ? Number(data.cantidad) : null,
                        idCliente: idClienteValue
                    });
                    // Si el rol es >= 4, deshabilitar el campo
                    if (this.idRolUser >= 4) {
                        this.tipoPasajeroForm.get('idCliente')?.disable({ onlySelf: true });
                    }
                }
                this.loading = false;
            },
            error: (err) => {
                console.error('Error al obtener tipo de pasajero:', err);
                this.loading = false;
                this.alerts.open({
                    type: 'error',
                    title: '¡Error!',
                    message: 'Error al cargar los datos del tipo de pasajero',
                    confirmText: 'Aceptar',
                    backdropClose: false
                });
            }
        });
    }
    async submit() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.tipoPasajeroForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                nombre: 'Nombre',
                idCatTipoDescuento: 'Tipo de Descuento',
                idCliente: 'Cliente'
            };
            const camposFaltantes = [];
            Object.keys(this.tipoPasajeroForm.controls).forEach(key => {
                const control = this.tipoPasajeroForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
                }
            });
            const lista = camposFaltantes.map((campo, index) => `
        <div style="padding: 8px 12px; border-left: 4px solid #d9534f;
                    background: #caa8a8; text-align: center; margin-bottom: 8px;
                    border-radius: 4px;">
          <strong style="color: #b02a37;">${index + 1}. ${campo}</strong>
        </div>
      `).join('');
            await this.alerts.open({
                type: 'warning',
                title: '¡Ops!',
                message: `
          <p style="text-align: center; font-size: 15px; margin-bottom: 16px; color: white">
            Hay campos obligatorios sin completar.<br>
          </p>
          <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
        `,
                confirmText: 'Entendido',
                backdropClose: false
            });
            return;
        }
        if (this.idTipoPasajero) {
            this.actualizar();
        }
        else {
            this.agregar();
        }
    }
    agregar() {
        const payload = this.tipoPasajeroForm.getRawValue();
        this.tiposPasajeroService.agregarTipoPasajero(payload).subscribe({
            next: () => {
                this.submitButton = 'Guardar';
                this.loading = false;
                this.alerts.open({
                    type: 'success',
                    title: '¡Operación Exitosa!',
                    message: 'Se agregó un nuevo tipo de pasajero de manera exitosa.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                this.regresar();
            },
            error: (error) => {
                this.submitButton = 'Guardar';
                this.loading = false;
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: String(error),
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
            }
        });
    }
    actualizar() {
        const payload = this.tipoPasajeroForm.getRawValue();
        this.tiposPasajeroService.actualizarTipoPasajero(this.idTipoPasajero, payload).subscribe({
            next: () => {
                this.submitButton = 'Guardar';
                this.loading = false;
                this.alerts.open({
                    type: 'success',
                    title: '¡Operación Exitosa!',
                    message: 'Los datos del tipo de pasajero se actualizaron correctamente.',
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
                this.regresar();
            },
            error: (error) => {
                this.submitButton = 'Guardar';
                this.loading = false;
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: String(error),
                    confirmText: 'Confirmar',
                    backdropClose: false
                });
            }
        });
    }
    regresar() {
        this.router.navigateByUrl('/administracion/tipos-pasajero');
    }
};
RegistrarTipoPasajeroComponent = __decorate([
    Component({
        selector: 'vex-registrar-tipo-pasajero',
        standalone: true,
        imports: [
            CommonModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule,
            MatSelectModule,
            VexPageLayoutComponent,
            VexPageLayoutContentDirective,
            RouterModule
        ],
        templateUrl: './registrar-tipo-pasajero.component.html',
        styleUrl: './registrar-tipo-pasajero.component.scss',
        animations: [fadeInRight400ms]
    })
], RegistrarTipoPasajeroComponent);
export { RegistrarTipoPasajeroComponent };
//# sourceMappingURL=registrar-tipo-pasajero.component.js.map