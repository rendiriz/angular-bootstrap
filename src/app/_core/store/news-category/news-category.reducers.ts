import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { NewsCategoryData } from '@models';
import { fromNewsCategoryActions } from '@store/news-category/news-category.actions';

export const ENTITY_FEATURE_KEY = 'newsCategory';

export interface State extends EntityState<NewsCategoryData> {
  isLoadingList: boolean;
  isLoadingCreate: boolean;
  isLoadingRead: boolean;
  isLoadingUpdate: boolean;
  isLoadingDelete: boolean;
  metadata: any;
  pagination: any;
  error?: Error | any;
}

export const adapter: EntityAdapter<NewsCategoryData> = createEntityAdapter<NewsCategoryData>({
  selectId: (item) => String(item.id_news_category),
});

export interface EntityPartialState {
  readonly [ENTITY_FEATURE_KEY]: State;
}

export const initialState: State = adapter.getInitialState({
  isLoadingList: false,
  isLoadingCreate: false,
  isLoadingRead: false,
  isLoadingUpdate: false,
  isLoadingDelete: false,
  metadata: null,
  pagination: null,
  error: null,
});

const reducer = createReducer(
  initialState,

  // Load All
  on(fromNewsCategoryActions.loadAllNewsCategory, (state) => {
    return {
      ...state,
      isLoadingList: true,
      error: null,
    };
  }),
  on(fromNewsCategoryActions.loadAllNewsCategorySuccess, (state: any, { data, pagination }) => {
    if (!pagination.infinite) {
      return adapter.setAll(data, {
        ...state,
        isLoadingList: false,
        pagination,
        error: { error: false },
      });
    } else if (pagination.infinite) {
      if (pagination.current_page === 1) {
        return adapter.setAll(data, {
          ...state,
          isLoadingList: false,
          pagination,
          error: { error: false },
        });
      } else {
        return adapter.addMany(data, {
          ...state,
          isLoadingList: false,
          pagination,
          error: { error: false },
        });
      }
    }
  }),
  on(fromNewsCategoryActions.loadAllNewsCategoryFailure, (state, { error }) => {
    return {
      ...state,
      isLoadingList: false,
      error,
    };
  }),

  // Load Single
  on(fromNewsCategoryActions.loadNewsCategory, (state) => {
    return {
      ...state,
      isLoadingRead: true,
      error: null,
    };
  }),
  on(fromNewsCategoryActions.loadNewsCategorySuccess, (state, { data }) => {
    return adapter.addOne(data, {
      ...state,
      isLoadingRead: false,
      error: { error: false },
    });
  }),
  on(fromNewsCategoryActions.loadNewsCategoryFailure, (state, { error }) => {
    return {
      ...state,
      isLoadingRead: false,
      error,
    };
  }),

  // Create
  on(fromNewsCategoryActions.createNewsCategory, (state) => {
    return {
      ...state,
      isLoadingCreate: true,
      error: null,
    };
  }),
  on(fromNewsCategoryActions.createNewsCategorySuccess, (state, { data }) => {
    return adapter.addOne(data, {
      ...state,
      isLoadingCreate: false,
      error: { error: false },
    });
  }),
  on(fromNewsCategoryActions.createNewsCategoryFailure, (state, { error }) => {
    return {
      ...state,
      isLoadingCreate: false,
      error,
    };
  }),

  // Update
  on(fromNewsCategoryActions.updateNewsCategory, (state) => {
    return {
      ...state,
      isLoadingUpdate: true,
      error: null,
    };
  }),
  on(fromNewsCategoryActions.updateNewsCategorySuccess, (state, { data }) => {
    return adapter.updateOne(
      { id: data.id, changes: data },
      {
        ...state,
        isLoadingUpdate: false,
        error: { error: false },
      }
    );
  }),
  on(fromNewsCategoryActions.updateNewsCategoryFailure, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),

  // Clear
  on(fromNewsCategoryActions.clearNewsCategory, (state) => {
    return adapter.removeAll({
      ...state,
      isLoadingList: false,
      pagination: { empty: true },
      error: { error: false },
    });
  })
);

export function NewsCategoryReducer(state: State | undefined, action: Action): any {
  return reducer(state, action);
}
