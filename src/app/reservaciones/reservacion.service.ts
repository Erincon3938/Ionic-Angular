import { Reservacion } from './reservacion.module';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { Restaurante } from '../restaurantes/restaurante.model';


/*

  { id : 1 , restauranteId : '4' ,restaurante : 'Carls Jr' , horario : 'sábado, 13 de Marzo de 2021 01 p. m.' , imgUrl : 'https://frankata.com/wp-content/uploads/2019/01/800x600carlsjr-1170x877.jpg' } ,

  { id : 2 , restauranteId : '3' ,restaurante : 'Cabo Grill' , horario : 'domingo, 04 de Marzo de 2021 06 p. m.' , imgUrl : 'https://i.pinimg.com/280x280_RS/e3/1e/e7/e31ee7950607eb55c87e199fd5ab6dd7.jpg' } ,

  { id : 3 , restauranteId : '2' ,restaurante : 'Super Salads' , horario : 'viernes, 26 de Marzo de 2021 08 a. m' , imgUrl : 'https://cdn.worldvectorlogo.com/logos/super-salads.svg'} ,

  { id : 4 , restauranteId : '1' ,restaurante : 'Little Caesars Pizza' , horario : 'jueves, 15 de Abril de 2021 08 a. m' , imgUrl : 'https://static.wikia.nocookie.net/logopedia/images/a/a3/Little_Caesars_Pizza_2017.svg/revision/latest/scale-to-width-down/300?cb=20210109232758'}

*/


@Injectable({

  providedIn: 'root'

})

export class ReservacionService {

  private _reservaciones = new BehaviorSubject<Reservacion[]>([]);
  usuarioId = null;

  get reservaciones() {

    return this._reservaciones.asObservable();

  }

  fetchReservaciones(){

    return this.http.get<{[key: string] : Reservacion}>(environment.firebaseURL + 'reservaciones.json?orderBy="usuarioId"&equalTo="'+ this.usuarioId + '"')

    .pipe(map(dta =>{

      const rests = [];

      for(const key in dta){

        if (dta.hasOwnProperty(key)){


          rests.push(new Reservacion

            (key, dta[key].restauranteId, dta[key].restaurante, dta[key].horario, dta[key].imgUrl, dta[key].usuarioId)

          );

        }

      }

      return rests;

    }),

    tap(rest => {

      this._reservaciones.next(rest);

    }));

  }

  addReservacion(restaurante: Restaurante, horario: string){

    const rsv = new Reservacion

    (
      null, restaurante.id, restaurante.titulo, horario, restaurante.imgUrl,this.usuarioId

    );

    this.http.post<any>(environment.firebaseURL + 'reservaciones.json', {...rsv}).subscribe(data => {

      console.log(data);

    });

  }

  constructor(private http: HttpClient,private loginService: LoginService) {

    this.loginService.usuarioId.subscribe(usuarioId => {

      this.usuarioId = usuarioId;

    });

  }

}

