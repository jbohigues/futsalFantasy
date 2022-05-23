export interface Liga {
  id: number;
  nombre: string;
  foto: string;
  codigoLiga: string;
  abono: number;
  numMaxPlantilla: number;
  diasJugEnMercado: number;
  diasGestionPujas: number;
  idUsuarioLider: number;
}

export interface LigaCreate {
  nombre: string;
  codigoLiga: string;
  idUsuarioLider: number;
}
