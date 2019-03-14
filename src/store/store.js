import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import { reducer as i18n } from 'react-native-redux-i18n';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { all } from 'redux-saga/effects'

import globalReducer from './global';
import walletReducer from './wallet';
import newWalletReducer from './newWallet';
import importWalletReducer from './importWallet';
import withdrawReducer from './withdraw';
import settingReducer from './setting';
import currencyReducer from './currency';
import exchangeReducer from './exchange';
import exchangeTransactionReducer from './exchangeTransaction';
import tutorialReducer from './tutorial';


const reducers = combineReducers({
    global: persistReducer({
        key: 'global',
        storage: storage,
        whitelist: ['isLanguageSet', 'tag'],
    }, globalReducer),
    wallet: persistReducer({
        key: 'wallet',
        storage: storage,
    }, walletReducer),
    newWallet: newWalletReducer,
    importWallet: importWalletReducer,
    withdraw: withdrawReducer,
    setting: persistReducer({
        key: 'setting',
        storage: storage,
        whitelist: ['passcode', 'protectedByPasscode'],
    }, settingReducer),
    currency: persistReducer({
        key: 'currency',
        storage: storage,
        whitelist: ['data'],
    }, currencyReducer),
    exchange: exchangeReducer,
    exchangeTransaction: exchangeTransactionReducer,
    tutorial: persistReducer({
        key: 'tutorial',
        storage: storage,
    }, tutorialReducer),
    i18n: persistReducer({
        key: 'i18n',
        storage: storage,
    }, i18n),
});

const sagaMiddleware = createSagaMiddleware();
const middleWares = [thunk, sagaMiddleware];

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
import { newWalletSaga } from './newWallet';
import { importWalletSaga } from './importWallet';
import { exchangeSaga } from './exchange';
import { walletSaga } from './wallet';
import { withdrawSaga } from './withdraw';

sagaMiddleware.run(function* () {
    yield all([
        newWalletSaga(),
        importWalletSaga(),
        exchangeSaga(),
        walletSaga(),
        withdrawSaga(),
    ]);
});

export const persistor = persistStore(store);

export const dispatch = store.dispatch;
export const getState = store.getState;

export default store;
