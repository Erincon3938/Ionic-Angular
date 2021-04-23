import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Restaurante } from 'src/app/restaurantes/restaurante.model';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';






@Component({

  selector: 'app-nueva-reservacion',
  templateUrl: './nueva-reservacion.component.html',
  styleUrls: ['./nueva-reservacion.component.scss'],
  providers: [DatePipe]

})



export class NuevaReservacionComponent implements OnInit {

  @Input() restaurante: Restaurante;
  @Input() mode: 'select' | 'hoy';
  fecha: string;
  desdeMin: string;
  Nombre: string;

  @ViewChild('formNew') myForm: NgForm;


  constructor(

    private modalCtrl: ModalController


  ) {}

  ngOnInit() {

    const hoy = new Date();
    this.desdeMin = hoy.toISOString();

    if (this.mode === 'hoy'){

      this.fecha = hoy.toISOString();

    }

  }

  onReservar() {

    this.modalCtrl.dismiss({

      restaurante: this.restaurante,

      nombre: this.myForm.value['nombre'],

      horario: new Date(this.myForm.value['horario']).toLocaleDateString('es-Mx', {weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit" , hour12: false}/*  , hour: "2-digit"}*/)

    }, 'confirm');

  }

  onCancel() {

    this.modalCtrl.dismiss(null,'cancel');

  }

}


