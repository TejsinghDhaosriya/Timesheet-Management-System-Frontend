import { put, takeEvery } from "redux-saga/effects";
import { SET_USER_INFO } from "../actions/approvalTypes";
import { setUsersInfo } from "../reducers/userSlice";

export function* setUserInfoSaga(action:any): any {
  yield put(setUsersInfo(action.data));
}

export function* watchUserInfoAsync() {
  yield takeEvery(SET_USER_INFO, setUserInfoSaga);
}
