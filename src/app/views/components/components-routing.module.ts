import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

// RESOLVER
import { SidebarComponentsResolver } from '@resolvers';

const routes: Routes = [
  {
    path: '',
    resolve: {
      hero: SidebarComponentsResolver,
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components-page/components-page.module').then((m) => m.ComponentsPageModule),
      },
      {
        path: 'avatar',
        loadChildren: () => import('./avatar-page/avatar-page.module').then((m) => m.AvatarPageModule),
      },
      {
        path: 'breadcrumbs',
        loadChildren: () =>
          import('./breadcrumbs-page/breadcrumbs-page.module').then((m) => m.BreadcrumbsPageModule),
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
        path: 'dropdown-menu',
        loadChildren: () =>
          import('./dropdown-menu-page/dropdown-menu-page.module').then((m) => m.DropdownMenuPageModule),
      },
      {
        path: 'modal',
        loadChildren: () => import('./modal-page/modal-page.module').then((m) => m.ModalPageModule),
      },
      {
        path: 'pagination',
        loadChildren: () =>
          import('./pagination-page/pagination-page.module').then((m) => m.PaginationPageModule),
      },
      {
        path: 'radio',
        loadChildren: () => import('./radio-page/radio-page.module').then((m) => m.RadioPageModule),
      },
      {
        path: 'section-message',
        loadChildren: () =>
          import('./section-message-page/section-message-page.module').then(
            (m) => m.SectionMessagePageModule
          ),
      },
      {
        path: 'select',
        loadChildren: () => import('./select-page/select-page.module').then((m) => m.SelectPageModule),
      },
      {
        path: 'table',
        loadChildren: () => import('./table-page/table-page.module').then((m) => m.TablePageModule),
      },
      {
        path: 'tabs',
        loadChildren: () => import('./tabs-page/tabs-page.module').then((m) => m.TabsPageModule),
      },
      {
        path: 'textfield',
        loadChildren: () =>
          import('./textfield-page/textfield-page.module').then((m) => m.TextfieldPageModule),
      },
      {
        path: 'tooltip',
        loadChildren: () => import('./tooltip-page/tooltip-page.module').then((m) => m.TooltipPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule],
})
export class ComponentsRoutingModule {}
