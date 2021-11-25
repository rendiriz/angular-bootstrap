import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

import { SharedModule } from '@core/shared.module';

import { ChartPageComponent } from './chart-page.component';
import { ChartBarHorizontalComponent } from '@components/_components/chart-bar-horizontal/chart-bar-horizontal.component';
import { ChartBarVerticalComponent } from '@components/_components/chart-bar-vertical/chart-bar-vertical.component';
import { ChartDoughnutComponent } from '@components/_components/chart-doughnut/chart-doughnut.component';
import { ChartPieComponent } from '@components/_components/chart-pie/chart-pie.component';
import { ChartLineComponent } from '@components/_components/chart-line/chart-line.component';

export const routes: Routes = [
  {
    path: '',
    component: ChartPageComponent,
  },
];

@NgModule({
  declarations: [
    ChartPageComponent,
    ChartBarHorizontalComponent,
    ChartBarVerticalComponent,
    ChartPieComponent,
    ChartDoughnutComponent,
    ChartLineComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    LocalizeRouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [
    ChartBarHorizontalComponent,
    ChartBarVerticalComponent,
    ChartPieComponent,
    ChartDoughnutComponent,
    ChartLineComponent,
  ]
})
export class ChartPageModule {}
