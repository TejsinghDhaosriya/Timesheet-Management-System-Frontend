import { all } from "redux-saga/effects";
import { watchUsersAsync } from "./projectSaga";


export function* rootSaga() {
    yield all([
        watchUsersAsync()
    ])
}