/** ****************************************************************************
 * Species List filter view.
 **************************************************************************** */
import $ from 'jquery';
import _ from 'lodash';
import Marionette from 'backbone.marionette';
import './images/different pattern (none of them).jpeg';
import './images/M-shape.jpeg';
import './images/no pattern (one colour).jpeg';
import './images/with spots.jpeg';
import './images/with white patch on each side.jpeg';

const filters = [
  {
    name: 'favourites',
    label: 'Favourites',
    filters: [
      {
        name: 'favourite',
        label: 'My favourites only',
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
  label: 'Colour',
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
  label: 'Size',
  filters: sizeFilters,
});

const getFilterTemplate = (groupName, { name, label }) => `
        <li class="item item-checkbox item-small ${groupName} ${name}">
          <label class="checkbox">
            <input type="checkbox" value="${name}" <%- obj['${groupName}'].includes('${name}') ? 'checked' : ''%> />
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
            ${groupFilters
              .map((...args) => getFilterTemplate(`${name}Group`, ...args))
              .join('')}
          </ul>
        </div>
      </li>`;

let template = filters.map(getGroupTemplate).join('');
const pronotums = {
  m: [t('M-shape'), '/images/M-shape.jpeg'],
  colour: [
    t('No pattern (one colour)'),
    '/images/no pattern (one colour).jpeg',
  ],
  spots: [t('With spots'), '/images/with spots.jpeg'],
  patch: [
    t('With white patch on each side'),
    '/images/with white patch on each side.jpeg',
  ],
  none: [
    t('Different pattern (none of them)'),
    '/images/different pattern (none of them).jpeg',
  ],
};

const getPronotumFilter = ([key, [label, image]]) => `
  <h3>${label}</h3>
  <li class="item item-checkbox item-small">
    <label class="checkbox">
      <input type="checkbox" value="${key}" <%- obj['pronotumGroup'].includes('${key}') ? 'checked' : ''%> />
    </label>
    <img src="${image}" />
  </li>
`;

template += `
<li class="table-view-cell">
<a class="collapsed" data-toggle="collapse" href="#pronotum" aria-controls="pronotum">
  ${t('Pronotum')}
</a>
<div id="pronotum" class="collapse">
  <ul class="list" style="overflow: hidden;">
    ${Object.entries(pronotums)
      .map(getPronotumFilter)
      .join('')}
  </ul>
</div>
</li>
`;

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
    const defaultFilterGroups = {
      favouritesGroup: [],
      colourGroup: [],
      sizeGroup: [],
      pronotumGroup: [],
    };
    const selectedFilters = this.model.get('filters');
    console.log(selectedFilters);

    return { ...defaultFilterGroups, ...selectedFilters };
  },
});
