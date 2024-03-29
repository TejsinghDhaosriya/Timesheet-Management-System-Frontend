import { all } from "redux-saga/effects";
import { watchApprovalsAsync } from "../modules/approvals-page/saga/ApprovalSaga";
import { watchUserInfoAsync } from "../modules/approvals-page/saga/UserInfoSaga";
import { watchUsersAsync } from "../modules/projects-page/saga/projectSaga";
import { watchTimeSheetAsync } from "../modules/timesheet-page/saga/timesheetSaga";


export function* rootSaga() {
    yield all([
        watchUsersAsync(),
        watchApprovalsAsync(),
        watchTimeSheetAsync(),
        watchUserInfoAsync(),
    ])
}