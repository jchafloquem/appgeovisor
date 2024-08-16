import { Inject, Injectable } from '@angular/core';
import { Cuenca, CuencaRpta } from '../model/cuenca.model';
import { CuencaRepository } from '../repository/cuenca.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class CuencaService {

    constructor(@Inject('CuencaRepository') private cuencaRepository: CuencaRepository) { }

    list(): Observable<CuencaRpta> {
        return this.cuencaRepository.list();
    }

    urlGis(): string {
        return this.cuencaRepository.urlGis();
    }

    get(id: number): Observable<CuencaRpta> {
        return this.cuencaRepository.get(id);
    }

    add(cuenca: Cuenca): Observable<CuencaRpta> {
        return this.cuencaRepository.add(cuenca);
    }

    update(cuenca: Cuenca): Observable<CuencaRpta> {
        return this.cuencaRepository.update(cuenca);
    }

    delete(id: number): Observable<CuencaRpta> {
        return this.cuencaRepository.delete(id);
    }
}