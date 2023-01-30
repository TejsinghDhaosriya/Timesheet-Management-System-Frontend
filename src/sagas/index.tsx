import { all } from "redux-saga/effects";
import { watchUsersAsync } from "../modules/projects-page/saga/projectSaga";


export function* rootSaga() {
    yield all([
        watchUsersAsync()
    ])
}