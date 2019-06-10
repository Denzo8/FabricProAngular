import { Component, OnInit, NgModule } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Resource } from '../../models/resource.model';

import { ResourceService } from '../../services/resource.service';
import { RelationService } from 'src/app/services/relation.service';
import { Relation } from 'src/app/models/relation.model';



declare var swal: any;

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  providers: [],
  styles: []
})
export class ProjectsComponent implements OnInit {

  projects: Project;
  changeProjects: Project[]=[];

  relation: Relation[]=[];
 
  recursoTemp:Resource = new Resource()
 
  page:number=1; //pagina 1
  row:number=5; //numero de proyectos por aparecer
  

  totalProjects:number=0; //total de registros
  totalPages:number=0; //total de paginas

  bandera:boolean=true;


  constructor(
      public _proyectoService:ProjectService,
      public _resourceService:ResourceService,
      public _relationService:RelationService,
      public activateRoute: ActivatedRoute,
 
  ) {
    
   }
  ngOnInit() {
//AL INICIAR LA APP ESTE METODO SE INICIA PRIMERO PARA MOSTRAR LOS PROYECTOS
  this.LoadProjects();
 
  }
  //CARGA LOS PROYECOTS POR PAGINA
  LoadProjects(){
      this._proyectoService.changePageProject(this.page, this.row)
      .subscribe((res: Project) => {
        this.projects = res;
    
      
      this.totalProjects=res[0].totalRows;//Obtiene el valor del total de registros
 
      this.totalPages=Math.ceil(this.totalProjects/this.row);// Calcula el total de paginas redondeando hacia arriba

   
      });
      
      }
// "ELIMINA" UN PROJECTO
     DeleteProject(project:Project){
      swal({
        title: "¿Esta seguro?",
        text: "Esta apunto de borrar a" + project.name,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((  borrar) => {
         if(borrar){
           this._proyectoService.DeleteProject(project.projectID)
           .subscribe((res: any)=>{
             this.LoadProjects();
           })
         }
     });
      }
//CAMBIA PAGINA
      changePageProject(valor:number){
    let page=this.page+valor; //1+ 1
  
      if(page<1){
        return;
      }   
      if( page>this.totalPages){
        return;
      }
      this.page+=valor;
      this.LoadProjects(); 
      }
//CAMBIA NUMERO DE REGISTROS A VER
      changeRowProject(valor:number){
         valor-=this.row;// obtiene el valor esperado desde html
        let row=this.row+valor; //variable suma lo que ya tiene row y agrega el valor esperado
        let rango=this.totalPages*row;//rango para multiplicar las paginas y las filas
        if(rango%row!=0){// condicion para saber si la multiplicacion dividida entre la suma del valor esperado es 0
          return
        }
       this.row+=valor;// valor que tiene row mas el valor esperado
        
        this.LoadProjects(); //llama al metodo para cargar 
       
      }
//MUESTRA RECURSO DEL PROYECTO
     ShowResources(projectID:number){
      
        this._relationService.LoadResourceOfProject(projectID)
        .subscribe((res:any[])=>{

          this.relation=res;
        })
     }
//"ELIMINA" UN RECURSO ASIGNADO
     DeleteResourceProject(projectID:number,resourceID:number){
    
      swal({
        title: "¿Esta seguro?",
        text: "Esta apunto de borrar un recurso",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((  borrar) => {
         if(borrar){
          this._relationService.DeleteResourceProject(projectID,resourceID)
      .subscribe(res=>{
       
        this.LoadProjects(); //llama al metodo para cargar 
      })
         }
     });

     }

     SearchProject(termino: string){
          
      if(termino.length<=0){
        this.LoadProjects();
        return;
      }
        this._proyectoService.SearchProject(termino)
        .subscribe((res:any)=>{
          this.projects=res;
        });
       }

     
  }
