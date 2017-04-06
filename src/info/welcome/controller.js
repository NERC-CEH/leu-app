import Log from 'helpers/log';
import radio from 'radio';
import appModel from 'app_model';
import speciesCollection from 'common/species_collection';
import MainView from '../../settings/locale/main_view';
import MainViewLanguage from '../../settings/language/main_view';

const API = {
  show() {
    const mainView = new MainView({ model: appModel });
    radio.trigger('app:main', mainView);

    radio.trigger('app:header:hide');
    radio.trigger('app:footer:hide');

    // if exit on selection click
    mainView.on('save', () => {
      API.onExit(mainView, () => {
        radio.trigger('home');
      });
    });

    radio.trigger('app:main', mainView);

    radio.trigger('app:header:hide');
    radio.trigger('app:footer:hide');
  },

  onExit(mainView, callback) {
    Log('Info:Welcome:Controller: exit country.');
    appModel.save({ showWelcome: false });

    const value = mainView.getValues();
    if (value) {
      appModel.save({ country: value });
      speciesCollection.filterList(); // update collection
      callback();
    }
  },

  onExitLanguage(mainView, callback) {
    Log('Info:Welcome:Controller: exit language.');
    appModel.save({ showWelcome: false });

    const value = mainView.getValues();
    if (value) {
      appModel.save({ country: value });
      speciesCollection.filterList(); // update collection
      callback();
    }
  },
};

export { API as default };
