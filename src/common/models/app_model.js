/** ****************************************************************************
 * App model. Persistent.
 **************************************************************************** */
import _ from 'lodash';
import Backbone from 'backbone';
import Store from 'backbone.localstorage';
import CONFIG from 'config';
import pastLocationsExtension from './app_model_past_loc_ext';

let AppModel = Backbone.Model.extend({
  id: 'app',

  defaults: {
    exceptions: [],

    favouriteSpecies: [],
    sort: 'default',
    filters: {},

    country: 'UK',
    language: 'en_GB',

    showWelcome: true,

    locations: [],
    autosync: true,
    useGridRef: true,
    useGridMap: true,
    useTraining: process.env.TRAINING,
  },

  localStorage: new Store(CONFIG.name),

  /**
   * Initializes the object.
   */
  initialize() {
    this.fetch();
  },

  toggleFavouriteSpecies(species) {
    const favSpecies = this.get('favouriteSpecies');
    if (this.isFavouriteSpecies(species.id)) {
      const foundIndex = _.indexOf(favSpecies, species.id);
      favSpecies.splice(foundIndex, 1);
    } else {
      favSpecies.push(species.id);
    }
    this.set('favouriteSpecies', favSpecies);
    this.save();
    this.trigger('change:favourite');
  },

  isFavouriteSpecies(speciesID) {
    const favSpecies = this.get('favouriteSpecies');
    const foundIndex = _.indexOf(favSpecies, speciesID);
    return foundIndex >= 0;
  },

  toggleFilter(filterGroup, filter) {
    const filters = this.get('filters');
    const foundIndex = _.indexOf(filters[filterGroup], filter);
    if (foundIndex >= 0) {
      // remove filter
      filters[filterGroup].splice(foundIndex, 1);
    } else {
      // init group
      filters[filterGroup] = filters[filterGroup] || [];
      // add filter
      filters[filterGroup].push(filter);
    }
    this.set('filters', filters);
    this.save();
    this.trigger('change:filter');
  },

  getSpeciesLocalName(species) {
    let country = this.get('country');
    const isElsewhere = country === 'ELSEWHERE';
    if (isElsewhere) {
      country = 'UK';
    }

    let commonName = species.attributes[country].common_name;
    commonName = commonName || species.attributes.UK.commonName;

    if (typeof commonName === 'object') {
      // eslint-disable-next-line
      const languageCode = appModel
        .get('language')
        .split('_')[0]
        .toLocaleUpperCase();
      commonName = commonName[languageCode] && commonName[languageCode];

      if (!commonName) {
        commonName = species.attributes.UK.commonName;
      }
    }

    return commonName;
  },
});

// add previous/pased saved locations management
AppModel = AppModel.extend(pastLocationsExtension);

const appModel = new AppModel();
export { appModel as default, AppModel };
