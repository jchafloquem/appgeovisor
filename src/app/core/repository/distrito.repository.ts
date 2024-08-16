import { Observable } from "rxjs";
import { Distrito, DistritoRpta } from "../model/distrito.model";



export interface DistritoRepository {
    list(): Observable<DistritoRpta>;
    urlGis(): string;
    get(id: number): Observable<DistritoRpta>;
    add(distrito: Distrito): Observable<DistritoRpta>;
    update(distrito: Distrito): Observable<DistritoRpta>;
    delete(id: number): Observable<DistritoRpta>;
}