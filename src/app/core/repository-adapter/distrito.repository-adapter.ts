import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DistritoRepository } from '../repository/distrito.repository';
import { Distrito, DistritoRpta } from '../model/distrito.model';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DistritoRepositoryAdapter implements DistritoRepository {
    private apiUrl = `${environment.urlBackend}/distrito`;

    constructor(private http: HttpClient) {}

    list(): Observable<DistritoRpta> {
        return this.http.get<DistritoRpta>(this.apiUrl);
    }

    get(id: number): Observable<DistritoRpta> {
        return this.http.get<DistritoRpta>(`${this.apiUrl}/${id}`);
    }

    add(distrito: Distrito): Observable<DistritoRpta> {
        return this.http.post<DistritoRpta>(this.apiUrl, distrito);
    }

    update(distrito: Distrito): Observable<DistritoRpta> {
        return this.http.put<DistritoRpta>(`${this.apiUrl}/${distrito.objectid}`, distrito);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<DistritoRpta>(`${this.apiUrl}/${id}`);
    }

    urlGis():string {
        return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/Limites_Censales/MapServer/2';
	}
}
