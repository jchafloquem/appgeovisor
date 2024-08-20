import {AfterViewInit, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import WebMap from '@arcgis/core/WebMap';
import Compass from '@arcgis/core/widgets/Compass';

import {CalciteComponentsModule} from '@esri/calcite-components-angular';

@Component({
	selector: 'app-compass',
	standalone: true,
	imports: [CommonModule, CalciteComponentsModule],
	templateUrl: './compass.component.html',
	styleUrl: './compass.component.css',
})
export class CompassComponent implements AfterViewInit {
	@Input() view: any;
	@Input() webmap?: WebMap;

	compassWidget?: Compass;

	ngAfterViewInit(): void {
		// this.createCompass();
		// this.addCompassToView();
		// this.setupCompassClickEvent();
	}

	private createCompass(): void {
		this.compassWidget = new Compass({
			view: this.view,
		});
	}

	private addCompassToView(): void {
		this.view.ui.add(this.compassWidget, {position: 'top-right', index: 0});
	}

	private setupCompassClickEvent(): void {
		this.compassWidget?.on('click', () => {
			this.handleCompassClick();
		});
	}

	private handleCompassClick(): void {
		// Aquí puedes agregar la acción que deseas realizar al hacer clic en el compás
		console.log('Compass clicked!');
	}
}
