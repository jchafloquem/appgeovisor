import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './principal/panel/panel.component';
import { VisorPrincipalComponent } from './visor/visor-principal/visor-principal.component';

const routes: Routes = [
  	{
		path: '',
		component: VisorPrincipalComponent
	},
	{ path: 'visor', loadChildren: () => import('./visor/visor.module').then(m => m.VisorModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
