import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';
import { BsModalRef } from 'ngx-bootstrap/modal';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Chart, { ChartTypeRegistry } from 'chart.js/auto';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [CommonModule,CalciteComponentsModule],
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.css'
})
export class GraphicComponent implements OnInit {
	public bsModalRef = inject(BsModalRef);
  
	layer?: FeatureLayer;
	title = 'Reporte Gráfico';
	layerName: string = '';
  
	charts: { [key: string]: Chart } = {};
	filter: any = {};
	
	constructor() {}
  
	ngOnInit(): void {
		if (this.layer) {
			this.crearGrafico(this.layer, this.filter);
		}
	}
  
	crearGrafico(layer: FeatureLayer, filter: any) {
		if (layer.title === 'DGIHR - Estudios obras') {
			this.layerName = layer.title;
	
			layer.queryFeatures().then(result => {
			const data = result.features.map((feature: { attributes: { ESTADO_ACT: string } }) => ({
				label: feature.attributes.ESTADO_ACT,
				value: 1
			}));
	
			const groupedData = this.groupDataByLabel(data);
				this.graficoBarras("grafico-barra", "bar", groupedData, "Cantidad de Registros por Estado");
			});
		} else if (layer.title === 'PSI - Proyectos de Riego Tecnificado') {
			
			this.layerName = layer.title;
	
			layer.queryFeatures().then(result => {
				console.log(result.features)

				const data = result.features.map((feature: { attributes: { CUENCA: string, INVER_TOTA: number, DEPARTAM: string, SIST_RIEGO: string , CUI:number} }) => ({
					label: feature.attributes.CUENCA,
					value: feature.attributes.INVER_TOTA,
					departamento: feature.attributes.DEPARTAM,
					riego: feature.attributes.SIST_RIEGO,
					cui: feature.attributes.CUI
				})).filter(x => (!filter.departamento || x.departamento === filter.departamento) &&
								(!filter.riego || x.riego === filter.riego) &&
								(!filter.cui || x.cui === filter.cui));
		
				const groupedData = this.groupDataByLabel(data);
		
				const data1 = result.features.map((feature: { attributes: { SIST_RIEGO: string, INVER_TOTA: number, DEPARTAM: string, CUI:number} }) => ({
					label: feature.attributes.SIST_RIEGO,
					value: feature.attributes.INVER_TOTA,
					departamento: feature.attributes.DEPARTAM,
					cui: feature.attributes.CUI
				})).filter(x => (!filter.departamento || x.departamento === filter.departamento) &&
								(!filter.riego || x.label === filter.riego) &&
								(!filter.cui || x.cui === filter.cui));
		
				const groupedData1 = this.groupDataByLabel(data1);
		
				this.graficoBarras("grafico-barra", "bar", groupedData, "Cuenca por Inversion Total");
				this.graficoBarras("grafico-barra-1", "bar", groupedData1, "Sistema de Riego por Inversion Total");
			});
		}
	}
  
	graficoBarras(id: string, type: keyof ChartTypeRegistry, groupedData: any, label: string) {
		// Destruir el gráfico existente si ya está creado
		if (this.charts[id]) {
			this.charts[id].destroy();
		}
	
		const chart = new Chart(id, {
			type: type,
			data: {
				labels: groupedData.map((item: { label: string }) => item.label),
				datasets: [{
					label: label,
					data: groupedData.map((item: { value: number }) => item.value),
					backgroundColor: groupedData.map(() => this.getRandomColor()),
					borderColor: groupedData.map(() => this.getRandomColor(1)),
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					y: {
					beginAtZero: true
					}
				}
			}
		});

		// Guardar el gráfico en el objeto de gráficos
		this.charts[id] = chart;
	}
  
	// Función para agrupar datos por etiqueta
	groupDataByLabel(data: { label: string, value: number }[]): { label: string, value: number }[] {
		return data.reduce((acc: { label: string, value: number }[], curr) => {
			const existingItem = acc.find((item) => item.label === curr.label);
			if (existingItem) {
				existingItem.value += curr.value;
			} else {
				acc.push(curr);
			}
			return acc;
		}, []);
	}
  
	// Función para generar colores aleatorios
	getRandomColor(alpha = 0.2): string {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return this.hexToRgb(color, alpha);
	}
  
	hexToRgb(hex: string, alpha: number): string {
		const bigint = parseInt(hex.slice(1), 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;
		return `rgba(${r},${g},${b},${alpha})`;
	}
  
	changePSIDepartamento(event: any) {
		this.filter.departamento = event.target.value;
		if (this.layer) {
			this.crearGrafico(this.layer, this.filter);
		}
	}

	changePSISistemaRiego(event: any) {
		this.filter.riego = event.target.value;
		if (this.layer) {
			this.crearGrafico(this.layer, this.filter);
		}
	}

	keyUpPSICUI(event: any){
		this.filter.cui = event.target.value;
		if (this.layer) {
			this.crearGrafico(this.layer, this.filter);
		}
	}
	
}