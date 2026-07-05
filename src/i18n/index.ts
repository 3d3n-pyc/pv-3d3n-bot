import i18next from 'i18next';
import fs from 'fs';
import path from 'path';

// Dynamically load all locales
const localesPath = path.join(__dirname, '../locales');
const resources: Record<string, any> = {};

if (fs.existsSync(localesPath)) {
  const files = fs.readdirSync(localesPath).filter(file => file.endsWith('.json'));
  for (const file of files) {
    const lang = file.replace('.json', '');
    const fileContent = fs.readFileSync(path.join(localesPath, file), 'utf8');
    const translation = JSON.parse(fileContent);
    resources[lang] = { translation };
  }
}

i18next.init({
  fallbackLng: 'en',
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export const t = (key: string, locale: string = 'en', options?: any) => {
  // Map discord locales to our locales, default to 'en' if the exact locale isn't found
  const lang = locale.split('-')[0]; // Extract base language (e.g., 'fr' from 'fr-FR')
  const resolvedLang = resources[lang] ? lang : 'en';
  
  return i18next.t(key, { lng: resolvedLang, ...options }) as string;
};

export default i18next;
