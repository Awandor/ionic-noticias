import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
    selector: 'app-noticia',
    templateUrl: './noticia.component.html',
    styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

    @Input() noticia: Article;

    @Input() index: number;

    @Input() estoyEnFavoritos: boolean; // Siempre tenemos un valor que viene del padre noticias

    constructor(
        private iab: InAppBrowser,
        public actionSheetController: ActionSheetController,
        private ss: SocialSharing,
        private lds: LocalDataService) { }

    ngOnInit() { }

    verNoticia() {

        console.log(this.noticia.url);

        const browser = this.iab.create(this.noticia.url, '_system'); // De la documentación del plugin
    }

    lanzarMenu() {

        this.presentActionSheet();

    }

    async presentActionSheet() {

        let favoriteObject;

        if (this.estoyEnFavoritos) {

            favoriteObject = {
                text: 'Delete Favorite',
                icon: 'trash-outline',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Delete Favorite clicked');
                    this.lds.borrarFavorito(this.noticia);
                }
            };

        } else {

            favoriteObject = {
                text: 'Favorite',
                icon: 'heart',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Favorite clicked');
                    this.lds.guardarFavorito(this.noticia);
                }
            };

        }

        const actionSheet = await this.actionSheetController.create({
            // cssClass: 'action-dark', // No funciona bien, lo aplica a todo el objeto
            buttons: [
                {
                    text: 'Share',
                    icon: 'share-social-outline',
                    cssClass: 'action-dark', // Hay que definirlo de forma global
                    handler: () => {
                        console.log('Share clicked');

                        // Hay muchos tipos de share como shareViaWhatsApp, pero share a secas deja al usuario escoger
                        this.ss.share(this.noticia.title, this.noticia.source.name, [], this.noticia.url);
                        // Esto sólo funciona en un dispositivo, no funciona en desktop
                    }
                },
                favoriteObject
                , {
                    text: 'Cancel',
                    icon: 'close',
                    cssClass: 'action-dark',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }]
        });
        await actionSheet.present();
    }

}
