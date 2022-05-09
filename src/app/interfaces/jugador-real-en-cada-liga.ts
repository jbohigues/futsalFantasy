import { EquipoUser } from './equipo-user';
import { JugadorReal } from './jugador-real';

export interface JugadorRealEnCadaLiga {
  idJugadorReal: number;
  idLiga: number;
  idEquipoUser: number;
  titular: boolean;
  mercado: boolean;
  valorTransferencia: number;
  equiposusuarios: EquipoUser;
  jugadoresreales: JugadorReal;
}
