import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import {  Project } from '../../models/project.model';
import { NgForm } from '@angular/forms';

import { ResourceService } from '../../services/resource.service';
import { Resource } from '../../models/resource.model';
import { ProjectService } from '../../services/project.service';

import { Relation } from '../../models/relation.model';
import { RelationService } from '../../services/relation.service';
import { dateFormatPipe } from '../../components/filter-pipe/filter-pipe.pipe';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  providers: [dateFormatPipe],
  styles: []
})
export class ProjectComponent implements OnInit {

  project: Project = new Project();
  resources: Resource []=[];
  selectedResources :Resource=new Resource();

   projectID: number;
   resourceID: number;

   relation: Relation[]=[];

   selectedToAdd:any[]=[]
resourcesSelected:any []=[];

  constructor(
    public _proyectoService: ProjectService,
    public _resourceService:ResourceService,
    public _relationService:RelationService,
    public router: Router,
    public activateRoute: ActivatedRoute
  ) {
    activateRoute.params.subscribe(params => {
       this.projectID = params['id'];

      if (this.projectID !== 0) {
        this.LoadProject(this.projectID);
      }
    });
   }

  ngOnInit() {
    this._proyectoService.LoadProjects();

    this._resourceService.LoadResources()
    .subscribe((resource: Resource[]) => {
      this.resources = resource;

    });
   ;

  }
  LoadProject(id: number) {

    this._proyectoService.LoadProject(id)
    .subscribe(res => {
      this.project = res;

    });  
  }

  LoadProjects() {

    this._proyectoService.LoadProjects()
    .subscribe((res: Project) => {
      this.project = res;

    })
   }
  // CreateProject(project: Project) {

  //    this._proyectoService.CreateProject(project)
  //    .subscribe(() => this.LoadProjects());

  // }

  // UpdateProject(project: Project) {
   
  //   this._proyectoService.UpdateProject(project)
  //   .subscribe();   
  // }
  SaveProject(f: NgForm) {
 
    if (f.invalid) {
      return;
    }
    this._proyectoService.SaveProject(this.project,this.resourceID)
    .subscribe((project:any)=>{
      this.project=project;
      this.router.navigate(['/projects']);  
    });
  }
  
  changeResource(resourceID:number){
   
    this._resourceService.LoadResource(resourceID)
    .subscribe((resource:Resource  )=>{
      this.selectedResources=resource; 
      this.resourceID=resourceID;
      console.log(resource + "Recurso")
    })

  }
//GUARDA LOS RECURSOS SELECCIONADOS
  saveMultipleResources(recursos){
    
    this.selectedToAdd.push(recursos)
    
console.log(this.selectedToAdd)

   
  }
  //ASIGNA MULTIPLES RECURSOS
  AsignResources(){
    this.resourcesSelected = this.resourcesSelected.concat(this.selectedToAdd);
    this.resourcesSelected.splice(-1,1);// ELIMINA EL ULTIMO ARREGLO
 
  for(let asignar of this.resourcesSelected){//recorre el arreglo donde se guardan los recursos
   
      this._proyectoService.AsignResource(this.projectID,asignar)
      
  }
    this.selectedToAdd = [];
  }
  //MUESTRA RECURSO DEL PROYECTO
  ShowResources(projectID:number){
      
    this._relationService.LoadResourceOfProject(projectID)
    .subscribe((res:any[])=>{

      this.relation=res;
    })
 }

 DeleteResourceProject(projectID:number,resourceID:number){
      
  this._relationService.DeleteResourceProject(projectID,resourceID)
  .subscribe(res=>{
    console.log("recurso borrado" + resourceID);
  
  })

 }

}
