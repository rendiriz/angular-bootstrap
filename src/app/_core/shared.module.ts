import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PACKAGE
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HighlightJsModule } from 'ngx-highlight-js';
import { NgSelectModule } from '@ng-select/ng-select';

// COMPONENT
import { AvatarComponent as CompAvatarComponent } from '@components/_components/avatar/avatar.component';
import { AvatarItemComponent as CompAvatarItemComponent } from '@components/_components/avatar-item/avatar-item.component';

import { PageComponent as HeaderPageComponent } from '@components/header/page/page.component';

// WEB COMPONENT
import 'rendikit-avatar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // PACKAGE
    TranslateModule,
    LocalizeRouterModule,
    LoadingBarRouterModule,
    HighlightJsModule,
    NgSelectModule,
  ],
  declarations: [
    // COMPONENT
    CompAvatarComponent,
    CompAvatarItemComponent,
    HeaderPageComponent,
  ],
  exports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // PACKAGE
    TranslateModule,
    LocalizeRouterModule,
    LoadingBarRouterModule,
    HighlightJsModule,
    NgSelectModule,
    // COMPONENT
    CompAvatarComponent,
    CompAvatarItemComponent,
    HeaderPageComponent,
  ],
  providers: [],
  schemas: [],
})
export class SharedModule {}
