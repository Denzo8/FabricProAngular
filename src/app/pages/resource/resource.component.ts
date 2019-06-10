import { Component, OnInit } from '@angular/core';
import { Resource } from '../../models/resource.model';
import { ResourceService } from 'src/app/services/resource.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styles: []
})
export class ResourceComponent implements OnInit {


  resource: Resource = new Resource();


   id: number;
  constructor(

    public _resourceService: ResourceService,
    public router: Router,
    public activateRoute: ActivatedRoute

  ) {
    activateRoute.params.subscribe(params => {
       this.id = params['id'];

      if (this.id !== 0) {
        this.LoadResource(this.id);
      }
    });
   }

  ngOnInit() {
    this._resourceService.LoadResources();
  }
  //CARGA UN RECURSO
  LoadResource(id: number) {

    this._resourceService.LoadResource(id)
    .subscribe(res => {
      this.resource = res;

    });  
  }
//CARGA RECURSOS
  LoadResources() {

    this._resourceService.LoadResources()
    .subscribe((res: Resource) => {
      this.resource = res;

    })
  }

  // CreateResource(resource: Resource) {


  //    this._resourceService.CreateResource(resource)
  //    .subscribe(() => this.LoadResources());

  // }

  // UpdateResource(resource: Resource) {

  //   this._resourceService.UpdateResource(resource)
  //   .subscribe();

  // }
  
// CREA O ACTUALIZA UN RECURSO
  SaveResource(f: NgForm) {
 
    if (f.invalid) {
      return;
    }
    this._resourceService.SaveResource(this.resource)
    .subscribe((resource:any)=>{
      this.resource=resource;
      this.router.navigate(['/resources']);
    });
   
  }



}
