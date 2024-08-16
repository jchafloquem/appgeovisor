import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProvinciaRepository } from '../repository/provincia.repository';
import { Provincia, ProvinciaRpta } from '../model/provincia.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProvinciaRepositoryAdapter implements ProvinciaRepository {
    private apiUrl = `${environment.urlBackend}/provincia`;

    constructor(private http: HttpClient) {}

    list(): Observable<ProvinciaRpta> {
        return this.http.get<ProvinciaRpta>(this.apiUrl);
    }

    get(id: number): Observable<ProvinciaRpta> {
        return this.http.get<ProvinciaRpta>(`${this.apiUrl}/${id}`);
    }

    add(provincia: Provincia): Observable<ProvinciaRpta> {
        return this.http.post<ProvinciaRpta>(this.apiUrl, provincia);
    }

    update(provincia: Provincia): Observable<ProvinciaRpta> {
        return this.http.put<ProvinciaRpta>(`${this.apiUrl}/${provincia.objectid}`, provincia);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<ProvinciaRpta>(`${this.apiUrl}/${id}`);
    }

    urlGis():string {
        return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/Limites_Censales/MapServer/1';
	}
}
