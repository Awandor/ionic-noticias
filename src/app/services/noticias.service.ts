import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

// Nos traemos las variables de entorno

const apiKey = environment.apiKey;
const apiURL = environment.apiURL;

// En la documentación vemos que se pueden enviar propiedades por URL o por Headers, vamos a enviar por Headers

const headers = new HttpHeaders({
    'X-Api-key': apiKey
});

@Injectable({
    providedIn: 'root'
})
export class NoticiasService {

    headlinesPage = 0;

    // Para implementar infinite scroll en las categorías necesitamos saber la categía actual

    categoriaActual = '';

    categoriaPage = 0;

    constructor(private http: HttpClient) { }

    getTopHeadlines() {
        // tslint:disable-next-line: max-line-length
        // return this.http.get<RespuestaTopHeadLines>(`http://newsapi.org/v2/top-headlines?country=us&apiKey=bde4234b69e74b388a2e086fe0036318`);
        // return this.http.get<RespuestaTopHeadLines>(`${apiURL}/top-headlines?country=us&apiKey=${apiKey}`);

        // return this.ejecutarQuery<RespuestaTopHeadLines>('/top-headlines?country=us');

        this.headlinesPage++;

        return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headlinesPage}`);

    }

    getTopHeadlinesbyCategory(categoria: string) {

        // return this.http.get<RespuestaTopHeadLines>(`${apiURL}/top-headlines?country=us&category=${categoria}&apiKey=${apiKey}`);

        if (this.categoriaActual === categoria) {

            this.categoriaPage++;

        } else {

            this.categoriaPage = 1;
            this.categoriaActual = categoria;

        }

        // this.headlinesPage++;

        return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);

    }

    // Podemos usar <T> es un tipo genérico que hace que recibamos el tipo que sea retornamos el mismo tipo

    private ejecutarQuery<T>(query: string) {

        query = apiURL + query;

        return this.http.get<T>(query, { headers });

    }
}
