import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {
 
  menu: any=[
    
   
      {titulo: "Projects",url: '/projects'},
      {titulo: "Resources",url: '/resources'},
      {titulo: "New Project",url: '/project'},
      {titulo: "New Resource",url: '/resource'},
      
    ]
  constructor(
   
  ) { 
    
  }

 
}
