import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';
import WebMap from '@arcgis/core/WebMap';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';


@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule,CalciteComponentsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
	@Input() view:any;
	@Input() webmap?:WebMap;

	ngOnInit(): void {
		
	}

	ngAfterViewInit(): void {
		// const filter = new Filter({
		// 	view: this.view,
		// 	container: 'filterDiv'
		//   });
	}


	
}
