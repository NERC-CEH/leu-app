/** ****************************************************************************
 * Species List filter view.
 *****************************************************************************/
import $ from 'jquery';
import _ from 'lodash';
import Marionette from 'backbone.marionette';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Marionette.View.extend({
  id: 'species-list-filters',
  tagName: 'ul',
  className: 'table-view accordion',
  template() {
    let template = '';

    const filters = [
      {
        name: 'favourites',
        label: 'Favourites',
        filters: [
          {
            name: 'favourite',
            label: 'My favourites only',
          }
        ]
      },
    ];

    // add colours
    const colourFilters = [];
    ['black', 'brown', 'red', 'orange', 'yellow', 'pink', 'cream/beige', 'white'].forEach((filter) => {
      colourFilters.push({
        name: filter,
        label: capitalizeFirstLetter(filter),
      })
    });
    filters.push({
      name: 'colour',
      label: 'Colour',
      filters: colourFilters,
    });

    // add size
    const sizeFilters = [];
    [3, 4, 5,	6, 7,	8, 9].forEach((filter) => {
      sizeFilters.push({
        name: filter,
        label: filter,
      })
    });
    filters.push({
      name: 'size',
      label: 'Size in mm',
      filters: sizeFilters,
    });


    // add pronotum
    const pronotumFilters = [];
    [
      'one colour',
      'one colour with spots',
      'M-shape',
      'one colour with white patch on each side',
      'none of them',	'Need to find name'
    ].forEach((filter) => {
      pronotumFilters.push({
        name: filter,
        label: capitalizeFirstLetter(filter),
      })
    });
    filters.push({
      name: 'pronotum',
      label: 'Pronotum pattern',
      filters: pronotumFilters,
    });


    filters.forEach((filterGroupObj) => {
      const filterGroup = filterGroupObj.name;
      const filterGroupLabel = filterGroupObj.label;

      let filtersTemplates = '';
      filterGroupObj.filters.forEach((filterObj) => {
        const filterName = filterObj.name;
        const filterLabel = filterObj.label;

        const filterTpl = `
          <li class="item item-checkbox item-small">
            <label class="checkbox">
              <input type="checkbox" value="${filterName}"
              <%- obj['${filterName}'] ? 'checked' : ''%>
            </label>
            ${filterLabel}
          </li>
          `;
        filtersTemplates += filterTpl;
      });

      const filterGroupTpl = `
        <li class="table-view-cell">
          <a class="collapsed" data-toggle="collapse" href="#${filterGroup}" aria-controls="${filterGroup}">
            ${filterGroupLabel}
          </a>
          <div id="${filterGroup}" class="collapse">
            <ul class="list">
              ${filtersTemplates}
            </ul>
          </div>
        </li>
        `;

        template += filterGroupTpl;
    });

    return template;
  },

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

