import { Observable } from "rxjs";
import { Layer } from "../model/layer.model";



export interface LayerRepository {
    serviceMidagriGis(ideGroup:string,ideServiceMidagri:string): string;
}