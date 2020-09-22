import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

    @ViewChild(IonSegment, { static: true }) segmento: IonSegment;

    noticias: Article[] = [];

    constructor(private noticiasService: NoticiasService) { }

    ngOnInit() {

        this.segmento.value = this.categorias[0];
        // console.log('segmento', this.segmento);

        this.cargarNoticias(this.categorias[0]);

    }

    cambioCategoria(evento: any) {

        // console.log(evento);

        this.noticias = []; // Lo ponemos aquí porque sabemos que se ha cambiado de categoria

        this.cargarNoticias(evento.detail.value);

    }

    cargarNoticias(categoria: string, evento?) {

        // tslint:disable-next-line: max-line-length
        // En el caso de que no cambiemos de categoría y queramos añadir noticias al arreglo con infinite scroll no vaciamos el arreglo this.noticias

        this.noticiasService.getTopHeadlinesbyCategory(categoria).subscribe(resp => {

            console.log(resp);

            if (resp.articles.length === 0) {

                // Desactivar infinite scroll

                evento.target.disabled = true;
                evento.target.complete();
                return;

            }

            this.noticias.push(...resp.articles);

            if (evento) {
                evento.target.complete();
            }

        });

    }

    loadDataInfiniteScroll(evento) {

        this.cargarNoticias(this.segmento.value, evento);
    }

}
