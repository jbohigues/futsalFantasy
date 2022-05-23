import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia, NoticiaOferta } from 'src/app/interfaces/noticia';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class NoticiasService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'noticias';

  constructor(private http: HttpClient) {}

  getNoticias(idLiga: number, skip: number): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(
      this.REST_API_SERVER + '/l=' + idLiga + '/s=' + skip
    );
  }

  getNoticiasConFiltro(
    idLiga: number,
    skip: number,
    filtro: string
  ): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(
      this.REST_API_SERVER + '/l=' + idLiga + '/s=' + skip + '/f=' + filtro
    );
  }

  //Crear nueva noticia
  crearNoticia(noticia: NoticiaOferta): Observable<any> {
    return this.http.post<any>(this.REST_API_SERVER + '/nuevoFichaje', noticia);
  }
}
