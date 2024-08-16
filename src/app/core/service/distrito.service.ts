import { Inject, Injectable } from '@angular/core';
import { Distrito, DistritoRpta } from '../model/distrito.model';
import { DistritoRepository } from '../repository/distrito.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class DistritoService {

    constructor(@Inject('DistritoRepository') private distritoRepository: DistritoRepository) { }

    list(): Observable<DistritoRpta> {
        return this.distritoRepository.list();
    }

    urlGis(): string {
        return this.distritoRepository.urlGis();
    }

    get(id: number): Observable<DistritoRpta> {
        return this.distritoRepository.get(id);
    }

    add(distrito: Distrito): Observable<DistritoRpta> {
        return this.distritoRepository.add(distrito);
    }

    update(distrito: Distrito): Observable<DistritoRpta> {
        return this.distritoRepository.update(distrito);
    }

    delete(id: number): Observable<DistritoRpta> {
        return this.distritoRepository.delete(id);
    }
}