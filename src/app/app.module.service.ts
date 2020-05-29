import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agencias } from './app.module.model/app.module.agencia.model';
import { PosicaoForm } from './app.module.model/app.module.posicaoform.model';
import { DadosAgencia } from './app.module.model/app.module.dados.agencia.model';

const ApiRequestAgencias = 'http://localhost:8080/googlemaps/agencias';
const ApiRequestDadosAgencias = 'http://localhost:8080/googlemaps/dadosagencia';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable({ providedIn: 'root'})
export class AgenciaService {

  constructor(private http: HttpClient){}

  buscaAgenciasPorPosicao(latitude: string, longitude: string, raio: number): Observable<any> {
    console.log('=> Entrou no metodo buscaAgenciasPorPosicao - Service');
    const params = new HttpParams({fromObject: {'latitude': latitude, 'longitude': longitude, 'raio': ''+raio }});
    
    return this.http.get<Agencias>(ApiRequestAgencias, {params: params});
  }

  buscaEGravaDadosAgencia(posicaoForm: PosicaoForm): Observable<any> {
    console.log('=> Entrou no metodo buscaEGravaDadosAgencia - Service');
    return this.http.post<DadosAgencia>(ApiRequestDadosAgencias, posicaoForm, httpOptions);
  }

}

