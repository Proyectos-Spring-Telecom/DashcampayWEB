import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
let AgregarTurnoComponent = class AgregarTurnoComponent {
    constructor(fb, turnService, activatedRouted, router, alerts, clieService, operaService, instService) {
        this.fb = fb;
        this.turnService = turnService;
        this.activatedRouted = activatedRouted;
        this.router = router;
        this.alerts = alerts;
        this.clieService = clieService;
        this.operaService = operaService;
        this.instService = instService;
        this.layoutCtrl = new UntypedFormControl('fullwidth');
        this.submitButton = 'Guardar';
        this.loading = false;
        this.title = 'Agregar Turno';
        this.listaClientes = [];
        this.selectedFileName = '';
        this.previewUrl = null;
        this.listaOperadores = [];
        this.listaBlueVox = [];
        this.listaInstalaciones = [];
    }
    ngOnInit() {
        // this.obtenerClientes()
        this.obtenerClientes();
        this.obtenerOperador();
        this.obtenerInstalaciones();
        this.initForm();
        this.activatedRouted.params.subscribe((params) => {
            this.idTurno = params['idTurno'];
            if (this.idTurno) {
                this.title = 'Actualizar Turno';
                this.obtenerTurno();
            }
        });
    }
    normalizeId(arr = []) {
        return (arr || []).map((x) => ({ ...x, id: Number(x.id) }));
    }
    // Date (local) -> "YYYY-MM-DDTHH:mm:00Z"
    toZ(d) {
        if (!d)
            return null;
        const date = new Date(d);
        if (isNaN(date.getTime()))
            return null;
        const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0));
        return utc.toISOString().replace('.000Z', 'Z'); // "…:00Z"
    }
    // "…Z" -> Date (para dx-date-box). Devuelve undefined (no null)
    fromZ(v) {
        if (!v)
            return undefined;
        const d = new Date(v);
        return isNaN(d.getTime()) ? undefined : d;
    }
    obtenerInstalaciones() {
        this.instService.obtenerInstalaciones().subscribe((response) => {
            this.listaInstalaciones = this.normalizeId(response?.data ?? []);
        });
    }
    obtenerClientes() {
        this.clieService.obtenerClientes().subscribe((response) => {
            this.listaClientes = this.normalizeId(response?.data ?? []);
        });
    }
    obtenerOperador() {
        this.operaService.obtenerOperadores().subscribe((response) => {
            const operadores = Array.isArray(response)
                ? response
                : Array.isArray(response?.data)
                    ? response.data
                    : [];
            this.listaOperadores = operadores.map((op) => ({
                id: Number(op.id),
                nombreUsuario: op.nombreUsuario ?? '',
                apellidoPaternoUsuario: op.apellidoPaternoUsuario ?? '',
                apellidoMaternoUsuario: op.apellidoMaternoUsuario ?? ''
            }));
        });
    }
    toInputDatetime(z) {
        if (!z)
            return null;
        return String(z).replace('Z', '').slice(0, 16);
    }
    obtenerTurno() {
        this.turnService.obtenerTurno(this.idTurno).subscribe((response) => {
            const turno = Array.isArray(response?.data) ? response.data[0] : response?.data;
            if (!turno)
                return;
            this.turnoForm.patchValue({
                inicio: this.zToInput(turno.inicio),
                fin: this.zToInput(turno.fin),
                idCliente: turno.idCliente != null ? Number(turno.idCliente) : null,
                idOperador: turno.idOperador != null ? Number(turno.idOperador) : null,
                idInstalacion: turno.idInstalacion != null ? Number(turno.idInstalacion) : null,
                estatus: turno.estatus ?? 1
            }, { emitEvent: false });
        });
    }
    initForm() {
        this.turnoForm = this.fb.group({
            inicio: ['', Validators.required],
            fin: ['', Validators.required],
            estatus: [1, Validators.required],
            idCliente: [null, Validators.required],
            idOperador: [null, Validators.required],
            idInstalacion: [null, Validators.required]
        });
    }
    // Convierte "2025-09-24T08:00:00Z" -> "2025-09-24T08:00" (para <input type="datetime-local">)
    zToInput(v) {
        if (!v)
            return null;
        // Acepta también "YYYY-MM-DDTHH:mm" por si ya viene sin Z
        const s = String(v);
        if (s.endsWith('Z'))
            return s.replace('Z', '').slice(0, 16);
        return s.slice(0, 16);
    }
    // Convierte "YYYY-MM-DDTHH:mm" (local) -> "YYYY-MM-DDTHH:mm:00Z"
    inputToZ(v) {
        if (!v)
            return null;
        // No aplicamos zona horaria; se conserva la hora escrita (24h) y se marca Z
        // Ej: "2025-09-24T03:00" -> "2025-09-24T03:00:00Z"
        return `${v}:00Z`;
    }
    submit() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.idTurno) {
            this.actualizar();
        }
        else {
            this.agregar();
        }
    }
    async agregar() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.turnoForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                inicio: 'Inicio del Turno',
                fin: 'Fin del Turno',
                idCliente: 'Cliente',
                idOperador: 'Operador',
                idInstalacion: 'Instalación'
            };
            const camposFaltantes = [];
            Object.keys(this.turnoForm.controls).forEach((key) => {
                const control = this.turnoForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
                }
            });
            const lista = camposFaltantes
                .map((campo, index) => `
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
        if (this.turnoForm.contains('id'))
            this.turnoForm.removeControl('id');
        const raw = this.turnoForm.getRawValue();
        const payload = {
            ...raw,
            inicio: this.inputToZ(raw.inicio),
            fin: this.inputToZ(raw.fin)
        };
        this.turnService.agregarTurno(payload).subscribe(() => {
            this.submitButton = 'Guardar';
            this.loading = false;
            this.alerts.open({
                type: 'success',
                title: '¡Operación Exitosa!',
                message: 'Se agregó un nuevo turno de manera exitosa.',
                confirmText: 'Confirmar',
                backdropClose: false
            });
            this.regresar();
        }, (error) => {
            this.submitButton = 'Guardar';
            this.loading = false;
            this.alerts.open({
                type: 'error',
                title: '¡Ops!',
                message: String(error ?? 'Ocurrió un error al agregar el turno.'),
                confirmText: 'Confirmar',
                backdropClose: false
            });
        });
    }
    async actualizar() {
        this.submitButton = 'Cargando...';
        this.loading = true;
        if (this.turnoForm.invalid) {
            this.submitButton = 'Guardar';
            this.loading = false;
            const etiquetas = {
                inicio: 'Inicio del Turno',
                fin: 'Fin del Turno',
                idCliente: 'Cliente',
                idOperador: 'Operador',
                idInstalacion: 'Instalación'
            };
            const camposFaltantes = [];
            Object.keys(this.turnoForm.controls).forEach((key) => {
                const control = this.turnoForm.get(key);
                if (control?.invalid && control.errors?.['required']) {
                    camposFaltantes.push(etiquetas[key] || key);
                }
            });
            const lista = camposFaltantes
                .map((campo, index) => `
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
        const raw = this.turnoForm.getRawValue();
        const payload = {
            ...raw,
            inicio: this.inputToZ(raw.inicio),
            fin: this.inputToZ(raw.fin)
        };
        this.turnService.actualizarTurno(this.idTurno, payload).subscribe(() => {
            this.submitButton = 'Actualizar';
            this.loading = false;
            this.alerts.open({
                type: 'success',
                title: '¡Operación Exitosa!',
                message: 'Los datos del turno se actualizaron correctamente.',
                confirmText: 'Confirmar',
                backdropClose: false
            });
            this.regresar();
        }, (error) => {
            this.submitButton = 'Actualizar';
            this.loading = false;
            this.alerts.open({
                type: 'error',
                title: '¡Ops!',
                message: String(error ?? 'Ocurrió un error al actualizar el turno.'),
                confirmText: 'Confirmar',
                backdropClose: false
            });
        });
    }
    regresar() {
        this.router.navigateByUrl('/administracion/turnos');
    }
};
AgregarTurnoComponent = __decorate([
    Component({
        selector: 'vex-agregar-turno',
        templateUrl: './agregar-turno.component.html',
        styleUrl: './agregar-turno.component.scss',
        animations: [fadeInRight400ms]
    })
], AgregarTurnoComponent);
export { AgregarTurnoComponent };
//# sourceMappingURL=agregar-turno.component.js.map