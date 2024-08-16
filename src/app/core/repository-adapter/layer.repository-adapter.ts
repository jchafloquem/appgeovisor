import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LayerRepository } from '../repository/layer.repository';
import { Layer } from '../model/layer.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LayerRepositoryAdapter implements LayerRepository {
    private apiUrl = `${environment.urlBackend}/Layer`;

    constructor(private http: HttpClient) {}

    serviceMidagriGis(ideGroup:string,ideServiceMidagri:string):string {
		if(ideGroup=='AGROIDEAS' && ideServiceMidagri=='Reconversión productiva'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/AGROIDEAS/MapServer/0';
		}else if(ideGroup=='AGRORURAL' && ideServiceMidagri=='Intervenciones Agrorural'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/AGRORURA_intervecniones/MapServer/0';
		}else if(ideGroup=='AGRORURAL' && ideServiceMidagri=='Kits'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/AGRORURAL/MapServer/0';
		}else if(ideGroup=='AGRORURAL' && ideServiceMidagri=='Almacenes'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/AGRORURAL/MapServer/1';
		}else if(ideGroup=='AGRORURAL' && ideServiceMidagri=='Fitotoldos'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/AGRORURAL/MapServer/2';
		}else if(ideGroup=='ANA' && ideServiceMidagri=='Maquinarias'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/ANA/MapServer/0';
		}else if(ideGroup=='DGDG' && ideServiceMidagri=='Asistencia técnica'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGDG/MapServer/0';
		}else if(ideGroup=='DGDG' && ideServiceMidagri=='Capacitaciones'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGDG/MapServer/1';
		}else if(ideGroup=='DGDG' && ideServiceMidagri=='Pastos cultivados'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGDG/MapServer/2';
		}else if(ideGroup=='DGDG' && ideServiceMidagri=='Cobertizos'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGDG/MapServer/3';
		}else if(ideGroup=='DGIHR' && ideServiceMidagri=='AMIR'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGIHR/MapServer/0';
		}else if(ideGroup=='DGIHR' && ideServiceMidagri=='Estudios obras'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGIHR/MapServer/1';
		}else if(ideGroup=='DGIHR' && ideServiceMidagri=='Proyectos emblemáticos'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGIHR/MapServer/2';
		}else if(ideGroup=='DGIHR' && ideServiceMidagri=='Áreas bajo riego tecnificado'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGIHR/MapServer/3';
		}else if(ideGroup=='DGIHR' && ideServiceMidagri=='Proyecto especiales'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGIHR/MapServer/4';
		}else if(ideGroup=='Limites_Censales' && ideServiceMidagri=='Departamentos'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/Limites_Censales/MapServer/0';
		}else if(ideGroup=='Limites_Censales' && ideServiceMidagri=='Provincias'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/Limites_Censales/MapServer/1';
		}else if(ideGroup=='Limites_Censales' && ideServiceMidagri=='Distritos'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/Limites_Censales/MapServer/2';
		}else if(ideGroup=='ODNGRD' && ideServiceMidagri=='Elementos_Expuestos'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/ODNGRD/MapServer/0';
		}else if(ideGroup=='ODNGRD' && ideServiceMidagri=='Escenario déficit hídrico'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/ODNGRD/MapServer/1';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='Agrostología SD'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/0';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUM D_10000'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/2';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUMR_20000'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/4';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUMR_25000'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/5';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUMR_30000'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/6';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUMR_35000'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/7';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUMR_50000'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/8';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUMR_100000'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/9';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUMSD_10000'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/11';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUMSD_12000'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/12';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUMSD_20000'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/13';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUMSD_25000'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/14';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUMSD_2000'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/15';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUMSD_45000'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/16';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUMSD_50000'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/17';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CUAT D'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/19';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CUAT SD'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/20';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='EroCl SD'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/21';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='Suelos D'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/23';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='Suelos R'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/24';
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='Suelos SD'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGAAA/MapServer/25';
		}else if(ideGroup=='ESAN' && ideServiceMidagri=='Superficié Agrícola Nacional'){
			return 'https://winlmprap24.midagri.gob.pe/arcgis_server/rest/services/ENIS/SAN/MapServer/0';
		}else if(ideGroup=='ConPuchePeru' && ideServiceMidagri=='ppa'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ConPuchePeru/ppa/MapServer/0';
		}else if(ideGroup=='PSI' && ideServiceMidagri=='Proyectos de Riego Tecnificado'){
			return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/PSI/MapServer/0';
		}
		// else if(ideGroup=='' && ideServiceMidagri==''){
		// 	return '';
		// }
        return '';
	}
}
