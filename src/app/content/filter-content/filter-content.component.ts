import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';
import { RegionService } from 'src/app/core/service/region.service';
import { Region, RegionRpta } from 'src/app/core/model/region.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Color from '@arcgis/core/Color';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import { SpatialReference } from '@arcgis/core/geometry';
import PopupTemplate from '@arcgis/core/PopupTemplate';


import { RegionFeatureService } from 'src/app/core/service/region-feature.service';
import { ProvinciaService } from 'src/app/core/service/provincia.service';
import { ProvinciaFeatureService } from 'src/app/core/service/provincia-feature.service';
import { Provincia } from 'src/app/core/model/provincia.model';
import { DistritoService } from 'src/app/core/service/distrito.service';
import { DistritoFeatureService } from 'src/app/core/service/distrito-feature.service';
import { Distrito } from 'src/app/core/model/distrito.model';
import { CuencaService } from 'src/app/core/service/cuenca.service';
import { CuencaFeatureService } from 'src/app/core/service/cuenca-feature.service';
import { Cuenca } from 'src/app/core/model/cuenca.model';

import cuencas from '../../../assets/data/cuencas.json';
import proyectoEspeciales from '../../../assets/data/proyectos_especiales.json';

import { ProyectoEspecial } from 'src/app/core/model/proyecto-especial';
import { ProyectoEspecialService } from 'src/app/core/service/proyecto-especial.service';
import { ProyectoEspecialFeatureService } from 'src/app/core/service/proyecto-especial-feature.service';
import { LayerService } from 'src/app/core/service/layer.service';
// const cuencas = require('../../core/data/cuentas.json');


@Component({
  selector: 'app-filter-content',
  standalone: true,
  imports: [CommonModule,CalciteComponentsModule,ReactiveFormsModule,FormsModule],
  templateUrl: './filter-content.component.html',
  styleUrl: './filter-content.component.css'
})
export class FilterContentComponent implements OnInit,AfterViewInit {

	private toastr = inject(ToastrService);
	private formBuilder = inject(FormBuilder);
	private spinner = inject(NgxSpinnerService);
	private regionService = inject(RegionService);
	private regionFeatureService = inject(RegionFeatureService);
	private provinciaService = inject(ProvinciaService);
	private provinciaFeatureService = inject(ProvinciaFeatureService);
	private distritoService = inject(DistritoService);
	private distritoFeatureService = inject(DistritoFeatureService);
	private cuencaService = inject(CuencaService);
	private cuencaFeatureService = inject(CuencaFeatureService);
	private proyectoEspecialService = inject(ProyectoEspecialService);
	private proyectoEspecialFeatureService = inject(ProyectoEspecialFeatureService);
	private cdr = inject(ChangeDetectorRef);
	private layerService = inject(LayerService);
	
	regiones: Region[] = [];
	provincias: Provincia[] = [];
	distritos: Distrito[] = [];
	cuencas: Cuenca[] = [];
	proyectoEspeciales: ProyectoEspecial[] = [];

	coddep?: string;
	codprov?: string;
	coddist?: string;
	codcuenca?: number;
	codproyectoespecial?: number;


	@Input() view?:MapView;
	@Input() webmap?:WebMap;

	groupLayerFiltro = new GroupLayer({
		id: 'groupLayerFiltro',
		title: 'Filtros',
		visibilityMode: 'independent',
		visible:true,
	});

	constructor(){
		this.cuencas = cuencas;
		this.proyectoEspeciales = proyectoEspeciales;
	}

    ngOnInit(): void {
		//this.regionService.
		this.webmap?.add(this.groupLayerFiltro);
    }

	ngAfterViewInit() {
		this.listRegionGlobal();
		//this.listCuenca();
		//this.listCuencaGlobal();
		//this.listRegion();
	}

	listRegionGlobal(){
		this.spinner.show();
		
		this.regionFeatureService.setRegionFeature();

		const regionFeature = this.regionFeatureService?.getRegionFeature();
		// Verifica que this.regionListFeature tenga un valor definido antes de agregarlo
		if (regionFeature) {
			//this.webmap?.layers.add(regionFeature);
			this.spinner.hide();
			this.listRegion();
			// Monitorear el estado de carga de la capa
			// const handle = regionFeature.watch("loadStatus", loadStatus => {
			// 	if (loadStatus === "loaded" || loadStatus === "failed") {
			// 		// Ocultar el spinner cuando la capa se ha cargado o ha fallado la carga
			// 		this.spinner.hide();
			// 		// Detener el monitoreo del estado de carga
			// 		handle.remove();
			// 		this.listRegion();
			// 	}
			// });

		} else {
			console.error('No se pudo obtener la capa de regiones desde regionFeatureService.');
		}
		
    }

	listCuencaGlobal(){
		this.spinner.show();
		
		this.cuencaFeatureService.setCuencaFeature();

		const cuencaFeature = this.cuencaFeatureService?.getCuencaFeature();
		// Verifica que this.regionListFeature tenga un valor definido antes de agregarlo
		if (cuencaFeature) {
			//this.webmap?.layers.add(cuencaFeature);

			// Monitorear el estado de carga de la capa
			const handle = cuencaFeature.watch("loadStatus", loadStatus => {
				if (loadStatus === "loaded" || loadStatus === "failed") {
					// Ocultar el spinner cuando la capa se ha cargado o ha fallado la carga
					this.spinner.hide();
					// Detener el monitoreo del estado de carga
					handle.remove();
					//this.listCuenca();
				}
			});

		} else {
			console.error('No se pudo obtener la capa de cuencas desde cuencaFeatureService.');
		}
	}


	listRegion(){
		//this.spinner.show();
		const regionFeature = this.regionFeatureService?.getRegionFeature();

		if(regionFeature){
			//Definir la consulta para obtener los registros deseados
			const query = regionFeature.createQuery();
			query.where = "1=1";
			query.outFields = ['CODDEP', 'NOMBDEP']; // Campos que deseas obtener
		
			// Ejecutar la consulta para obtener los features
			regionFeature.queryFeatures(query)
				.then((featureSet) => {
					// Procesar los resultados de la consulta
					const features = featureSet.features;
					this.regiones = features.map(feature => ({
						coddep: feature.attributes.CODDEP,
						nombdep: feature.attributes.NOMBDEP
					}));

					//this.spinner.hide();
				})
				.catch(error => {
					console.error('Error loading region layer:', error);
					this.spinner.hide();
				});
		}

	}

	regionChange(event: any) {
		this.coddep = event.target.value;
		this.getRegion();
	}

	provinciaChange(event: any) {
		this.codprov = event.target.value;
		this.getProvincia();
	}

	distritoChange(event: any) {
		this.coddist = event.target.value;
		this.getDistrito();
	}

	cuencaChange(event: any) {
		this.codcuenca = event.target.value;
		this.getCuenca();
	}

	proyectoEspecialChange(event: any) {
		this.codproyectoespecial = event.target.value;
		console.log(event.target.value)
		this.getProyectoEspecial();
	}
	
	getRegion(){
		//this.spinner.show();
		//Obtener la lista de capas cargadas
		const layers = this.webmap?.layers;
		// Verificar si la lista de capas es válida y si contiene elementos
		if (layers && layers.length > 0) {
			// Iterar sobre las capas cargadas para acceder a cada una
			layers.forEach(layer => {
				// Hacer algo con cada capa, como mostrar su nombcuenca o tipo
				if(layer.title=='Límites Censales - Región'){
					this.webmap?.layers.remove(layer);
				}

				if(layer.title=='Límites Censales - Provincia'){
					this.webmap?.layers.remove(layer);
				}

				if(layer.title=='Limites Censales - Departamentos'){
					layer.visible= false;
				}
				
				// Puedes agregar más lógica aquí según tus necesidades
			});
		} else {
			console.log('No se han cargado capas en el mapa.');
		}

		this.layerService.removeLayerFromGroup('groupLayerFiltro','regionSeleccionada',this.webmap);
		this.layerService.removeLayerFromGroup('groupLayerFiltro','provinciaSeleccionada',this.webmap);
		

		this.regionFeatureService.setRegionFeature();
		const regionFeature = this.regionFeatureService?.getRegionFeature();
		if(regionFeature){
			
			//Definir la consulta para obtener los registros deseados
			const query = regionFeature.createQuery();
			query.where = `CODDEP='${this.coddep}'`;
			query.outFields = ['CODDEP', 'NOMBDEP']; // Campos que deseas obtener

			// Ejecutar la consulta para obtener los features
			regionFeature.queryFeatures(query)
			.then((featureSet) => {
				if (featureSet.features.length === 1) {
					// Obtener la geometría del primer resultado (asumiendo que solo hay uno)
					const geometry = featureSet.features[0].geometry;
					// Realizar el zoom o navegación a la geometría
					this.view?.goTo(geometry.extent);
					//
					const whereClause = `CODDEP='${this.coddep}'`;
					// Crear una nueva capa con el feature
                    const regionFeatureLayer = new FeatureLayer({
						id:'regionSeleccionada',
                        url: this.regionService.urlGis(), // Usar el feature como fuente de la capa
						title: 'Límites Censales - Región',
                        renderer: new SimpleRenderer({
                            symbol: new SimpleFillSymbol({
                                color: new Color([255, 165, 0, 0.1]),
                                outline: new SimpleLineSymbol({
                                    width: 2,
                                    color: new Color([255, 165, 0])
                                })
                            })
                        }),
						definitionExpression: whereClause
                    });
					// Agregar la nueva capa al mapa
					// const groupLayerFiltro = new GroupLayer({
					// 	title: 'ODNGRD',
					// 	visibilityMode: 'independent',
					// 	visible:false,
					// 	layers: [
					// 		this.layerFeatureService.featureLayer('ODNGRD','Elementos_Expuestos'),
					// 		this.layerFeatureService.featureLayer('ODNGRD','Escenario déficit hídrico'),
					// 	]
					// });
					this.groupLayerFiltro.add(regionFeatureLayer);

					
					//this.webmap?.layers.add(regionFeatureLayer);


					this.provinciaFeatureService.setProvinciaFeature();
					const provinciaFeature = this.provinciaFeatureService?.getProvinciaFeature();

					if(provinciaFeature){
						//Definir la consulta para obtener los registros deseados
						const query = provinciaFeature.createQuery();
						query.where = `CODDEP='${this.coddep}'`;
						query.outFields = ['CODDEP','CODPROV', 'NOMBPROV']; // Campos que deseas obtener

						provinciaFeature.queryFeatures(query)
						.then((featureSet) => {
							const features = featureSet.features;
							this.provincias = features.map(feature => ({
								codprov: feature.attributes.CODPROV,
								nombprov: feature.attributes.NOMBPROV
							}));

							
							const whereClause = `CODDEP='${this.coddep}'`;
							// Crear una nueva capa con el feature
							const provinciaFeatureLayer = new FeatureLayer({
								id:'provinciaSeleccionada',
								url: this.provinciaService.urlGis(), // Usar el feature como fuente de la capa
								title: 'Límites Censales - Provincia',
								renderer: new SimpleRenderer({
									symbol: new SimpleFillSymbol({
										color: new Color([255, 165, 0, 0.1]),
										outline: new SimpleLineSymbol({
											width: 2,
											color: new Color([255, 165, 0])
										})
									})
								}),
								definitionExpression: whereClause
							});
							// Agregar la nueva capa al mapa
							this.groupLayerFiltro.add(provinciaFeatureLayer);
							//this.webmap?.layers.add(provinciaFeatureLayer);
						})
					}

				} else {
					console.warn('No se encontraron resultados para la consulta.');
				}
			})
			.catch(error => {
			  console.error('Error al cargar la capa de regiones:', error);
			});

			

		}

	}

	getProvincia(){
		//Obtener la lista de capas cargadas
		const layers = this.webmap?.layers;
		// Verificar si la lista de capas es válida y si contiene elementos
		if (layers && layers.length > 0) {
			// Iterar sobre las capas cargadas para acceder a cada una
			layers.forEach(layer => {
				// if(layer.title=='Region Seleccionada'){
				// 	this.webmap?.layers.remove(layer);
				// }

				if(layer.title=='Límites Censales - Provincia'){
					this.webmap?.layers.remove(layer);
				}

				if(layer.title=='Límites Censales - Distrito'){
					this.webmap?.layers.remove(layer);
				}

				if(layer.title=='Limites Censales - Departamentos'){
					layer.visible= false;
				}
				
				// Puedes agregar más lógica aquí según tus necesidades
			});
		} else {
			console.log('No se han cargado capas en el mapa.');
		}

		
		this.layerService.removeLayerFromGroup('groupLayerFiltro','provinciaSeleccionada',this.webmap);
		this.layerService.removeLayerFromGroup('groupLayerFiltro','distritoSeleccionada',this.webmap);

		this.provinciaFeatureService.setProvinciaFeature();
		const provinciaFeature = this.provinciaFeatureService?.getProvinciaFeature();
		if(provinciaFeature){

			//Definir la consulta para obtener los registros deseados
			const query = provinciaFeature.createQuery();
			query.where = `CODDEP='${this.coddep}' AND CODPROV='${this.codprov}'`;
			query.outFields = ['CODDEP', 'CODPROV', 'NOMBPROV']; 

			provinciaFeature.queryFeatures(query)
			.then((featureSet) => {
				//if (featureSet.features.length === 1) {
					// Obtener la geometría del primer resultado (asumiendo que solo hay uno)
					const geometry = featureSet.features[0].geometry;
					// Realizar el zoom o navegación a la geometría
					this.view?.goTo(geometry.extent);
					//
					const whereClause = `CODDEP='${this.coddep}' AND CODPROV='${this.codprov}'`;
					// Crear una nueva capa con el feature
                    const provinciaFeatureLayer = new FeatureLayer({
						id:'provinciaSeleccionada',
                        url: this.provinciaService.urlGis(), // Usar el feature como fuente de la capa
						title: 'Límites Censales - Provincia',
                        renderer: new SimpleRenderer({
                            symbol: new SimpleFillSymbol({
                                color: new Color([255, 165, 0, 0.1]),
                                outline: new SimpleLineSymbol({
                                    width: 2,
                                    color: new Color([255, 165, 0])
                                })
                            })
                        }),
						definitionExpression: whereClause
                    });
					// Agregar la nueva capa al mapa
					this.groupLayerFiltro.add(provinciaFeatureLayer);
					//this.webmap?.layers.add(provinciaFeatureLayer);



					this.distritoFeatureService.setDistritoFeature();
					const distritoFeature = this.distritoFeatureService?.getDistritoFeature();

					if(distritoFeature){
						//Definir la consulta para obtener los registros deseados
						const query = distritoFeature.createQuery();
						query.where = `CODDEP='${this.coddep}' AND CODPROV='${this.codprov}'`;
						query.outFields = ['CODDEP','CODPROV','CODDIST', 'NOMBDIST']; // Campos que deseas obtener

						distritoFeature.queryFeatures(query)
						.then((featureSet) => {
							const features = featureSet.features;
							this.distritos = features.map(feature => ({
								coddist: feature.attributes.CODDIST,
								nombdist: feature.attributes.NOMBDIST
							}));


							const whereClause = `CODDEP='${this.coddep}' AND CODPROV='${this.codprov}'`;
							// Crear una nueva capa con el feature
							const distritoFeatureLayer = new FeatureLayer({
								id:'distritoSeleccionada',
								url: this.distritoService.urlGis(), // Usar el feature como fuente de la capa
								title: 'Límites Censales - Distrito',
								renderer: new SimpleRenderer({
									symbol: new SimpleFillSymbol({
										color: new Color([255, 165, 0, 0.1]),
										outline: new SimpleLineSymbol({
											width: 2,
											color: new Color([255, 165, 0])
										})
									})
								}),
								definitionExpression: whereClause
							});
							// Agregar la nueva capa al mapa
							this.groupLayerFiltro.add(distritoFeatureLayer);
							//this.webmap?.layers.add(distritoFeatureLayer);


						});
					}


				//}
			})
			.catch(error => {
				console.error('Error al cargar la capa de regiones:', error);
			});
  
			
		}
	}

	getDistrito(){
		//Obtener la lista de capas cargadas
		const layers = this.webmap?.layers;
		// Verificar si la lista de capas es válida y si contiene elementos
		if (layers && layers.length > 0) {
			// Iterar sobre las capas cargadas para acceder a cada una
			layers.forEach(layer => {

				if(layer.title=='Límites Censales - Distrito'){
					this.webmap?.layers.remove(layer);
				}

				if(layer.title=='Limites Censales - Departamentos'){
					layer.visible= false;
				}
				
				// Puedes agregar más lógica aquí según tus necesidades
			});
		} else {
			console.log('No se han cargado capas en el mapa.');
		}

		this.layerService.removeLayerFromGroup('groupLayerFiltro','distritoSeleccionada',this.webmap);


		this.distritoFeatureService.setDistritoFeature();
		const distritoFeature = this.distritoFeatureService?.getDistritoFeature();
		if(distritoFeature){

			//Definir la consulta para obtener los registros deseados
			const query = distritoFeature.createQuery();
			query.where = `CODDEP='${this.coddep}' AND CODPROV='${this.codprov}' AND CODDIST='${this.coddist}'`;
			query.outFields = ['CODDEP', 'CODPROV','CODDIST','NOMBDIST']; 

			distritoFeature.queryFeatures(query)
			.then((featureSet) => {
				console.log(featureSet)
				//if (featureSet.features.length === 1) {
					// Obtener la geometría del primer resultado (asumiendo que solo hay uno)
					const geometry = featureSet.features[0].geometry;
					// Realizar el zoom o navegación a la geometría
					this.view?.goTo(geometry.extent);
					//
					const whereClause = `CODDEP='${this.coddep}' AND CODPROV='${this.codprov}' AND CODDIST='${this.coddist}'`;
					// Crear una nueva capa con el feature
                    const distritoFeatureLayer = new FeatureLayer({
						id:'distritoSeleccionada',
                        url: this.distritoService.urlGis(), // Usar el feature como fuente de la capa
						title: 'Límites Censales - Distrito',
                        renderer: new SimpleRenderer({
                            symbol: new SimpleFillSymbol({
                                color: new Color([255, 165, 0, 0.1]),
                                outline: new SimpleLineSymbol({
                                    width: 2,
                                    color: new Color([255, 165, 0])
                                })
                            })
                        }),
						definitionExpression: whereClause
                    });
					// Agregar la nueva capa al mapa
					this.groupLayerFiltro.add(distritoFeatureLayer);
					//this.webmap?.layers.add(distritoFeatureLayer);


				//}
			})
			.catch(error => {
				console.error('Error al cargar la capa de regiones:', error);
			});
  
			
		}
	}

	getCuenca(){
		//Obtener la lista de capas cargadas
		const layers = this.webmap?.layers;
		// Verificar si la lista de capas es válida y si contiene elementos
		if (layers && layers.length > 0) {
			// Iterar sobre las capas cargadas para acceder a cada una
			layers.forEach(layer => {

				if(layer.title=='Cuenca'){
					this.webmap?.layers.remove(layer);
				}
				
				// Puedes agregar más lógica aquí según tus necesidades
			});
		} else {
			console.log('No se han cargado capas en el mapa.');
		}

		this.cuencaFeatureService.setCuencaFeature();
		const cuencaFeature = this.cuencaFeatureService?.getCuencaFeature();
		if(cuencaFeature){
			
			//Definir la consulta para obtener los registros deseados
			const query = cuencaFeature.createQuery();
			query.where = `CODIGO='${this.codcuenca}'`;
			query.outFields = ['CODIGO', 'NOMBRE']; // Campos que deseas obtener

			// Ejecutar la consulta para obtener los features
			cuencaFeature.queryFeatures(query)
			.then((featureSet) => {
				//if (featureSet.features.length === 1) {
					// Obtener la geometría del primer resultado (asumiendo que solo hay uno)
					const geometry = featureSet.features[0].geometry;
					// Realizar el zoom o navegación a la geometría
					this.view?.goTo(geometry.extent);
					//
					const whereClause = `CODIGO='${this.codcuenca}'`;
					// Crear una nueva capa con el feature
                    const cuencaFeatureLayer = new FeatureLayer({
                        url: this.cuencaService.urlGis(), // Usar el feature como fuente de la capa
						title: 'Cuenca',
                        renderer: new SimpleRenderer({
                            symbol: new SimpleFillSymbol({
                                color: new Color([255, 165, 0, 0.1]),
                                outline: new SimpleLineSymbol({
                                    width: 2,
                                    color: new Color([255, 165, 0])
                                })
                            })
                        }),
						definitionExpression: whereClause
                    });
					// Agregar la nueva capa al mapa
					this.webmap?.layers.add(cuencaFeatureLayer);


				// } else {
				// 	console.warn('No se encontraron resultados para la consulta.');
				// }
			})
			.catch(error => {
			  console.error('Error al cargar la capa de cuencas:', error);
			});

			

		}
	}

	getProyectoEspecial(){
		//Obtener la lista de capas cargadas
		const layers = this.webmap?.layers;
		// Verificar si la lista de capas es válida y si contiene elementos
		if (layers && layers.length > 0) {
			// Iterar sobre las capas cargadas para acceder a cada una
			layers.forEach(layer => {

				if(layer.title=='PROYECTO ESPECIAL'){
					this.webmap?.layers.remove(layer);
				}
				
				// Puedes agregar más lógica aquí según tus necesidades
			});
		} else {
			console.log('No se han cargado capas en el mapa.');
		}

		this.layerService.removeLayerFromGroup('groupLayerFiltro','proyectoEspecialSeleccionada',this.webmap);

		this.proyectoEspecialFeatureService.setProyectoEspecialFeature();
		const proyectoEspecialFeature = this.proyectoEspecialFeatureService?.getProyectoEspecialFeature();
		if(proyectoEspecialFeature){
			
			//Definir la consulta para obtener los registros deseados
			const query = proyectoEspecialFeature.createQuery();
			query.where = `OBJECTID = ${this.codproyectoespecial}`;
			query.outFields = ['*']; // Campos que deseas obtener
			query.outSpatialReference = new SpatialReference({ wkid: 4326 });

			// Ejecutar la consulta para obtener los features
			proyectoEspecialFeature.queryFeatures(query)
			.then((featureSet) => {
				//if (featureSet.features.length === 1) {
					// Obtener la geometría del primer resultado (asumiendo que solo hay uno)
					const geometry = featureSet.features[0].geometry;
					// Realizar el zoom o navegación a la geometría
					this.view?.goTo(geometry.extent);
					//
					const whereClause = `OBJECTID=${this.codproyectoespecial}`;
					// Crear una nueva capa con el feature
                    const proyectoEspecialFeatureLayer = new FeatureLayer({
						id:'proyectoEspecialSeleccionada',
                        url: this.proyectoEspecialService.urlGis(), // Usar el feature como fuente de la capa
						outFields: ['*'],
						title: 'PROYECTO ESPECIAL',
						renderer: new SimpleRenderer({
                            symbol: new SimpleFillSymbol({
                                color: new Color([255, 165, 0, 0.1]),
                                outline: new SimpleLineSymbol({
                                    width: 2,
                                    color: new Color([255, 165, 0])
                                })
                            })
                        }),
						popupTemplate: new PopupTemplate({
							title: '{NOMBRE}',
							content: [{
								type: 'fields',
								fieldInfos: [
									{ fieldName: 'OBJECTID', label: 'OBJECTID' },
									{ fieldName: 'SIGLA', label: 'SIGLA' },
									{ fieldName: 'NOMBRE', label: 'NOMBRE' },
									{ fieldName: 'SHAPE', label: 'SHAPE' },
									{ fieldName: 'SHAPE.AREA', label: 'SHAPE.AREA' },
									{ fieldName: 'SHAPE.LEN', label: 'SHAPE.LEN' },
								]
							}]
						}),
						definitionExpression: whereClause,
						spatialReference: new SpatialReference({ wkid: 4326 })
                    });
					// Agregar la nueva capa al mapa
					//this.webmap?.layers.add(proyectoEspecialFeatureLayer);
					this.groupLayerFiltro.add(proyectoEspecialFeatureLayer);

				// } else {
				// 	console.warn('No se encontraron resultados para la consulta.');
				// }
			})
			.catch(error => {
			  console.error('Error al cargar la capa de proyecto especial:', error);
			});

			

		}
	}
}
