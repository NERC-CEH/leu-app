import Log from 'helpers/log';
import radio from 'radio';
import appModel from 'app_model';
import speciesCollection from 'common/species_collection';
import MainView from '../../settings/locale/main_view';
import MainViewLanguage from '../../settings/language/main_view';

const API = {
  show() {
    radio.trigger('app:header:hide');
    radio.trigger('app:footer:hide');

    API.showCountrySelection();

    radio.trigger('app:header:hide');
    radio.trigger('app:footer:hide');
  },

  showCountrySelection() {
    const mainView = new MainView({ model: appModel });
    radio.trigger('app:main', mainView);

    // if exit on selection click
    mainView.on('save', () => {
      API.onExit(mainView);
      const locale = appModel.get('country');
      if (locale === 'BE') {
        API.showLanguageSelection();
        return;
      }
      radio.trigger('home');
    });
  },

  showLanguageSelection() {
    const mainView = new MainViewLanguage({ model: appModel });
    radio.trigger('app:main', mainView);

    // if exit on selection click
    mainView.on('save', () => {
      API.onExitLanguage(mainView);
      radio.trigger('home');
    });
  },

  onExit(mainView) {
    Log('Info:Welcome:Controller: exit country.');
    appModel.save({ showWelcome: false });

    const value = mainView.getValues();
    if (value) {
      appModel.save({ country: value });
      speciesCollection.filterList(); // update collection
    }
  },

  onExitLanguage(mainView) {
    Log('Info:Welcome:Controller: exit language.');

    const value = mainView.getValues();
    if (value) {
      appModel.set('language', value);
      appModel.save();
    }
  },
};

export { API as default };
