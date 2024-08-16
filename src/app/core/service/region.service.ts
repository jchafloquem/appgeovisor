import { Inject, Injectable } from '@angular/core';
import { Region, RegionRpta } from '../model/region.model';
import { RegionRepository } from '../repository/region.repository';
import { Observable } from 'rxjs';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Color from '@arcgis/core/Color';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';

@Injectable({
  providedIn: 'root',
  
})
export class RegionService {

    constructor(@Inject('RegionRepository') private regionRepository: RegionRepository) { }

    list(): Observable<RegionRpta> {
        return this.regionRepository.list();
    }

    urlGis(): string {
        return this.regionRepository.urlGis();
    }

    get(id: number): Observable<RegionRpta> {
        return this.regionRepository.get(id);
    }

    add(region: Region): Observable<RegionRpta> {
        return this.regionRepository.add(region);
    }

    update(region: Region): Observable<RegionRpta> {
        return this.regionRepository.update(region);
    }

    delete(id: number): Observable<RegionRpta> {
        return this.regionRepository.delete(id);
    }
}