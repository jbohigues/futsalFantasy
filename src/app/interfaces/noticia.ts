export interface Noticia {
  id: number;
  idLiga: number;
  tema: Tema;
  texto: string;
  fecha: Date;
  diaNuevo: boolean;
}

export interface NoticiaOferta {
  idLiga: number;
  tema: Tema;
  texto: string;
  fecha: Date;
}

export enum Tema {
  Informacion = 'I',
  Traspaso = 'T',
}
