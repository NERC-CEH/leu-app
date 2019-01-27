/* eslint-disable camelcase */
import appModel from 'app_model';
import cs_CZ from '../translations/cs_CZ.po';
import en_GB from '../translations/en_GB.pot';
import fr_BE from '../translations/fr_BE.po';
import it_IT from '../translations/it_IT.po';
import nl_BE from '../translations/nl_BE.po';
import pt_PT from '../translations/pt_PT.po';
import sk_SK from '../translations/sk_SK.po';

const dictionary = {
  cs_CZ,
  en_GB,
  fr_BE,
  it_IT,
  nl_BE,
  pt_PT,
  sk_SK
};

export const languages = {
  cs_CZ: 'Čeština',
  nl_BE: 'Dutch',
  en_GB: 'English',
  fr_BE: 'Français',
  it_IT: 'Italiano',
  pt_PT: 'Português',
  sk_SK: 'Slovenčina'
};

export const languageToCountryMap = {
  cs_CZ: 'CZ',
  en_GB: 'UK', // different!
  it_IT: 'IT',
  pt_PT: 'PT',
  sk_SK: 'SK'
  // nl_BE: '',
  // fr_BE: '',
};

function translate(key) {
  const language = appModel.get('language');

  const translation = dictionary[language][key];
  if (!translation) {
    window.dic = window.dic || [];
    if (!window.dic.includes(key)) {
      window.dic.push(key);
      console.log(`!new: ${key}`); // todo: remove
    }
    return key;
  }

  if (!translation) {
    return key;
  }

  return translation;
}

window.t = translate;

export default translate;
