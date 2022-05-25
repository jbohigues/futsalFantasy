export interface PuntosLiga {
  id: number;
  idLiga: number;
  titular: number;
  golDL: number;
  golMC: number;
  golDF: number;
  golPT: number;
  primeraAmarilla: number;
  segundaAmarilla: number;
  rojaDirecta: number;
  malPartido: number;
  noJuegaPartido: number;
  buenPartido: number;
  excelentePartido: number;
  perfectoPartido: number;
}

export interface PuntosLigaCreate {
  idLiga: number;
}
