import { Inject, Injectable } from '@angular/core';
import { ProyectoEspecial, ProyectoEspecialRpta } from '../model/proyecto-especial';
import { ProyectoEspecialRepository } from '../repository/proyecto-especial.repository';
import { Observable } from 'rxjs';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import Color from '@arcgis/core/Color';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';

@Injectable({
  providedIn: 'root',
  
})
export class ProyectoEspecialFeatureService {
    private proyectoEspecialFeature?: FeatureLayer;

    constructor(@Inject('ProyectoEspecialRepository') private proyectoEspecialRepository: ProyectoEspecialRepository) { }

    setProyectoEspecialFeature(){
        this.proyectoEspecialFeature = new FeatureLayer({
            url: this.proyectoEspecialRepository.urlGis(),
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

    getProyectoEspecialFeature(){
        return this.proyectoEspecialFeature;
    }
}