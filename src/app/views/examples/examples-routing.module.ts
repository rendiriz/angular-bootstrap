import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

// RESOLVER
import { SidebarExamplesResolver } from '@resolvers';

const routes: Routes = [
  {
    path: '',
    resolve: {
      hero: SidebarExamplesResolver,
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./examples-page/examples-page.module').then((m) => m.ExamplesPageModule),
      },
      {
        path: 'navbar',
        loadChildren: () => import('./navbar-page/navbar-page.module').then((m) => m.NavbarPageModule),
      },
      {
        path: 'ngrx',
        loadChildren: () => import('./ngrx-page/ngrx-page.module').then((m) => m.NgrxPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule],
})
export class ExamplesRoutingModule {}
