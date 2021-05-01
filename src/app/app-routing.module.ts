import { Routes } from '@angular/router';

// COMPONENT (PUBLIC)
import { PageComponent as PublicPageComponent } from '@templates/public/container/page/page.component';

export const AppRoutingModule: Routes = [
  {
    path: '',
    component: PublicPageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./views/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'foundations',
        loadChildren: () => import('./views/foundations/foundations.module').then((m) => m.FoundationsModule),
      },
      {
        path: 'components',
        loadChildren: () => import('./views/components/components.module').then((m) => m.ComponentsModule),
      },
    ],
  },
];
