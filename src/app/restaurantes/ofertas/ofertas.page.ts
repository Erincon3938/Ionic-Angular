import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from './oferta.module';
import { Component, OnInit } from '@angular/core';
import { OfertaService } from './oferta.service';

@Component({

  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],

})

export class OfertasPage implements OnInit {

  ofertas : Oferta []=[];
  ofertasSub: Subscription;
  isloading = false;

  constructor(

    private ofertaService : OfertaService,
    private menuCtrl:MenuController

    ) { }

  ngOnInit() {

    console.log('ANGULAR -> ngOnInit');


    this.ofertasSub = this.ofertaService.ofertas.subscribe(rests => {
      this.ofertas = rests;
    });

  }

  ionViewWillEnter(){

    console.log('IONIC -> ionViewWillEnter');

    this.isloading = true;

    this.ofertasSub = this.ofertaService.fetchOfertas().subscribe(() => {

      this.isloading = false;

    });

  }

  ionViewDidEnter(){

    console.log('IONIC -> ionViewDidEnter');

  }

  ionViewWillLeave(){

    console.log('IONIC -> ionViewWillLeave');

  }

  ionViewDidLeave(){

    console.log('IONIC -> ionViewDidLeave');

  }

  ngOnDestroy(){

    console.log('ANGULAR -> ngOnDestroy');

    if (this.ofertasSub){

    this.ofertasSub.unsubscribe();

    }

  }

  openSideMenu(){

    this.menuCtrl.open();

  }

}
