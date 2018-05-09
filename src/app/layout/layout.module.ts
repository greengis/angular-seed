import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from "../core/core.module";

import { LayoutComponent } from "./layout.component";
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  imports: [
    CoreModule.forChild(),
    RouterModule
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule {

}
