import Backbone from 'backbone';
import App from 'app';
import appModel from 'app_model';
import radio from 'radio';
import savedSamples from 'saved_samples';
import speciesCollection from '../../common/species_collection';
import MainView from './main_view';
import HeaderView from '../../common/views/header_view';
import FavouriteButtonView from './favourite_button_view';

const API = {
  show(id) {
    const speciesModel = speciesCollection.get(id);

    const mainView = new MainView({
      model: speciesModel,
    });
    mainView.on('sample', () => {
      API.sample(speciesModel);
    });
    const mainRegion = App.regions.getRegion('main');
    if (mainRegion.el.scrollTop) mainRegion.el.scrollTop = 0; // needs to be at the top

    radio.trigger('app:main', mainView);

    // HEADER
    const favouriteButtonView = new FavouriteButtonView({
      model: appModel,
      speciesID: speciesModel.id,
    });

    favouriteButtonView.on('click', () => {
      appModel.toggleFavouriteSpecies(speciesModel);
    });

    const headerView = new HeaderView({
      id: 'species-account-header',
      rightPanel: favouriteButtonView,
      model: new Backbone.Model({ title: speciesModel.get('taxon') }),

    });

    // HEADER
    radio.trigger('app:header', headerView);

    // FOOTER
    radio.trigger('app:footer:hide');
  },

  // sample species
  sample(speciesModel) {
    // create new sample
    const sample = new Sample();
    const occurrence = new Occurrence();
    occurrence.set('taxon', speciesModel.attributes);
    sample.addOccurrence(occurrence);
    sample.save().then(() => {
      savedSamples.add(sample);

      sample.startGPS();
      appModel.set('draftSampleID', sample.cid);

      // navigate to sample edit
      radio.trigger('samples:edit', sample.cid);
    });
  },
};

export { API as default };
