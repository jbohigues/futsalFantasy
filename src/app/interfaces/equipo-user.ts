import { JugadorReal } from "./jugador-real";
import { JugadorRealEnCadaLiga } from "./jugador-real-en-cada-liga";

export interface EquipoUser {
    id: number,
    idUsuario: number,
    idLiga: number,
    nombre: string,
    foto: string,
    puntos: number,
    dinero: number,
    numJugadores: number,
    jugadoresrealesencadaliga: JugadorRealEnCadaLiga[],
    jugadoresreales: JugadorReal[]
}
