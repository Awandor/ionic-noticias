import { Component } from '@angular/core';
import { LocalDataService } from 'src/app/services/local-data.service';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    // Truco para que no se pueda mover el slide, lo hacemos por options de la documentación

    sliderOpts = {
        allowSlidePrev: false,
        allowSlideNext: false
    };

    // lds tiene que ser public para poder acceder a él desde el HTML

    constructor(public lds: LocalDataService) { }

}
