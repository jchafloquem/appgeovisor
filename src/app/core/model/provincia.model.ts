export interface Provincia {
    objectid?: number;
    coddep?: string;
    nombdep?: string;
    codprov?: string;
    nombprov?: string;
}

export interface ProvinciaRpta {
    respuesta   : number;
    mensaje     : string;
    exitoso     : boolean;
    datos       : Provincia[];
    dato        : Provincia;
}