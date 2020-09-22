import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    noticias: Article[] = [];

    constructor(private noticiasService: NoticiasService) { }

    ngOnInit() {

        this.cargarNoticias();

    }

    loadDataInfiniteScroll(evento) {

        this.cargarNoticias(evento);
    }

    cargarNoticias(evento?) {

        this.noticiasService.getTopHeadlines().subscribe(resp => {

            console.log(resp);

            // this.noticias = resp.articles;

            // Esto está bien, pero para ir añadiendo más noticias al arreglo es mejor usar push

            if (resp.articles.length === 0) {

                // Desactivar infinite scroll

                evento.target.disabled = true;
                evento.target.complete();
                return;

            }

            // Para que las noticias se añadan una a una al arreglo usamos el operador spread ...

            this.noticias.push(...resp.articles);

            if (evento) {
                evento.target.complete();
            }

        });
    }

}
