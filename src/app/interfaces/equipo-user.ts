import { JugadorReal } from './jugador-real';
import { JugadorRealEnCadaLiga } from './jugador-real-en-cada-liga';
import { Usuario } from './usuario';

export interface EquipoUser {
  id: number;
  idUsuario: number;
  idLiga: number;
  nombre: string;
  foto: string;
  puntos: number;
  dinero: number;
  numJugadores: number;
  jugadoresrealesencadaliga: JugadorRealEnCadaLiga[];
  jugadoresreales: JugadorReal[];
  usuarios: Usuario;
}

export interface EquipoUserCreate {
  idUsuario: number;
  idLiga: number;
  nombre: string;
}
