import { Observable } from "rxjs";
import { Region, RegionRpta } from "../model/region.model";


export interface RegionRepository {
    list(): Observable<RegionRpta>;
    urlGis(): string;
    get(id: number): Observable<RegionRpta>;
    add(region: Region): Observable<RegionRpta>;
    update(region: Region): Observable<RegionRpta>;
    delete(id: number): Observable<RegionRpta>;
}