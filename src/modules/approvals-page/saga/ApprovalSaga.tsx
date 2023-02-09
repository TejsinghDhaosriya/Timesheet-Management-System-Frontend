import { put, takeEvery } from "redux-saga/effects";
import { DELETE_APPROVALS, GET_APPROVALS, UPDATE_APPROVAL } from "../actions/approvalTypes";
import { deleteApprovalByIdAPI, getApprovalAPI, updateApprovalAPI } from "../APIs/approvalAPIs";
import { deleteApproval, getApprovals, updateApproval } from "../reducers/approvals";

export function* getApprovalSaga():any{
    const a=yield getApprovalAPI()
    yield put(getApprovals(a.data))
}

export function* updateApprovalSaga(action:any){
    console.log(action.approval);
    yield updateApprovalAPI(action.approval)
    yield put(updateApproval(action.approval))
}

export function* deleteApprovalSaga(action:any){
    yield deleteApprovalByIdAPI(action.id)
    yield put(deleteApproval(action.id))
}

export function* watchApprovalsAsync(){
    yield takeEvery(GET_APPROVALS,getApprovalSaga)
    yield takeEvery(UPDATE_APPROVAL,updateApprovalSaga)
    yield takeEvery(DELETE_APPROVALS,deleteApprovalSaga)
}