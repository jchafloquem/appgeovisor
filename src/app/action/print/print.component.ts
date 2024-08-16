import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import WebMap from '@arcgis/core/WebMap';
import Print from '@arcgis/core/widgets/Print';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';

@Component({
  selector: 'app-print',
  standalone: true,
  imports: [CommonModule,CalciteComponentsModule],
  templateUrl: './print.component.html',
  styleUrl: './print.component.css'
})
export class PrintComponent {
	@Input() view:any;
	@Input() webmap?:WebMap;

	ngOnInit(): void {
		
	}

	ngAfterViewInit(): void {
		const print = new Print({
			view: this.view,
			container: "prints-container"
		});
	}
}
