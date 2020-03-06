import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroPj } from '../models/cadastro-pj.model';
import { environment as env} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroPjService {

  private readonly PATH: string = 'cadastrar-pj';

  constructor(private http: HttpClient) { }

  cadastrar(cadastroPj: CadastroPj) {
    return this.http.post(env.baseApiUrl + this.PATH, cadastroPj);
  }
}
