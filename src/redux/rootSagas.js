import { all, fork } from 'redux-saga/effects';

import first from 'redux/first/saga';

export default function* rootSagas() {
  yield all([
    fork(first),
  ]);
}
