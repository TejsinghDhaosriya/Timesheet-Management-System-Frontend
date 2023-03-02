import { put, takeEvery } from "redux-saga/effects";
import {
  DELETE_APPROVALS,
  GET_APPROVALS,
  GET_APPROVALS_WEEK,
  UPDATE_ALL_APPROVALS,
  UPDATE_APPROVAL,
} from "../actions/approvalTypes";
import {
  deleteApprovalByIdAPI,
  getApprovalAPI,
  getApprovalByWeek,
  updateAllApprovalsAPI,
  updateApprovalAPI,
} from "../APIs/approvalAPIs";
import {
  deleteApproval,
  getApprovals,
} from "../reducers/approvals";

export function* getApprovalSaga(): any {
  const a = yield getApprovalAPI();
  yield put(getApprovals(a.data));
}
export function* getApprovalWeekSaga(action: any): any {
  const a = yield getApprovalByWeek(action);
  yield put(getApprovals(a.data));
}
export function* updateApprovalSaga(action: any) {
  yield updateApprovalAPI(action.approval);
  //yield put(updateApproval(action.approval));
  yield getApprovalSaga()
}
export function* updateAllApprovalSaga(action:any){
  console.log(action.result)
  yield updateAllApprovalsAPI(action.result)
  
}

export function* deleteApprovalSaga(action: any) {
  yield deleteApprovalByIdAPI(action.id);
  yield put(deleteApproval(action.id));
}

export function* watchApprovalsAsync() {
  yield takeEvery(GET_APPROVALS, getApprovalSaga);
  yield takeEvery(GET_APPROVALS_WEEK, getApprovalWeekSaga);
  yield takeEvery(UPDATE_APPROVAL, updateApprovalSaga);
  yield takeEvery(UPDATE_ALL_APPROVALS,updateAllApprovalSaga);
  yield takeEvery(DELETE_APPROVALS, deleteApprovalSaga);
}
