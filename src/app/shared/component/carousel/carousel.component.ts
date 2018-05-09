import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'ngg-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit,OnChanges {
  @Input() urls : string[];

  url : string;
  index : number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.urls && changes.urls.currentValue && changes.urls.currentValue.length > 0 ){
      this.url = changes.urls.currentValue[0];
      this.index = 0;
    }
  }

  prev(){
    if (this.index > 0 ){
      this.index -= 1;
      this.url = this.urls[this.index];
    }
  }

  next(){
    if (this.index < this.urls.length - 1 ){
      this.index += 1;
      this.url = this.urls[this.index];
    }
  }
}
