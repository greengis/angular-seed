import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { FileUploadModule } from 'ng2-file-upload';

import { MenuService } from "./menu/menu.service";
import { ConfigService } from "./config/config.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule.forRoot(),
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    CollapseModule.forRoot(),
    FileUploadModule
  ],
/*  providers: [
    MenuService,
    SettingsService,
    ThemesService,
    ConfigService
  ],*/
  exports : [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    AccordionModule,ButtonsModule,ModalModule,TooltipModule,BsDropdownModule,PaginationModule,ProgressbarModule,CollapseModule,
    FileUploadModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [MenuService,
        ConfigService]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
