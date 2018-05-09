import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";

@Component({
  selector: 'app-create-map-text',
  templateUrl: './create-map-text.component.html',
  styleUrls: ['./create-map-text.component.css']
})
export class CreateMapTextComponent implements OnInit {
  @ViewChild('lgModal') modal:ModalDirective;
  result : boolean = false;
  geometry : any;
  label: string;
  @Output() public onSubmit = new EventEmitter<CreateMapTextComponent>();
  @Output() public onCancel = new EventEmitter<CreateMapTextComponent>();
  constructor() { }

  ngOnInit() {
  }

  show(geometry) {
    this.label = "";
    this.geometry = geometry;
    this.modal.show();
  }

  submit(){
    this.result = true;
    this.modal.hide();
    this.onSubmit.emit(this);
  }

  cancel() {
    this.result = false;
    this.modal.hide();
    this.onCancel.emit(this);
  }

}
