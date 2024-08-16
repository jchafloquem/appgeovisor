export interface Distrito {
    objectid?: number;
    coddep?: string;
    nombdep?: string;
    codprov?: string;
    nombprov?: string;
    coddist?: string;
    nombdist?: string;
}

export interface DistritoRpta {
    respuesta   : number;
    mensaje     : string;
    exitoso     : boolean;
    datos       : Distrito[];
    dato        : Distrito;
}