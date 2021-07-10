import { createAction, props } from '@ngrx/store';
import { NewsCategoryData } from '@models';

export enum NewsCategoryActionTypes {
  LoadAllNewsCategory = '[NEWS CATEGORY] Load All NewsCategory',
  LoadAllNewsCategorySuccess = '[NEWS CATEGORY] Load All NewsCategory Success',
  LoadAllNewsCategoryFailure = '[NEWS CATEGORY] Load All NewsCategory Failure',
  LoadNewsCategory = '[NEWS CATEGORY] Load NewsCategory',
  LoadNewsCategorySuccess = '[NEWS CATEGORY] Load NewsCategory Success',
  LoadNewsCategoryFailure = '[NEWS CATEGORY] Load NewsCategory Failure',
  CreateNewsCategory = '[NEWS CATEGORY] Create NewsCategory',
  CreateNewsCategorySuccess = '[NEWS CATEGORY] Create NewsCategory Success',
  CreateNewsCategoryFailure = '[NEWS CATEGORY] Create NewsCategory Failure',
  UpdateNewsCategory = '[NEWS CATEGORY] Update NewsCategory',
  UpdateNewsCategorySuccess = '[NEWS CATEGORY] Update NewsCategory Success',
  UpdateNewsCategoryFailure = '[NEWS CATEGORY] Update NewsCategory Failure',
  ClearNewsCategory = '[NEWS CATEGORY] Clear NewsCategory',
}

// Load All
export const loadAllNewsCategory = createAction(
  NewsCategoryActionTypes.LoadAllNewsCategory,
  props<{ params: any; pagination: boolean; infinite: boolean }>()
);

export const loadAllNewsCategorySuccess = createAction(
  NewsCategoryActionTypes.LoadAllNewsCategorySuccess,
  props<{ data: NewsCategoryData[]; pagination: any }>()
);

export const loadAllNewsCategoryFailure = createAction(
  NewsCategoryActionTypes.LoadAllNewsCategoryFailure,
  props<{ error: Error | any }>()
);

// Load Single
export const loadNewsCategory = createAction(
  NewsCategoryActionTypes.LoadNewsCategory,
  props<{ id: number; params: any }>()
);

export const loadNewsCategorySuccess = createAction(
  NewsCategoryActionTypes.LoadNewsCategorySuccess,
  props<{ data: NewsCategoryData }>()
);

export const loadNewsCategoryFailure = createAction(
  NewsCategoryActionTypes.LoadNewsCategoryFailure,
  props<{ error: Error | any }>()
);

// Create
export const createNewsCategory = createAction(
  NewsCategoryActionTypes.CreateNewsCategory,
  props<{ create: any }>()
);

export const createNewsCategorySuccess = createAction(
  NewsCategoryActionTypes.CreateNewsCategorySuccess,
  props<{ data: NewsCategoryData }>()
);

export const createNewsCategoryFailure = createAction(
  NewsCategoryActionTypes.CreateNewsCategoryFailure,
  props<{ error: Error | any }>()
);

// Update
export const updateNewsCategory = createAction(
  NewsCategoryActionTypes.UpdateNewsCategory,
  props<{ update: any }>()
);

export const updateNewsCategorySuccess = createAction(
  NewsCategoryActionTypes.UpdateNewsCategorySuccess,
  props<{ data: NewsCategoryData }>()
);

export const updateNewsCategoryFailure = createAction(
  NewsCategoryActionTypes.UpdateNewsCategoryFailure,
  props<{ error: Error | any }>()
);

// Clear
export const clearNewsCategory = createAction(NewsCategoryActionTypes.ClearNewsCategory);

export const fromNewsCategoryActions = {
  loadAllNewsCategory,
  loadAllNewsCategorySuccess,
  loadAllNewsCategoryFailure,
  loadNewsCategory,
  loadNewsCategorySuccess,
  loadNewsCategoryFailure,
  createNewsCategory,
  createNewsCategorySuccess,
  createNewsCategoryFailure,
  updateNewsCategory,
  updateNewsCategorySuccess,
  updateNewsCategoryFailure,
  clearNewsCategory,
};
