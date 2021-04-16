import { LoginGuard } from './login/login.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [{

    path: '',

    redirectTo: 'login',
    pathMatch: 'full'

  },

  {

    path: 'restaurantes',
    loadChildren: () => import('./restaurantes/restaurantes.module').then(m => m.RestaurantesPageModule),
    canLoad: [LoginGuard]

  },

  {

    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)

  },

  {

    path: 'reservaciones',
    loadChildren: () => import('./reservaciones/reservaciones.module').then(m => m.ReservacionesPageModule),
    canLoad: [LoginGuard]

  },

];

@NgModule({

  imports: [

    RouterModule.forRoot(routes, {

      preloadingStrategy: PreloadAllModules
    })

  ],

  exports: [RouterModule]

})

export class AppRoutingModule {}
