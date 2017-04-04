/** ****************************************************************************
 * Species List filter view.
 *****************************************************************************/
import $ from 'jquery';
import _ from 'lodash';
import Marionette from 'backbone.marionette';
import JST from 'JST';

export default Marionette.View.extend({
  id: 'species-list-filters',
  tagName: 'ul',
  className: 'table-view accordion',
  template: JST['common/taxon/filters'],

  events: {
    'click input[type="checkbox"]': 'saveFilter',
  },

  saveFilter(e) {
    const $input = $(e.target);
    const filter = $input.val();
    const filterGroup = $input.closest('.collapse').prop('id');
    this.trigger('filter', `${filterGroup}Group`, filter);
  },

  serializeData() {
    const filters = this.model.get('filters');
    const selectedFilters = {};

    _.forOwn(filters, (filterGroup) => {
      filterGroup.forEach((filter) => {
        selectedFilters[filter] = true;
      });
    });

    return selectedFilters;
  },
});

