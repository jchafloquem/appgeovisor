import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import Print from '@arcgis/core/widgets/Print';
import Search from '@arcgis/core/widgets/Search';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Home from '@arcgis/core/widgets/Home';
import LayerList from '@arcgis/core/widgets/LayerList';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import Color from '@arcgis/core/Color';

import Legend from '@arcgis/core/widgets/Legend';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

	// public view: any = null;
	// mapViewElContainer:any;
	

	// @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef<any>;

	
	// initializeMap(): Promise<any> {
	// 	const container = this.mapViewEl.nativeElement;
		
	// 	const webmap = new WebMap({
	// 		basemap: "satellite",
	// 	});
		
	
		
	// 	const regiones = new FeatureLayer({
	// 		url: "https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/Limites_Censales/MapServer/0",
	// 		renderer: new SimpleRenderer({
	// 			symbol: new SimpleFillSymbol({
	// 				color: new Color([255, 165, 0, 0.1]),
	// 				outline: new SimpleLineSymbol({
	// 					width:2,
	// 					color: new Color([255, 165, 0])
	// 				})
	// 			})
	// 		})
	// 	});

	// 	webmap.layers.add(regiones)

	// 	this.view = new MapView({
	// 		container,
	// 		map: webmap,
	// 		zoom: 6,
    //   		center: [-68.729, -9.877],
	// 		padding:{
	// 			left:49
	// 		}
	// 	});

	// 	const layerList = new LayerList({
	// 		view: this.view,
	// 		listItemCreatedFunction: async ( event) => {
	// 			const item = event.item;
	// 			// await item?.layer?.when();
	// 			item.actionsSections = [
	// 				[
	// 					{
	// 					title: "Go to full extent",
	// 					className: "esri-icon-zoom-out-fixed",
	// 					id: "full-extent"
	// 					},
	// 					{
	// 					title: "Layer information",
	// 					className: "esri-icon-description",
	// 					id: "information"
	// 					}
	// 				],
	// 				[
	// 					{
	// 					title: "Increase opacity",
	// 					className: "esri-icon-up",
	// 					id: "increase-opacity"
	// 					},
	// 					{
	// 					title: "Decrease opacity",
	// 					className: "esri-icon-down",
	// 					id: "decrease-opacity"
	// 					}
	// 				]
	// 			];
	// 		},
	// 		container:'layers-container'
	// 	});

	// 	//layerList.view.ui.add(regiones)
		



	// 	const basemapGallery = new BasemapGallery({
	// 		view: this.view,
	// 		container: "basemaps-container"
	// 	});

	// 	const legend = new Legend({
	// 		view: this.view,
	// 		layerInfos: [],
	// 		icon: 'legend',
	// 		container: 'legend-container'
	// 	});

	// 	const bookmarks = new Bookmarks({
	// 		view: this.view,
	// 		// allows bookmarks to be added, edited, or deleted
	// 		editingEnabled: true,
	// 		container:'bookmarks-container'
	// 	});

	// 	const print = new Print({
	// 		view:this.view,
	// 		container: "print-container"
	// 	});

		

	// 	webmap.when(() => {
			
		  
	// 		let activeWidget: any;
		  
	// 		const handleActionBarClick = ({ target }: any) => {

	// 			if (target && target?.tagName !== "CALCITE-ACTION") {
	// 				return;
	// 			}
				
	// 			if (activeWidget) {
	// 				const dataAction = document.querySelector<HTMLElement>(`[data-action-id="${activeWidget}"]`);
	// 				const dataPanel = document.querySelector<HTMLElement>(`[data-panel-id="${activeWidget}"]`);

	// 				console.log(dataAction)

	// 				if(dataAction instanceof HTMLElement){(dataAction as any).active = false;}
	// 				if(dataPanel instanceof HTMLElement){(dataPanel as any).hidden = true;}
	// 			}
				
	// 			const nextWidget = target.dataset.actionId;
	// 			if (nextWidget !== activeWidget) {
	// 				console.log("dataAction")
	// 				const dataAction2 = document.querySelector<HTMLElement>(`[data-action-id="${nextWidget}"]`);
	// 				const dataPanel2 = document.querySelector<HTMLElement>(`[data-panel-id="${nextWidget}"]`);

	// 				if(dataAction2 instanceof HTMLElement){(dataAction2 as any).active = true;}
	// 				if(dataPanel2 instanceof HTMLElement){(dataPanel2 as any).hidden = false;}
	// 				activeWidget = nextWidget;
	// 			} else {
	// 				activeWidget = null;
	// 			}
	// 		};
		  
			

	// 		document.querySelector<HTMLElement>("calcite-action-bar")?.addEventListener("click", handleActionBarClick);

	// 		let actionBarExpanded: boolean = false;

	// 		document.addEventListener("calciteActionBarToggle", (event: any) => {
	// 			//actionBarExpanded = !actionBarExpanded;
	// 			console.log(event.target?.parentNode.position)
	// 			if(event?.target?.parentNode.position=="start"){
    //                 actionBarExpanded = !actionBarExpanded;
    //                 const viewPadding = {
	// 				  	left: actionBarExpanded ? 135 : 49
	// 				};
	// 				this.view.padding = viewPadding;
    //             }

	// 			// const viewPadding = {
	// 			//   	left: actionBarExpanded ? 130 : 49
	// 			// };
				
				
	// 		});
		  
	// 		const calciteShellElement = document.querySelector<HTMLElement>("calcite-shell");
	// 		if (calciteShellElement) {
	// 			calciteShellElement.hidden = false;
	// 		}

	// 		const calciteLoaderElement = document.querySelector<HTMLElement>("calcite-loader");
	// 		if (calciteLoaderElement) {
	// 			calciteLoaderElement.hidden = true;
	// 		}

	// 	});

	// 	return this.view.when();
	// }

	ngOnInit() {
		// this.initializeMap().then(() => {
		// 	console.log('The map is ready.');
		// });
	}

	ngOnDestroy(): void {
		// if (this.view) {
		// 	// destroy the map view
		// 	this.view.destroy();
		// }
	}

}
