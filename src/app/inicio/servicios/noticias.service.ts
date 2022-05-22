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

  getNoticias(skip: number): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.REST_API_SERVER + '/' + skip);
  }

  getNoticiasConFiltro(skip: number, filtro: string): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(
      this.REST_API_SERVER + '/' + skip + '/' + filtro
    );
  }

  //Crear nueva noticia
  crearNoticia(noticia: NoticiaOferta): Observable<any> {
    console.log(noticia);

    return this.http.put<any>(this.REST_API_SERVER + '/nuevoFichaje', noticia);
  }
}
