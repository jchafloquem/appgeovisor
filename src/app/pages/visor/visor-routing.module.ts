import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisorPrincipalComponent } from './visor-principal/visor-principal.component';

const routes: Routes = [
  {
		path: '',
		component: VisorPrincipalComponent
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisorRoutingModule { }
