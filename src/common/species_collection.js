/** ****************************************************************************
 * Species List collection.
 *****************************************************************************/
import _ from 'lodash';
import Backbone from 'backbone';
import appModel from 'app_model';
import Log from 'helpers/log';
import speciesData from 'species.data';
import sortsFunctions from './species_list_sorts';
import filtersFunctions from './species_list_filters';

const SpeciesCollection = Backbone.Collection.extend({
  initialize() {
    this.filterList();
    this.sortList();

    appModel.on('change:sort', this.sortList, this);
    appModel.on('change:filter', this.filterList, this);
    appModel.on('change:favourite', this.filterList, this);

    this.totalSpecies = speciesData.length;
  },

  /**
   * Prepares the species list - filters, sorts.
   */
  sortList() {
    const sort = appModel.get('sort');

    this.comparator = sortsFunctions[sort];
    this.sort();
    Log(`Species:List:collection: sorted (${sort})`);
  },

  /**
   * Filters and adds the species to the list.
   *
   * @param list
   * @param sort
   * @param filters
   */
  filterList() {
    const that = this;
    const list = _.cloneDeep(speciesData);

    // filter country species
    const locale = appModel.get('country');
    let countryList = [];
    for (let j = 0; j < list.length; j++) {
      if (list[j][locale].exist === 'YES') {
        countryList.push(list[j]);
      }
    }

    // apply each selected filter group
    const filtersToApply = appModel.get('filters');
    _.forOwn(filtersToApply, (filterGroup, filterGroupID) => {
      countryList = that._filterListCore(countryList, filterGroup, filterGroupID);
    });

    this.reset(countryList, _.extend({ silent: true }));
    Log(`Species:List:collection: Applied filters (${list.length}/${speciesData.length})`);
  },

  /**
   * Iterates through the grouped filters applying them to the list.
   *
   * @param list
   * @param filteredList
   * @param filterGroup filters to apply
   * @param filterGroupID
   * @param callback
   */
  _filterListCore(list, filterGroup, filterGroupID) {
    let filteredList = [];
    if (filterGroup.length > 0) {
      // apply every selected filter within group
      filterGroup.forEach((filterID) => {
        const filter = filtersFunctions[filterGroupID][filterID];

        if (!filter) {
          Log('Species:List:collection: no such filter', 'e');
          return filteredList;
        }

        filter(list, filteredList);
        filteredList = _.uniq(filteredList);
      });
    } else {
      // no filtering
      filteredList = list;
    }

    return filteredList;
  },
});


const speciesCollection = new SpeciesCollection();
export default speciesCollection;
