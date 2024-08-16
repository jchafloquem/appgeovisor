import { Observable } from "rxjs";
import { Provincia, ProvinciaRpta } from "../model/provincia.model";



export interface ProvinciaRepository {
    list(): Observable<ProvinciaRpta>;
    urlGis(): string;
    get(id: number): Observable<ProvinciaRpta>;
    add(provincia: Provincia): Observable<ProvinciaRpta>;
    update(provincia: Provincia): Observable<ProvinciaRpta>;
    delete(id: number): Observable<ProvinciaRpta>;
}