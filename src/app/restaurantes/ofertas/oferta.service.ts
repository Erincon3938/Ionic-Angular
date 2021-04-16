import { Oferta } from './oferta.module';
import { Injectable } from '@angular/core';

@Injectable({

  providedIn: 'root'

})

export class OfertaService {


  private ofertas : Oferta [] = [

    { id : 1 ,titulo : 'Carls Jr' , subtitulo : '2 Famous Star con Queso o Jalapeño Burger por 89$' , imgUrl : 'https://mk0cazaofertassmxlbf.kinstacdn.com/wp-content/uploads/2020/04/Carls-Jr-duo-230420.jpg' , terminos : 'Solo en Mostrador' } ,

    { id : 2 ,titulo : 'Cabo Grill' , subtitulo : 'Todos los Tacos que Quieras por solo $109' , imgUrl : 'https://mk0cazaofertassmxlbf.kinstacdn.com/wp-content/uploads/2014/12/cabo-grill-monterrey.jpg' , terminos : 'Solo en Monterrey' } ,

    { id : 3 ,titulo : 'Super Salads' , subtitulo : 'Desayuno 2 x 1' , imgUrl : 'https://mk0cazaofertassmxlbf.kinstacdn.com/wp-content/uploads/2017/01/super-salads-2x1-desayunos.jpg' , terminos : 'Sabado y Domingo hasta las 12 pm , solo con enlace gourmet' } ,

    { id : 4 ,titulo : 'Mister Pizza' , subtitulo : 'Pizza de Peperoni o Queso y 8 piezas de Crazy Bread' , imgUrl : 'https://pbs.twimg.com/media/Ea6yMqOXkAAPAqi.jpg' , terminos : 'Solo en Mostrador' }

  ] ;

  constructor() { }

  getAllOfertas () {

    return [...this.ofertas] ;

  }

}
