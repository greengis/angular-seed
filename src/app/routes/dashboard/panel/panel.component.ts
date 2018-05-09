import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  panelVisible : boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
