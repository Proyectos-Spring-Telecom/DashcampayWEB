import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Credentials } from 'src/app/entities/Credentials';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { catchError, throwError } from 'rxjs';
import { User } from 'src/app/entities/User';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { AlertsService } from '../../modal/alerts.service';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInRight400ms],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatCheckboxModule,
    RouterLink,
    MatSnackBarModule
  ]
})

export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  inputType = 'password';
  visible = false;
  public textLogin: string = 'Iniciar Sesión';
  public loading: boolean = false;
  public loginForm: UntypedFormGroup;
  public credentials: Credentials;
  modalOpen = false;
  modalClosing = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alerts: AlertsService,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private auth: AuthenticationService,
    private zone: NgZone, private cdr: ChangeDetectorRef,
  ) {
    this.loginForm = this.fb.group({
      userName: [''],
      password: ['']
    });

    this.credentials = {};
  }

  ngOnInit(): void {
    this.initForm();
  }

  send() {
    this.router.navigate(['/']);
    this.snackbar.open(
      "Lucky you! Looks like you didn't need a password or email address! For a real application we provide validators to prevent this. ;)",
      'THANKS',
      {
        duration: 10000
      }
    );
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  initForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      // email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
      // password: ['123456', [Validators.required]],
    });
  }

onSubmit() {
  this.loading = true;
  this.textLogin = 'Cargando...';
  const credentials = this.loginForm.value;

  this.auth.authenticate(credentials).subscribe({
    next: (result: User) => {
      this.zone.run(() => {
        // this.modalOpen = true;
        // this.modalClosing = false;
        this.alerts.open({
          type: 'success',
          title: 'Inicio de sesión correcto',
          message: 'Tu cuenta ha sido autenticada exitosamente.',
          showCancel: false,
          confirmText: 'Confirmar',
          cancelText: 'Cancelar'
        }).then(result => {
          if (result === 'confirm') {
            this.router.navigate(['/administracion/dashboard']);
          } else {
            
          }
        });
        this.loading = false;
        this.textLogin = 'Iniciar Sesión';
        this.cdr.detectChanges();
        setTimeout(() => this.auth.setData(result), 0);
      });
    },
    error: (err: any) => {
      this.zone.run(() => {
        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: 'Ocurrio un error al ingresar sus credenciales.',
        });
        this.loading = false;
        this.textLogin = 'Iniciar Sesión';
        this.cdr.detectChanges();
      });
    }
  });
}

// Handlers específicos del modal rojo
closeErrorModal() {
  this.modalErrorClosing = true;
  this.cdr.detectChanges();
  setTimeout(() => {
    this.modalErrorOpen = false;
    this.modalErrorClosing = false;
    this.cdr.detectChanges();
  }, 200);
}
onBackdropError() { this.closeErrorModal(); }

closeModal() {
  this.modalClosing = true;
  this.cdr.detectChanges();

  // Navega DESPUÉS de la animación
  setTimeout(() => {
    this.modalOpen = false;
    this.modalClosing = false;
    this.cdr.detectChanges();
    this.router.navigate(['/administracion/dispositivos']);
  }, 600);
}

  openModal() {
    this.modalOpen = true;
    this.modalClosing = false;
  }



// Agrega estos dos si los referencías en el HTML
onBackdrop() { this.closeModal(); }
onAnimEnd() { /* no-op para evitar errores de plantilla */ }



modalErrorOpen = false;
modalErrorClosing = false;


}
