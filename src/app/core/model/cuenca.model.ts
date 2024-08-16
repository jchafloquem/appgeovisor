export interface Cuenca {
    OBJECTID?: number;
    CODIGO?: string;
    NOMBRE?: string;
}

export interface CuencaRpta {
    respuesta   : number;
    mensaje     : string;
    exitoso     : boolean;
    datos       : Cuenca[];
    dato        : Cuenca;
}