import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CuencaRepository } from '../repository/cuenca.repository';
import { Cuenca, CuencaRpta } from '../model/cuenca.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CuencaRepositoryAdapter implements CuencaRepository {
    private apiUrl = `${environment.urlBackend}/cuenca`;

    constructor(private http: HttpClient) {}

    list(): Observable<CuencaRpta> {
        return this.http.get<CuencaRpta>(this.apiUrl);
    }

    get(id: number): Observable<CuencaRpta> {
        return this.http.get<CuencaRpta>(`${this.apiUrl}/${id}`);
    }

    add(cuenca: Cuenca): Observable<CuencaRpta> {
        return this.http.post<CuencaRpta>(this.apiUrl, cuenca);
    }

    update(cuenca: Cuenca): Observable<CuencaRpta> {
        return this.http.put<CuencaRpta>(`${this.apiUrl}/${cuenca.OBJECTID}`, cuenca);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<CuencaRpta>(`${this.apiUrl}/${id}`);
    }

    urlGis():string {
        return 'https://geosnirh.ana.gob.pe/server/rest/services/ws_UnidadesHidro/MapServer/1';
	}
}
