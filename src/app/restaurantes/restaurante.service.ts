import { Restaurante } from './restaurante.model';
import { Injectable } from '@angular/core' ;
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map , tap } from 'rxjs/operators';

@Injectable ({

  providedIn: 'root'

})


/*

  { id: null , titulo : 'Carls Jr' ,platillos : ['Hamburguesas', 'Ensaladas', 'Helados'] , imgUrl:'https://frankata.com/wp-content/uploads/2019/01/800x600carlsjr-1170x877.jpg' } ,

  { id: null ,titulo: 'Cabo Grill',platillos: ['Ceviche' , 'Filete de pescado', 'Tacos de mariscos'],imgUrl:'https://i.pinimg.com/280x280_RS/e3/1e/e7/e31ee7950607eb55c87e199fd5ab6dd7.jpg' },

  { id: null ,titulo: 'Super Salads',platillos: ['Ensaladas', 'Wraps', 'Paninis'],imgUrl:'https://cdn.worldvectorlogo.com/logos/super-salads.svg' } ,

  { id: null ,titulo: 'Little Caesars Pizza',platillos: ['Pizza', 'Spaguetti', 'Crazy Bread],imgUrl:'https://cdn.worldvectorlogo.com/logos/little-caesars-pizza-2.svg' }


*/

export class RestauranteService {


  constructor (private http : HttpClient) {}


  private _restaurantes = new BehaviorSubject<Restaurante[]>([]);

  /*private restaurantes : Restaurante[] = [

    { id: null , titulo : 'Carls Jr' ,platillos : ['Hamburguesas', 'Ensaladas', 'Helados'] , imgUrl:'https://frankata.com/wp-content/uploads/2019/01/800x600carlsjr-1170x877.jpg' , lat : 25 , lng : 34 , getStaticMap()} ,

    { id: null ,titulo: 'Cabo Grill',platillos: ['Ceviche' , 'Filete de pescado', 'Tacos de mariscos'],imgUrl:'https://i.pinimg.com/280x280_RS/e3/1e/e7/e31ee7950607eb55c87e199fd5ab6dd7.jpg' , lat : 25 , lng : 34 , getStaticMap() },

    { id: null ,titulo: 'Super Salads',platillos: ['Ensaladas', 'Wraps', 'Paninis'],imgUrl:'https://cdn.worldvectorlogo.com/logos/super-salads.svg' , lat : 25 , lng : 34 , getStaticMap() } ,

    { id: null ,titulo: 'Little Caesars Pizza',platillos: ['Pizza', 'Spaguetti', 'Crazy Bread'],imgUrl:'https://cdn.worldvectorlogo.com/logos/little-caesars-pizza-2.svg' , lat : 25 , lng : 34 , getStaticMap() }


  ] ;*/



  get restaurantes(){

    return this._restaurantes.asObservable();

  }

  addRestaurante(restaurante: Restaurante){

    this.http.post<any>(environment.firebaseURL + 'restaurantes.json',
    {...this.restaurantes[0]}).subscribe(data => {

      console.log(data);

    });

  }

  fetchRestaurantes(){

    return this.http.get<{[key: string] : Restaurante}>(environment.firebaseURL + 'restaurantes.json').pipe(map(dta =>{

      const rests = [];

      for(const key in dta){

        if (dta.hasOwnProperty(key)){

          rests.push( new Restaurante(key, dta[key].titulo, dta[key].imgUrl, dta[key].platillos , dta[key].lat , dta[key].lng));

        }

      }

      return rests;

    }),

    tap(rest => {

      this._restaurantes.next(rest);

    }));

  }

  getRestaurante(restauranteId: string){

    const url = environment.firebaseURL + `restaurantes/${restauranteId}.json`;return this.http.get<Restaurante>(url).pipe(map(dta => {

      return new Restaurante(restauranteId, dta.titulo, dta.imgUrl, dta.platillos, dta.lat , dta.lng);

    }));

  }

}
