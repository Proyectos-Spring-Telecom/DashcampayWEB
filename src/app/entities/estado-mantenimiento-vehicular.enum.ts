export enum EstadoMantenimientoVehicular {
  Abierto = 1,
  Pendiente = 2,
  Cerrado = 3,
  Cancelado = 4
}

export const EstadoMantenimientoVehicularLabels: Record<number, string> = {
  1: 'Abierto',
  2: 'Pendiente',
  3: 'Cerrado',
  4: 'Cancelado'
};

