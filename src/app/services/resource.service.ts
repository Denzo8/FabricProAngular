import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../models/resource.model';
import { map } from 'rxjs/operators';
import swal from 'sweetalert'; 
import { URL_SERVICIOS } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  resource: Resource;
  constructor(
    public http: HttpClient,

  ) { }

//CARGA UN RECURSO POR ID
  LoadResource(id:number){
    let url=URL_SERVICIOS +'resource/' + id;
    return this.http.get(url)
    .pipe(map((res:any )=>res));
  }
//CARGA TODOS LOS RECURSOS
  LoadResources(){
  let url=URL_SERVICIOS+'resource/resources';
    return this.http.get(url).pipe( map((resp:any) =>resp));
  }
  
  //PAGINADO
  changePageResource(page:number,row:number){
    let url=URL_SERVICIOS +'resource' +'?page='+ page+'&' +'row='+ row;
  
    return this.http.get(url)
    .pipe(map((res:any )=>res

    ));
    
  }

  // CreateResource(resource: Resource){
  //   let url=URL_SERVICIOS + 'project';
  //   return this.http.post(url,resource)
  //   .pipe(map((res: any)=>{
  //    swal('Proyecto creado',res.resource.name,'success');
  //     return res.resource;
  //  }));
  // }
  // UpdateResource(resource: Resource){
  //    let url=URL_SERVICIOS + 'project/' + resource.resourceID;
  //    return this.http.put(url,resource)
  //    .pipe(map((res: any)=>{
  //       this.resource=res.resource;
  //      swal('Proyecto actualizado', resource.name, 'success' );

  //      return res.resource;
  //   }));
  
  // }

 //CREAR Y ACTUALIZAR RECURSOS
  SaveResource(resource: Resource){
    let url = URL_SERVICIOS + 'resource';

    if(resource.resourceID){
      //actualizando
      url+='/' + resource.resourceID;
      return this.http.put( url, resource )
      .pipe(map( (resp: any) => {
       swal('Proyecto actualizado', resource.name, 'success' );
   
       return resp.resource;
     })); 
      
    }else{
      //creando

      return this.http.post( url, resource )
                 .pipe(map( (resp: any) => {
  
                  swal('Proyecto creado', resource.name, 'success' );
  
                  return resp.resource;
                })); 
    }
  
  }
  //"ELIMINA" RECURSO
  DeleteResource(id:number){
    let url=URL_SERVICIOS+"resource/" + id;
  
    return  this.http.delete(url)
    .pipe(map(res=>{
      swal('Proyecti borrado', "El Proyecto ha sido eliminado correctamente",'success');
      return true;
    }));
  }
  
 
  SearchResource(termino: string){
    let url=URL_SERVICIOS + 'resource/busqueda/'+ termino;
    return this.http.get(url)
    .pipe(map((res: any)=>res));
  }


}



