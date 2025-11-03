import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { DxDataGridComponent } from 'devextreme-angular';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { RutasService } from 'src/app/pages/services/ruta.service';
import { UsuariosService } from 'src/app/pages/services/usuarios.service';

@Component({
  selector: 'vex-mapa',
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.scss',
  animations: [fadeInRight400ms],
})
export class MapaComponent implements OnInit {

  layoutCtrl = new UntypedFormControl('fullwidth');
  isLoading: boolean = false;
  listaRutas: any[] = [];
  public grid: boolean = false;
  public showFilterRow: boolean;
  public showHeaderFilter: boolean;
  public loadingVisible: boolean = false;
  public mensajeAgrupar: string = "Arrastre un encabezado de columna aquí para agrupar por esa columna"
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  public autoExpandAllGroups: boolean = true;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  isGrouped: boolean = false;

  constructor(private rutService:RutasService, private alerts: AlertsService){
    this.showFilterRow = true;
    this.showHeaderFilter = true;
  }

  ngOnInit(): void {
      this.obtenerRutas()
  }

  obtenerRutas(){
    this.rutService.obtenerRutas().subscribe((response)=> {
      this.listaRutas = response;
    })
  }

  limpiarCampos() {
    const today = new Date();
    this.dataGrid.instance.clearGrouping();
    this.isGrouped = false;
    this.obtenerRutas();
    this.dataGrid.instance.refresh();
  }

  toggleExpandGroups() {
    const groupedColumns = this.dataGrid.instance.getVisibleColumns()
      .filter(col => (col.groupIndex ?? -1) >= 0);
    if (groupedColumns.length === 0) {
      this.alerts.open({
        type: 'info',
        title: '¡Ops!',
        message: 'Debes arrastar un encabezado de una columna para expandir o contraer grupos.',
        backdropClose: false
      });
    } else {
      this.autoExpandAllGroups = !this.autoExpandAllGroups;
      this.dataGrid.instance.refresh();
    }
  }

}
