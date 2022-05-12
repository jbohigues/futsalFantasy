export interface Traspaso {
  id: number;
  idJugador: number;
  idEquipoUserEmisor: number;
  idEquipoUserReceptor: number;
  precio: number;
  estado: Estado;
}

export interface Puja {
  idJugador: number;
  idEquipoUserEmisor: number;
  idEquipoUserReceptor: number;
  precio: number;
}

export enum Estado {
  Pendiente = 'P',
  Aceptada = 'OK',
  Rechazada = 'R',
}
