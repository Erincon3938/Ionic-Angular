import { Subscription } from 'rxjs';
import { ReservacionService } from './reservacion.service';
import { Reservacion } from './reservacion.module';
import { Component, OnInit } from '@angular/core';




@Component({

  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],

})

export class ReservacionesPage implements OnInit {


  reservaciones: Reservacion[] = [];
  reservacionesSub: Subscription;
  isLoading = false;

  constructor(private reservacionService : ReservacionService) {}

  ngOnInit() {


  }

  ionViewWillEnter(){

    console.log('IONIC -> ionViewWillEnter');
    this.isLoading = true;
    this.reservacionesSub = this.reservacionService.fetchReservaciones().

    subscribe(rsvs => {

      this.reservaciones = rsvs;
      this.isLoading = false;

    });

  }

  ngOnDestroy(){

    if (this.reservacionesSub){

      this.reservacionesSub.unsubscribe();

    }

  }


}
