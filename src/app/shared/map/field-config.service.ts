import { Injectable } from '@angular/core';

@Injectable()
export class FieldConfigService {
  public fields =[
    {
      layer_index:3,
      property_name : "Elevation",
      display_name : "高程",
      type : 1
    },
    {
      layer_index:3,
      property_name : "RefName",
      display_name : "关联类型",
      type : 2
    },
    {
      layer_index:1,
      property_name : "NAME",
      display_name : "污水厂名称",
      type : 2
    },
    {
      layer_index:1,
      property_name : "CAPACITY",
      display_name : "处理规模",
      type : 1
    }
  ];
  constructor() { }

}
