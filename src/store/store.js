import { createStore, combineReducers, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import { reducer as i18n } from 'react-native-redux-i18n';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { all } from 'redux-saga/effects';
import {
    createNavigationReducer,
    createReactNavigationReduxMiddleware,
    createReduxContainer
} from 'react-navigation-redux-helpers';
import Router from '../Router';


// Reducers
import globalReducer from './global/reducer';
const navReducer = createNavigationReducer(Router);


const reducers = combineReducers({
    global: globalReducer,
    nav: navReducer,
});

const navMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav,
  );
const sagaMiddleware = createSagaMiddleware();
const middleWares = [navMiddleware, thunk, sagaMiddleware];

if (__DEV__) {
    const { logger } = require(`redux-logger`);
    middleWares.push(logger);
}

const composeEnhancers =
    typeof window === 'object' &&
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && __DEV__) ?   
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) :
        (middleWares) => middleWares;

const enhancer = composeEnhancers (
  applyMiddleware(...middleWares),
);

const store = createStore(
    reducers,
    enhancer
);



// Saga
// import { newWalletSaga } from './newWallet';
// import { importWalletSaga } from './importWallet';
// import { exchangeSaga } from './exchange';
// import { walletSaga } from './wallet';
// import { withdrawSaga } from './withdraw';

sagaMiddleware.run(function* () {
    // yield all([
    //     newWalletSaga(),
    //     importWalletSaga(),
    //     exchangeSaga(),
    //     walletSaga(),
    //     withdrawSaga(),
    // ]);
});

export const persistor = persistStore(store);

export const dispatch = store.dispatch;
export const getState = store.getState;

export const RouterWithState = connect(
    (state) => ({
        state: state.nav,
    })
)(createReduxContainer(Router));

export default store;
