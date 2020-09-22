import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';

@NgModule({
    declarations: [
        NoticiasComponent,
        NoticiaComponent
    ],
    // Para poder usar NoticiasComponent fuera de este módulo necesitamos exportarlo,
    // NoticiaComponent no hace falta pues va a depender de NoticiasComponent
    exports: [
        NoticiasComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class ComponentsModule { }
