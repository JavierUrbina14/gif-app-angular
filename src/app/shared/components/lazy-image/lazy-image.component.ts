import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {

  @Input()
  public ImageUrl! : string;
  @Input()
  public ImageAlt : string = '';

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if(!this.ImageUrl) throw new Error('Image URL required.');
  }

  onLoad(): void {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 800);
  }
}
