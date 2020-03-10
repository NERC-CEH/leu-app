/** ****************************************************************************
 * Home main view.
 **************************************************************************** */
import Marionette from 'backbone.marionette';
import _ from 'lodash';
import appModel from 'app_model';
import JST from 'JST';
import './styles.scss';

const SpeciesView = Marionette.View.extend({
  tagName: 'li',
  className: 'table-view-cell',

  template: JST['common/taxon/species'],

  events: {
    // eslint-disable-next-line
    'click a': function(e) {
      if (this.options.sampleModel) {
        e.preventDefault();
      }
      this.trigger('select', this.model.attributes);
    },
  },

  serializeData() {
    const species = this.model;
    const commonName = appModel.getSpeciesLocalName(species);

    const sort = this.options.appModel.get('sort');
    const sortScientific =
      sort === 'scientific' || sort === 'scientificReverse';

    const form = species.get('form');
    return {
      id: species.get('id'),
      taxon: species.get('taxon'),
      form,
      commonName,
      favourite: this.options.appModel.isFavouriteSpecies(species.get('id')),
      sortScientific,
    };
  },
});

const NoSpeciesView = Marionette.View.extend({
  tagName: 'li',
  className: 'table-view-cell empty',
  template: data =>
    _.template(`<p>${t('No species with selected filters.')}</p>`)(data),
});

export default Marionette.CollectionView.extend({
  id: 'species-list',
  tagName: 'ul',
  className: 'table-view no-top',
  childView: SpeciesView,
  emptyView: NoSpeciesView,

  initialize() {
    this.listenTo(this.options.appModel, 'change:filter', this.render);
  },

  childViewOptions() {
    return {
      appModel: this.options.appModel,
      sampleModel: this.options.sampleModel,
    };
  },
});
