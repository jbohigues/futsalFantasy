export interface Noticia {
    id: number,
    tema: Tema,
    texto: string,
    fecha: Date,
    diaNuevo: boolean
}

enum Tema {
    Informacion = 'I',
    Traspaso = 'T'
}
