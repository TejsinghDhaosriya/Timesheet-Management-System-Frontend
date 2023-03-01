import { call, put, takeEvery, takeLatest } from "redux-saga/effects"
import { CREATE_TIMESHEET, DELETE_TIMESHEET, GET_TIMESHEETS, UPDATE_TIMESHEET } from "../actions/timesheetTypes"
import { createTimesheetAPI, deleteTimesheetByIdAPI, getTimesheetApi, updateTimesheetAPI } from "../APIs/timesheetAPIs"
import { addTimesheetData, deleteTimesheetData, setTimesheetData, setLoadingEnd, setLoadingStart,updateTimesheetData } from "../reducers/timesheetSlice"

export function * getTimesheetSaga(action:any):any{
    // const timehseet =yield getTimesheetApi()
    // yield put(setTimesheetData(timehseet.data))
    // console.log(action,"check aaaa")
    try {
        yield put(setLoadingStart());
        const data = yield getTimesheetApi(action.timesheeet)
        yield put(setTimesheetData(data.data))
      } catch (error) {
        console.log(error);
        yield put(setLoadingEnd());
      } 
}

export function* createTimesheetSaga(action:any){
    yield createTimesheetAPI(action.timesheetData, action.user, action.orgId, action.pId)
    yield put(addTimesheetData(action.timesheetData))
}

export function* deleteTimesheetByIdSaga(action:any){
    yield deleteTimesheetByIdAPI(action.id)
    yield put(deleteTimesheetData(action.id))
}

export function* updateTimesheetSaga(action:any){
    yield updateTimesheetAPI(action.tData)
    yield put(updateTimesheetData(action.tData))
}

export function* watchTimeSheetAsync(){
    yield takeLatest(GET_TIMESHEETS,getTimesheetSaga)
    yield takeEvery(CREATE_TIMESHEET,createTimesheetSaga)
    yield takeEvery(UPDATE_TIMESHEET,updateTimesheetSaga)
    yield takeEvery(DELETE_TIMESHEET,deleteTimesheetByIdSaga)
}