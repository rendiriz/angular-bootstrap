import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

import { SharedModule } from '@core/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DropdownMenuPageComponent } from './dropdown-menu-page.component';

export const routes: Routes = [
  {
    path: '',
    component: DropdownMenuPageComponent,
  },
];

@NgModule({
  declarations: [DropdownMenuPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    LocalizeRouterModule.forChild(routes),
    SharedModule,
    NgbDropdownModule,
  ],
})
export class DropdownMenuPageModule {}
