import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components-page/components-page.module').then((m) => m.ComponentsPageModule),
      },
      {
        path: 'button',
        loadChildren: () => import('./button-page/button-page.module').then((m) => m.ButtonPageModule),
      },
      {
        path: 'checkbox',
        loadChildren: () => import('./checkbox-page/checkbox-page.module').then((m) => m.CheckboxPageModule),
      },
      {
        path: 'radio',
        loadChildren: () => import('./radio-page/radio-page.module').then((m) => m.RadioPageModule),
      },
      {
        path: 'select',
        loadChildren: () => import('./select-page/select-page.module').then((m) => m.SelectPageModule),
      },
      {
        path: 'textfield',
        loadChildren: () =>
          import('./textfield-page/textfield-page.module').then((m) => m.TextfieldPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule],
})
export class ComponentsRoutingModule {}
