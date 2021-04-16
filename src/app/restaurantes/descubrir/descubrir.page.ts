import { Component, OnInit} from '@angular/core';
import { Restaurante } from '../restaurante.model';
import { RestauranteService } from '../restaurante.service';
import { MenuController } from '@ionic/angular' ;
import { Subscription } from 'rxjs';

@Component({

  selector: 'app-descubrir',
  templateUrl: './descubrir.page.html',
  styleUrls: ['./descubrir.page.scss'],

})
export class DescubrirPage implements OnInit {

  restaurantes: Restaurante[] = [] ;
  restaurantesSub : Subscription ;
  isLoading = false ;

  constructor(

    private restauranteService: RestauranteService ,
    private menuCtrl: MenuController

  ) {}

  ngOnInit() {

    console.log('ANGULAR -> ngOnInit');

    this.restaurantesSub = this.restauranteService.restaurantes.subscribe
    (rests => { this.restaurantes = rests; });

  }

  ionViewWillEnter() {

    console.log('IONIC -> ionViewWillEnter');

    this.isLoading = true;

    this.restaurantesSub = this.restauranteService.fetchRestaurantes().
    subscribe(() => { this.isLoading = false; });

  }

  ionViewDidEnter() {

    console.log('IONIC -> ionViewDidEnter');

  }

  ionViewWillLeave() {

    console.log('IONIC -> ionViewWillLeave');

  }

  ionViewDidLeave() {

    console.log('IONIC -> ionViewDidLeave');

  }

  ngOnDestroy() {

    console.log('ANGULAR -> ngOnDestroy');

    if (this.restaurantesSub){

      this.restaurantesSub.unsubscribe();

    }

  }

  openSideMenu(){

    this.menuCtrl.open();

  }

}
