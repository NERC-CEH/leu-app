/** ****************************************************************************
 * User Register controller.
 **************************************************************************** */
import Backbone from 'backbone';
import App from 'app';
import radio from 'radio';
import Log from 'helpers/log';
import Device from 'helpers/device';
import CONFIG from 'config'; // Replaced with alias
import userModel from 'user_model';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';

const API = {
  show() {
    Log('User:Register:Controller: showing.');
    // MAIN
    const mainView = new MainView();
    radio.trigger('app:main', mainView);

    // HEADER
    const headerView = new HeaderView({
      model: new Backbone.Model({
        title: t('Register'),
      }),
    });
    radio.trigger('app:header', headerView);

    // Start registration
    mainView.on('form:submit', data => {
      if (!Device.isOnline()) {
        radio.trigger('app:dialog', {
          title: t('Sorry'),
          body: t('Looks like you are offline!'),
        });
        return;
      }

      const validationError = userModel.validateRegistration(data);
      if (!validationError) {
        mainView.triggerMethod('form:data:invalid', {}); // update form
        App.regions.getRegion('dialog').showLoader();

        API.register(data)
          .then(() => {
            radio.trigger('app:dialog', {
              title: t('Welcome aboard!'),
              body: t(
                'Before submitting any records please check your email and click on the verification link.'
              ),
              buttons: [
                {
                  title: t('OK, got it'),
                  class: 'btn-positive',
                  onClick() {
                    radio.trigger('app:dialog:hide');
                    window.history.back();
                  },
                },
              ],
              onHide() {
                window.history.back();
              },
            });
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

  register(details) {
    Log('User:Register:Controller: registering.');

    const url = CONFIG.users.url;
    const headers = {
      'x-api-key': CONFIG.indicia.api_key,
      'content-type': 'plain/text',
    };

    return (
      fetch(url, {
        method: 'post',
        mode: 'cors',
        headers,
        body: JSON.stringify({ data: details }),
      })
        .then(this.tempCurlFix)
        // .then(res => res.json())
        .then(res => {
          this.checkRegisterErr(res);

          const fullData = {
            ...res,
            ...{
              password: details.password,
            },
          };
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
      const message = res.errors.reduce(
        (name, err) => `${name}${err.title}\n`,
        ''
      );
      throw new Error(message);
    }

    const data = res || {};
    if (
      !data.id ||
      !data.email ||
      !data.name ||
      !data.firstname ||
      !data.secondname
    ) {
      throw new Error('Error while retrieving registration response.');
    }
  },
};

export { API as default };
