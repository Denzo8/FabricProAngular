import { HomeComponent } from "./home/home.component";
import { Routes, RouterModule } from "@angular/router";
import { CounterComponent } from "./counter/counter.component";
import { FetchDataComponent } from "./fetch-data/fetch-data.component";
import { PagesComponent } from "./pages/pages.component";
import { ProjectsComponent } from "./pages/projects/projects.component";
import { ProjectComponent } from "./pages/project/project.component";
import { ResourcesComponent } from './pages/resources/resources.component';
import { ResourceComponent } from './pages/resource/resource.component';



const appRoutes: Routes=[ 
    
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'counter', component: CounterComponent },
    { path: 'fetch-data', component: FetchDataComponent },
    {path: 'projects', component: ProjectsComponent},
    {path: 'project/:id', component: ProjectComponent},
    {path: 'resources', component: ResourcesComponent},
    {path: 'resource/:id', component: ResourceComponent},
  
   
  
];

export const APP_ROUTES =RouterModule.forRoot(appRoutes,{useHash: true});
