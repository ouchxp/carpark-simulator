import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from 'sagas';
import { rootReducer } from 'reducers';
import App from 'components/App';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);
const store = createStore(() => {}, undefined, composeWithDevTools(middleware));

store.replaceReducer(rootReducer);
let rootSagaTask = sagaMiddleware.run(rootSaga);

function render(Component) {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  );
}

render(App);

// Hot reloading setup for render/reducer/saga
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('components/App', () => {
      render(App);
    });

    module.hot.accept('reducers', () => {
      // eslint-disable-next-line global-require
      const { rootReducer: newReducer } = require('reducers');
      store.replaceReducer(newReducer);
    });

    module.hot.accept('sagas', () => {
      // eslint-disable-next-line global-require
      const { rootSaga: newSaga } = require('sagas');
      rootSagaTask.cancel();
      rootSagaTask = sagaMiddleware.run(newSaga);
    });
  }
}
