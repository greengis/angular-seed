import {Directive, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {TabsetComponent} from "./tabset.component";

@Directive({
  selector: 'ngg-tab,[ngg-tab]'
})
export class TabDirective {

  @Input() heading : string;
  _active : boolean;
  @HostBinding('class.active')
  @Input()
  get active(): boolean {
    return this._active;
  }

  set active(active: boolean) {
    if (this._active === active) {
      return;
    }
    this._active = active;
    this.select.emit(this);
/*    this.tabset.tabs.forEach((tab: TabDirective) => {
      if (tab !== this) {
        tab.active = false;
      }
    });*/
  }
  /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
  @Output() select: EventEmitter<TabDirective> = new EventEmitter();

  @HostBinding('class.tab') defaultClass = true;

  tabset : TabsetComponent;

  constructor(public tabs: TabsetComponent) {
    this.tabset = tabs;
    this.tabset.add(this);
  }

}
