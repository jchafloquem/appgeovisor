import { Inject, Injectable } from '@angular/core';
import { Provincia, ProvinciaRpta } from '../model/provincia.model';
import { ProvinciaRepository } from '../repository/provincia.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class ProvinciaService {

    constructor(@Inject('ProvinciaRepository') private provinciaRepository: ProvinciaRepository) { }

    list(): Observable<ProvinciaRpta> {
        return this.provinciaRepository.list();
    }

    urlGis(): string {
        return this.provinciaRepository.urlGis();
    }

    get(id: number): Observable<ProvinciaRpta> {
        return this.provinciaRepository.get(id);
    }

    add(provincia: Provincia): Observable<ProvinciaRpta> {
        return this.provinciaRepository.add(provincia);
    }

    update(provincia: Provincia): Observable<ProvinciaRpta> {
        return this.provinciaRepository.update(provincia);
    }

    delete(id: number): Observable<ProvinciaRpta> {
        return this.provinciaRepository.delete(id);
    }
}