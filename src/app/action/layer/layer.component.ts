import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';
import LayerList from '@arcgis/core/widgets/LayerList';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import Color from '@arcgis/core/Color';
import WebMap from '@arcgis/core/WebMap';
import { NgxSpinnerService } from 'ngx-spinner';
import { RegionService } from 'src/app/core/service/region.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import  GeoJSONLayer  from '@arcgis/core/layers/GeoJSONLayer';
import { Region } from 'src/app/core/model/region.model';
import { RegionFeatureService } from 'src/app/core/service/region-feature.service';
import { CuencaFeatureService } from 'src/app/core/service/cuenca-feature.service';
import { LayerService } from 'src/app/core/service/layer.service';
import GroupLayer from '@arcgis/core/layers/GroupLayer';

import { BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import { GraphicComponent } from '../graphic/graphic.component';

interface LayerConfig {
	groupTitle: string;
	layers: { name: string; title: string }[];
}

interface LayerAction {
	title: string;
	className: string;
	id: string;
  }

@Component({
  selector: 'app-layer',
  standalone: true,
  imports: [CommonModule,CalciteComponentsModule,],
  templateUrl: './layer.component.html',
  styleUrl: './layer.component.css'
})
export class LayerComponent implements OnInit,AfterViewInit {
	private spinner = inject(NgxSpinnerService);
	private regionFeatureService = inject(RegionFeatureService);
	private cuencaFeatureService = inject(CuencaFeatureService);
	private layerFeatureService = inject(LayerService);
	private modalService = inject(BsModalService);
	
	private renderer = inject(Renderer2);

	modalRef?: BsModalRef;

	@Input() view:any;
	@Input() webmap?:WebMap;

	// regiones: Region[] = [];
	// regionesFeature?:FeatureLayer;
	//regionListFeature?:FeatureLayer;

	layerConfigs: LayerConfig[] = [
		{
			groupTitle: 'Agro Ideas',
			layers: [{ name: 'AGROIDEAS', title: 'Reconversión productiva' }]
		},
		{
			groupTitle: 'Agro Rural',
			layers: [
				{ name: 'AGRORURAL', title: 'Intervenciones Agrorural' },
				{ name: 'AGRORURAL', title: 'Kits' },
				{ name: 'AGRORURAL', title: 'Almacenes' },
				{ name: 'AGRORURAL', title: 'Fitotoldos' }
			]
		},
		{
			groupTitle: 'ANA',
			layers: [{ name: 'ANA', title: 'Maquinarias' }]
		},
		{
			groupTitle: 'DGDG',
			layers: [
				{ name: 'DGDG', title: 'Asistencia técnica' },
				{ name: 'DGDG', title: 'Capacitaciones' },
				{ name: 'DGDG', title: 'Pastos cultivados' },
				{ name: 'DGDG', title: 'Cobertizos' },
			]
		},
		{
			groupTitle: 'DGIHR',
			layers: [
				{ name: 'DGIHR', title: 'AMIR' },
				{ name: 'DGIHR', title: 'Estudios obras' },
				{ name: 'DGIHR', title: 'Proyectos emblemáticos' },
				{ name: 'DGIHR', title: 'Áreas bajo riego tecnificado' },
				{ name: 'DGIHR', title: 'Proyecto especiales' },
			]
		},
		{
			groupTitle: 'Límites Censales',
			layers: [
				{ name: 'Limites_Censales', title: 'Departamentos' },
				{ name: 'Limites_Censales', title: 'Provincias' },
				{ name: 'Limites_Censales', title: 'Distritos' },
			]
		},
		{
			groupTitle: 'ODNGRD',
			layers: [
				{ name: 'ODNGRD', title: 'Elementos_Expuestos' },
				{ name: 'ODNGRD', title: 'Escenario déficit hídrico' },
			]
		},
		{
			groupTitle: 'DGAAA',
			layers: [
				{ name: 'DGAAA', title: 'Agrostología SD' },
				{ name: 'DGAAA', title: 'CTCUM D_10000' },
				{ name: 'DGAAA', title: 'CTCUMR_20000' },
				{ name: 'DGAAA', title: 'CTCUMR_25000' },
				{ name: 'DGAAA', title: 'CTCUMR_30000' },
				{ name: 'DGAAA', title: 'CTCUMR_35000' },
				{ name: 'DGAAA', title: 'CTCUMR_50000' },
				{ name: 'DGAAA', title: 'CTCUMR_100000' },
				{ name: 'DGAAA', title: 'CTCUMSD_10000' },
				{ name: 'DGAAA', title: 'CTCUMSD_12000' },
				{ name: 'DGAAA', title: 'CTCUMSD_20000' },
				{ name: 'DGAAA', title: 'CTCUMSD_25000' },
				{ name: 'DGAAA', title: 'CTCUMSD_2000' },
				{ name: 'DGAAA', title: 'CTCUMSD_45000' },
				{ name: 'DGAAA', title: 'CTCUMSD_50000' },
				{ name: 'DGAAA', title: 'CUAT D' },
				{ name: 'DGAAA', title: 'CUAT SD' },
				{ name: 'DGAAA', title: 'EroCl SD' },
				{ name: 'DGAAA', title: 'Suelos D' },
				{ name: 'DGAAA', title: 'Suelos R' },
				{ name: 'DGAAA', title: 'Suelos SD' },
			]
		},
		{
			groupTitle: 'ESAN',
			layers: [
				{ name: 'ESAN', title: 'Superficié Agrícola Nacional' },
			]
		},
		{
			groupTitle: 'ConPuchePeru',
			layers: [
				{ name: 'ConPuchePeru', title: 'ppa' },
			]
		},
		{
			groupTitle: 'PSI',
			layers: [
				{ name: 'PSI', title: 'Proyectos de Riego Tecnificado' },
			]
		}
		// Agrega más configuraciones de capas según sea necesario
	];


	ngOnInit(): void {
		
	}


	openModal(layer: FeatureLayer) {
		const initialState: ModalOptions = {
			class: 'modal-dialog-centered modal-xl',
			initialState: {
				layer:layer
			}
		}
		this.modalRef = this.modalService.show(GraphicComponent, initialState);
		this.modalRef?.onHidden?.subscribe(() => {
			
		})
	}

	openLink(url:string) {
		//const url = 'https://www.ejemplo.com'; // Reemplaza con tu enlace
		window.open(url, '_blank');
	  }


	ngAfterViewInit() {
		
		//this.listRegion();
		//this.listCuenca();
		this.addGroupLayers();
		const layerList = new LayerList({
			view: this.view,
			listItemCreatedFunction: async (event) => {
				const item = event.item;

				
				await item.layer.when();
				if (item.layer.title === "DGIHR - Estudios obras" || item.layer.title === "PSI - Proyectos de Riego Tecnificado") {
					item.actionsSections = [
						[
							{
								title: "Gráfico",
								className: "esri-icon-chart",
								id: "chart-action"
							}
						],
					];
				} else if(await item.layer.title === "DGAAA - Suelos R"){
					item.actionsSections = [
						[
							{
								title: "Catálogo de Imágenes",
								className: "esri-icon-collection",
								id: "image-catalog-action"
							}
						],
					];
				}


				// if (item.layer.type === "group") {
					
				// } else if (item.layer.type === "feature") {
				// 	console.log(item)
				// 	console.log(item.layer)
				// 	console.log(item.layer.title)
				// 	if (await item.layer.title === "Estudios obras") {
				// 		item.actionsSections = [
				// 			[
				// 				{
				// 				title: "Gráfico",
				// 				className: "esri-icon-chart",
				// 				id: "chart-action"
				// 				}
				// 			],
				// 		];
				// 	} else {
				// 	// Otras acciones para las capas que no sean "Capa 1", si lo deseas
				// 	}


				// 	// item.actionsSections = [
				// 	// 	[
				// 	// 		{
				// 	// 			title: "Gráfico",
				// 	// 			className: "esri-icon-chart",
				// 	// 			id: "chart-action"
				// 	// 		}
				// 	// 	],
				// 	// ];

				// 	// item.actionsSections = [
				// 	// 	[
				// 	// 		{
				// 	// 			title: "Go to full extent",
				// 	// 			className: "esri-icon-zoom-out-fixed",
				// 	// 			id: "full-extent"
				// 	// 		},
				// 	// 		{
				// 	// 			title: "Layer information",
				// 	// 			className: "esri-icon-description",
				// 	// 			id: "information"
				// 	// 		}
				// 	// 	],
				// 	// 	[
				// 	// 		{
				// 	// 			title: "Increase opacity",
				// 	// 			className: "esri-icon-up",
				// 	// 			id: "increase-opacity"
				// 	// 		},
				// 	// 		{
				// 	// 			title: "Chart icon action", // Título de la nueva acción
				// 	// 			className: "esri-icon-chart", // Clase del ícono de Font Awesome
				// 	// 			id: "chart-action" // ID de la nueva acción
				// 	// 		}
				// 	// 	]
				// 	// ];
				// 	// if (item.layer.title == "DGIHR - Estudios obras") {
				// 	// 	item.actionsSections = [
				// 	// 		[
				// 	// 			{
				// 	// 				title: "Decrease opacity",
				// 	// 				className: "esri-icon-down",
				// 	// 				id: "decrease-opacity"
				// 	// 			}
				// 	// 		],
				// 	// 	];
				// 	// }
				// }

			},
			container:'layers-container' // Utiliza la referencia al elemento del DOM
		});
		
		layerList.on("trigger-action", (event) => {
			const actionId = event.action.id;
			const layer = event.item.layer;
			this.handleAction(actionId,layer as FeatureLayer);
		});
	}


	handleAction(actionId: string,layer: FeatureLayer) {
		
		// Maneja la acción según su ID
		switch (actionId) {
			case "full-extent":
				
				// Acción cuando se hace clic en "Go to full extent"
				break;
			case "information":
				// Acción cuando se hace clic en "Layer information"
				break;
			case "increase-opacity":
				// Acción cuando se hace clic en "Increase opacity"
				break;
			case "decrease-opacity":
				// Acción cuando se hace clic en "Decrease opacity"
				break;
			case "chart-action":
				this.openModal(layer)
				// Acción cuando se hace clic en "Decrease opacity"
				break;
			case "image-catalog-action":
				this.openLink("https://metadatos.midagri.gob.pe/geonetwork/srv/spa/catalog.search#/metadata/fea0e351-d152-489d-a196-4b9895e556a9")
				
				break;
			default:
				// Acción por defecto si el ID de la acción no coincide con ninguno de los anteriores
				break;
		}
	}

	addGroupLayers() {
		this.layerConfigs.forEach(config => {
			const groupLayer = new GroupLayer({
				title: config.groupTitle,
				visibilityMode: 'independent',
				visible: (config.groupTitle=='Límites Censales' || config.groupTitle=='ConPuchePeru')?true:false,
				layers: config.layers.map(layer => this.layerFeatureService.featureLayer(layer.name, layer.title))
			});

			console.log(groupLayer)

			this.webmap?.add(groupLayer);
			// Agregar eventos de visibilidad a cada capa dentro del grupo
			groupLayer.layers.forEach(layer => {
				layer.watch('visible', (newValue, oldValue, propertyName, target) => {
				  if (newValue) {
					// La capa se ha vuelto visible
					console.log('Capa visible:', layer.title);
					// Lógica adicional según sea necesario
					//this.crearGrafico(layer as FeatureLayer);
					//this.graphicComponent.show();
					

				  } else {
					// La capa se ha vuelto invisible
					console.log('Capa invisible:', layer.title);
					// Lógica adicional según sea necesario
					//this.graphicComponent.hide();
				  }
				});
			});
		});
	}

	
}
