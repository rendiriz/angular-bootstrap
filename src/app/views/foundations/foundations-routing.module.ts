import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

// RESOLVER
import { SidebarFoundationsResolver } from '@resolvers';

const routes: Routes = [
  {
    path: '',
    resolve: {
      hero: SidebarFoundationsResolver,
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./foundations-page/foundations-page.module').then((m) => m.FoundationsPageModule),
      },
      {
        path: 'color',
        loadChildren: () => import('./color-page/color-page.module').then((m) => m.ColorPageModule),
      },
      {
        path: 'typography',
        loadChildren: () =>
          import('./typography-page/typography-page.module').then((m) => m.TypographyPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule],
})
export class FoundationsRoutingModule {}
