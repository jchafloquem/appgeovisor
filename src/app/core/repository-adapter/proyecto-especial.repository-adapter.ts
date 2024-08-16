import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProyectoEspecialRepository } from '../repository/proyecto-especial.repository';
import { ProyectoEspecial, ProyectoEspecialRpta } from '../model/proyecto-especial';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProyectoEspecialRepositoryAdapter implements ProyectoEspecialRepository {
    private apiUrl = `${environment.urlBackend}/ProyectoEspecial`;

    constructor(private http: HttpClient) {}

    list(): Observable<ProyectoEspecialRpta> {
        return this.http.get<ProyectoEspecialRpta>(this.apiUrl);
    }

    get(id: number): Observable<ProyectoEspecialRpta> {
        return this.http.get<ProyectoEspecialRpta>(`${this.apiUrl}/${id}`);
    }

    add(proyectoEspecial: ProyectoEspecial): Observable<ProyectoEspecialRpta> {
        return this.http.post<ProyectoEspecialRpta>(this.apiUrl, proyectoEspecial);
    }

    update(proyectoEspecial: ProyectoEspecial): Observable<ProyectoEspecialRpta> {
        return this.http.put<ProyectoEspecialRpta>(`${this.apiUrl}/${proyectoEspecial.OBJECTID}`, proyectoEspecial);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<ProyectoEspecialRpta>(`${this.apiUrl}/${id}`);
    }

    urlGis():string {
        return 'https://winlmprap09.midagri.gob.pe/winlmprap14/rest/services/ideMidagri/DGIHR/MapServer/4';
	}
}
