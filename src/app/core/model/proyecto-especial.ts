export interface ProyectoEspecial {
    OBJECTID?: number;
    SIGLA?: string;
    NOMBRE?: string;
}

export interface ProyectoEspecialRpta {
    respuesta   : number;
    mensaje     : string;
    exitoso     : boolean;
    datos       : ProyectoEspecial[];
    dato        : ProyectoEspecial;
}