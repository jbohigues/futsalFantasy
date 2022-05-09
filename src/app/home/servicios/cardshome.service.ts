import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from 'src/app/interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class CardshomeService {
  private REST_API_SERVER = environment.REST_API_SERVER + 'cardshome';

  constructor(private http: HttpClient) {}

  getCardsHome(): Observable<Card[]> {
    return this.http.get<Card[]>(this.REST_API_SERVER);
  }
}
