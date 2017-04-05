/** ****************************************************************************
 * Setting Menu main view.
 *****************************************************************************/
import $ from 'jquery';
import Marionette from 'backbone.marionette';
import Device from 'helpers/device';
import JST from 'JST';

export default Marionette.View.extend({
  tagName: 'ul',
  className: 'table-view',
  template: JST['settings/language/main'],

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
    const data = {};
    data[appModel.get('language')] = true;
    return data;
  },
});
