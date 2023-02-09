import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas';
import project from '../modules/projects-page/reducers/project';
import projects from '../modules/projects-page/reducers/projects';
import { watchUsersAsync } from '../modules/projects-page/saga/projectSaga';
import timesheetReducer from '../modules/timesheet-page/timesheetSlice';
import approval from '../modules/approvals-page/reducers/approvals';
import approvals from '../modules/approvals-page/reducers/approvals';


let sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export const store = configureStore({
  reducer: {
    project,
    projects,
    approval,
    approvals,
    timesheet:timesheetReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga)

   
