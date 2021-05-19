import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

import { SharedModule } from '@core/shared.module';

import { ExamplesPageComponent } from './examples-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ExamplesPageComponent,
  },
];

@NgModule({
  declarations: [ExamplesPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    LocalizeRouterModule.forChild(routes),
    SharedModule,
  ],
})
export class ExamplesPageModule {}
