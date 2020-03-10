/** ****************************************************************************
 * Settings Menu controller.
 **************************************************************************** */
import Backbone from 'backbone';
import radio from 'radio';
import Log from 'helpers/log';
import appModel from 'app_model';
import userModel from 'user_model';
import savedSamples from 'saved_samples';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';

const API = {
  show() {
    Log('Settings:Menu:Controller: showing.');

    const mainView = new MainView({
      model: appModel,
    });
    mainView.on('setting:toggled', (setting, on) => {
      Log('Settings:Menu:Controller: setting toggled.');

      if (setting === 'useTraining') {
        appModel.unset('draftSampleID').save();
      }

      appModel.set(setting, on);
      appModel.save();
    });

    mainView.on('samples:submit:all', API.sendAllSamples);
    mainView.on('samples:delete:all', API.deleteAllSamples);
    mainView.on('app:reset', () => {
      radio.trigger('app:dialog', {
        title: t('Reset'),
        class: 'error',
        body: t(
          'Are you sure you want to reset the application to its initial state? This will wipe all the locally stored app data!'
        ),
        buttons: [
          {
            title: t('Cancel'),
            onClick() {
              radio.trigger('app:dialog:hide');
            },
          },
          {
            title: t('Reset'),
            class: 'btn-negative',
            onClick() {
              // delete all
              API.resetApp(() => {
                radio.trigger('app:dialog', {
                  title: t('Done!'),
                  timeout: 1000,
                });
              });
            },
          },
        ],
      });
    });

    radio.trigger('app:main', mainView);

    const headerView = new HeaderView({
      model: new Backbone.Model({
        title: t('Settings'),
      }),
    });
    radio.trigger('app:header', headerView);
  },

  deleteAllSamples() {
    let body = t(
      'Are you sure you want to delete all successfully synchronised local records?'
    );
    body += `</br><i><b>Note:</b>${t(
      'records on the server will not be touched'
    )}.</i>`;

    radio.trigger('app:dialog', {
      title: t('Delete All'),
      body,
      buttons: [
        {
          title: t('Cancel'),
          onClick() {
            radio.trigger('app:dialog:hide');
          },
        },
        {
          title: t('Delete'),
          class: 'btn-negative',
          onClick() {
            Log('Settings:Menu:Controller: deleting all samples.');

            // delete all
            savedSamples
              .removeAllSynced()
              .then(() => {
                radio.trigger('app:dialog', {
                  title: t('Done!'),
                  timeout: 1000,
                });
              })
              .catch(err => {
                Log(err, 'e');
                radio.trigger('app:dialog:error', err);
              });
          },
        },
      ],
    });
  },

  sendAllSamples() {
    radio.trigger('app:dialog', {
      title: t('Submit All'),
      body: t('Are you sure you want to set all valid records for submission?'),
      buttons: [
        {
          title: t('Cancel'),
          onClick() {
            radio.trigger('app:dialog:hide');
          },
        },
        {
          title: t('OK'),
          class: 'btn-positive',
          onClick() {
            Log('Settings:Menu:Controller: sending all samples.');
            savedSamples
              .syncAll()
              .then(() => {
                radio.trigger('app:dialog', {
                  title: t('Done!'),
                  timeout: 1000,
                });
              })
              .catch(err => {
                Log(err, 'e');
                radio.trigger('app:dialog:error', err);
              });
          },
        },
      ],
    });
  },

  resetApp(callback) {
    Log('Settings:Menu:Controller: resetting the application!', 'w');

    appModel.set(appModel.defaults);
    appModel.unset('draftSampleID');
    appModel.save();

    userModel.set(userModel.defaults);
    userModel.save();

    savedSamples
      .destroy()
      .then(callback)
      .catch(err => {
        Log(err, 'e');
        callback && callback(err);
      });
  },
};

export { API as default };
