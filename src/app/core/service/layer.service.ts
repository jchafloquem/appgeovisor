import { Inject, Injectable } from '@angular/core';
import { Layer } from '../model/layer.model';
import { LayerRepository } from '../repository/layer.repository';
import { Observable } from 'rxjs';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import WebMap from '@arcgis/core/WebMap';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import PopupTemplate from '@arcgis/core/PopupTemplate';

@Injectable({
  providedIn: 'root',
  
})
export class LayerService {

    constructor(@Inject('LayerRepository') private layerRepository: LayerRepository) { }


    serviceMidagriGis(ideGroup:string,ideServiceMidagri:string): string {
        return this.layerRepository.serviceMidagriGis(ideGroup,ideServiceMidagri);
    }

	getPopupTemplate(ideGroup:string,ideServiceMidagri:string) {
		let fieldInfos:any = [];
		let title:string =`${ideGroup}-${ideServiceMidagri}` ;
		if(ideGroup=='AGROIDEAS' && ideServiceMidagri=='Reconversión productiva'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'SOCIO', label: 'SOCIO' },
				{ fieldName: 'DEP', label: 'DEP' },
				{ fieldName: 'PROV', label: 'PROV' },
				{ fieldName: 'DISTRITO', label: 'DISTRITO' },
				{ fieldName: 'FECHA_RM', label: 'FECHA_RM' },
				{ fieldName: 'CULTIVO_RE', label: 'CULTIVO_RE' },
				{ fieldName: 'CULTIVO_IN', label: 'CULTIVO_IN' },
				{ fieldName: 'AREA_RECON', label: 'AREA_RECON' },
				{ fieldName: 'AREA_OA', label: 'AREA_OA' },
				{ fieldName: 'ESTE_X', label: 'ESTE_X' },
				{ fieldName: 'NORTE_Y', label: 'NORTE_Y' },
				{ fieldName: 'OA', label: 'OA' },
				{ fieldName: 'RM', label: 'RM' },
				{ fieldName: 'REEMPLAZO', label: 'REEMPLAZO' },
				{ fieldName: 'EXPEDIENTE', label: 'EXPEDIENTE' },
				{ fieldName: 'PRP', label: 'PRP' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
				{ fieldName: 'SHAPE.AREA', label: 'SHAPE.AREA' },
				{ fieldName: 'SHAPE.LEN', label: 'SHAPE.LEN' },
			];
		}else if(ideGroup=='AGRORURAL' && ideServiceMidagri=='Intervenciones Agrorural'){
			fieldInfos = [
				{ filedName: 'OBJECTID', label: 'OBJECTID' },
				{ filedName: 'TIPOINTERV', label: 'TIPOINTERV' },
				{ filedName: 'NOMBDEP', label: 'NOMBDEP' },
				{ filedName: 'NOMBPRO', label: 'NOMBPRO' },
				{ filedName: 'NOMBDIS', label: 'NOMBDIS' },
				{ filedName: 'LATITUD', label: 'LATITUD' },
				{ filedName: 'LONGITUD', label: 'LONGITUD' },
				{ filedName: 'CANTKIT', label: 'CANTKIT' },
				{ filedName: 'COSTOUNIT', label: 'COSTOUNIT' },
				{ filedName: 'SUBTOTAL', label: 'SUBTOTAL' },
				{ filedName: 'BENEF', label: 'BENEF' },
				{ filedName: 'FECINICIO', label: 'FECINICIO' },
				{ filedName: 'FECFIN', label: 'FECFIN' },
				{ filedName: 'EJECUTOR', label: 'EJECUTOR' },
				{ filedName: 'ESTADO', label: 'ESTADO' },
				{ filedName: 'TIPO', label: 'TIPO' },
				{ filedName: 'AVANCE', label: 'AVANCE' },
				{ filedName: 'FOTO', label: 'FOTO' },
				{ filedName: 'SHAPE', label: 'SHAPE' },
			];
		}else if(ideGroup=='AGRORURAL' && ideServiceMidagri=='Kits'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' }, 
				{ fieldName: 'TIPOINTERV', label: 'TIPOINTERV' }, 
				{ fieldName: 'NOMBDEP', label: 'NOMBDEP' }, 
				{ fieldName: 'NOMBPRO', label: 'NOMBPRO' }, 
				{ fieldName: 'NOMBDIS', label: 'NOMBDIS' }, 
				{ fieldName: 'LATITUD', label: 'LATITUD' }, 
				{ fieldName: 'LONGITUD', label: 'LONGITUD' }, 
				{ fieldName: 'CANTKIT', label: 'CANTKIT' }, 
				{ fieldName: 'COSTOUNIT', label: 'COSTOUNIT' }, 
				{ fieldName: 'SUBTOTAL', label: 'SUBTOTAL' }, 
				{ fieldName: 'BENEF', label: 'BENEF' }, 
				{ fieldName: 'FECINICIO', label: 'FECINICIO' }, 
				{ fieldName: 'FECFIN', label: 'FECFIN' }, 
				{ fieldName: 'EJECUTOR', label: 'EJECUTOR' }, 
				{ fieldName: 'ESTADO', label: 'ESTADO' }, 
				{ fieldName: 'TIPO', label: 'TIPO' }, 
				{ fieldName: 'AVANCE', label: 'AVANCE' }, 
				{ fieldName: 'FOTO', label: 'FOTO' }, 
				{ fieldName: 'SHAPE', label: 'SHAPE' }, 
			];
		}else if(ideGroup=='AGRORURAL' && ideServiceMidagri=='Almacenes'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' }, 
				{ fieldName: 'ITEM', label: 'ITEM' }, 
				{ fieldName: 'NOMBDEP', label: 'NOMBDEP' }, 
				{ fieldName: 'NOMBPROV', label: 'NOMBPROV' }, 
				{ fieldName: 'NOMBDIS', label: 'NOMBDIS' }, 
				{ fieldName: 'VACUNO', label: 'VACUNO' }, 
				{ fieldName: 'OVINO', label: 'OVINO' }, 
				{ fieldName: 'ALPACA', label: 'ALPACA' }, 
				{ fieldName: 'LLAMA', label: 'LLAMA' }, 
				{ fieldName: 'TOTAL', label: 'TOTAL' }, 
				{ fieldName: 'HENOKG', label: 'HENOKG' }, 
				{ fieldName: 'HENOKG2', label: 'HENOKG2' }, 
				{ fieldName: 'DIRECCION', label: 'DIRECCION' }, 
				{ fieldName: 'EXPERIENCIA', label: 'EXPERIENCIA' }, 
				{ fieldName: 'UNIT', label: 'UNIT' }, 
				{ fieldName: 'MAXIMO', label: 'MAXIMO' }, 
				{ fieldName: 'FECADJ', label: 'FECADJ' }, 
				{ fieldName: 'PROVEEDOR', label: 'PROVEEDOR' }, 
				{ fieldName: 'MONADJ', label: 'MONADJ' }, 
				{ fieldName: 'PLAZO', label: 'PLAZO' }, 
				{ fieldName: 'FECMXPLAZO', label: 'FECMXPLAZO' }, 
				{ fieldName: 'FECENTREGA', label: 'FECENTREGA' }, 
				{ fieldName: 'GGRR', label: 'GGRR' }, 
				{ fieldName: 'CANT', label: 'CANT' }, 
				{ fieldName: 'FECENCONF', label: 'FECENCONF' }, 
				{ fieldName: 'OBS', label: 'OBS' }, 
				{ fieldName: 'ZONA', label: 'ZONA' }, 
				{ fieldName: 'ESTE', label: 'ESTE' }, 
				{ fieldName: 'OESTE', label: 'OESTE' }, 
				{ fieldName: 'LATITUD', label: 'LATITUD' }, 
				{ fieldName: 'LONGITUD', label: 'LONGITUD' }, 
				{ fieldName: 'SHAPE', label: 'SHAPE' }, 
			];
		}else if(ideGroup=='AGRORURAL' && ideServiceMidagri=='Fitotoldos'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'TIPOINTERV', label: 'TIPOINTERV' },
				{ fieldName: 'NOMBDEP', label: 'NOMBDEP' },
				{ fieldName: 'NOMBPRO', label: 'NOMBPRO' },
				{ fieldName: 'NOMBDIS', label: 'NOMBDIS' },
				{ fieldName: 'LATITUD', label: 'LATITUD' },
				{ fieldName: 'LONGITUD', label: 'LONGITUD' },
				{ fieldName: 'CANTKIT', label: 'CANTKIT' },
				{ fieldName: 'COSTOUNIT', label: 'COSTOUNIT' },
				{ fieldName: 'SUBTOTAL', label: 'SUBTOTAL' },
				{ fieldName: 'BENEF', label: 'BENEF' },
				{ fieldName: 'FECINICIO', label: 'FECINICIO' },
				{ fieldName: 'FECFIN', label: 'FECFIN' },
				{ fieldName: 'EJECUTOR', label: 'EJECUTOR' },
				{ fieldName: 'ESTADO', label: 'ESTADO' },
				{ fieldName: 'TIPO', label: 'TIPO' },
				{ fieldName: 'AVANCE', label: 'AVANCE' },
				{ fieldName: 'FOTO', label: 'FOTO' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
			];
		}else if(ideGroup=='ANA' && ideServiceMidagri=='Maquinarias'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'PLACA', label: 'PLACA' },
				{ fieldName: 'TIPO', label: 'TIPO' },
				{ fieldName: 'CLASE', label: 'CLASE' },
				{ fieldName: 'LATITUD', label: 'LATITUD' },
				{ fieldName: 'LONGITUD', label: 'LONGITUD' },
				{ fieldName: 'ACTIVIDAD', label: 'ACTIVIDAD' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
			];
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='Agrostología SD'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'SIMAGROS', label: 'SIMAGROS' },
				{ fieldName: 'TIPOPAST', label: 'TIPOPAST' },
				{ fieldName: 'ASOAGROS', label: 'ASOAGROS' },
				{ fieldName: 'DESAGROS', label: 'DESAGROS' },
				{ fieldName: 'FUENTE', label: 'FUENTE' },
				{ fieldName: 'ESTREG', label: 'ESTREG' },
				{ fieldName: 'FECREG', label: 'FECREG' },
				{ fieldName: 'OBSERV', label: 'OBSERV' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
				{ fieldName: 'SHAPE.AREA', label: 'SHAPE.AREA' },
				{ fieldName: 'SHAPE.LEN', label: 'SHAPE.LEN' },
			];
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUM D_10000'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'GRUPOCUM', label: 'GRUPOCUM' },
				{ fieldName: 'SIMCUM', label: 'SIMCUM' },
				{ fieldName: 'DESCUM', label: 'DESCUM' },
				{ fieldName: 'PROPOR', label: 'PROPOR' },
				{ fieldName: 'FUENTE', label: 'FUENTE' },
				{ fieldName: 'ESTREG', label: 'ESTREG' },
				{ fieldName: 'DOCAPR', label: 'DOCAPR' },
				{ fieldName: 'FECREG', label: 'FECREG' },
				{ fieldName: 'RCTCUM', label: 'RCTCUM' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
				{ fieldName: 'SHAPE.AREA', label: 'SHAPE.AREA' },
				{ fieldName: 'SHAPE.LEN', label: 'SHAPE.LEN' },
			];
		}else if(ideGroup=='DGAAA' && ideServiceMidagri=='CTCUMR_20000'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'GRUPOCUM', label: 'GRUPOCUM' },
				{ fieldName: 'SIMCUM', label: 'SIMCUM' },
				{ fieldName: 'DESCUM', label: 'DESCUM' },
				{ fieldName: 'PROPOR', label: 'PROPOR' },
				{ fieldName: 'FUENTE', label: 'FUENTE' },
				{ fieldName: 'ESTREG', label: 'ESTREG' },
				{ fieldName: 'DOCAPR', label: 'DOCAPR' },
				{ fieldName: 'FECREG', label: 'FECREG' },
				{ fieldName: 'RCTCUM', label: 'RCTCUM' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
				{ fieldName: 'SHAPE.AREA', label: 'SHAPE.AREA' },
				{ fieldName: 'SHAPE.LEN', label: 'SHAPE.LEN' },
			];
		}else if(ideGroup=='DGDG' && ideServiceMidagri=='Asistencia técnica'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'OID', label: 'OID' },
				{ fieldName: 'UBIGEO', label: 'UBIGEO' },
				{ fieldName: 'REGION', label: 'REGION' },
				{ fieldName: 'PROVINCIA', label: 'PROVINCIA' },
				{ fieldName: 'DISTRITO', label: 'DISTRITO' },
				{ fieldName: 'TIPO', label: 'TIPO' },
				{ fieldName: 'TEMA', label: 'TEMA' },
				{ fieldName: 'NOMBRE', label: 'NOMBRE' },
				{ fieldName: 'FECHA', label: 'FECHA' },
				{ fieldName: 'NUM_HORAS', label: 'NUM_HORAS' },
				{ fieldName: 'CANT_PART', label: 'CANT_PART' },
				{ fieldName: 'EXTENSIONISTA', label: 'EXTENSIONISTA' },
				{ fieldName: 'LATITUD', label: 'LATITUD' },
				{ fieldName: 'LONGITUD', label: 'LONGITUD' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
			];
		}else if(ideGroup=='DGDG' && ideServiceMidagri=='Capacitaciones'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'UIF', label: 'UIF' },
				{ fieldName: 'UBIGEO', label: 'UBIGEO' },
				{ fieldName: 'REGION', label: 'REGION' },
				{ fieldName: 'PROVINCIA', label: 'PROVINCIA' },
				{ fieldName: 'DISTRITO', label: 'DISTRITO' },
				{ fieldName: 'TIPO', label: 'TIPO' },
				{ fieldName: 'TEMA', label: 'TEMA' },
				{ fieldName: 'NOMBRE', label: 'NOMBRE' },
				{ fieldName: 'FECHA', label: 'FECHA' },
				{ fieldName: 'NUM_HORAS', label: 'NUM_HORAS' },
				{ fieldName: 'CANT_PART', label: 'CANT_PART' },
				{ fieldName: 'EXTENSIONISTA', label: 'EXTENSIONISTA' },
				{ fieldName: 'LATITUD', label: 'LATITUD' },
				{ fieldName: 'LONGITUD', label: 'LONGITUD' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
			];
		}else if(ideGroup=='DGDG' && ideServiceMidagri=='Pastos cultivados'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'UIF', label: 'UIF' },
				{ fieldName: 'UBIGEO', label: 'UBIGEO' },
				{ fieldName: 'DEPARTAMENTO', label: 'DEPARTAMENTO' },
				{ fieldName: 'PROVINCIA', label: 'PROVINCIA' },
				{ fieldName: 'DISTRITO', label: 'DISTRITO' },
				{ fieldName: 'NUM_IDE', label: 'NUM_IDE' },
				{ fieldName: 'NUM_IDEPRODUCTOR', label: 'NUM_IDEPRODUCTOR' },
				{ fieldName: 'FEC_NAC_PROD', label: 'FEC_NAC_PROD' },
				{ fieldName: 'SUM_HEC_IDENTIFICADAS', label: 'SUM_HEC_IDENTIFICADAS' },
				{ fieldName: 'SUM_HEC_EN_PROCESO', label: 'SUM_HEC_EN_PROCESO' },
				{ fieldName: 'SUM_HEC_PARA_SIEMBRA', label: 'SUM_HEC_PARA_SIEMBRA' },
				{ fieldName: 'SUM_HEC_SEMBRADAS', label: 'SUM_HEC_SEMBRADAS' },
				{ fieldName: 'SUM_SEMILLA', label: 'SUM_SEMILLA' },
				{ fieldName: 'LATITUD', label: 'LATITUD' },
				{ fieldName: 'LONGITUD', label: 'LONGITUD' },
				{ fieldName: 'ESTADO', label: 'ESTADO' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
			];
		}else if(ideGroup=='DGDG' && ideServiceMidagri=='Cobertizos'){
			fieldInfos = [
				{ fieldName: 'UIF', label: 'UIF' },
				{ fieldName: 'TXT_CENTRO_POBLADO', label: 'TXT_CENTRO_POBLADO' },
				{ fieldName: 'TXT_CUENCA', label: 'TXT_CUENCA' },
				{ fieldName: 'TXT_MICRO_CUENCA', label: 'TXT_MICRO_CUENCA' },
				{ fieldName: 'FEC_AÑO_FISCAL', label: 'FEC_AÑO_FISCAL' },
				{ fieldName: 'NUM_MONTO', label: 'NUM_MONTO' },
				{ fieldName: 'NUM_LATITUD', label: 'NUM_LATITUD' },
				{ fieldName: 'NUM_LONGITUD', label: 'NUM_LONGITUD' },
				{ fieldName: 'NUM_SUMOVHEMBRAS', label: 'NUM_SUMOVHEMBRAS' },
				{ fieldName: 'NUM_SUMOVMACHOS', label: 'NUM_SUMOVMACHOS' },
				{ fieldName: 'NUM_SUMOVTOTAL', label: 'NUM_SUMOVTOTAL' },
				{ fieldName: 'NUM_SUMOVMUERTOS', label: 'NUM_SUMOVMUERTOS' },
				{ fieldName: 'NUM_SUMALPHEMBRAS', label: 'NUM_SUMALPHEMBRAS' },
				{ fieldName: 'NUM_SUMALPMACHOS', label: 'NUM_SUMALPMACHOS' },
				{ fieldName: 'NUM_SUMALPTOTAL', label: 'NUM_SUMALPTOTAL' },
				{ fieldName: 'NUM_SUMALPMUERTOS', label: 'NUM_SUMALPMUERTOS' },
				{ fieldName: 'ESRI_OID', label: 'ESRI_OID' },
			];
		}else if(ideGroup=='DGIHR' && ideServiceMidagri=='AMIR'){
			fieldInfos = [
				{ fieldName: 'SISGEOMIDAGRI.AMIRGEO.OBJECTID', label: 'SISGEOMIDAGRI.AMIRGEO.OBJECTID' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRGEO.SHAPE', label: 'SISGEOMIDAGRI.AMIRGEO.SHAPE' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.OBJECTID', label: 'SISGEOMIDAGRI.AMIRDATA.OBJECTID' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.LIST', label: 'SISGEOMIDAGRI.AMIRDATA.LIST' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.NOMBDEP', label: 'SISGEOMIDAGRI.AMIRDATA.NOMBDEP' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.NOMBPRO', label: 'SISGEOMIDAGRI.AMIRDATA.NOMBPRO' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.NOMBDIS', label: 'SISGEOMIDAGRI.AMIRDATA.NOMBDIS' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.ALA', label: 'SISGEOMIDAGRI.AMIRDATA.ALA' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.COD_AMIR', label: 'SISGEOMIDAGRI.AMIRDATA.COD_AMIR' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.COD_AMR_OK', label: 'SISGEOMIDAGRI.AMIRDATA.COD_AMR_OK' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.NOMBRE', label: 'SISGEOMIDAGRI.AMIRDATA.NOMBRE' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.TIP_INF', label: 'SISGEOMIDAGRI.AMIRDATA.TIP_INF' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.USUARIOS', label: 'SISGEOMIDAGRI.AMIRDATA.USUARIOS' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.FAMILIAS', label: 'SISGEOMIDAGRI.AMIRDATA.FAMILIAS' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.AREA_BAJO', label: 'SISGEOMIDAGRI.AMIRDATA.AREA_BAJO' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.CANAL_META', label: 'SISGEOMIDAGRI.AMIRDATA.CANAL_META' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.DREN_META', label: 'SISGEOMIDAGRI.AMIRDATA.DREN_META' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.RESERVORIO', label: 'SISGEOMIDAGRI.AMIRDATA.RESERVORIO' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.PRESUPUEST', label: 'SISGEOMIDAGRI.AMIRDATA.PRESUPUEST' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.CUT_NE', label: 'SISGEOMIDAGRI.AMIRDATA.CUT_NE' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.NOMBRE_DEL', label: 'SISGEOMIDAGRI.AMIRDATA.NOMBRE_DEL' },
				{ fieldName: 'SISGEOMIDAGRI.AMIRDATA.CODD', label: 'SISGEOMIDAGRI.AMIRDATA.CODD' },
			];
		}else if(ideGroup=='DGIHR' && ideServiceMidagri=='Estudios obras'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'IDEM', label: 'IDEM' },
				{ fieldName: 'ZONA_UTM', label: 'ZONA_UTM' },
				{ fieldName: 'REFERENCIA', label: 'REFERENCIA' },
				{ fieldName: 'LATITUD', label: 'LATITUD' },
				{ fieldName: 'LONGITUD', label: 'LONGITUD' },
				{ fieldName: 'UBIGEO', label: 'UBIGEO' },
				{ fieldName: 'ESTE', label: 'ESTE' },
				{ fieldName: 'NORTE', label: 'NORTE' },
				{ fieldName: 'IDEM_GIS', label: 'IDEM_GIS' },
				{ fieldName: 'SNIP', label: 'SNIP' },
				{ fieldName: 'CUI', label: 'CUI' },
				{ fieldName: 'NOM_PROYEC', label: 'NOM_PROYEC' },
				{ fieldName: 'DPTO', label: 'DPTO' },
				{ fieldName: 'PROV', label: 'PROV' },
				{ fieldName: 'DISTRITO', label: 'DISTRITO' },
				{ fieldName: 'LOCALIDAD', label: 'LOCALIDAD' },
				{ fieldName: 'AMB_VRAE', label: 'AMB_VRAE' },
				{ fieldName: 'OB_FINANCI', label: 'OB_FINANCI' },
				{ fieldName: 'UE', label: 'UE' },
				{ fieldName: 'PERT_CONVE', label: 'PERT_CONVE' },
				{ fieldName: 'ACTA_APROB', label: 'ACTA_APROB' },
				{ fieldName: 'FE_APROBAC', label: 'FE_APROBAC' },
				{ fieldName: 'MONTO_APRO', label: 'MONTO_APRO' },
				{ fieldName: 'FAM_BENEFI', label: 'FAM_BENEFI' },
				{ fieldName: 'AREAS_IRRI', label: 'AREAS_IRRI' },
				{ fieldName: 'ESTADO_ACT', label: 'ESTADO_ACT' },
				{ fieldName: 'SUB_ESTAD', label: 'SUB_ESTAD' },
				{ fieldName: 'AÑO_APROB', label: 'AÑO_APROB' },
				{ fieldName: 'FUENTE_FIN', label: 'FUENTE_FIN' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
			];
		}else if(ideGroup=='DGIHR' && ideServiceMidagri=='Proyectos emblemáticos'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'ITEM', label: 'ITEM' },
				{ fieldName: 'SNIP', label: 'SNIP' },
				{ fieldName: 'TIPO_PROYE', label: 'TIPO_PROYE' },
				{ fieldName: 'PROYECTO', label: 'PROYECTO' },
				{ fieldName: 'DPTO_', label: 'DPTO_' },
				{ fieldName: 'PROVINCIA', label: 'PROVINCIA' },
				{ fieldName: 'DISTRITO', label: 'DISTRITO' },
				{ fieldName: 'SITUACION_', label: 'SITUACION_' },
				{ fieldName: 'PREINVERSI', label: 'PREINVERSI' },
				{ fieldName: 'FAM_BENEF', label: 'FAM_BENEF' },
				{ fieldName: 'AREA_BENEF', label: 'AREA_BENEF' },
				{ fieldName: 'COSTO_HA__', label: 'COSTO_HA__' },
				{ fieldName: 'M3', label: 'M3' },
				{ fieldName: 'ML', label: 'ML' },
				{ fieldName: 'NIVEL_POBR', label: 'NIVEL_POBR' },
				{ fieldName: 'RANGO', label: 'RANGO' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
			];
		}else if(ideGroup=='DGIHR' && ideServiceMidagri=='Áreas bajo riego tecnificado'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'PROP_EMP', label: 'PROP_EMP' },
				{ fieldName: 'TIPO_RIEGO', label: 'TIPO_RIEGO' },
				{ fieldName: 'SUB_SECTOR', label: 'SUB_SECTOR' },
				{ fieldName: 'OH', label: 'OH' },
				{ fieldName: 'AREA_HA', label: 'AREA_HA' },
				{ fieldName: 'NOMBDEP', label: 'NOMBDEP' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
				{ fieldName: 'SHAPE.AREA', label: 'SHAPE.AREA' },
				{ fieldName: 'SHAPE.LEN', label: 'SHAPE.LEN' },
			];
		}else if(ideGroup=='DGIHR' && ideServiceMidagri=='Proyecto especiales'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'SIGLA', label: 'SIGLA' },
				{ fieldName: 'AREA_HA', label: 'AREA_HA' },
				{ fieldName: 'NOMBRE', label: 'NOMBRE' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
				{ fieldName: 'SHAPE.AREA', label: 'SHAPE.AREA' },
				{ fieldName: 'SHAPE.LEN', label: 'SHAPE.LEN' },
			];
		}else if(ideGroup=='Limites_Censales' && ideServiceMidagri=='Departamentos'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'CODDEP', label: 'CODDEP' },
				{ fieldName: 'NOMBDEP', label: 'NOMBDEP' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
				{ fieldName: 'SHAPE.AREA', label: 'SHAPE.AREA' },
				{ fieldName: 'SHAPE.LEN', label: 'SHAPE.LEN' },
			];
		}else if(ideGroup=='Limites_Censales' && ideServiceMidagri=='Provincias'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'CODDEP', label: 'CODDEP' },
				{ fieldName: 'NOMBDEP', label: 'NOMBDEP' },
				{ fieldName: 'CODPROV', label: 'CODPROV' },
				{ fieldName: 'NOMBPROV', label: 'NOMBPROV' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
				{ fieldName: 'SHAPE.AREA', label: 'SHAPE.AREA' },
				{ fieldName: 'SHAPE.LEN', label: 'SHAPE.LEN' },
			];
		}else if(ideGroup=='Limites_Censales' && ideServiceMidagri=='Distritos'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID' },
				{ fieldName: 'OBJECTID_1', label: 'OBJECTID_1' },
				{ fieldName: 'UBIGEO', label: 'UBIGEO' },
				{ fieldName: 'CODDEP', label: 'CODDEP' },
				{ fieldName: 'NOMBDEP', label: 'NOMBDEP' },
				{ fieldName: 'CODPROV', label: 'CODPROV' },
				{ fieldName: 'NOMBPROV', label: 'NOMBPROV' },
				{ fieldName: 'CODDIST', label: 'CODDIST' },
				{ fieldName: 'NOMBDIST', label: 'NOMBDIST' },
				{ fieldName: 'CAPITAL', label: 'CAPITAL' },
				{ fieldName: 'SHAPE', label: 'SHAPE' },
				{ fieldName: 'SHAPE.AREA', label: 'SHAPE.AREA' },
				{ fieldName: 'SHAPE.LEN', label: 'SHAPE.LEN' },
			];
		}else if(ideGroup=='ODNGRD' && ideServiceMidagri=='Elementos_Expuestos'){
			fieldInfos = [
				{ fieldName: 'OBJECTID_1', label: 'OBJECTID_1'},
				{ fieldName: 'NOMBDPTO', label: 'NOMBDPTO'},
				{ fieldName: 'NOMBPROV', label: 'NOMBPROV'},
				{ fieldName: 'NOMBDIST', label: 'NOMBDIST'},
				{ fieldName: 'SUAGRISEC', label: 'SUAGRISEC'},
				{ fieldName: 'SUPAGRIC', label: 'SUPAGRIC'},
				{ fieldName: 'SUAGRRIEG', label: 'SUAGRRIEG'},
				{ fieldName: 'PAST_TOTAL', label: 'PAST_TOTAL'},
				{ fieldName: 'POB_TOT', label: 'POB_TOT'},
				{ fieldName: 'POB_5', label: 'POB_5'},
				{ fieldName: 'POB_60', label: 'POB_60'},
				{ fieldName: 'NIV_PELIGR', label: 'NIV_PELIGR'},
				{ fieldName: 'N_RIESGO', label: 'N_RIESGO'},
				{ fieldName: 'G_ALPACA', label: 'G_ALPACA'},
				{ fieldName: 'G_LLAMA', label: 'G_LLAMA'},
				{ fieldName: 'G_OVINO', label: 'G_OVINO'},
				{ fieldName: 'G_VACUNO', label: 'G_VACUNO'},
				{ fieldName: 'SHAPE', label: 'SHAPE'},
			];
		}else if(ideGroup=='ODNGRD' && ideServiceMidagri=='Escenario déficit hídrico'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID'},
				{ fieldName: 'NOMBPROV', label: 'NOMBPROV'},
				{ fieldName: 'NOMBDIST', label: 'NOMBDIST'},
				{ fieldName: 'NOMBDPTO', label: 'NOMBDPTO'},
				{ fieldName: 'SUAGRISEC', label: 'SUAGRISEC'},
				{ fieldName: 'SUPAGRIC', label: 'SUPAGRIC'},
				{ fieldName: 'SUAGRRIEG', label: 'SUAGRRIEG'},
				{ fieldName: 'PAST_TOTAL', label: 'PAST_TOTAL'},
				{ fieldName: 'POB_TOT', label: 'POB_TOT'},
				{ fieldName: 'POB_5', label: 'POB_5'},
				{ fieldName: 'POB_60', label: 'POB_60'},
				{ fieldName: 'N_RIESGO', label: 'N_RIESGO'},
				{ fieldName: 'G_ALPACA', label: 'G_ALPACA'},
				{ fieldName: 'G_LLAMA', label: 'G_LLAMA'},
				{ fieldName: 'G_OVINO', label: 'G_OVINO'},
				{ fieldName: 'G_VACUNO', label: 'G_VACUNO'},
				{ fieldName: 'SHAPE', label: 'SHAPE'},
				{ fieldName: 'SHAPE.AREA', label: 'SHAPE.AREA'},
				{ fieldName: 'SHAPE.LEN', label: 'SHAPE.LEN'},
			];
		}else if(ideGroup=='ESAN' && ideServiceMidagri=='Superficié Agrícola Nacional'){
			fieldInfos = [
				{ fieldName: 'OBJECTID_12', label: 'OBJECTID_12'},
				{ fieldName: 'IDDPTO', label: 'IDDPTO'},
				{ fieldName: 'NOMBDEP', label: 'NOMBDEP'},
				{ fieldName: 'IDPROV', label: 'IDPROV'},
				{ fieldName: 'NOMBPROV', label: 'NOMBPROV'},
				{ fieldName: 'IDDIST', label: 'IDDIST'},
				{ fieldName: 'NOMBDIST', label: 'NOMBDIST'},
				{ fieldName: 'CATEGORIA', label: 'CATEGORIA'},
				{ fieldName: 'ZONA_DIST', label: 'ZONA_DIST'},
				{ fieldName: 'SAN_2018', label: 'SAN_2018'},
				{ fieldName: 'FUENTE', label: 'FUENTE'},
				{ fieldName: 'SHAPE', label: 'SHAPE'},
				{ fieldName: 'SHAPE.AREA', label: 'SHAPE.AREA'},
				{ fieldName: 'SHAPE.LEN', label: 'SHAPE.LEN'},
			];
		}else if(ideGroup=='ConPuchePeru' && ideServiceMidagri=='ppa'){
			fieldInfos = [
				{ fieldName: 'OBJECTID', label: 'OBJECTID'},
				{ fieldName: 'IDE_PERSONA', label: 'IDE_PERSONA'},
				{ fieldName: 'IDE_ACTIV_PARCELA', label: 'IDE_ACTIV_PARCELA'},
				{ fieldName: 'SHAPE', label: 'SHAPE'},
			];
		}else if(ideGroup=='PSI' && ideServiceMidagri=='Proyectos de Riego Tecnificado'){
			fieldInfos = [
				{ fieldName: 'SHAPE', label: 'SHAPE'},
				{ fieldName: 'DEPARTAM', label: 'DEPARTAM'},
				{ fieldName: 'PROV', label: 'PROV'},
				{ fieldName: 'DIST', label: 'DIST'},
				{ fieldName: 'REG_NATURA', label: 'REG_NATURA'},
				{ fieldName: 'CUENCA', label: 'CUENCA'},
				{ fieldName: 'CULTIVO', label: 'CULTIVO'},
				{ fieldName: 'SIST_RIEGO', label: 'SIST_RIEGO'},
				{ fieldName: 'CUI', label: 'CUI'},
				{ fieldName: 'NIVEL__EST', label: 'NIVEL__EST'},
				{ fieldName: 'ESTADO', label: 'ESTADO'},
				{ fieldName: 'A_TOT_HA', label: 'A_TOT_HA'},
				{ fieldName: 'BENEFIC', label: 'BENEFIC'},
				{ fieldName: 'INVER_TOTA', label: 'INVER_TOTA'},
				{ fieldName: 'GGRT', label: 'GGRT'},
				{ fieldName: 'OBJECTID', label: 'OBJECTID'},
			];
		}

		return new PopupTemplate({
			title: title,
			content: [{
				type: 'fields',
				fieldInfos: fieldInfos
			}]
		});
	}

	featureLayer(ideGroup:string,ideServiceMidagri:string){
		return new FeatureLayer({
            url: this.serviceMidagriGis(ideGroup,ideServiceMidagri),
			outFields: ['*'],
			popupTemplate: this.getPopupTemplate(ideGroup,ideServiceMidagri),
			popupEnabled:true,
			visible:(ideGroup=='Limites_Censales' || ideGroup=='ConPuchePeru')?true:false
        });
	}

	async removeLayerFromGroup(groupId: string, layerId: string, webmap?:WebMap): Promise<void> {
		await webmap?.load();

		const groupLayer = webmap?.layers.find((layer) => {
			return layer instanceof GroupLayer && layer.id === groupId;
		}) as GroupLayer;
	
		if (groupLayer) {
			const layerToRemove = groupLayer.findLayerById(layerId);
			if (layerToRemove) {
			  	groupLayer.remove(layerToRemove);
			}
		}
	}
}