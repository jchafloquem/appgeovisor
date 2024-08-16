import { Observable } from "rxjs";
import { ProyectoEspecial, ProyectoEspecialRpta } from "../model/proyecto-especial";



export interface ProyectoEspecialRepository {
    list(): Observable<ProyectoEspecialRpta>;
    urlGis(): string;
    get(id: number): Observable<ProyectoEspecialRpta>;
    add(proyectoEspecial: ProyectoEspecial): Observable<ProyectoEspecialRpta>;
    update(proyectoEspecial: ProyectoEspecial): Observable<ProyectoEspecialRpta>;
    delete(id: number): Observable<ProyectoEspecialRpta>;
}