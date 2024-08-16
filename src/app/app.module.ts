import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ExtrapagesModule } from './extrapages/extrapages.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LayoutsModule } from './layouts/layouts.module';
import { RegionRepositoryAdapter } from './core/repository-adapter/region.repository-adapter';
import { RegionService } from './core/service/region.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProvinciaService } from './core/service/provincia.service';
import { ProvinciaRepositoryAdapter } from './core/repository-adapter/provincia.repository-adapter';
import { DistritoRepositoryAdapter } from './core/repository-adapter/distrito.repository-adapter';
import { DistritoService } from './core/service/distrito.service';
import { CuencaRepositoryAdapter } from './core/repository-adapter/cuenca.repository-adapter';
import { CuencaService } from './core/service/cuenca.service';
import { ProyectoEspecialRepositoryAdapter } from './core/repository-adapter/proyecto-especial.repository-adapter';
import { ProyectoEspecialService } from './core/service/proyecto-especial.service';
import { LayerRepositoryAdapter } from './core/repository-adapter/layer.repository-adapter';
import { LayerService } from './core/service/layer.service';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule, 
		BrowserAnimationsModule,
		CalciteComponentsModule,
		ExtrapagesModule,
		LayoutsModule,
		AppRoutingModule,
		NgxSpinnerModule,
		HttpClientModule,
		ToastrModule.forRoot(),
		ModalModule.forRoot()
	],
	providers: [
			{ provide: 'RegionRepository', useClass: RegionRepositoryAdapter },
			{ provide: 'ProvinciaRepository', useClass: ProvinciaRepositoryAdapter },
			{ provide: 'DistritoRepository', useClass: DistritoRepositoryAdapter },
			{ provide: 'CuencaRepository', useClass: CuencaRepositoryAdapter },
			{ provide: 'ProyectoEspecialRepository', useClass: ProyectoEspecialRepositoryAdapter },
			{ provide: 'LayerRepository', useClass: LayerRepositoryAdapter },
			RegionService,
			ProvinciaService,
			DistritoService,
			CuencaService,
			ProyectoEspecialService,
			LayerService
		],
	bootstrap: [AppComponent]
})
export class AppModule {}
