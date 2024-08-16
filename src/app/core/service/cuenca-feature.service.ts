import { Inject, Injectable } from '@angular/core';
import { Cuenca, CuencaRpta } from '../model/cuenca.model';
import { CuencaRepository } from '../repository/cuenca.repository';
import { Observable } from 'rxjs';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Color from '@arcgis/core/Color';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';

@Injectable({
  providedIn: 'root',
  
})
export class CuencaFeatureService {
    private cuencaFeature?: FeatureLayer;

    constructor(@Inject('CuencaRepository') private cuencaRepository: CuencaRepository) { }

    setCuencaFeature(){
        this.cuencaFeature = new FeatureLayer({
            url: this.cuencaRepository.urlGis(),
            renderer: new SimpleRenderer({
                symbol: new SimpleFillSymbol({
                    color: new Color([255, 165, 0, 0.1]),
                    outline: new SimpleLineSymbol({
                        width: 2,
                        color: new Color([255, 165, 0])
                    })
                })
            })
        });
    }

    getCuencaFeature(){
        return this.cuencaFeature;
    }
}