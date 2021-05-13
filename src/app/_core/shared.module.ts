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
import { PageComponent as HeaderPageComponent } from '@components/header/page/page.component';

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
    HeaderPageComponent,
  ],
  providers: [],
})
export class SharedModule {}
