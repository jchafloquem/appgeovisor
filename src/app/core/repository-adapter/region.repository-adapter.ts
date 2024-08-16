import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegionRepository } from '../repository/region.repository';
import { Region, RegionRpta } from '../model/region.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegionRepositoryAdapter implements RegionRepository {
    private apiUrl = `${environment.urlBackend}/region`;

    constructor(private http: HttpClient) {}

    list(): Observable<RegionRpta> {
        return this.http.get<RegionRpta>(this.apiUrl);
    }

    get(id: number): Observable<RegionRpta> {
        return this.http.get<RegionRpta>(`${this.apiUrl}/${id}`);
    }

    add(region: Region): Observable<RegionRpta> {
        return this.http.post<RegionRpta>(this.apiUrl, region);
    }

    update(region: Region): Observable<RegionRpta> {
        return this.http.put<RegionRpta>(`${this.apiUrl}/${region.objectid}`, region);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<RegionRpta>(`${this.apiUrl}/${id}`);
    }

    urlGis():string {
        return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/Limites_Censales/MapServer/0';
		//return this.http.get<any>(`https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/Limites_Censales/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson`);
	}

    listGisx(): Observable<any> {
		return this.http.get<any>(`https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/Limites_Censales/MapServer/0`);
	}

    listGis2(): Observable<any> {
        return this.http.get<any>('https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/Limites_Censales/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&queryByDistance=&returnExtentsOnly=false&datumTransformation=&parameterValues=&rangeValues=&f=geojson')
            .pipe(
                map((response: any) => {
                    // Procesa la respuesta para adaptarla al formato de ArcGIS
                    const arcgisData = {
                            geometryType: response.geometryType,
                            spatialReference: response.spatialReference,
                            features: response.features.map((feature: any) => {
                                return {
                                    attributes: feature.properties,
                                    geometry: feature.geometry
                                };
                            })
                    };
                    return arcgisData;
                })
            );
      }
}
