import { Inject, Injectable } from '@angular/core';
import { ProyectoEspecial, ProyectoEspecialRpta } from '../model/proyecto-especial';
import { ProyectoEspecialRepository } from '../repository/proyecto-especial.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class ProyectoEspecialService {

    constructor(@Inject('ProyectoEspecialRepository') private proyectoEspecialRepository: ProyectoEspecialRepository) { }

    list(): Observable<ProyectoEspecialRpta> {
        return this.proyectoEspecialRepository.list();
    }

    urlGis(): string {
        return this.proyectoEspecialRepository.urlGis();
    }

    get(id: number): Observable<ProyectoEspecialRpta> {
        return this.proyectoEspecialRepository.get(id);
    }

    add(proyectoEspecial: ProyectoEspecial): Observable<ProyectoEspecialRpta> {
        return this.proyectoEspecialRepository.add(proyectoEspecial);
    }

    update(proyectoEspecial: ProyectoEspecial): Observable<ProyectoEspecialRpta> {
        return this.proyectoEspecialRepository.update(proyectoEspecial);
    }

    delete(id: number): Observable<ProyectoEspecialRpta> {
        return this.proyectoEspecialRepository.delete(id);
    }
}