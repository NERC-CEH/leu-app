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

const pronotumTypeSpeciesIds = {
  none: [7, 17, 36, 51, 54, 55, 59, 62, 68, 70],
  m: [9, 10, 22, 25, 32, 33, 34, 44, 63],
  colour: [11, 12, 28, 31, 35, 37, 42, 43, 50, 56, 58, 65, 66, 69],
  spots: [
    1,
    3,
    5,
    6,
    8,
    13,
    14,
    18,
    19,
    20,
    21,
    25,
    32,
    33,
    34,
    40,
    41,
    47,
    60,
    71,
    72,
  ],
  patch: [
    2,
    4,
    5,
    10,
    15,
    16,
    23,
    24,
    26,
    27,
    29,
    30,
    38,
    39,
    45,
    46,
    48,
    49,
    52,
    53,
    57,
    61,
    64,
    67,
    68,
  ],
};

const getPronotumFilter = pronotumType => (list, filteredList) => {
  const speciesIds = pronotumTypeSpeciesIds[pronotumType];
  for (let j = 0; j < list.length; j++) {
    if (speciesIds.includes(list[j].id)) {
      filteredList.push(list[j]);
    }
  }
};

filters.pronotumGroup = {
  none: getPronotumFilter('none'),
  m: getPronotumFilter('m'),
  colour: getPronotumFilter('colour'),
  spots: getPronotumFilter('spots'),
  patch: getPronotumFilter('patch'),
};

filters.sizeGroup = {
  small(list, filteredList) {
    for (let j = 0; j < list.length; j++) {
      if (
        list[j].size.filter.includes(3) ||
        list[j].size.filter.includes(4) ||
        list[j].size.filter.includes(5)
      ) {
        filteredList.push(list[j]);
      }
    }
  },

  large(list, filteredList) {
    for (let j = 0; j < list.length; j++) {
      if (
        list[j].size.filter.includes(6) ||
        list[j].size.filter.includes(7) ||
        list[j].size.filter.includes(8) ||
        list[j].size.filter.includes(9)
      ) {
        filteredList.push(list[j]);
      }
    }
  },
};

export default filters;

// TODO: remove
window.filters = filters;
