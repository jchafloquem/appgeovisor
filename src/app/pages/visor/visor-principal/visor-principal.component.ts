import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
//Librerias de ArcGIs
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import Sketch from '@arcgis/core/widgets/Sketch.js';
import Expand from '@arcgis/core/widgets/Expand.js';
import Zoom from '@arcgis/core/widgets/Zoom.js';

//Librerias personalizadas
import {LayerComponent} from 'src/app/action/layer/layer.component';
import {CalciteComponentsModule} from '@esri/calcite-components-angular';
import {CommonModule} from '@angular/common';
import {BasemapComponent} from 'src/app/action/basemap/basemap.component';
import {HomeComponent} from 'src/app/action/home/home.component';
import {FilterComponent} from 'src/app/action/filter/filter.component';
import {FilterContentComponent} from 'src/app/content/filter-content/filter-content.component';
import {LegendComponent} from 'src/app/action/legend/legend.component';
import {PrintComponent} from 'src/app/action/print/print.component';
import {SketchComponent} from 'src/app/action/sketch/sketch.component';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import {CompassComponent} from 'src/app/action/compass/compass.component';
import {GraphicComponent} from 'src/app/action/graphic/graphic.component';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import * as webMercatorUtils from '@arcgis/core/geometry/support/webMercatorUtils';
import tokml from 'tokml';
import shpwrite from '@mapbox/shp-write';
import {saveAs} from 'file-saver';
@Component({
	selector: 'app-visor-principal',
	standalone: true,
	imports: [
		CommonModule,
		CalciteComponentsModule,
		LayerComponent,
		BasemapComponent,
		HomeComponent,
		FilterComponent,
		FilterContentComponent,
		LegendComponent,
		PrintComponent,
		SketchComponent,
		CompassComponent,
		GraphicComponent,
	],
	templateUrl: './visor-principal.component.html',
	styleUrl: './visor-principal.component.css',
})
export class VisorPrincipalComponent implements OnInit, OnDestroy {
	public view: any = null;
	public webmap: any = null;
	isPanelCollapsed = true;
	mapViewElContainer: any;
	public drawnPolygon!: any;
	@ViewChild('mapViewNode', {static: true})
	private mapViewEl!: ElementRef<any>;

	initializeMap(): Promise<any> {
		const container = this.mapViewEl.nativeElement;
		this.webmap = new WebMap({
			basemap: 'satellite',
		});

		this.view = new MapView({
			container,
			map: this.webmap,
			zoom: 6,
			center: [-76.015152, -9.189967],
			rotation: 0,
			constraints: {
				maxZoom: 23,
				minZoom: 5,
				snapToZoom: false,
			},
			padding: {top: 0},
			ui: {
				components: [],
			},
		});
		const zoom = new Zoom({view: this.view});
		this.view.ui.add(zoom, {position: 'top-right', index: 0});

		//Descarga de data desde las capas

		const graphicsLayer = new GraphicsLayer();
		// Configurar el widget de Sketch
		const sketch = new Sketch({
			view: this.view,
			layer: graphicsLayer,
			availableCreateTools: ['polygon'],
			creationMode: 'update',
			icon: 'polygon',
		});
		const sketchExpand = new Expand({
			view: this.view,
			expandTooltip: 'DESCARGAR',
			content: sketch,
		});
		this.view.ui.add(sketchExpand, {position: 'top-right', index: 1});
		sketch.on('create', (event) => {
			if (event.state === 'complete') {
				this.drawnPolygon = event.graphic.geometry;
			}
		});
		const customButtonKml = document.createElement('button');
		customButtonKml.classList.add('esri-component', 'esri-expand', 'esri-widget', 'buttonCustom');
		customButtonKml.innerHTML = '<span class="esri-icon esri-icon-download"></span>';
		customButtonKml.title = 'kml';
		this.view.ui.add(customButtonKml, {
			position: 'top-right',
			index: 2, // Posición en la UI
		});
		customButtonKml.addEventListener('click', () => {
			// Acción personalizada al hacer clic en el botón
			if (this.drawnPolygon) {
				this.downloadData(this.drawnPolygon, 'kml');
			} else {
				alert('Please draw a polygon first.');
			}

			// Aquí puedes llamar a funciones personalizadas o realizar cualquier acción
		});
		const shapefile = document.createElement('button');
		shapefile.classList.add('esri-component', 'esri-expand', 'esri-widget', 'buttonCustom');
		shapefile.innerHTML = '<span class="esri-icon esri-icon-download"></span>';
		shapefile.title = 'shapefile';

		this.view.ui.add(shapefile, {
			position: 'top-right',
			index: 8, // Posición en la UI
		});
		shapefile.addEventListener('click', () => {
			// Acción personalizada al hacer clic en el botón
			if (this.drawnPolygon) {
				this.downloadData(this.drawnPolygon, 'shapefile');
			} else {
				alert('Please draw a polygon first.');
			}

			// Aquí puedes llamar a funciones personalizadas o realizar cualquier acción
		});
		// adds the home widget to the top left corner of the MapView

		this.view.when(() => {
			let activeWidget: any;
			const handleActionBarClick = ({target}: any) => {
				if (target && target?.tagName !== 'CALCITE-ACTION') {
					return;
				}
				if (activeWidget) {
					const dataAction = document.querySelector<HTMLElement>(`[data-action-id="${activeWidget}"]`);
					const dataPanel = document.querySelector<HTMLElement>(`[data-panel-id="${activeWidget}"]`);

					if (dataAction instanceof HTMLElement) {
						(dataAction as any).active = false;
					}
					if (dataPanel instanceof HTMLElement) {
						(dataPanel as any).hidden = true;
					}

					this.togglePanel();
				}
				const nextWidget = target.dataset.actionId;
				if (nextWidget !== activeWidget) {
					const dataAction2 = document.querySelector<HTMLElement>(`[data-action-id="${nextWidget}"]`);
					const dataPanel2 = document.querySelector<HTMLElement>(`[data-panel-id="${nextWidget}"]`);

					if (dataAction2 instanceof HTMLElement) {
						(dataAction2 as any).active = true;
					}
					if (dataPanel2 instanceof HTMLElement) {
						(dataPanel2 as any).hidden = false;
					}
					activeWidget = nextWidget;
					this.togglePanel();
				} else {
					activeWidget = null;
				}
			};

			document.querySelector<HTMLElement>('calcite-action-bar')?.addEventListener('click', handleActionBarClick);
			const calciteShellElement = document.querySelector<HTMLElement>('calcite-shell');
			if (calciteShellElement) {
				calciteShellElement.hidden = false;
			}
			const calciteLoaderElement = document.querySelector<HTMLElement>('calcite-loader');
			if (calciteLoaderElement) {
				calciteLoaderElement.hidden = true;
			}
		});
		return this.view.when();
	}
	togglePanel() {
		this.isPanelCollapsed = !this.isPanelCollapsed;
	}
	ngOnInit() {
		this.initializeMap().then(() => {
			console.log('The map is ready.');
		});
	}
	ngOnDestroy(): void {
		if (this.view) {
			// destroy the map view
			this.view.destroy();
		}
	}
	downloadData(polygon: any, format: string): void {
		const activeLayers: FeatureLayer[] = [];
		this.webmap.allLayers.forEach((layer: FeatureLayer) => {
			console.log(layer);
			if (layer.visible && layer instanceof FeatureLayer) {
				console.log(' =>', layer.geometryType);
				if (layer.geometryType === 'point') {
					activeLayers.push(layer);
				}
			}
		});

		// Si no hay capas activas, salir de la función
		if (activeLayers.length === 0) {
			console.warn('No active layers found');
			return;
		}
		activeLayers.forEach((featureLayer: FeatureLayer) => {
			try {
				const query = featureLayer.createQuery();
				query.geometry = polygon;
				query.spatialRelationship = 'intersects';
				query.where = '1=1';
				query.outFields = ['*'];
				query.returnGeometry = true;

				featureLayer.queryFeatures(query).then((result) => {
					const features = result.features;

					// Convertir los datos de ArcGIS a GeoJSON
					const geojson = {
						type: 'FeatureCollection',
						features: features.map((feature) => {
							const geometry = feature.geometry.toJSON();
							// Convertir coordenadas de Web Mercator a lat/long
							const latlng = webMercatorUtils.xyToLngLat(geometry.x, geometry.y);
							console.log(latlng);
							const coordinates = [latlng[0], latlng[1]];
							if (latlng[0] === null) {
								return;
							}
							// Asumir x = longitud, y = latitud
							return {
								type: 'Feature',
								geometry: {
									type: 'Point',
									coordinates: coordinates,
								},
								properties: feature.attributes,
							};
						}),
					};

					console.log(JSON.stringify(geojson)); // Verifica el GeoJSON

					// Convertir GeoJSON a KML usando tokml
					if (geojson.features[0]?.geometry.coordinates[0] !== null) {
						if (format === 'shapefile') {
							this.generarArchivoShapefile(geojson);
						}
						if (format === 'kml') {
							this.generarArchivoKml(geojson);
						}
					}
				});
			} catch (error) {
				console.error('Error generating data file:', error);
			}
		});
	}
	generarArchivoKml(geojson: any): void {
		const kmlString = tokml(geojson);

		// Crear el archivo de descarga
		const blob = new Blob([kmlString], {type: 'application/vnd.google-earth.kml+xml'});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'descarga.kml'; // Cambiar la extensión a .kml
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}
	generarArchivoShapefile(geojson: any): void {
		shpwrite.zip(geojson, {outputType: 'blob', compression: 'DEFLATE'}).then((zipBlob) => {
			saveAs(zipBlob, 'my_shapefile.zip');
		});
	}
}
