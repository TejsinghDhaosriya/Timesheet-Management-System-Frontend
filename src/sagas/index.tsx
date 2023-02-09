import { all } from "redux-saga/effects";
import { watchApprovalsAsync } from "../modules/approvals-page/saga/ApprovalSaga";
import { watchUsersAsync } from "../modules/projects-page/saga/projectSaga";


export function* rootSaga() {
    yield all([
        watchUsersAsync(),
        watchApprovalsAsync()
    ])
}