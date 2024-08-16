import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import WebMap from '@arcgis/core/WebMap';
import Legend from '@arcgis/core/widgets/Legend';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';

@Component({
  selector: 'app-legend',
  standalone: true,
  imports: [CommonModule,CalciteComponentsModule],
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.css'
})
export class LegendComponent {
	@Input() view:any;
	@Input() webmap?:WebMap;

	ngOnInit(): void {
		
	}

	ngAfterViewInit(): void {
		const legend = new Legend({
			view: this.view,
			container: "legends-container"
		});
	}
}
