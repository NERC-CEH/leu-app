import Log from 'helpers/log';
import radio from 'radio';
import appModel from 'app_model';
import savedSamples from 'saved_samples';
import speciesCollection from './species_collection';
import MainView from './main_view';
import HeaderView from './header_view';
import FiltersHeaderView from './filters_header_view';
import FiltersView from './filters_view';
import SortsView from './sorts_view';

const API = {
  show() {
    const mainView = new MainView({
      collection: speciesCollection,
      appModel,
    });
    mainView.on('childview:record', (childView) => {
      const speciesModel = childView.model;
      API.record(speciesModel);
    });
    radio.trigger('app:main', mainView);


    // HEADER
    const headerView = new HeaderView({ model: appModel });

    headerView.on('filter', (e) => {
      const filtersView = new FiltersView({ model: appModel });

      filtersView.on('filter', (filterGroup, filter) => {
        if (!filter || !filterGroup) {
          Log('Species:List:Controller: No filter provided', 'e');
          return;
        }
        Log('Species:List:Controller: Filter set');
        appModel.toggleFilter(filterGroup, filter);
      });

      radio.trigger('app:dialog', {
        title: new FiltersHeaderView({ model: appModel, speciesCollection }),
        body: filtersView,
      });
    });
    headerView.on('sort', (e) => {
      const sortsView = new SortsView({ model: appModel });

      sortsView.on('sort', (sort) => {
        if (!sort) {
          Log('Species:List:Controller: No sort provided', 'e');
          return;
        }
        Log('Species:List:Controller: Sort set');
        radio.trigger('app:dialog:hide');

        appModel.set('sort', sort);
        appModel.save();
      });

      radio.trigger('app:dialog', {
        title: 'Sort',
        body: sortsView,
      });
    });

    radio.trigger('app:header', headerView);

    // FOOTER
    radio.trigger('app:footer:hide');
  },
};

export { API as default };
