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
export class RegionFeatureService {
    private regionFeature?: FeatureLayer;

    constructor(@Inject('RegionRepository') private regionRepository: RegionRepository) { }

    setRegionFeature(){
        this.regionFeature = new FeatureLayer({
            url: this.regionRepository.urlGis(),
            visible:false
        });
    }

    getRegionFeature(){
        return this.regionFeature;
    }
}