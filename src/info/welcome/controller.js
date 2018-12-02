import Log from 'helpers/log';
import radio from 'radio';
import appModel from 'app_model';
import speciesCollection from 'common/species_collection';
import MainView from '../../settings/country/main_view';
import MainViewLanguage from '../../settings/language/main_view';

const API = {
  show() {
    radio.trigger('app:header:hide');
    radio.trigger('app:footer:hide');

    API.showLanguageSelection();

    radio.trigger('app:header:hide');
    radio.trigger('app:footer:hide');
  },

  showCountrySelection() {
    const mainView = new MainView({ model: appModel });
    radio.trigger('app:main', mainView);

    // if exit on selection click
    mainView.on('save', () => {
      API.saveCountry(mainView);
      appModel.save({ showWelcome: false });
      radio.trigger('home');
    });
  },

  showLanguageSelection() {
    const mainView = new MainViewLanguage({ model: appModel });
    radio.trigger('app:main', mainView);

    // if exit on selection click
    mainView.on('save', () => {
      API.saveLanguage(mainView);
      const language = appModel.get('language');
      if (language === 'NL' || language === 'FR') {
        API.showCountrySelection();
        return;
      }

      // apart from BE, the codes are the same for all the countries
      const locales = {
        EN: 'UK',
        SK: 'SK',
        CZ: 'CZ',
        ITA: 'ITA',
        PT: 'PT',
      };

      appModel.save({ country: locales[language] });

      appModel.save({ showWelcome: false });
      radio.trigger('home');
    });
  },

  saveCountry(mainView) {
    Log('Info:Welcome:Controller: exit country.');

    const value = mainView.getValues();
    if (value) {
      appModel.save({ country: value });
      speciesCollection.filterList(); // update collection
    }
  },

  saveLanguage(mainView) {
    Log('Info:Welcome:Controller: exit language.');

    const value = mainView.getValues();
    if (value) {
      appModel.set('language', value);
      appModel.save();
    }
  },
};

export { API as default };
