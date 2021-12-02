import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// SERVICE
import { GlobalService } from '@services';

// PACKAGE
import * as _ from 'lodash';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chart-page',
  templateUrl: './chart-page.component.html',
  styleUrls: ['./chart-page.component.scss'],
})
export class ChartPageComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  moment: any = moment;

  // Settings
  title!: string;
  label!: string;
  description!: string;
  breadcrumb!: any[];

  // Variable
  filters!: any;
  chartData!: any;
  chartDataBarHorizontal!: any;
  chartDataBarVertical!: any;
  chartDataLine!: any;
  chartDataDoughnut!: any;
  chartDataPie!: any;

  codeBarHorizontalChart = `<app-comp-chart-bar-horizontal
            [filters]="filters"
            [chartData]="chartData"
            [options]="options"></app-comp-chart-bar-horizontal>`;

  codeBarVerticalChart = `<app-comp-chart-bar-vertical
            [filters]="filters"
            [chartData]="chartData"
            [options]="options"></app-comp-chart-bar-vertical>`;

  codeLineChart = `<app-comp-chart-line
            [filters]="filters"
            [chartData]="chartData"
            [options]="options"></app-comp-chart-line>`;

  codeDoughnutChart = `<app-comp-chart-doughnut
            [filters]="filters"
            [chartData]="chartData"
            [options]="options"></app-comp-chart-doughnut>`;

  codePieChart = `<app-comp-chart-pie
            [filters]="filters"
            [chartData]="chartData"
            [options]="options"></app-comp-chart-pie>`;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private globalService: GlobalService,
    private translateService: TranslateService
  ) {
    this.settingsAll();

    this.translateService.onLangChange.subscribe((event) => {
      this.settingsAll();
    });
  }

  settingsAll(): void {
    this.translateService.get('seo.chart-page').subscribe((trans) => {
      this.label = trans.title;
      this.description = trans.description;

      // Title & Description
      this.title = this.globalService.title;
      this.titleService.setTitle(this.label);
      this.globalService.changeLabel(this.label);
      this.globalService.changeDescription(this.description);
    });
  }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {
    this.chartData = [
      {framework: 'Vue', stars: 166443, released: 2014},
      {framework: 'React', stars: 150793, released: 2013},
      {framework: 'Angular', stars: 62342, released: 2016},
      {framework: 'Backbone', stars: 27647, released: 2010},
      {framework: 'Ember', stars: 21471, released: 2011}
    ];

    this.getDataBarHorizontal();
    this.getDataBarVertical();
    this.getDataLine();
    this.getDataDoughnut();
    this.getDataPie();
  }

  getDataBarHorizontal(): void {
    this.chartDataBarHorizontal = this.chartData.map((content: any) => {
      return {
        text: content.framework,
        value: content.stars
      };
    });
  }

  getDataBarVertical(): void {
    this.chartDataBarVertical = this.chartData.map((content: any) => {
      return {
        text: content.framework,
        value: content.stars
      };
    });
  }

  getDataLine(): void {
    this.chartDataLine = this.chartData.map((content: any) => {
      return {
        text: content.framework,
        value: content.stars
      };
    });
  }

  getDataDoughnut(): void {
    this.chartDataDoughnut = this.chartData.map((content: any) => {
      return {
        text: content.framework,
        value: content.stars
      };
    });
  }

  getDataPie(): void {
    this.chartDataPie = this.chartData.map((content: any) => {
      return {
        text: content.framework,
        value: content.stars
      };
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}
}
