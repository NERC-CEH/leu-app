/** ****************************************************************************
 * Setting Menu main view.
 *****************************************************************************/
import $ from 'jquery';
import Marionette from 'backbone.marionette';
import JST from 'JST';
import './styles.scss';

export default Marionette.View.extend({
  id: 'country-selection',
  tagName: 'ul',
  className: 'table-view',
  template: JST['settings/country/main'],

  triggers: {
    'click input[type="radio"]': 'save',
  },


  getValues() {
    let value;

    let $inputs = this.$el.find('input[type="radio"]');
    $inputs.each((int, elem) => {
      if ($(elem).prop('checked')) {
        value = $(elem).val();
      }
    });

    return value;
  },

  serializeData() {
    const appModel = this.model;
    const isWelcomeScreen = !appModel.get('showWelcome');

    const data = {};
    if (!isWelcomeScreen) {
      return data;
    }

    data[appModel.get('country')] = true;
    return data;
  },
});
