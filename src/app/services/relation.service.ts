import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import swal from 'sweetalert'; 
import { Relation } from '../models/relation.model';
@Injectable({
  providedIn: 'root'
})
export class RelationService {

  constructor(
    public http: HttpClient,
  ) { }
//   ResourceHasProject(relation: Relation){
    
//     let url=URL_SERVICIOS +"relation";
//    return this.http.post(url,relation)
//    .pipe(map((res:any )=>res));
// }
// ASIGNA RECURSO
  changeResource(relation: Relation){
    
      let url=URL_SERVICIOS +"relation";
     return this.http.put(url,relation)
     .pipe(map((res:any )=>res));
  }
  //CARGA LOS RECURSOS DE UN PROYECTO
  LoadResourceOfProject(projectID:number){
    let url=URL_SERVICIOS +"relation?projectID=" + projectID;
    return this.http.get(url)
    .pipe(map((res:any )=>res));
  }
//"ELIMINA" RECURSO DE UN PROYECTO
  DeleteResourceProject(projectID:number,resourceID:number){
    let url=URL_SERVICIOS +"relation?projectID=" + projectID + "&resourceID=" + resourceID;
    return this.http.delete(url)
    .pipe(map((res:number )=>res
     
    ));
  }

}
