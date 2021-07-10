import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { undo } from 'ngrx-undo';

import { fromNewsCategoryActions } from '@store/news-category/news-category.actions';
import { NewsCategoryService } from '@services';

const handlePromise = async (promise: Promise<any>) => {
  try {
    const data = await promise;
    return [data, undefined];
  } catch (error) {
    return await Promise.resolve([undefined, error]);
  }
};

@Injectable()
export class NewsCategoryEffects {
  name = 'News Category';

  loadAllNewsCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNewsCategoryActions.loadAllNewsCategory),
      switchMap(async (action) => {
        const [result, resultErr] = await handlePromise(
          this.newsCategoryService.getList(action.params).toPromise()
        );

        if (resultErr) {
          return this.loadAllFailure(resultErr.message);
        }

        if (result.error === 1) {
          if (result.message === 'Data not found.') {
            return fromNewsCategoryActions.clearNewsCategory();
          } else {
            return this.loadAllFailure(result.message);
          }
        }

        let pagination = { empty: true, infinite: action.infinite };
        if (action.pagination) {
          const resultPagination = result.pagination;

          pagination = { empty: false, infinite: action.infinite, ...resultPagination };
        }

        return this.loadAllSuccess(result.data, pagination);
      })
    )
  );

  loadNewsCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNewsCategoryActions.loadNewsCategory),
      switchMap((action) => {
        return this.newsCategoryService.getSingle(action.id, action.params).pipe(
          map((result: any) =>
            fromNewsCategoryActions.loadNewsCategorySuccess({
              data: result.data,
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              fromNewsCategoryActions.loadNewsCategoryFailure({
                error: {
                  name: this.name,
                  error: !error.ok,
                  message: error.message,
                },
              })
            )
          )
        );
      })
    )
  );

  createNewsCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNewsCategoryActions.createNewsCategory),
      switchMap((action) =>
        this.newsCategoryService.createItem(action.create).pipe(
          map((res: any) => {
            return fromNewsCategoryActions.createNewsCategorySuccess({
              data: res.data,
            });
          }),
          catchError((error) => {
            return of(
              fromNewsCategoryActions.createNewsCategoryFailure({
                error: {
                  name: this.name,
                  error: !error.ok,
                  message: error.message,
                },
              }),
              undo(action)
            );
          })
        )
      )
    )
  );

  updateNewsCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromNewsCategoryActions.updateNewsCategory),
      switchMap((action) =>
        this.newsCategoryService.updateItem(action.update.id, action.update).pipe(
          map((res: any) => {
            return fromNewsCategoryActions.updateNewsCategorySuccess({
              data: res.data,
            });
          }),
          catchError((error) => {
            return of(
              fromNewsCategoryActions.updateNewsCategoryFailure({
                error: {
                  name: this.name,
                  error: true,
                  message: error.message,
                },
              }),
              undo(action)
            );
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private newsCategoryService: NewsCategoryService) {}

  loadAllSuccess(data: any, pagination: any): any {
    return fromNewsCategoryActions.loadAllNewsCategorySuccess({
      data,
      pagination,
    });
  }

  loadAllFailure(error: string): any {
    return fromNewsCategoryActions.loadAllNewsCategoryFailure({
      error: {
        name: this.name,
        error: true,
        message: error,
      },
    });
  }
}
