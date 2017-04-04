/** ****************************************************************************
 * Record List header view.
 *****************************************************************************/
import _ from 'lodash';
import Marionette from 'backbone.marionette';
import JST from 'JST';

export default Marionette.View.extend({
  id: 'species-list-header',
  tagName: 'nav',
  template: JST['common/taxon/header'],

  events: {
    'click a[data-rel="back"]': 'navigateBack',
    'click #filter-btn': 'toggleFilters',
    'click #sort-btn': 'toggleSorts',
  },

  modelEvents: {
    'change:filter': 'render',
  },

  toggleFilters(e) {
    this.trigger('filter', e);
  },

  toggleSorts(e) {
    this.trigger('sort', e);
  },

  navigateBack() {
    window.history.back();
  },

  serializeData() {
    let filterOn = false;

    const filters = this.model.get('filters');
    _.forOwn(filters, (filterGroup) => {
      if (filterGroup.length) {
        filterOn = true;
      }
    });
    return { filterOn };
  },
});

