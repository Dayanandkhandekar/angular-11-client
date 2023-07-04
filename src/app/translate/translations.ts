// app/translate/translation.ts

import { InjectionToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_MR_NAME, LANG_MR_TRANS } from './lang-mr';
import { LANG_HI_NAME, LANG_HI_TRANS } from './lang-hi';


// translation token
export const TRANSLATIONS = new InjectionToken('translations');

// all traslations
export const dictionary = {
	[LANG_EN_NAME]: LANG_EN_TRANS,
	[LANG_MR_NAME]: LANG_MR_TRANS,
	[LANG_HI_NAME]: LANG_HI_TRANS,
};

// providers
export const TRANSLATION_PROVIDERS = [
	{ provide: TRANSLATIONS, useValue: dictionary },
];