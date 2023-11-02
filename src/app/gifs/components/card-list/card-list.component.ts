import { Component, Input } from '@angular/core';
import { Gifs } from '../../interfaces/gifs.interfaces';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {


  constructor( private gifService : GifsService) { }

  get gifs() : Gifs[] {
    return this.gifService.gifList;
  }



}
