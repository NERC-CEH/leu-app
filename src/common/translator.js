import dictionary from 'translations.data';
import appModel from 'app_model';

function translate(key) {
  const language = appModel.get('language');
  const translations = dictionary[key];
  if (!translations) {
    return key;
  }

  const translated = translations[language];
  if (!translated) {
    return key;
  }

  return translated;
}

window.t = translate;

export default translate;