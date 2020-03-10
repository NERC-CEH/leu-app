/** ****************************************************************************
 * Record List header view.
 **************************************************************************** */
import Marionette from 'backbone.marionette';
import JST from 'JST';

export default Marionette.View.extend({
  id: 'filters-dialog-header',
  template: JST['common/taxon/filters-header'],
  modelEvents: {
    'change:filter': 'render',
  },
  serializeData() {
    const filteredList = this.options.speciesCollection.length;
    const totalList = this.options.speciesCollection.totalSpecies;
    const filtered = `${filteredList}/${totalList}`;
    return { filtered };
  },
});
