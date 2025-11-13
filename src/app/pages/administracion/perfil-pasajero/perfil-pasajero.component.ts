import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';

@Component({
  selector: 'vex-perfil-pasajero',
  templateUrl: './perfil-pasajero.component.html',
  styleUrl: './perfil-pasajero.component.scss',
    animations: [fadeInRight400ms],
})
export class PerfilPasajeroComponent {

  layoutCtrl = new UntypedFormControl('fullwidth');

}
