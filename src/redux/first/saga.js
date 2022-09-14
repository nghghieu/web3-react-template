import { put, takeLeading } from 'redux-saga/effects';

import { apiErrorHandler } from 'utils';

import { FIRST, FIRST_FAILED, FIRST_SUCCESS } from './actionTypes';

function* firstAction() {
  try {
    yield put({
      type: FIRST_SUCCESS,
    });
  } catch (error) {
    apiErrorHandler(error);
    yield put({ type: FIRST_FAILED });
  }
}

export default function* sagas() {
  yield takeLeading(FIRST, firstAction);
}
