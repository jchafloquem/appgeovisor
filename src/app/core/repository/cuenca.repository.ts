import { Observable } from "rxjs";
import { Cuenca, CuencaRpta } from "../model/cuenca.model";



export interface CuencaRepository {
    list(): Observable<CuencaRpta>;
    urlGis(): string;
    get(id: number): Observable<CuencaRpta>;
    add(cuenca: Cuenca): Observable<CuencaRpta>;
    update(cuenca: Cuenca): Observable<CuencaRpta>;
    delete(id: number): Observable<CuencaRpta>;
}