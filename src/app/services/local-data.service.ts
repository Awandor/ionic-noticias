import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Article } from 'src/app/interfaces/interfaces';

import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LocalDataService {

    // Vamos a guardar los favoritos en un arreglo

    favoritos: Article[] = [];

    constructor(private storage: Storage, public toastController: ToastController) {

        this.cargarFavoritos();

    }

    guardarFavorito(noticia: Article) {

        // Vamos a impedir que una misma noticia se guarde como favorito

        const favoritoExiste = this.favoritos.find(fav => fav.title === noticia.title);

        // Si existe, find retorna la noticia de lo contrario retorna undefined

        if (!favoritoExiste) {

            this.favoritos.unshift(noticia); // Añade al comienzo del arreglo

            this.storage.set('favoritos', this.favoritos); // no hace falta pasarla por nada, a pelo, como arreglo de objetos

            this.presentToast('Noticia añadida a Favoritos');

        } else {

            this.presentToast('Noticia ya existe en Favoritos');

        }

    }

    /* cargarFavoritos() {

        this.storage.get('favoritos').then((favoritosLocales) => {

            console.log('Your favoritos', favoritosLocales);

            if (favoritosLocales) {

                this.favoritos = favoritosLocales;

            }

        });

    } */

    // Las dos maneras funcionan

    async cargarFavoritos() {

        const favoritosLocales = await this.storage.get('favoritos');

        console.log('async await', favoritosLocales);

        if (favoritosLocales) {

            this.favoritos = favoritosLocales;

        }

        // Si no hay favoritosLocales, this.favoritos es un arreglo vacío tal y como se inicializa

    }

    borrarFavorito(noticia: Article) {

        const favoritoExiste = this.favoritos.find(fav => fav.title === noticia.title);

        // Si existe, find retorna la noticia de lo contrario retorna undefined

        if (favoritoExiste) {

            console.log('borro favorito');

            // Retorna un arreglo sin la noticia que queremos borrar

            this.favoritos = this.favoritos.filter(fav => fav.title !== noticia.title);

            this.storage.set('favoritos', this.favoritos); // no hace falta pasarla por nada, a pelo, como arreglo de objetos

            this.presentToast('Noticia borrada de Favoritos');

        }

    }

    async presentToast(mensaje: string) {
        const toast = await this.toastController.create({
            message: mensaje,
            duration: 2000
        });
        toast.present();
    }
}
