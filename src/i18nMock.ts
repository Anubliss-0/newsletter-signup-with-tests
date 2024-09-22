export const mockI18nTranslation = (translations: Record<string, string>) => ({
    useTranslation: () => {
      return {
        t: (key: string, options?: Record<string, string>) => {
          if (options?.email && translations[key]) {
            return translations[key].replace('{{email}}', options.email);
          }
          return translations[key] || key;
        },
        i18n: {
          changeLanguage: () => new Promise(() => { }),
        },
      };
    },
    initReactI18next: {
      type: '3rdParty',
      init: () => { },
    }
  })