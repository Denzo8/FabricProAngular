import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert'; 
import { Project } from '../models/project.model';
import { Relation } from '../models/relation.model';
import { RelationService } from './relation.service';



@Injectable({
  providedIn: 'root'
})
export class ProjectService {
 project: Project;
 relation:Relation
 
projectID:number;
resourceID:number;
  constructor(
    public http: HttpClient,
    public _relationService:RelationService
    ) { 
  }
//PAGINADO
  changePageProject(page:number,row:number){
    let url=URL_SERVICIOS +'project' +'?page='+ page+'&' +'row='+ row;
  
    return this.http.get(url)
    .pipe(map((res:any )=>res

    ));
    
  }
// CARGA USUARIO POR ID
  LoadProject(id:number){
    let url=URL_SERVICIOS +'project/' + id;
    return this.http.get(url)
    .pipe(map((res:any )=>res));
  }
//CARGA TODOS LOS USUARIOS
  LoadProjects(){
  let url=URL_SERVICIOS+'project';
    return this.http.get(url).pipe( map((resp:Project) =>resp));
  }

  // CreateProject(project: Project){
  
  //   let url=URL_SERVICIOS + 'project';
  //   return this.http.post(url,project)
  //   .pipe(map((res: any)=>{
  //    swal('Proyecto creado',res.project.name,'success');
  //     return res.project;
  //  }));
  // }

  // UpdateProject(project: Project){
  //    let url=URL_SERVICIOS + 'project/' + project.projectID;
  //    return this.http.put(url,project)
  //    .pipe(map((res: any)=>{
  //       this.project=res.project;
  //      swal('Proyecto actualizado', project.name, 'success' );

  //      return res.project;
  //   }));
  
  //}
 // CREAR Y ACTUALIZAR PROYECTO
  SaveProject(project: Project,resourceID:number){
    let url = URL_SERVICIOS + 'project';

    if(project.projectID){
      //actualizando
      url+='/' + project.projectID;
  

      return this.http.put( url, project )
      .pipe(map( (resp: any) => {
       
       swal('Proyecto actualizado', project.name, 'success' );
       if(resourceID){

         this.AsignResource(project.projectID,resourceID);
       }
       return resp.project;
     })); 
      
    }else{
      //creando

      return this.http.post( url, project )
                 .pipe(map( (resp: any) => {
  
                  swal('Proyecto creado', project.name, 'success' );
                    this.project=resp.project;
                 // this.projectID=resp.id;
                  console.log(resp + "ProjectID")
                  this.AsignResource(resp,resourceID);
                  return resp.project;
                  
                })); 
    }
  
  }
// "ELIMINA" PROJECTO
  DeleteProject(id:number){
    let url=URL_SERVICIOS+"project/" + id;
  
    return  this.http.delete(url)
    .pipe(map(res=>{
      swal('Proyecti borrado', "El Proyecto ha sido eliminado correctamente",'success');
      return true;
    }));
  }

  AsignResource(projectID:number,resourceID:number){
    this.relation=new Relation(projectID,resourceID);
    this._relationService.changeResource(this.relation)
    .subscribe((res:any)=>res);
  }

  SearchProject(termino: string){
    let url=URL_SERVICIOS + 'project/busqueda/'+ termino;
    return this.http.get(url)
    .pipe(map((res: any)=>res));
  }

}
