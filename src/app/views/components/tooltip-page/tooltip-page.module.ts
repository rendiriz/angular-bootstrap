import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

import { SharedModule } from '@core/shared.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { TooltipPageComponent } from './tooltip-page.component';

export const routes: Routes = [
  {
    path: '',
    component: TooltipPageComponent,
  },
];

@NgModule({
  declarations: [TooltipPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    LocalizeRouterModule.forChild(routes),
    SharedModule,
    NgbTooltipModule,
  ],
})
export class TooltipPageModule {}
