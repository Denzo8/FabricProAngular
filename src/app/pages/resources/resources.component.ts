import { Component, OnInit } from '@angular/core';
import { Resource } from '../../models/resource.model';
import { ResourceService } from '../../services/resource.service';
declare var swal: any;

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styles: []
})
export class ResourcesComponent implements OnInit {
  resources: Resource;
  page:number=1; //pagina 1
  row:number=5; //numero de proyectos por aparecer
  

  totalResources:number=0; //total de registros
  totalPages:number=0; //total de paginas

  constructor(

    public _resourceService: ResourceService
  
  ) {
   }

  ngOnInit() {
    this.LoadResources();
  }
  //CARGA TODOS LOS RECURSOS
  LoadResources(){
     
    this._resourceService. changePageResource(this.page,this.row)
    .subscribe((res: any) => {
      this.resources = res;   
      this.totalResources=res[0].totalRows;//Obtiene el valor del total de registros
 
      this.totalPages=Math.ceil(this.totalResources/this.row);// Calcula el total de paginas redondeando hacia arriba

    });
    }   
    //"ELIMINA" UN RECURSO
   DeleteResource(resource:Resource){
    swal({
      title: "¿Esta seguro?",
      text: "Esta apunto de borrar a" + resource.name,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((  borrar) => {
       if(borrar){
         this._resourceService.DeleteResource(resource.resourceID)
         .subscribe((res: any)=>{
           this.LoadResources();
         })
       }
    });
    }
    //CAMBIA PAGINA
    changePageResource(valor:number){
      let page=this.page+valor; //1+ 1
    
        if(page<1){
          return;
        }   
        if( page>this.totalPages){
          return;
        }
        this.page+=valor;
        this.LoadResources(); 
        }
  //CAMBIA NUMERO DE REGISTROS A VER
       changeRowResource(valor:number){
           valor-=this.row;// obtiene el valor esperado desde html
          let row=this.row+valor; //variable suma lo que ya tiene row y agrega el valor esperado
          let rango=this.totalPages*row;//rango para multiplicar las paginas y las filas
          if(rango%row!=0){// condicion para saber si la multiplicacion dividida entre la suma del valor esperado es 0
            return
          }
         this.row+=valor;// valor que tiene row mas el valor esperado
          
          this.LoadResources(); //llama al metodo para cargar 
         
        }

        SearchResource(termino: string){
          
        if(termino.length<=0){
          this.LoadResources();
          return;
        }
          this._resourceService.SearchResource(termino)
          .subscribe((res:any)=>{
            this.resources=res;
          });
         }
       
}
