import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { stagger80ms } from '@vex/animations/stagger.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';

@Component({
  selector: 'vex-form-wizard',
  templateUrl: './form-wizard.component.html',
  styleUrls: ['./form-wizard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [stagger80ms, fadeInUp400ms, scaleIn400ms, fadeInRight400ms],
  standalone: true,
  imports: [
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgFor,
    MatOptionModule,
    NgIf,
    MatCheckboxModule,
    MatSnackBarModule
  ]
})
export class FormWizardComponent {
  phonePrefixOptions = ['+1', '+27', '+44', '+49', '+61', '+91'];

  /**
   * Horizontal Stepper
   */
  accountFormGroup: UntypedFormGroup = this.fb.group({
    username: [null, Validators.required],
    name: [null, Validators.required],
    email: [null, Validators.required],
    phonePrefix: [this.phonePrefixOptions[3]],
    phone: []
  });

  passwordFormGroup: UntypedFormGroup = this.fb.group({
    password: [
      null,
      Validators.compose([Validators.required, Validators.minLength(6)])
    ],
    passwordConfirm: [null, Validators.required]
  });

  confirmFormGroup: UntypedFormGroup = this.fb.group({
    terms: [null, Validators.requiredTrue]
  });

  /**
   * Vertical Stepper
   */
  verticalAccountFormGroup: UntypedFormGroup = this.fb.group({
    username: [null, Validators.required],
    name: [null, Validators.required],
    email: [null, Validators.required],
    phonePrefix: [this.phonePrefixOptions[3]],
    phone: []
  });

  verticalPasswordFormGroup: UntypedFormGroup = this.fb.group({
    password: [
      null,
      Validators.compose([Validators.required, Validators.minLength(6)])
    ],
    passwordConfirm: [null, Validators.required]
  });

  verticalConfirmFormGroup: UntypedFormGroup = this.fb.group({
    terms: [null, Validators.requiredTrue]
  });

  passwordInputType = 'password';

  constructor(
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar
  ) {}

  showPassword() {
    this.passwordInputType = 'text';
    this.cd.markForCheck();
  }

  hidePassword() {
    this.passwordInputType = 'password';
    this.cd.markForCheck();
  }

  submit() {
    this.snackbar.open(
      'Hooray! You successfully created your account.',
      undefined,
      {
        duration: 5000
      }
    );
  }
}
