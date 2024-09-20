import i18n from 'i18next'
import { initReactI18next, useTranslation, withTranslation } from 'react-i18next'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "signUp": {
                        "stayUpdated": "Stay updated!",
                        "callToAction": "Join 60,000+ product managers receiving monthly updates on:",
                        "bullet1": "Product discovery and building what matters",
                        "bullet2": "Measuring to ensure updates are a success",
                        "bullet3": "And much more!",
                        "emailAddress": "Email address",
                        "emailPlaceholder": "email@company.com",
                        "submitButton": "Subscribe to monthly newsletter",
                        "invalidEntryMessage": "Valid email required"
                    },
                    "confirmation": {
                        "thanks": "Thanks for subscribing!",
                        "message": "A confirmation email has been sent to {{email}}. Please open it and click the button inside to confirm your subscription."
                    }
                }
            },
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    })

export { i18n, useTranslation, withTranslation }