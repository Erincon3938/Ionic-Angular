import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PreloadAllModules } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Oferta } from './oferta.module';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({

  providedIn: 'root'

})

/*

  { id : null ,titulo : 'Carls Jr' , subtitulo : '2 Famous Star con Queso o Jalapeño Burger por 89$' , imgUrl : 'https://mk0cazaofertassmxlbf.kinstacdn.com/wp-content/uploads/2020/04/Carls-Jr-duo-230420.jpg' , terminos : 'Solo en Mostrador' } ,

  { id : null ,titulo : 'Cabo Grill' , subtitulo : 'Todos los Tacos que Quieras por solo $109' , imgUrl : 'https://mk0cazaofertassmxlbf.kinstacdn.com/wp-content/uploads/2014/12/cabo-grill-monterrey.jpg' , terminos : 'Solo en Monterrey' } ,

  { id : null ,titulo : 'Super Salads' , subtitulo : 'Desayuno 2 x 1' , imgUrl : 'https://mk0cazaofertassmxlbf.kinstacdn.com/wp-content/uploads/2017/01/super-salads-2x1-desayunos.jpg' , terminos : 'Sabado y Domingo hasta las 12 pm , solo con enlace gourmet' } ,

  { id : null ,titulo : 'Little Caesars Pizza' , subtitulo : 'Pizza de Peperoni o Queso y 8 piezas de Crazy Bread' , imgUrl : 'https://pbs.twimg.com/media/Ea6yMqOXkAAPAqi.jpg' , terminos : 'Solo en Mostrador' }

*/

export class OfertaService {

  constructor(private http:HttpClient){}

  private _ofertas= new BehaviorSubject<Oferta[]>([]);

  get ofertas(){


    return this._ofertas.asObservable();
  }

  addOferta(ofertas:Oferta){

    this.http.post<any>(environment.firebaseURL+'ofertas.json',{...this.ofertas[0]}).subscribe(data=>{

      console.log(data);

    });

  }

  fetchOfertas(){

    return this.http.get<{[key: string] : Oferta}>(environment.firebaseURL + 'ofertas.json').pipe(map(dta =>{

      const rests =[];

      for(const key in dta){

        if (dta.hasOwnProperty(key)){

          rests.push(new Oferta(

            key,
            dta[key].titulo,
            dta[key].subtitulo,
            dta[key].imgUrl,
            dta[key].terminos

          ));

        }

      }

      return rests;
    }),

    tap(rest => {

      this._ofertas.next(rest);

    }));

  }

  getOferta(ofertaId: string){

    const url = environment.firebaseURL + `ofertas/${ofertaId}.json`;
    return this.http.get<Oferta>(url) .pipe(map(dta => {

      return new Oferta(ofertaId, dta.titulo, dta.subtitulo, dta.imgUrl,dta.terminos);

    }));

  }

}
