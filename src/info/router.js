/** ****************************************************************************
 * Info router.
 *****************************************************************************/
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Log from 'helpers/log';
import CONFIG from 'config';
import App from 'app';
import radio from 'radio';
import appModel from 'app_model';
import CommonController from '../common/controller';
import InfoMenuController from './menu/controller';
import SpeciesController from './species/controller';
import SpeciesListController from '../common/pages/taxon/controller';
import HomeController from './home/controller';
import './credits/sponsor_logo.png';

App.info = {};

const Router = Marionette.AppRouter.extend({
  routes: {
    '': HomeController.show,
    home: HomeController.show,

    'info(/)': InfoMenuController.show,
    'info/about(/)': () => {
      CommonController.show({
        title: t('About'),
        App,
        route: 'info/about/main',
        model: new Backbone.Model({
          version: CONFIG.version,
          build: CONFIG.build,
          supportEmail: CONFIG.supportEmail[appModel.get('country')],
        }),
      });
    },
    'info/privacy(/)': () => {
      CommonController.show({
        title: t('Privacy Policy'), App, route: 'info/privacy/main',
      });
    },
    'info/credits(/)': () => {
      CommonController.show({
        title: t('Credits'), App, route: 'info/credits/main',
      }); },
    'info/species/:id(/)': SpeciesController.show,
    'info/species(/)': SpeciesListController.show,
    'info/*path': () => { radio.trigger('app:404:show'); },
  },
});


// home page
App.on('home', () => {
  App.navigate('home');
  HomeController.show();
});

App.on('before:start', () => {
  Log('Info:router: initializing.');
  App.info.router = new Router();
});
