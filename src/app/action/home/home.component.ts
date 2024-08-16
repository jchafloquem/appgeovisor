import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalciteComponentsModule, CalciteModal } from '@esri/calcite-components-angular';
import WebMap from '@arcgis/core/WebMap';
import Home from '@arcgis/core/widgets/Home';
import Point from '@arcgis/core/geometry/Point';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CalciteComponentsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,AfterViewInit {
	//private modalService = inject(NgbModal);

	@Input() view:any;
	@Input() webmap?:WebMap;


	ngOnInit(): void {
		
	}

	ngAfterViewInit(): void {
		// const home = new Home({
		// 	view: this.view,
		// });

		// this.view.ui.add(home, "top-left");

	}

	demo(){
		//this.modalService.open(modalEncuesta, { size: 'xl', centered: true });
	}


	goHome() {
		// Aquí puedes definir la lógica para ir a la página de inicio, por ejemplo:
		const targetCoordinates = new Point({
			latitude: -9.877, // Reemplaza x con la latitud deseada
			longitude: -68.729, // Reemplaza y con la longitud deseada
			spatialReference: this.view.spatialReference // Utiliza la referencia espacial de la vista actual
		});
	
		this.view.goTo({
			target: targetCoordinates,
			zoom: 6 // Zoom opcional, ajusta según sea necesario
		});
	}
}
