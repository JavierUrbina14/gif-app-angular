import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private gifService: GifsService) {}

  get tagsHistory(): string[] {
    return this.gifService.tagsHistory;
  }

  historySearch(tag:string): void {
    this.gifService.searchTag(tag)
  }
}
