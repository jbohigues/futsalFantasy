import { EquipoReal } from './equipo-real';
import { EquipoUser } from './equipo-user';

export interface JugadorReal {
  id: number;
  nombre: string;
  alias: string;
  puntos: number;
  posicion: Posicion;
  titular: boolean;
  valorMercado: number;
  estado: Estado;
  foto: string;
  equiposreales: EquipoReal;
  equiposusuarios: EquipoUser;
}

// const posicion = new Map<number, string>();
// posicion.set(1,'PT');
// posicion.set(2, 'CI');
// posicion.set(3, 'AL');
// posicion.set(4, 'PV');

enum Posicion {
  Portero = 'PT',
  Cierre = 'CI',
  Ala = 'AL',
  Pivot = 'PV',
}

enum Estado {
  EnForma = 'OK',
  Lesionado = 'L',
  Expulsado = 'EX',
  Pendiente = 'P',
}
