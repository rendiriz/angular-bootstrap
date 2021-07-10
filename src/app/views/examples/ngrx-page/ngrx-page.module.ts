import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

import { SharedModule } from '@core/shared.module';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { NgrxPageComponent } from './ngrx-page.component';

export const routes: Routes = [
  {
    path: '',
    component: NgrxPageComponent,
  },
];

@NgModule({
  declarations: [NgrxPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    LocalizeRouterModule.forChild(routes),
    SharedModule,
    NgbCollapseModule,
    NgbDropdownModule,
  ],
})
export class NgrxPageModule {}
