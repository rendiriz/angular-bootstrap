import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

import { SharedModule } from '@core/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { AvatarPageComponent } from './avatar-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AvatarPageComponent,
  },
  {
    path: 'avatar-item',
    loadChildren: () =>
      import('./avatar-item-page/avatar-item-page.module').then((m) => m.AvatarItemPageModule),
  },
];

@NgModule({
  declarations: [AvatarPageComponent],
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
export class AvatarPageModule {}
