
import { Oferta } from './oferta.module';
import { Component, OnInit } from '@angular/core';
import { OfertaService } from './oferta.service';

@Component({

  selector: 'app-ofertas',
  templateUrl: './ofertas.page.html',
  styleUrls: ['./ofertas.page.scss'],

})

export class OfertasPage implements OnInit {

  ofertas : Oferta [] ;

  constructor(

    private ofertaService : OfertaService

    ) { }

  ngOnInit() {

    this.ofertas = this.ofertaService.getAllOfertas () ;

  }

}
