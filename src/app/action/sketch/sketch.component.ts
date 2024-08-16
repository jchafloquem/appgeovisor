import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import WebMap from '@arcgis/core/WebMap';
import Sketch from '@arcgis/core/widgets/Sketch';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import SketchViewModel from '@arcgis/core/widgets/Sketch/SketchViewModel';
import Slider from '@arcgis/core/widgets/Slider';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-sketch',
  standalone: true,
  imports: [CommonModule,CalciteComponentsModule],
  templateUrl: './sketch.component.html',
  styleUrl: './sketch.component.css'
})
export class SketchComponent implements OnInit, AfterViewInit {
	@Input() view:any;
	@Input() webmap?:WebMap;

	ngOnInit(): void {
		
	}

	ngAfterViewInit(): void {
		// const featureLayer = new FeatureLayer({
		// 	objectIdField: 'OBJECTID',
		// 	fields: [],
		// 	geometryType: 'point',
		// 	spatialReference: { wkid: 4326 },
		// 	source: []
		//   });
		//   this.webmap?.add(featureLayer);
	
		//   const sketchWidget = new Sketch({
		// 	view: this.view,
		// 	layer: featureLayer,
		// 	container: 'sketchs-container',
		// 	creationMode: 'update'
		//   });

		// const sketchLayer = new GraphicsLayer();
		
		// this.webmap?.add(sketchLayer);
		// this.webmap?.add(graphicsLayer);
		// const featureLayer = new FeatureLayer({
		// 	// Definir un campo para el objectId (ID del objeto), que es necesario para los FeatureLayers
		// 	objectIdField: 'OBJECTID',
		// 	fields: [], // No hay campos en este FeatureLayer vacío
		// 	geometryType: 'point', // Tipo de geometría de las entidades (puede ser 'point', 'polygon', 'polyline', etc.)
		// 	spatialReference: { wkid: 4326 }, // Referencia espacial (puede ser cualquier wkid válido)
		// 	source: [] // No hay entidades en este FeatureLayer vacío
		//   });


		// const debouncedRunQuery = promiseUtils.debounce(() => {
		// 	if (!sketchGeometry) {
		// 	  return;
		// 	}
  
		// 	resultDiv.style.display = "block";
		// 	updateBufferGraphic(bufferSize);
		// 	return promiseUtils.eachAlways([queryStatistics(), updateSceneLayer()]);
		// });

		// function runQuery() {
		// 	debouncedRunQuery().catch((error) => {
		// 	  if (error.name === "AbortError") {
		// 		return;
		// 	  }
  
		// 	  console.error(error);
		// 	});
		// }


		// const sketchWidget = new Sketch({
		// 	view: this.view, // La vista en la que se dibujarán las entidades
		// 	layer: sketchLayer, 
		// 	container: 'sketchs-container', // El contenedor donde se colocará el widget en tu HTML
		// 	creationMode: 'update' // Modo de creación (puede ser 'update', 'draw', 'reshape', etc.)
		// });
	}
}
