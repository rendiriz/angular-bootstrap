import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

import { SharedModule } from '@core/shared.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { SectionMessagePageComponent } from './section-message-page.component';

export const routes: Routes = [
  {
    path: '',
    component: SectionMessagePageComponent,
  },
];

@NgModule({
  declarations: [SectionMessagePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    LocalizeRouterModule.forChild(routes),
    SharedModule,
    NgbAlertModule,
  ],
})
export class SectionMessagePageModule {}
