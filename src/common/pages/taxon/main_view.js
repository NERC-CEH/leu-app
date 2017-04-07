/** ****************************************************************************
 * Home main view.
 *****************************************************************************/
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
    'click a'(e) { // eslint-disable-line
      if (this.options.sampleModel) {
        e.preventDefault();
      }
      this.trigger('select', this.model.attributes);
    },
  },

  serializeData() {
    const species = this.model;
    const common_name = species.get(appModel.get('country')).common_name;
    const sort = this.options.appModel.get('sort');
    const sortScientific = sort === 'scientific' || sort === 'scientific-reverse';

    const form = species.get('form');
    return {
      id: species.get('id'),
      taxon: species.get('taxon'),
      form,
      common_name,
      favourite: this.options.appModel.isFavouriteSpecies(species.get('id')),
      sortScientific,
    };
  },
});


const NoSpeciesView = Marionette.View.extend({
  tagName: 'li',
  className: 'table-view-cell empty',
  template: _.template('<p>' + t('No species with selected filters.') + '</p>'),
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
