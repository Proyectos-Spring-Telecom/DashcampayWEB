import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { DxDataGridComponent } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import { lastValueFrom } from 'rxjs';
import { AlertsService } from 'src/app/pages/pages/modal/alerts.service';
import { OperadoresService } from 'src/app/pages/services/operadores.service';

@Component({
  selector: 'vex-lista-operadores',
  templateUrl: './lista-operadores.component.html',
  styleUrl: './lista-operadores.component.scss',
  animations: [fadeInRight400ms],
})
export class ListaOperadoresComponent implements OnInit {

  layoutCtrl = new UntypedFormControl('fullwidth');

  listaOperadores: any;
  isLoading: boolean = false;
  public grid: boolean = false;
  public showFilterRow: boolean;
  public showHeaderFilter: boolean;
  public loadingVisible: boolean = false;
  public mensajeAgrupar: string = "Arrastre un encabezado de columna aquí para agrupar por esa columna";
  public loading!: boolean;
  public loadingMessage: string = 'Cargando...';
  public paginaActual: number = 1;
  public totalRegistros: number = 0;
  public pageSize: number = 20;
  public totalPaginas: number = 0;
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  public autoExpandAllGroups: boolean = true;
  isGrouped: boolean = false;
  public paginaActualData: any[] = [];
  public filtroActivo: string = '';

  constructor(
    private opService: OperadoresService,
    private router: Router, private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private alerts: AlertsService,
  ) {
    this.showFilterRow = true;
    this.showHeaderFilter = true;
  }

  ngOnInit(): void {
    this.obtenerOperadores();
  }

  // hasPermission(permission: string): boolean {
  //   return this.permissionsService.getPermission(permission) !== undefined;
  // }

  agregarOperador() {
    this.router.navigateByUrl('/administracion/operadores/agregar-operador')
  }

  getAntecedentesUrl(row: any): string | null {
    return row?.antecedentesNoPenales || row?.antecedentesPenales || null;
  }

  irAVerDocumento(url: string, titulo: string, fila: any) {
    this.router.navigate(['ver-documento'], {
      relativeTo: this.route,                  // estando dentro de /administracion/lo-que-sea
      queryParams: { url, titulo }             // tu visor leerá estos params
    });
  }

  obtenerOperadores() {
    this.loading = true;
    this.listaOperadores = new CustomStore({
      key: 'id',
      load: async (loadOptions: any) => {
        const skip = Number(loadOptions?.skip) || 0;
        const take = Number(loadOptions?.take) || this.pageSize;
        const page = Math.floor(skip / take) + 1;

        try {
          const response: any = await lastValueFrom(
            this.opService.obtenerOperadoresData(page, take)
          );

          this.loading = false;

          const totalRegistros = Number(response?.paginated?.total) || 0;
          const paginaActual = Number(response?.paginated?.page) || page;
          const totalPaginas = Number(response?.paginated?.limit) ||
            (take > 0 ? Math.ceil(totalRegistros / take) : 0);

          this.totalRegistros = totalRegistros;
          this.paginaActual = paginaActual;
          this.totalPaginas = totalPaginas;

          const fmtFecha = (val: any) => {
            const d = new Date(val);
            if (isNaN(d.getTime())) return '';
            const dd = String(d.getDate()).padStart(2, '0');
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const yyyy = d.getFullYear();
            return `${dd}/${mm}/${yyyy}`;
          };

          const dataTransformada = (Array.isArray(response?.data) ? response.data : [])
            .map((item: any) => {
              const idNum = Number(item?.id);

              const NombreCompleto = [
                item?.nombreUsuario || '',
                item?.apellidoPaternoUsuario || '',
                item?.apellidoMaternoUsuario || ''
              ].filter(Boolean).join(' ');

              const EstatusNumber = Number(item?.estatus);
              const EstatusTexto = Number.isFinite(EstatusNumber)
                ? (EstatusNumber === 1 ? 'Activo' : 'Inactivo')
                : '';

              return {
                ...item,

                // claves consistentes para el grid
                id: Number.isFinite(idNum) ? idNum : 0,
                Id: Number.isFinite(idNum) ? idNum : 0, // por si tu grid usa keyExpr="Id"

                // ==== Campos derivados para columnas con template (sin tocar HTML) ====
                NombreCompleto,                                   // para "Nombre"
                NumeroLicenciaTexto: item?.licencia ?? item?.numeroLicencia ?? 'Sin registro',  // licUser
                FechaNacimientoTexto: fmtFecha(item?.fechaNacimiento),                           // fechNacicimiento
                EstatusTexto,                                     // est (texto mostrado)
                EstatusNumber,                                    // 1 / 0 (útil para filtros rápidos)
                DocumentoIdentificacionTexto: item?.identificacion ?? '',
                DocumentoComprobanteTexto: item?.comprobanteDomicilio ?? '',
                DocumentoAntecedentesTexto: item?.antecedentesNoPenales ?? item?.antecedentesPenales ?? '',

                // otros mapeos que ya traías
                tipoPersona: item?.tipoPersona == 1 ? 'Físico' : item?.tipoPersona == 2 ? 'Moral' : 'Desconocido',
                idRol: item?.idRol != null ? Number(item.idRol) : null,
                idCliente: item?.idCliente != null ? Number(item.idCliente) : null
              };
            })
            .sort((a: any, b: any) => Number(b.id) - Number(a.id));

          this.paginaActualData = dataTransformada;

          return {
            data: dataTransformada,
            totalCount: totalRegistros
          };

        } catch (error) {
          this.loading = false;
          console.error('Error en la solicitud de datos:', error);
          return { data: [], totalCount: 0 };
        }
      }
    });
  }


  onGridOptionChanged(e: any) {
    if (e.fullName !== 'searchPanel.text') return;

    const grid = e?.component;
    const qRaw = (e.value ?? '').toString().trim();
    if (!qRaw) {
      this.filtroActivo = '';
      grid?.option('dataSource', this.listaOperadores);
      return;
    }
    this.filtroActivo = qRaw;

    const norm = (v: any) =>
      (v == null ? '' : String(v)).normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
    const q = norm(qRaw);

    // 1) Tomamos los items que YA cargó el grid (lo que se ve en esta página)
    const ds = grid?.getDataSource?.();
    const items: any[] = Array.isArray(ds?.items?.()) ? ds.items() : (this.paginaActualData || []);

    // 2) Columnas dinámicas (para no hardcodear)
    let cols: any[] = [];
    try { const opt = grid?.option('columns'); if (Array.isArray(opt) && opt.length) cols = opt; } catch { }
    if (!cols.length && grid?.getVisibleColumns) cols = grid.getVisibleColumns();
    const dataFields: string[] = cols.map((c: any) => c?.dataField).filter((d: any) => typeof d === 'string' && d);

    const get = (o: any, path: string) => path.split('.').reduce((a, k) => a?.[k], o);

    const fmtFecha = (val: any) => {
      const d = new Date(val); if (isNaN(d.getTime())) return '';
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    };

    const filtered = items.filter((row: any) => {
      // Búsqueda en todos los dataField visibles/definidos
      const hitCols = dataFields.some(df => norm(get(row, df)).includes(q));

      // Nombre completo (en tu grid de operadores se arma así)
      const nombreCompleto = `${row?.nombreUsuario ?? ''} ${row?.apellidoPaternoUsuario ?? ''} ${row?.apellidoMaternoUsuario ?? ''}`.trim();
      const fechaNacTxt = norm(fmtFecha(row?.fechaNacimiento));

      // ESTATUS: 1/0 y texto “activo”/“inactivo”
      const estNum = Number(row?.estatus);
      const estTxt = Number.isFinite(estNum) ? (estNum === 1 ? 'activo' : 'inactivo') : '';
      const estHit =
        estTxt.includes(q) ||                       // “a”, “ac”, “activ…”, “inac…”
        ('activo'.startsWith(q) && estNum === 1) ||
        ('inactivo'.startsWith(q) && estNum === 0) ||
        (q === '1' && estNum === 1) ||
        (q === '0' && estNum === 0) ||
        String(estNum).includes(q);                // buscar “1” o “0”

      // Extras típicos del grid
      const extras = [
        norm(row?.id),
        norm(nombreCompleto),
        norm(row?.licencia ?? row?.numeroLicencia),
        norm(row?.userNameUsuario),
        norm(row?.telefonoUsuario),
        fechaNacTxt
      ].some(s => s.includes(q));

      return hitCols || estHit || extras;
    });

    grid?.option('dataSource', filtered);
  }

  onPageIndexChanged(e: any) {
    const pageIndex = e.component.pageIndex();
    this.paginaActual = pageIndex + 1;
    e.component.refresh();
  }

  actualizarOperador(idOperador: number) {
    this.router.navigateByUrl('/administracion/operadores/editar-operador/' + idOperador);
  };

  async activar(rowData: any) {
    const res = await this.alerts.open({
      type: 'warning',
      title: '¡Activar!',
      message: `¿Está seguro que requiere activar el operador: <br> <strong>${rowData.nombreUsuario} ${rowData.apellidoPaternoUsuario || ' '} ${rowData.apellidoMaternoUsuario || ' '}</strong>?`,
      showCancel: true,
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      backdropClose: false,
    });

    if (res !== 'confirm') return;

    this.opService.updateEstatus(rowData.id, 1).subscribe(
      () => {
        this.alerts.open({
          type: 'success',
          title: '¡Confirmación Realizada!',
          message: 'El operador ha sido activado.',
          confirmText: 'Confirmar',
          backdropClose: false,
        });
        this.obtenerOperadores();
        this.dataGrid.instance.refresh();
      },
      (error) => {
        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: String(error),
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }

  async desactivar(rowData: any) {
    const res = await this.alerts.open({
      type: 'warning',
      title: '¡Desactivar!',
      message: `¿Está seguro que requiere desactivar el operador: <br> <strong>${rowData.nombreUsuario} ${rowData.apellidoPaternoUsuario || ' '} ${rowData.apellidoPaternoUsuario || ' '}</strong>?`,
      showCancel: true,
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      backdropClose: false,
    });

    if (res !== 'confirm') return;

    this.opService.updateEstatus(rowData.id, 0).subscribe(
      () => {
        this.alerts.open({
          type: 'success',
          title: '¡Confirmación Realizada!',
          message: 'El operador ha sido desactivado.',
          confirmText: 'Confirmar',
          backdropClose: false,
        });
        this.obtenerOperadores();
        this.dataGrid.instance.refresh();
      },
      (error) => {
        this.alerts.open({
          type: 'error',
          title: '¡Ops!',
          message: String(error),
          confirmText: 'Confirmar',
          backdropClose: false,
        });
      }
    );
  }



  pdfPopupVisible = false;
  pdfTitle = 'Documento';
  pdfPopupWidth = 500;

  pdfUrlSafe: SafeResourceUrl | null = null;
  pdfRawUrl: string | null = null;

  pdfLoading = false;
  pdfLoaded = false;
  pdfError = false;
  pdfErrorMsg = '';

  async previsualizar(url?: string, titulo?: string, _row?: any) {
    this.pdfTitle = titulo || 'Documento';
    this.pdfRawUrl = (url || '').trim() || null;
    this.pdfUrlSafe = null;
    this.pdfLoading = true;
    this.pdfLoaded = false;
    this.pdfError = false;
    this.pdfErrorMsg = '';
    this.pdfPopupVisible = true;
    this.pdfPopupWidth = Math.min(Math.floor(window.innerWidth * 0.95), 900);

    if (!this.pdfRawUrl) {
      this.pdfError = true;
      this.pdfLoading = false;
      this.pdfErrorMsg = 'Este registro no tiene un PDF asignado.';
      return;
    }

    try {
      const head = await fetch(this.pdfRawUrl, { method: 'HEAD', mode: 'cors' });
      if (!head.ok) {
        this.pdfError = true;
        this.pdfErrorMsg = `No se pudo acceder al archivo (HTTP ${head.status}).`;
        this.pdfLoading = false;
        return;
      }
      const ct = head.headers.get('content-type') || '';
      if (!ct.toLowerCase().includes('pdf')) {
        this.pdfError = true;
        this.pdfErrorMsg = 'El recurso no es un archivo PDF.';
        this.pdfLoading = false;
        return;
      }
    } catch (e) {
      this.pdfError = true;
      this.pdfErrorMsg = 'El navegador bloqueó la previsualización (CORS). Intenta Abrir o Descargar.';
      this.pdfLoading = false;
      return;
    }

    const viewerParams = '#toolbar=0&navpanes=0';
    const finalUrl = this.pdfRawUrl.includes('#') ? this.pdfRawUrl : this.pdfRawUrl + viewerParams;
    this.pdfUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(finalUrl);

    setTimeout(() => {
      if (!this.pdfLoaded && !this.pdfError) {
        this.pdfError = true;
        this.pdfLoading = false;
        this.pdfErrorMsg = 'El visor tardó demasiado en cargar.';
      }
    }, 4000);
  }

  onPdfLoaded() {
    this.pdfLoaded = true;
    this.pdfLoading = false;
  }

  abrirEnNuevaPestana() {
    if (this.pdfRawUrl) window.open(this.pdfRawUrl, '_blank');
  }

  async descargarPdfForzada() {
    if (!this.pdfRawUrl) return;
    try {
      const resp = await fetch(this.pdfRawUrl, { mode: 'cors' });
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const base = (this.pdfTitle || 'documento')
        .toLowerCase().replace(/\s+/g, '_').replace(/[^\w\-]+/g, '');
      a.href = url;
      a.download = base.endsWith('.pdf') ? base : base + '.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      try {
        const u = new URL(this.pdfRawUrl!);
        u.searchParams.set('response-content-disposition', `attachment; filename="${(this.pdfTitle || 'documento').replace(/\s+/g, '_')}.pdf"`);
        window.open(u.toString(), '_self');
      } catch {
        window.open(this.pdfRawUrl!, '_blank');
      }
    }
  }

  limpiarCampos() {
    const today = new Date();
    this.dataGrid.instance.clearGrouping();
    this.isGrouped = false;
    this.obtenerOperadores();
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
