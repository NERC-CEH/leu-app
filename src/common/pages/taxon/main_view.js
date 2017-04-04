/** ****************************************************************************
 * Home main view.
 *****************************************************************************/
import Marionette from 'backbone.marionette';
import _ from 'lodash';
import JST from 'JST';
import './styles.scss';

const SpeciesView = Marionette.View.extend({
  tagName: 'li',
  className: 'table-view-cell',

  template: JST['common/taxon/species'],

  serializeData() {
    const species = this.model;

    const sort = this.options.appModel.get('sort');
    const sortScientific = sort === 'scientific' || sort === 'scientific-reverse';

    return {
      id: species.get('id'),
      img: species.get('thumbnail'),
      taxon: species.get('taxon'),
      common_name: species.get('common_name'),
      favourite: this.options.appModel.isFavouriteSpecies(species.get('id')),
      sortScientific,
    };
  },
});


const NoSpeciesView = Marionette.View.extend({
  tagName: 'li',
  className: 'table-view-cell empty',
  template: _.template('<p>No species with selected filters.</p>'),
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
    };
  },
});
