import dictionary from 'translations.data';
import appModel from 'app_model';

function translate(key) {
  let language = appModel.get('language');

  const translations = dictionary[key];
  if (!translations) {
    window.dic = window.dic || [];
    if (!window.dic.includes(key)) {
      window.dic.push(key);
      console.log(`!new: ${key}`); // todo: remove
    }
    return key;
  }

  if (language === 'NL' || language === 'FR') {
    language = `BE_${language}`;
  }

  const translated = translations[language];
  if (!translated) {
    return key;
  }

  return translated;
}

window.t = translate;

export default translate;
