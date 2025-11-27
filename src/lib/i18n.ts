import { getLocale } from './utils';
import ar from '@/i18n/ar.js';
import en from '@/i18n/en.js';

const locale  = getLocale();
export function __(key, replace = key) {
    return useTranslations(key, replace, locale); 
    
}
export function trans(key, replace = key) {
    return useTranslations(key, replace, locale);
}

export function useTranslations(key, replacements = {}, locale = 'en') {
        if(!key) return key;
        let text = key.split('.').reduce((obj, k) => obj?.[k], locale == "ar" ? ar : en);
        if (typeof text !== 'string') return key;

        Object.entries(replacements).forEach(([k, v]) => {
            const placeholder1 = `:${k}`;
            const placeholder2 = `{{${k}}}`;
            text = text.split(placeholder1).join(v).split(placeholder2).join(v);
        });
        return text;
}

export function getDir(): any {
  return document.documentElement.dir;
}