import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

import { SharedModule } from '@core/shared.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

import { TabsPageComponent } from './tabs-page.component';

export const routes: Routes = [
  {
    path: '',
    component: TabsPageComponent,
  },
];

@NgModule({
  declarations: [TabsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    LocalizeRouterModule.forChild(routes),
    SharedModule,
    NgbNavModule,
  ],
})
export class TabsPageModule {}
