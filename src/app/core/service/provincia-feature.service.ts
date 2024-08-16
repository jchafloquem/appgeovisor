import { Inject, Injectable } from '@angular/core';
import { Provincia, ProvinciaRpta } from '../model/provincia.model';
import { ProvinciaRepository } from '../repository/provincia.repository';
import { Observable } from 'rxjs';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Color from '@arcgis/core/Color';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';

@Injectable({
  providedIn: 'root',
  
})
export class ProvinciaFeatureService {
    private provinciaFeature?: FeatureLayer;

    constructor(@Inject('ProvinciaRepository') private provinciaRepository: ProvinciaRepository) { }

    setProvinciaFeature(){
        this.provinciaFeature = new FeatureLayer({
            url: this.provinciaRepository.urlGis(),
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

    getProvinciaFeature(){
        return this.provinciaFeature;
    }
}