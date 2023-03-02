import { put, takeEvery } from "redux-saga/effects";
import {
  deleteProjectSlice,
  editProjectSlice,
  getProjectsSlice,
} from "../reducers/projects";
import {
  createProjectAPI,
  deleteProjectByIdAPI,
  getProjectByIdAPI,
  getProjectsAPI,
  updateProjectAPI,
} from "../APIs/projectAPIs";
import {
  CREATE_PROJECT,
  DELETE_PROJECT_BY_ID,
  GET_PROJECTS,
  GET_PROJECT_BY_ID,
  UPDATE_PROJECT_BY_ID,
} from "../actions/projectTypes";
import { setProjectSlice } from "../reducers/project";

export function* getProjectSaga(): any {
  const projects = yield getProjectsAPI();
  yield put(getProjectsSlice(projects.data));
}

export function* getProjectByIdSaga(action: any) {
  yield getProjectByIdAPI(action.id);
  yield put(setProjectSlice(action.id));
}
export function* createProjectSaga(action: any) {
  yield createProjectAPI(action.project, action.orgId);
  // yield put(addProjectSlice(action.project))
  yield getProjectSaga();
}

export function* updateProjectSaga(action: any) {
  console.log(action.project);
  yield updateProjectAPI(action.project);
  yield put(editProjectSlice(action.project));
}

export function* deleteProjectByIdSaga(action: any) {
  yield deleteProjectByIdAPI(action.id);
  yield put(deleteProjectSlice(action.id));
}

export function* watchUsersAsync() {
  yield takeEvery(GET_PROJECTS, getProjectSaga);
  yield takeEvery(GET_PROJECT_BY_ID, getProjectByIdSaga);
  yield takeEvery(CREATE_PROJECT, createProjectSaga);
  yield takeEvery(UPDATE_PROJECT_BY_ID, updateProjectSaga);
  yield takeEvery(DELETE_PROJECT_BY_ID, deleteProjectByIdSaga);
}
