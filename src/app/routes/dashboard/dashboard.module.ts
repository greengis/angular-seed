import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";

import { FormComponent } from './form/form.component';
import { CheckboxComponent } from './form/checkbox/checkbox.component';
import { RadioComponent } from './form/radio/radio.component';
import { InputComponent } from './form/input/input.component';
import { ButtonComponent } from './form/button/button.component';
import { PanelComponent } from './panel/panel.component';
import { ListComponent } from './list/list.component';
import { TabComponent } from './tab/tab.component';
import { TreeComponent } from './tree/tree.component';
import { SearchComponent } from './search/search.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ChartComponent } from './chart/chart.component';
import { Grid1Component } from './grid/grid1/grid1.component';
import { Grid2Component } from './grid/grid2/grid2.component';
import { CardComponent } from './grid/card/card.component';
import { Grid3Component } from './grid/grid3/grid3.component';
import { ModalComponent } from './modal/modal.component';
import { UploadComponent } from './upload/upload.component';
import { ModalDialogComponent } from './modal/modal-dialog/modal-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'form',
        component: FormComponent,
        children: [
          {
            path: 'checkbox',
            component: CheckboxComponent,
          },
          {
            path: 'radio',
            component: RadioComponent,
          },
          {
            path: 'input',
            component: InputComponent,
          },
          {
            path: 'button',
            component: ButtonComponent,
          },
          {
            path: '**',
            redirectTo: 'checkbox'
          }
        ]
      },
      {
        path: 'panel',
        component: PanelComponent
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'tab',
        component: TabComponent
      },
      {
        path: 'tree',
        component: TreeComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'timeline',
        component: TimelineComponent
      },
      {
        path: 'avatar',
        component: AvatarComponent
      },
      {
        path: 'chart',
        component: ChartComponent
      },
      {
        path: 'grid1',
        component: Grid1Component
      },
      {
        path: 'grid2',
        component: Grid2Component
      },
      {
        path: 'grid3',
        component: Grid3Component
      },
      {
        path: 'card',
        component: CardComponent
      },
      {
        path: 'modal',
        component: ModalComponent
      },
      {
        path: 'upload',
        component: UploadComponent
      },
      {
        path: '**',
        redirectTo: 'form'
      }
    ]
  }
];

@NgModule({
  imports: [
    CoreModule.forChild(),
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent, FormComponent, CheckboxComponent, RadioComponent, InputComponent, ButtonComponent, PanelComponent, ListComponent, TabComponent, TreeComponent, SearchComponent, TimelineComponent, AvatarComponent, ChartComponent, Grid1Component, Grid2Component, CardComponent, Grid3Component, ModalComponent, UploadComponent, ModalDialogComponent]
})
export class DashboardModule { }
