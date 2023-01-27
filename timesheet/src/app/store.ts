import { configureStore, ThunkAction, Action,applyMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import timesheetReducer from '../modules/timesheet-page/timesheetSlice';
import createSagaMiddleware from "redux-saga";
// import rootSaga from './rootSaga';

export const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    timesheet:timesheetReducer
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(sagaMiddleware)
});


//sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
