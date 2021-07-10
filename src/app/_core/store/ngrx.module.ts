import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { handleUndo } from 'ngrx-undo';

import { NewsCategoryReducer } from '@store/news-category/news-category.reducers';
import { NewsCategoryEffects } from '@store/news-category/news-category.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(
      {
        newsCategory: NewsCategoryReducer,
      },
      {
        metaReducers: [handleUndo],
      }
    ),
    EffectsModule.forRoot([NewsCategoryEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  exports: [StoreModule, EffectsModule, StoreDevtoolsModule],
})
export class NgrxModule {}
