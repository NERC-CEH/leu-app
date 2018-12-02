import Backbone from 'backbone';
import Log from 'helpers/log';
import radio from 'radio';
import savedSamples from 'saved_samples';
import userModel from '../../common/models/user_model';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';

function showLogoutConfirmationDialog(callbackIfTrue) {
  radio.trigger('app:dialog', {
    title: 'Are you sure you want to logout?',
    buttons: [
      {
        title: 'Cancel',
        type: 'clear',
        onClick() {
          radio.trigger('app:dialog:hide');
        },
      },
      {
        title: 'Logout',
        class: 'btn-negative',
        onClick() {
          callbackIfTrue();
          radio.trigger('app:dialog:hide');
        },
      },
    ],
  });
}

const API = {
  show() {
    const mainView = new MainView({
      model: new Backbone.Model({ userModel, savedSamples }),
    });
    radio.trigger('app:main', mainView);

    mainView.on('user:logout', API.logout);

    const headerView = new HeaderView({
      model: new Backbone.Model({
        title: t('Info'),
      }),
    });
    radio.trigger('app:header', headerView);
  },

  logout() {
    showLogoutConfirmationDialog(() => {
      Log('Info:Menu:Controller: logging out.');
      userModel.logOut();
    });
  },
};

export { API as default };
