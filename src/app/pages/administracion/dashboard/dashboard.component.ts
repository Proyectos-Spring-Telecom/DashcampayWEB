import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';

type TrendPoint = { d: string; v: number };

@Component({
  selector: 'vex-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [fadeInRight400ms],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  layoutCtrl = new UntypedFormControl('fullwidth');
ahora = new Date();
  ventanaMin = 15;

  kpis = {
    ingresosHoy: 0,
    deltaIngresos: 8.3,
    pasajerosValidadosHoy: 0,
    ticketProm: 0,
    pctElectronico: 0,
    validacionesOk: 0,
    validacionesFail: 0,
    enServicio: 0,
    totalVehiculos: 220,
    cumplimientoTurnos: 0,
    turnosInicio: 0,
    turnosFin: 0,
    ocupacion: 0
  };

  topRutas: any[] = [];
  alertasValidadores: any[] = [];

  ingresosHora: any[] = [];
  pagoDistrib: any[] = [];
  ascensosVsBoletos: any[] = [];
  pasajerosPorRuta: any[] = [];
  franjas = [
    { name: 'Adulto Mayor', value: 'manana' },
    { name: 'Estudiantes', value: 'mediodia' },
    { name: 'Embarazadas', value: 'tarde' },
    { name: 'Discapacidad', value: 'noche' }
  ];

  histPuntualidad: any[] = [];

  mapLayers = [{
    type: 'area',
    data: 'world'
  }];
  mapMarkers: any[] = [];

  ngOnInit(): void {
    this.simularDatos();
    setInterval(() => this.ahora = new Date(), 30000);
  }

  simularDatos(): void {
    const horas = Array.from({ length: 24 }, (_, i) => i);
    const ingresos = horas.map(h =>
  Math.max(
    0,
    2500 + Math.sin((h + 2) / 24 * Math.PI * 2) * 1500 + (h < 5 ? -2000 : 0)
  )
);

    const validaciones = horas.map(h => Math.max(200, 900 + Math.sin((h + 1) / 24 * Math.PI * 2) * 500 + (h < 5 ? -600 : 0)));
    const ascensos = horas.map((_, i) => Math.round(validaciones[i] * (1.06 + Math.random() * 0.04)));
    const boletos = validaciones;

    this.ingresosHora = horas.map(h => ({
      hora: `${h.toString().padStart(2,'0')}:00`,
      ingresos: Math.round(ingresos[h]),
      ticket: ingresos[h] / Math.max(1, validaciones[h])
    }));

    const ingresosHoy = this.ingresosHora.reduce((a,b)=>a+b.ingresos,0);
    const pasajerosHoy = validaciones.reduce((a,b)=>a+b,0);
    const ticket = ingresosHoy / Math.max(1, pasajerosHoy);

    const monedero = Math.round(pasajerosHoy * 0.68);
    const otrosEMVQR = Math.round(pasajerosHoy * 0.17);
    const cortesias = Math.round(pasajerosHoy * 0.03);
    const efectivo = Math.max(0, ascensos.reduce((a,b)=>a+b,0) - pasajerosHoy);

    this.pagoDistrib = [
      { metodo: 'Monedero', valor: monedero },
      { metodo: 'EMV', valor: otrosEMVQR },
      { metodo: 'QR', valor: Math.round(pasajerosHoy * 0.08) },
      { metodo: 'Cortesía / Otros', valor: cortesias }
    ];

    this.ascensosVsBoletos = horas.map((h,i)=>({
      hora: `${h.toString().padStart(2,'0')}:00`,
      ascensos: ascensos[i],
      boletos: boletos[i]
    }));

    const rutas = ['R-01','R-02','R-03','R-04','R-05','R-06','R-07'];
    const buildFranja = () => rutas.reduce((acc,r)=> (acc[r]=Math.round(800+Math.random()*200),acc), {} as any);
    const fMan = buildFranja();
    const fMed = buildFranja();
    const fTar = buildFranja();
    const fNoc = buildFranja();

    this.pasajerosPorRuta = rutas.map(r=>({
      ruta: r,
      manana: fMan[r],
      mediodia: fMed[r],
      tarde: fTar[r],
      noche: fNoc[r]
    }));

    this.topRutas = rutas.map(r=>{
  const p = [fMan[r],fMed[r],fTar[r],fNoc[r]].reduce((a,b)=>a+b,0);
  const pInt = Math.round(p); // 👈 entero
  const m = Math.round(pInt * (ticket));
  return { ruta:r, monto:m, pasajeros:pInt, ticket: m/Math.max(1,pInt) };
}).sort((a,b)=>b.monto-a.monto).slice(0,5);


    const fallidas = Math.round(pasajerosHoy * 0.02);
    const ok = pasajerosHoy;

    this.kpis.ingresosHoy = ingresosHoy;
    this.kpis.pasajerosValidadosHoy = pasajerosHoy;
    this.kpis.ticketProm = ticket;
    this.kpis.pctElectronico = (monedero + otrosEMVQR + Math.round(pasajerosHoy * 0.08)) / Math.max(1, pasajerosHoy + efectivo);
    this.kpis.validacionesOk = ok;
    this.kpis.validacionesFail = fallidas;
    this.kpis.enServicio = 185;
    this.kpis.cumplimientoTurnos = 0.91;
    this.kpis.turnosInicio = 210;
    this.kpis.turnosFin = Math.round(this.kpis.turnosInicio * this.kpis.cumplimientoTurnos);
    this.kpis.ocupacion = 0.54;
    this.kpis.totalVehiculos = 220;

    this.alertasValidadores = [
      { nombre: 'Validador A-102', detalle: 'Sin posición > 20 min', tag: 'Sin señal', severidad: 'sev-high' },
      { nombre: 'Validador C-331', detalle: 'Validaciones ~0 en 07:00–09:00', tag: 'Anomalía', severidad: 'sev-med' },
      { nombre: 'Validador B-219', detalle: 'Estatus ≠ 1', tag: 'Offline', severidad: 'sev-high' }
    ];

    const buckets = ['<-10','-10 a -5','-5 a 0','0 a +5','+5 a +10','>+10'];
    this.histPuntualidad = buckets.map(b=>({ bucket:b, conteo: Math.round(20 + Math.random()*80) }));

    this.mapMarkers = Array.from({length: 60}).map((_,i)=>({
      coordinates: [ -99.2 + Math.random()*0.8, 19.2 + Math.random()*0.8 ],
      text: `Validador ${100+i}`
    }));
  }
}
