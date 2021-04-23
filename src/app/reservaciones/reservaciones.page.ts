import { Subscription } from 'rxjs';
import { ReservacionService } from './reservacion.service';
import { Reservacion } from './reservacion.model';
import { Component, OnInit , OnDestroy } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular'




@Component({

  selector: 'app-reservaciones',
  templateUrl: './reservaciones.page.html',
  styleUrls: ['./reservaciones.page.scss'],

})

export class ReservacionesPage implements OnInit {


  reservaciones: Reservacion[] = [];
  reservacionesSub: Subscription;
  isLoading = false;

  constructor(private reservacionService : ReservacionService , private loadingCtrl: LoadingController) {}

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

  onRemoveReservacion(reservacionId: string, slidingEl: IonItemSliding){

    slidingEl.close();
    this.loadingCtrl.create({

      message: 'eliminando reservación ...'

    }).then(loadingEl => {
      loadingEl.present();
      this.reservacionService.removeReservacion(reservacionId).subscribe(() => {
        loadingEl.dismiss();

      });

    });

  }

}
