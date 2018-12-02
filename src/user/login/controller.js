/** ****************************************************************************
 * User Login controller.
 *****************************************************************************/
import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import radio from 'radio';
import Log from 'helpers/log';
import Device from 'helpers/device';
import CONFIG from 'config';
import userModel from 'user_model';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';

const API = {
  show() {
    Log('User:Register:Controller: showing.');
    // don't show if logged in
    if (userModel.hasLogIn()) {
      window.history.back();
    }

    // MAIN
    const mainView = new MainView();
    radio.trigger('app:main', mainView);

    // HEADER
    const headerView = new HeaderView({
      model: new Backbone.Model({
        title: t('Login'),
      }),
    });
    radio.trigger('app:header', headerView);

    mainView.on('form:submit', data => {
      if (!Device.isOnline()) {
        radio.trigger('app:dialog', {
          title: t('Sorry'),
          body: t('Looks like you are offline!'),
        });
        return;
      }

      const validationError = userModel.validateLogin(data);
      if (!validationError) {
        mainView.triggerMethod('form:data:invalid', {}); // update form
        radio.trigger('app:loader');
        API.login(data)
          .then(() => {
            radio.trigger('app:loader:hide');
            window.history.back();
          })
          .catch(err => {
            Log(err, 'e');
            radio.trigger('app:dialog:error', err);
          });
      } else {
        mainView.triggerMethod('form:data:invalid', validationError);
      }
    });

    // FOOTER
    radio.trigger('app:footer:hide');
  },

  /**
   * Starts an app sign in to the Drupal site process.
   * The sign in endpoint is specified by CONFIG.login.url -
   * should be a Drupal sight using iForm Mobile Auth Module.
   *
   * It is important that the app authorises itself providing
   * api_key for the mentioned module.
   */
  login(details) {
    Log('User:Login:Controller: logging in.');
    const userAuth = btoa(`${details.name}:${details.password}`);

    const url = CONFIG.users.url + encodeURIComponent(details.name); // url + user id
    const headers = {
      Authorization: `Basic ${userAuth}`,
      'x-api-key': CONFIG.indicia.api_key,
      'content-type': 'plain/text',
    };

    return (
      fetch(url, {
        mode: 'cors',
        headers,
      })
        .then(this.tempCurlFix)
        // .then(res => res.json())
        .then(res => {
          this.checkLoginErr(res);

          const fullData = Object.assign({}, res.data, {
            password: details.password,
          });
          userModel.logIn(fullData);
          return fullData;
        })
    );
  },

  tempCurlFix(res) {
    const curlErrText =
      '<div class="error">cUrl POST request failed. Please check cUrl is installed on the server and the $base_url setting is correct.<br/>URL:index.php/services/security/get_nonce<br/>Error number: 6<br/>Error message: Could not resolve host: index.php<br/>Server response<br/></div>';
    return res.text().then(textRes => {
      if (textRes.includes(curlErrText)) {
        textRes = textRes.replace(curlErrText, '');
      }
      return JSON.parse(textRes);
    });
  },

  checkRegisterErr(res) {
    if (res.errors) {
      let message = res.errors.reduce(
        (name, err) => `${name}${err.title}\n`,
        ''
      );
      throw new Error(message);
    }

    const data = res.data || {};
    if (!data.id || !data.email || !data.name) {
      throw new Error('Error while retrieving login response.');
    }
  },
};

export { API as default };
