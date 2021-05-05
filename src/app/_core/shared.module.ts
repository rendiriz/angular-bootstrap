import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// PACKAGE
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HighlightJsModule } from 'ngx-highlight-js';

// COMPONENT
import { PageComponent as HeaderPageComponent } from '@components/header/page/page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // PACKAGE
    TranslateModule,
    LocalizeRouterModule,
    LoadingBarRouterModule,
    HighlightJsModule,
  ],
  declarations: [
    // COMPONENT
    HeaderPageComponent,
  ],
  exports: [
    RouterModule,
    // PACKAGE
    TranslateModule,
    LocalizeRouterModule,
    LoadingBarRouterModule,
    HighlightJsModule,
    // COMPONENT
    HeaderPageComponent,
  ],
  providers: [],
})
export class SharedModule {}
