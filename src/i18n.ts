import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { createI18nStore } from 'svelte-i18next';

void i18next
	.use(HttpBackend)
	.use(LanguageDetector)
	.init({
		detection: {
			order: ['querystring', 'localStorage', 'navigator'],
			caches: ['localStorage'],
			lookupQuerystring: 'locale',
			lookupLocalStorage: 'locale'
		},
		fallbackLng: 'en-US',
		backend: {
			loadPath: '/digital-bequest/lang/{{lng}}.json'
		},
		interpolation: {
			escapeValue: false // not needed for svelte as it escapes by default
		}
	});

const i18n = createI18nStore(i18next);

export default i18n;
