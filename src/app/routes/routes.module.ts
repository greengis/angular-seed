import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './routes';
import { LoginModule } from "../login/login.module";
import { LayoutModule } from "../layout/layout.module";


@NgModule({
  imports: [
    LoginModule,
    LayoutModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutesModule {
  constructor() {

  }
}
