import dictionary from 'translations.data';
import appModel from 'app_model';

function translate(key) {
  let language = appModel.get('language');
  const locale = appModel.get('country');

  const translations = dictionary[key];
  if (!translations) {
    dictionary[key] = { CK: '' };
    console.log(`!new: ${key}`); // todo: remove
    return key;
  }

  if (locale === 'BE' &&
    (language === 'NL' || language === 'FR')) {
    language = `${locale}_${language}`;
  }

  const translated = translations[language];
  if (!translated) {
    return key;
  }

  return translated;
}

window.t = translate;

export default translate;
