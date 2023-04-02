import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../sagas";
import project from "../modules/projects-page/reducers/project";
import projects from "../modules/projects-page/reducers/projects";
import approval from "../modules/approvals-page/reducers/approvals";
import approvals from "../modules/approvals-page/reducers/approvals";
import timesheetSlice from "../modules/timesheet-page/reducers/timesheetSlice";
import userSlice from "../modules/approvals-page/reducers/userSlice";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    project,
    projects,
    approval,
    approvals,
    timesheet: timesheetSlice,
    userInfo:userSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);
