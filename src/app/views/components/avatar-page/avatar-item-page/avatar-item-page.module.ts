import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

import { SharedModule } from '@core/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AvatarItemPageComponent } from './avatar-item-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AvatarItemPageComponent,
  },
];

@NgModule({
  declarations: [AvatarItemPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    LocalizeRouterModule.forChild(routes),
    SharedModule,
    NgbDropdownModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AvatarItemPageModule {}
