import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import WebMap from '@arcgis/core/WebMap';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';

@Component({
  selector: 'app-basemap',
  standalone: true,
  imports: [CommonModule,CalciteComponentsModule],
  templateUrl: './basemap.component.html',
  styleUrl: './basemap.component.css'
})
export class BasemapComponent implements OnInit,AfterViewInit {
	@Input() view:any;
	@Input() webmap?:WebMap;

	ngOnInit(): void {
		
	}

	ngAfterViewInit(): void {
		const basemapGallery = new BasemapGallery({
			view: this.view,
			container: "basemaps-container"
		});
	}
}
