export interface Region {
    objectid?: number;
    coddep?: string;
    nombdep?: string;
}

export interface RegionRpta {
    respuesta   : number;
    mensaje     : string;
    exitoso     : boolean;
    datos       : Region[];
    dato        : Region;
}