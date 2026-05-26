import { configureStore } from '@reduxjs/toolkit';

import { workLogApi } from './api/work-log';

export const store = configureStore({
  reducer: {
    [workLogApi.reducerPath]: workLogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(workLogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
