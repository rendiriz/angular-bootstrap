import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

import { SharedModule } from '@core/shared.module';

import { ModalPageComponent } from './modal-page.component';
import { ModalExampleComponent } from './modal-example/modal-example.component';

export const routes: Routes = [
  {
    path: '',
    component: ModalPageComponent,
  },
];

@NgModule({
  declarations: [ModalPageComponent, ModalExampleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    LocalizeRouterModule.forChild(routes),
    SharedModule,
  ],
})
export class ModalPageModule {}
