import { Routes } from '@angular/router';

// COMPONENT (PUBLIC)
import { HomeComponent as PublicHomeComponent } from '@templates/public/container/home/home.component';
import { PageComponent as PublicPageComponent } from '@templates/public/container/page/page.component';

export const AppRoutingModule: Routes = [
  {
    path: '',
    component: PublicHomeComponent,
    data: {
      discriminantPathKey: 'HOMEPATH',
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./views/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./views/home/home.module').then((m) => m.HomeModule),
      },
    ],
  },
  {
    path: '',
    component: PublicPageComponent,
    data: {
      discriminantPathKey: 'PAGEPATH',
    },
    children: [
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
