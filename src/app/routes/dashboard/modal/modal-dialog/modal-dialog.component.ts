import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-example-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {
  @ViewChild('lgModal') modal: ModalDirective;
  record :any = { };
  constructor() { }

  ngOnInit() {
  }

  show(record) {
    this.record = record;
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

}
