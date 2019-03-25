import I18n from 'react-native-redux-i18n';
import en from './translations/en';

I18n.fallbacks = true;
I18n.translations = {
    en: en,
    _version: '1.0',
};


export default I18n;
