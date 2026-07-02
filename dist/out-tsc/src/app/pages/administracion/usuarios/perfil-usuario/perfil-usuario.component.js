import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DxDataGridModule } from 'devextreme-angular';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { animate, style, transition, trigger } from '@angular/animations';
import { finalize } from 'rxjs';
let PerfilUsuarioComponent = class PerfilUsuarioComponent {
    constructor(fb, alerts, users, usuarioService) {
        this.fb = fb;
        this.alerts = alerts;
        this.users = users;
        this.usuarioService = usuarioService;
        this.user = {
            nombre: 'Jane Cooper',
            usuario: '@janecooper',
            rol: 'Product Manager',
            email: 'jane.cooper@example.com',
            telefono: '+52 55 1234 5678',
            ubicacion: 'CDMX, México',
            bio: 'Creando productos útiles con foco en datos y experiencia.',
            avatarUrl: 'assets/images/user_default.png',
            joinedAt: new Date('2023-07-18'),
            stats: { posts: 124, seguidores: 3482, siguiendo: 198, reputacion: 97 },
            skills: ['Angular', 'DevExtreme', 'RxJS', 'UX Writing'],
            tags: ['Activo'],
        };
        this.ultimoLogin = null;
        this.show = { curr: false, neu: false, conf: false };
        this.uploadingFoto = false;
        this.loading = false;
        this.dryRun = true;
        this.confirmMsg = '';
        this.confirmState = 'neutral';
        this.passwordStrengthMsg = '';
        this.passwordStrengthColor = '';
        this.hintVersion = 0;
        this.isAllValid = false;
        this.defaultAvatar = 'assets/img/avatars/noavatar.png';
        this.showUltimoLogin = null;
        this.passwordForm = this.fb.group({
            // ✅ NUEVOS NOMBRES
            passwordActual: ['', Validators.required],
            passwordNueva: ['', [Validators.required, Validators.minLength(8)]],
            passwordNuevaConfirmacion: ['', Validators.required],
        }, { validators: this.passwordsMatchValidator });
        this.t = (c) => this.passwordForm.get(c);
        this.trackByIndex = (i) => i;
        // 1) User crudo (puede venir null/undefined o con otra forma)
        const userRaw = (this.users.getUser?.() ?? null);
        // 2) Helpers seguros
        const sanitize = (v, fallback = '') => {
            if (v === null || v === undefined)
                return fallback;
            const s = String(v);
            return s && s !== 'null' ? s : fallback;
        };
        // Busca la primera key existente y no vacía en userRaw
        const pick = (...keys) => {
            for (const k of keys) {
                const val = userRaw?.[k];
                if (val !== undefined && val !== null && val !== '' && val !== 'null')
                    return val;
            }
            return undefined;
        };
        // 3) Normalización de campos con nombres alternativos
        const rolObj = (userRaw?.rol ?? userRaw?.role) || {};
        const u = {
            nombre: sanitize(pick('nombre', 'name')),
            apellidoPaterno: sanitize(pick('apellidoPaterno', 'apellido1', 'apellido')),
            apellidoMaterno: sanitize(pick('apellidoMaterno', 'apellido2')),
            fechaCreacion: pick('fechaCreacion', 'fhRegistro', 'createdAt'),
            ultimoLogin: pick('ultimoLogin', 'lastLogin', 'last_sign_in_at'),
            telefono: sanitize(pick('telefono', 'phone'), ''),
            userName: sanitize(pick('userName', 'email', 'correo'), ''),
            rolNombre: sanitize(rolObj?.nombre ?? rolObj?.name ?? userRaw?.rol ?? userRaw?.role ?? ''),
            rolDescripcion: sanitize(rolObj?.descripcion ?? rolObj?.description ?? ''),
            fotoPerfil: sanitize(pick('fotoPerfil', 'avatar', 'profileImage'), 'assets/img/avatars/noavatar.png'),
            id: pick('id', 'userId')
        };
        // 4) Asignaciones a tus variables de vista
        this.showNombre = u.nombre;
        this.showApellidoPaterno = u.apellidoPaterno;
        this.showApellidoMaterno = u.apellidoMaterno;
        this.showCreacion = this.formatFechaCreacion(u.fechaCreacion);
        this.ultimoLogin = this.formatFechaCreacion(u.ultimoLogin);
        this.showTelefono = u.telefono || 'Sin registro';
        this.showCorreo = u.userName;
        this.showRol = u.rolNombre;
        this.showRolDescripcion = u.rolDescripcion;
        this.showRolExtraDescripcion = this.getDescripcionRol(u.rolNombre);
        this.showImage = u.fotoPerfil;
        this.showId = u.id;
    }
    formatFechaCreacion(raw) {
        if (!raw || raw === 'null')
            return '';
        const d = new Date(raw);
        if (isNaN(d.getTime()))
            return String(raw);
        const pad = (n) => String(n).padStart(2, '0');
        return (`${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ` +
            `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    }
    get resolvedAvatar() {
        const v = (this.showImage ?? '').toString().trim();
        if (!v || v === 'null' || v === 'undefined' || v === '[object Object]') {
            return this.defaultAvatar;
        }
        return v;
    }
    onAvatarError(ev) {
        if (this.showImage && this.showImage !== this.defaultAvatar) {
            this.showImage = this.defaultAvatar;
        }
    }
    onFileSelected(ev) {
        const input = ev.target;
        const file = input?.files?.[0];
        if (!file || !file.type.startsWith('image/')) {
            if (file) {
                this.alerts.open({
                    type: 'warning',
                    title: 'Archivo no válido',
                    message: 'Por favor selecciona una imagen (JPG, PNG, etc.).',
                    backdropClose: false
                });
            }
            input.value = '';
            return;
        }
        const formData = new FormData();
        formData.append('foto', file, file.name);
        if (this.showId != null) {
            formData.append('idUsuario', String(this.showId));
        }
        this.uploadingFoto = true;
        this.usuarioService.subirFotoPerfil(formData).pipe(finalize(() => {
            this.uploadingFoto = false;
            input.value = '';
        })).subscribe({
            next: (resp) => {
                const url = resp?.data?.url ?? resp?.url ?? resp?.fotoPerfil ?? resp?.foto;
                if (url) {
                    this.showImage = url;
                }
                this.alerts.open({
                    type: 'success',
                    title: '¡Foto actualizada!',
                    message: 'Tu foto de perfil se ha actualizado correctamente.',
                    backdropClose: false
                });
            },
            error: (err) => {
                const msg = err?.error?.message ?? err?.message ?? 'Error al subir la foto.';
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: msg,
                    backdropClose: false
                });
            }
        });
    }
    getDescripcionRol(rol) {
        switch (rol?.toUpperCase()) {
            case 'SA':
                return 'Acceso total al sistema, puede gestionar usuarios, configuraciones, operaciones y seguridad sin restricciones.';
            case 'Administrador':
                return 'Responsable de la gestión general, incluyendo altas y bajas de recursos, configuración básica y soporte a operadores.';
            case 'Operador':
                return 'Enfocado únicamente en sus propias rutas y actividades asignadas. No tiene acceso a información de otros usuarios ni a configuraciones críticas.';
            case 'Reportes':
                return 'Encargado de la generación, análisis y consulta de reportes operativos y administrativos, con acceso especializado a datos históricos y métricas.';
            case 'Pasajeros':
                return 'Acceso limitado a la información relacionada con sus viajes, historial de rutas y notificaciones relevantes.';
            default:
                return 'Rol sin descripción extra definida.';
        }
    }
    onPasswordInput() {
        const value = this.passwordForm.get('passwordNueva')?.value || '';
        const checks = {
            upper: /\p{Lu}/u.test(value),
            lower: /\p{Ll}/u.test(value),
            number: /[0-9]/.test(value),
            special: /[^\p{L}\p{N}]/u.test(value),
            length: value.length >= 8 && value.length <= 16,
        };
        const missing = [];
        if (!checks.upper)
            missing.push('una mayúscula');
        if (!checks.lower)
            missing.push('una minúscula');
        if (!checks.number)
            missing.push('un número');
        if (!checks.special)
            missing.push('un carácter especial');
        const allOtherValid = checks.upper && checks.lower && checks.number && checks.special;
        if (allOtherValid && !checks.length)
            missing.push('entre 8 y 16 caracteres');
        this.isAllValid = missing.length === 0;
        const prevMsg = this.passwordStrengthMsg;
        if (this.isAllValid) {
            this.passwordStrengthMsg = 'Contraseña válida';
            this.passwordStrengthColor = 'valid';
        }
        else {
            this.passwordStrengthMsg = 'Debe incluir: ' + missing.join(', ') + '.';
            this.passwordStrengthColor = 'invalid';
        }
        if (this.passwordStrengthMsg !== prevMsg)
            this.hintVersion++;
    }
    updateConfirmState() {
        const newPwd = this.passwordForm.get('passwordNueva')?.value || '';
        const conf = this.passwordForm.get('passwordNuevaConfirmacion')?.value || '';
        if (!newPwd || !conf) {
            this.confirmMsg = '';
            this.confirmState = 'neutral';
            return;
        }
        if (newPwd === conf) {
            this.confirmMsg = 'Las contraseñas coinciden';
            this.confirmState = 'valid';
        }
        else {
            this.confirmMsg = 'Las contraseñas no coinciden';
            this.confirmState = 'invalid';
        }
    }
    get canSave() {
        const f = this.passwordForm;
        const a = f.get('passwordActual')?.value?.trim();
        const n = f.get('passwordNueva')?.value;
        const c = f.get('passwordNuevaConfirmacion')?.value;
        const allFilled = !!a && !!n && !!c;
        const match = n === c;
        return allFilled && match && !this.loading;
    }
    // ✅ validador con NUEVOS nombres
    passwordsMatchValidator(group) {
        const a = group.get('passwordNueva')?.value;
        const b = group.get('passwordNuevaConfirmacion')?.value;
        return a && b && a !== b ? { passwordMismatch: true } : null;
    }
    // ✅ Ejecuta el servicio (sin dry-run). Mantengo logging.
    actualizarContrasena() {
        if (this.passwordForm.invalid) {
            this.passwordForm.markAllAsTouched();
            this.alerts.open({
                type: 'error',
                title: 'Formulario incompleto',
                message: 'Por favor, completa todos los campos correctamente.',
                backdropClose: false
            });
            return;
        }
        const body = {
            passwordActual: this.passwordForm.get('passwordActual')?.value,
            passwordNueva: this.passwordForm.get('passwordNueva')?.value,
            passwordNuevaConfirmacion: this.passwordForm.get('passwordNuevaConfirmacion')?.value,
        };
        console.log('[REQUEST] actualizarContrasena', { idUsuario: this.showId, body });
        this.loading = true;
        this.usuarioService
            .actualizarContrasena(this.showId, body)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe({
            next: () => {
                this.alerts.open({
                    type: 'success',
                    title: '¡Contraseña actualizada!',
                    message: 'Tu contraseña ha sido cambiada correctamente.',
                    backdropClose: false
                });
                this.passwordForm.reset();
                this.show = { curr: false, neu: false, conf: false };
                this.confirmMsg = '';
                this.confirmState = 'neutral';
                this.passwordStrengthMsg = '';
                this.passwordStrengthColor = '';
                this.isAllValid = false;
            },
            error: (error) => {
                const mensaje = error?.error?.message || 'Ocurrió un error al actualizar la contraseña.';
                console.error('[ERROR] actualizarContrasena', error);
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: mensaje,
                    backdropClose: false
                });
            },
        });
    }
    onResetPassword() {
        this.passwordForm.reset();
        this.show = { curr: false, neu: false, conf: false };
    }
    async onSubmitPassword() {
        if (this.passwordForm.invalid) {
            this.passwordForm.markAllAsTouched();
            return;
        }
        this.loading = true;
        try {
            const { currentPassword, newPassword } = this.passwordForm.value;
            this.onResetPassword();
        }
        catch (e) {
        }
        finally {
            this.loading = false;
        }
    }
};
__decorate([
    Input()
], PerfilUsuarioComponent.prototype, "user", void 0);
PerfilUsuarioComponent = __decorate([
    Component({
        selector: 'vex-perfil-usuario',
        standalone: true,
        templateUrl: './perfil-usuario.component.html',
        styleUrl: './perfil-usuario.component.scss',
        animations: [fadeInRight400ms,
            trigger('hintSwap', [
                transition('* => *', [
                    animate('90ms ease-in', style({ opacity: 0, transform: 'translateY(-4px)' })),
                    animate('180ms 40ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
                ]),
            ]),
        ],
        imports: [
            CommonModule,
            MatButtonToggleModule,
            ReactiveFormsModule,
            MatButtonModule,
            MatTooltipModule,
            MatIconModule,
            MatMenuModule,
            MatTableModule,
            MatSortModule,
            MatCheckboxModule,
            MatPaginatorModule,
            FormsModule,
            MatDialogModule,
            MatInputModule,
            DxDataGridModule
        ]
    })
], PerfilUsuarioComponent);
export { PerfilUsuarioComponent };
//# sourceMappingURL=perfil-usuario.component.js.map