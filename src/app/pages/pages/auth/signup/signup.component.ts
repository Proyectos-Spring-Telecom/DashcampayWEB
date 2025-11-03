import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Credentials } from 'src/app/entities/Credentials';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { catchError, Subscription, throwError } from 'rxjs';
import { User } from 'src/app/entities/User';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { AlertsService } from '../../modal/alerts.service';
import { UsuariosService } from 'src/app/pages/services/usuarios.service';

@Component({
  selector: 'vex-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInRight400ms],
    standalone: true,
    imports: [
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      NgIf,
      NgClass,
      MatButtonModule,
      MatTooltipModule,
      MatIconModule,
      MatCheckboxModule,
      RouterLink,
      MatSnackBarModule
    ]
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  public textLogin: string = 'Confirmar';
  type: 'text' | 'password' = 'password';
  resetToken: string | null = null;
  hasMayus = false;
  hasMinus = false;
  hasNumber = false;
  espCaracter = false;
  minCaracteres = false;
  maxCaracteres = false;
  pwAllOk = false;
  pwGuideText = 'La contraseña debe tener al menos una mayúscula.';
  pwGuideKey = 'needUpper';
  matchText = 'Las contraseñas no coinciden';
  matchKey = 'noMatch';

  typeNew: 'text' | 'password' = 'password';
  typeConfirm: 'text' | 'password' = 'password';

  // ...

  // funciones independientes
  togglePasswordNew(): void {
    this.typeNew = this.typeNew === 'password' ? 'text' : 'password';
  }

  togglePasswordConfirm(): void {
    this.typeConfirm = this.typeConfirm === 'password' ? 'text' : 'password';
  }

  private subs: Subscription[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private user: UsuariosService,
    private router: Router,
    private alerts: AlertsService,
  ) { }

  ngOnInit(): void {
    this.resetToken =
      sessionStorage.getItem('reset_token') || this.route.snapshot.queryParamMap.get('token');

    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
    
    this.subs.push(
      this.signupForm.get('password')!.valueChanges.subscribe((val: string) => {
        const v = val || '';
        this.hasMayus = /[A-Z]/.test(v);
        this.hasMinus = /[a-z]/.test(v);
        this.hasNumber = /\d/.test(v);
        this.espCaracter = /[^A-Za-z0-9]/.test(v);
        this.minCaracteres = v.length > 6;
        this.maxCaracteres = v.length < 16;

        if (!this.hasMayus) {
          this.pwGuideText = 'La contraseña debe tener al menos una mayúscula.';
          this.pwGuideKey = 'needUpper';
        } else if (!this.hasMinus) {
          this.pwGuideText = 'La contraseña debe tener al menos una minúscula.';
          this.pwGuideKey = 'needLower';
        } else if (!this.hasNumber) {
          this.pwGuideText = 'La contraseña debe tener al menos un número.';
          this.pwGuideKey = 'needNumber';
        } else if (!this.espCaracter) {
          this.pwGuideText = 'La contraseña debe tener al menos un carácter no alfanumérico (ej. #?!&).';
          this.pwGuideKey = 'needSpecial';
        } else if (!(this.minCaracteres && this.maxCaracteres)) {
          this.pwGuideText = 'La contraseña debe tener al menos más de 6 y menos de 16 caracteres.';
          this.pwGuideKey = 'needLength';
        } else {
          this.pwGuideText = 'Contraseña válida.';
          this.pwGuideKey = 'ok';
        }

        this.pwAllOk =
          this.hasMayus &&
          this.hasMinus &&
          this.hasNumber &&
          this.espCaracter &&
          this.minCaracteres &&
          this.maxCaracteres;
        this.updateMatchHint();
      })
    );

    this.subs.push(
      this.signupForm.get('confirmPassword')!.valueChanges.subscribe(() => {
        this.updateMatchHint();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  myFunctionPasswordCurrent(): void {
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  get showPwHint(): boolean {
    const c = this.signupForm.get('password')!;
    return !!c.value || c.dirty || c.touched;
  }

  get showMatchHint(): boolean {
    const pass = this.signupForm.get('password')!.value;
    const confirm = this.signupForm.get('confirmPassword')!;
    return !!pass && (confirm.dirty || confirm.touched);
  }

  get passwordsMatch(): boolean {
    const pass = this.signupForm.get('password')!.value || '';
    const conf = this.signupForm.get('confirmPassword')!.value || '';
    return pass.length > 0 && conf.length > 0 && pass === conf;
  }

  private updateMatchHint(): void {
    const ok = this.passwordsMatch;
    this.matchText = ok ? 'Las contraseñas coinciden' : 'Las contraseñas no coinciden';
    this.matchKey = ok ? 'match' : 'noMatch';
  }
  
  agregar(): void {
    this.loading = true;
    this.textLogin = 'Cargando...';

    if (this.signupForm.invalid || !this.pwAllOk || !this.passwordsMatch) {
      this.signupForm.markAllAsTouched();
      return;
    }

    if (!this.resetToken) {
      console.log('No hay token para la verificación')
      return;
    }

    this.loading = true;
    const { userName, password } = this.signupForm.value;

    this.user.cambioContrasena({ userName, password }, this.resetToken!).subscribe({
      next: async () => {
        this.alerts.open({
          type: 'success',
          title: '¡Operación Exitosa!',
          message: '¡Listo! Hemos actualizado tu contraseña de manera correcta.',
          showCancel: false,
          confirmText: 'Confirmar',
          cancelText: 'Cancelar'
        })
        this.loading = false;
        this.textLogin = 'Confirmar';
        sessionStorage.removeItem('reset_token');
        this.signupForm.reset();
        this.submitted = false;

        this.router.navigate(['/account', 'login']);
      }
      ,
      error: () => {
        this.loading = false;
        this.textLogin = 'Confirmar';
        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: 'Ocurrió un error al hacer el cambio de contraseña.',
          showCancel: false,
          confirmText: 'Confirmar',
          cancelText: 'Cancelar'
        })
      },
      complete: () => this.loading = false
    });
  }
}