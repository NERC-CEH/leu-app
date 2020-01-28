/* eslint-disable func-names */
/** ****************************************************************************
 * Species list filters.
 **************************************************************************** */
import appModel from 'app_model';

/**
 * A collection of filters used to manage lists.
 * id - filter identifier
 * group - some filters override/work-together. eg. colours, suborder
 * label - label to represent the filter in the UI
 */
const filters = {
  favouritesGroup: {
    favourite(list, filteredList) {
      const favourites = appModel.get('favouriteSpecies');
      for (let i = 0; i < favourites.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (list[j].id === favourites[i]) {
            filteredList.push(list[j]);
          }
        }
      }
    },
  },
};

function getFilter(attribute, lookup) {
  const func = function(list, filteredList) {
    for (let j = 0; j < list.length; j++) {
      if (list[j][attribute].filter.indexOf(lookup) >= 0) {
        filteredList.push(list[j]);
      }
    }
  };
  return func;
}

function getFilterGroup(attribute, values) {
  const group = {};
  values.forEach(val => {
    group[val] = getFilter(attribute, val);
  });

  return group;
}

filters.colourGroup = getFilterGroup('colour', [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'pink',
]);

filters.colourGroup['white/cream/beige'] = (list, filteredList) => {
  for (let j = 0; j < list.length; j++) {
    if (
      list[j].colour.filter.includes('cream/beige') ||
      list[j].colour.filter.includes('white')
    ) {
      filteredList.push(list[j]);
    }
  }
};


filters.sizeGroup = getFilterGroup('size', [3, 4, 5, 6, 7, 8, 9]);

filters.pronotumGroup = getFilterGroup('pronotum', [
  'one colour',
  'one colour with spots',
  'M-shape',
  'one colour with white patch on each side',
  'none of them',
  'Need to find name',
]);

export default filters;

// TODO: remove
window.filters = filters;