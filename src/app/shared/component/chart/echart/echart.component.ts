import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import * as echarts from 'echarts';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";

@Component({
    selector: 'ngg-echart',
    templateUrl: './echart.component.html',
    styleUrls: ['./echart.component.css']
})
export class EchartComponent implements OnInit, OnChanges, OnDestroy {
    @ViewChild('chartDiv') chartDiv: ElementRef;
    @Input() public option: any;
    @Input() public clear: boolean;
    chart: any;
    subscription: any;

    constructor() {

    }

    ngOnInit() {
        this.chart = this.chart || echarts.init(this.chartDiv.nativeElement);
        this.subscription = Observable.fromEvent(window, 'resize')
            .debounceTime(500)
            .subscribe((event) => {
                    if (this.chartDiv.nativeElement && this.chartDiv.nativeElement.clientHeight > 0) {
                        this.chart && this.chart.resize();
                    }
                }
            );
    }

    ngOnChanges(changes: SimpleChanges) {
        // changes.prop contains the old and the new value...
        if (changes.option && changes.option.currentValue) {
            this.chart = this.chart || echarts.init(this.chartDiv.nativeElement);
            if (this.clear) {
                this.chart.clear();
                this.chart.setOption(this.option);
                if(this.chartDiv.nativeElement.clientHeight > 0){
                    this.chart.resize();
                }
                //this.chart.resize();
            } else {
                this.chart.setOption(this.option);
                //this.chart.resize();
            }
            /*$timeout(function(){
             chart.resize();
             },500);*/
        }
    }

    ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
        this.chart && this.chart.dispose();
    }
}
