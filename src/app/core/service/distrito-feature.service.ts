import { Inject, Injectable } from '@angular/core';
import { Distrito, DistritoRpta } from '../model/distrito.model';
import { DistritoRepository } from '../repository/distrito.repository';
import { Observable } from 'rxjs';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Color from '@arcgis/core/Color';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';

@Injectable({
  providedIn: 'root',
  
})
export class DistritoFeatureService {
    private distritoFeature?: FeatureLayer;

    constructor(@Inject('DistritoRepository') private distritoRepository: DistritoRepository) { }

    setDistritoFeature(){
        this.distritoFeature = new FeatureLayer({
            url: this.distritoRepository.urlGis(),
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

    getDistritoFeature(){
        return this.distritoFeature;
    }
}