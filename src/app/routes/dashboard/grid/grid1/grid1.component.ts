import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-grid1',
  templateUrl: './grid1.component.html',
  styleUrls: ['./grid1.component.scss']
})
export class Grid1Component implements OnInit {

  urls = ['assets/img/dashboard/card/01.jpg','assets/img/dashboard/card/02.jpg','assets/img/dashboard/card/03.png'];

  constructor() { }

  ngOnInit() {
  }

}
