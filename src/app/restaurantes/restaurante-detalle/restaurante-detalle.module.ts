import { NuevaReservacionComponent } from './../../reservaciones/nueva-reservacion/nueva-reservacion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestauranteDetallePageRoutingModule } from './restaurante-detalle-routing.module';

import { RestauranteDetallePage } from './restaurante-detalle.page';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestauranteDetallePageRoutingModule
  ],

  declarations: [RestauranteDetallePage , NuevaReservacionComponent]
})

export class RestauranteDetallePageModule {}
