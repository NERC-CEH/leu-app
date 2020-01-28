/** ****************************************************************************
 * Species List filter view.
 **************************************************************************** */
import $ from 'jquery';
import _ from 'lodash';
import Marionette from 'backbone.marionette';

const filters = [
  {
    name: 'favourites',
    label: t('Favourites'),
    filters: [
      {
        name: 'favourite',
        label: t('My favourites only'),
      },
    ],
  },
];

// add colours
const colourFilters = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'pink',
  'white/cream/beige',
].map(val => ({ name: val, label: val }));
const colour = {
  name: 'colour',
  label: t('Colour'),
  filters: colourFilters,
};

filters.push(colour);

// add size
const sizeFilters = [
  { name: 'small', label: 'smaller than 5mm' },
  { name: 'large', label: 'larger than 5mm' },
];

filters.push({
  name: 'size',
  label: t('Size'),
  filters: sizeFilters,
});

// // add pronotum
// const pronotumFilters = [];
// [
//   t('one colour'),
//   t('one colour with spots'),
//   t('M-shape'),
//   t('one colour with white patch on each side'),
//   t('none of them', 'Need to find name'),
// ].forEach(filter => {
//   pronotumFilters.push({
//     name: filter,
//     label: capitalizeFirstLetter(filter),
//   });
// });
// filters.push({
//   name: 'pronotum',
//   label: t('Pronotum pattern'),
//   filters: pronotumFilters,
// });

const getFilterTemplate = ({ name, label }) => `
        <li class="item item-checkbox item-small">
          <label class="checkbox">
            <input type="checkbox" value="${name}" <%- obj['${name}'] ? 'checked' : ''%> />
          </label>
          ${t(label)}
        </li>`;

const getGroupTemplate = ({ name, label, filters: groupFilters }) => `
      <li class="table-view-cell">
        <a class="collapsed" data-toggle="collapse" href="#${name}" aria-controls="${name}">
          ${t(label)}
        </a>
        <div id="${name}" class="collapse">
          <ul class="list" style="overflow: hidden;">
            ${groupFilters.map(getFilterTemplate).join('')}
          </ul>
        </div>
      </li>`;

const template = filters.map(getGroupTemplate).join('');

export default Marionette.View.extend({
  id: 'species-list-filters',
  tagName: 'ul',
  className: 'table-view accordion',
  template: _.template(template),

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

    _.forOwn(filters, filterGroup => {
      filterGroup.forEach(filter => {
        selectedFilters[filter] = true;
      });
    });
    console.log(selectedFilters);

    return selectedFilters;
  },
});
