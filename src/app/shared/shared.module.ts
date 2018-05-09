import { NgModule } from '@angular/core';
import { CoreModule } from "../core/core.module";
import { FormsModule } from '@angular/forms';
import { CompanyService } from "./user/company.service";
import { UserService } from "./user/user.service";
import { GroupService } from "./user/group.service";
import { BaseMapComponent } from "./map/base-map/base-map.component";
import { MapMeasureComponent } from './map/map-measure/map-measure.component';
import { MapDrawComponent } from './map/map-draw/map-draw.component';
import { GraphicService } from "./map/graphic.service";
import { CreateMapTextComponent } from './map/map-draw/create-map-text/create-map-text.component';
import { MapLayerComponent } from './map/map-layer/map-layer.component';
import { MapThematicComponent } from './map/map-thematic/map-thematic.component';
import { MapSelectionComponent } from './map/map-selection/map-selection.component';
import { MapTimeComponent } from './map/map-time/map-time.component';
import { JdService } from "./util/jd.service";
import { MapTooltipComponent } from './map/map-tooltip/map-tooltip.component';
import { JsonService } from "./util/json.service";
import { EchartComponent } from './component/chart/echart/echart.component';
import { MapSliderComponent } from './map/map-slider/map-slider.component';
import { PrivilegeService } from "./user/privilege.service";
import { CheckboxComponent } from './component/checkbox/checkbox.component';
import { RadioComponent } from './component/radio/radio.component';
import { UserLogService } from "./user/user-log.service";
import { TreeComponent } from "./component/tree/tree.component";
import { InputComponent } from './component/input/input.component';
import { SocketService } from "./util/socket.service";
import { TabsetComponent } from './component/tabset/tabset.component';
import { TabDirective } from './component/tabset/tab.directive';
import { Tabset2Component } from './component/tabset2/tabset2.component';
import { Tab2Component } from './component/tabset2/tab2/tab2.component';
import { AnalogService } from "./util/analog.service";
import { CarouselComponent } from './component/carousel/carousel.component';

@NgModule({
  imports: [
    CoreModule.forChild(),
    FormsModule
  ],
  declarations: [BaseMapComponent, MapMeasureComponent, MapDrawComponent, CreateMapTextComponent, MapLayerComponent, MapThematicComponent, MapSelectionComponent, MapTimeComponent, MapTooltipComponent, EchartComponent, MapSliderComponent, CheckboxComponent, RadioComponent, TreeComponent, InputComponent, TabsetComponent, TabDirective, Tabset2Component, Tab2Component, CarouselComponent],
  providers: [UserService,GroupService,CompanyService,GraphicService,JdService,JsonService,PrivilegeService,UserLogService,SocketService,AnalogService],
  exports:[
    BaseMapComponent,MapMeasureComponent,MapDrawComponent,MapLayerComponent,MapThematicComponent,MapSelectionComponent,MapTimeComponent,MapTooltipComponent,EchartComponent,MapSliderComponent,CheckboxComponent,RadioComponent,TreeComponent,InputComponent,TabsetComponent,TabDirective,Tabset2Component, Tab2Component, CarouselComponent
  ]
})
export class SharedModule {

}
