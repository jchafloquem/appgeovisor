import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';
import { Page0404Component } from './extrapages/page0404/page0404.component';


const routes: Routes = [
	{ path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
	//{ path: 'visor',loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
	{ path: '**', component: Page0404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
