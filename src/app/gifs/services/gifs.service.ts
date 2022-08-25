import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'b32bvpbtXOu4S3UHKwu2Zmjf4qvXyVKq'
  private _historial: string [] = [];

  //TODO cambiar any por tipado correcto
  public resultados: any[] = [];

  get historial(){
    return [...this._historial]
  }

  constructor( private http: HttpClient){}

  buscarGifs (query: string){

    query = query.trim().toLowerCase();
    
    if (!this._historial.includes(query)){
      this._historial.unshift (query);    
      this._historial = this._historial.splice (0,10);    
    }

   this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=b32bvpbtXOu4S3UHKwu2Zmjf4qvXyVKq&q=${query}`)
        .subscribe ((resp: any) => {
          console.log(resp.data)
          this.resultados = resp.data;
        });
  }

}
