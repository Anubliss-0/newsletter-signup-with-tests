import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "stayUpdated": "Stay Updated!"
                }
            },
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export { i18n, useTranslation };