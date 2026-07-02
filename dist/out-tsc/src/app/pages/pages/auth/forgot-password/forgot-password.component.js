import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
let ForgotPasswordComponent = class ForgotPasswordComponent {
    constructor(formBuilder, route, router, alerts, user, authenticationService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.alerts = alerts;
        this.user = user;
        this.authenticationService = authenticationService;
        this.submitted = false;
        this.error = '';
        this.success = '';
        this.loading = false;
        this.year = new Date().getFullYear();
        this.type = 'password';
        this.textLogin = 'Confirmar';
    }
    ngOnInit() {
        document.body.setAttribute('class', 'authentication-bg');
        this.resetForm = this.formBuilder.group({
            userName: ['', [Validators.required, Validators.email]],
        });
    }
    ngAfterViewInit() {
    }
    myFunctionPasswordCurrent() {
        if (this.type === "password") {
            this.type = "text";
        }
        else {
            this.type = "password";
        }
    }
    ngOnDestroy() {
        document.body.classList.remove('authentication-bg');
    }
    get f() { return this.resetForm.controls; }
    agregar() {
        this.loading = true;
        this.textLogin = 'Cargando...';
        if (this.resetForm.invalid) {
            this.resetForm.markAllAsTouched();
            const etiquetas = {
                userName: 'Correo Electrónico',
            };
            const camposFaltantes = [];
            Object.keys(this.resetForm.controls).forEach(key => {
                const control = this.resetForm.get(key);
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
            this.alerts.open({
                type: 'warning',
                title: '¡Ops!',
                message: `
        <p style="text-align: center; font-size: 15px; margin-bottom: 16px; color: white">
          Hay campos obligatorios sin completar.<br>
        </p>
        <div style="max-height: 350px; overflow-y: auto;">${lista}</div>
      `,
                confirmText: 'Entendido',
                backdropClose: false,
            });
            return;
        }
        this.loading = true;
        this.user.solicitarCambioContrasena(this.resetForm.value).subscribe({
            next: async (token) => {
                this.loading = false;
                this.textLogin = 'Confirmar';
                sessionStorage.setItem('reset_token', token);
                this.alerts.open({
                    type: 'success',
                    title: '¡Operación Exitosa!',
                    message: 'Hemos enviado instrucciones para restablecer tu contraseña a tu correo electrónico.',
                    showCancel: false,
                    confirmText: 'Confirmar',
                    cancelText: 'Cancelar'
                }).then((result) => {
                    if (result === 'confirm') {
                        this.router.navigate(['/login']);
                    }
                    else {
                    }
                });
                this.resetForm.reset();
                this.submitted = false;
                this.router.navigate(['/login']);
            },
            error: async () => {
                this.loading = false;
                this.textLogin = 'Confirmar';
                this.alerts.open({
                    type: 'error',
                    title: '¡Ops!',
                    message: 'Ocurrio un error al tratar de enviar el correo',
                });
            },
            complete: () => {
                this.loading = false;
            }
        });
    }
};
ForgotPasswordComponent = __decorate([
    Component({
        selector: 'vex-forgot-password',
        templateUrl: './forgot-password.component.html',
        styleUrls: ['./forgot-password.component.scss'],
        animations: [fadeInRight400ms],
        standalone: true,
        imports: [
            ReactiveFormsModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            NgIf,
            RouterLink,
            MatButtonModule
        ]
    })
], ForgotPasswordComponent);
export { ForgotPasswordComponent };
//# sourceMappingURL=forgot-password.component.js.map