import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProjectComponent } from './project/project.component';
import { ProjectsComponent } from './projects/projects.component';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceComponent } from './resource/resource.component';
import { APP_ROUTES } from '../app.routes';



@NgModule({
    declarations:[
        //Pages
        ProjectComponent,
        ProjectsComponent,
        ResourcesComponent,
        ResourceComponent, 
    ],
    exports:[
        ProjectComponent,
        ProjectsComponent,
        ResourcesComponent,
        ResourceComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        SharedModule,
        APP_ROUTES,

    ]
})
export class PagesModule{}