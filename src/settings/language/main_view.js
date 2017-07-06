/** ****************************************************************************
 * Setting Menu main view.
 *****************************************************************************/
import $ from 'jquery';
import Marionette from 'backbone.marionette';
import appModel from 'app_model';

export default Marionette.View.extend({
  tagName: 'ul',
  className: 'table-view',
  template() {
    const languages = {
      NL: 'Dutch',
      FR: 'Français',
      PT: 'Português',
      SK: 'Slovenčina',
      CZ: 'Čeština',
      EN: 'English',
      ITA: 'Italiano',
    };

    const current = appModel.get('language');
    const locale = appModel.get('country');

    let languagesTemplate = '';

    for (const language of Object.keys(languages)) {
      const langTpl = `
      <label class="item item-radio">
        <input type="radio" name="group" value="${language}" ${current === language ? 'checked' : ''}>
        <div class="radio-content">
          <div class="item-content">
            ${languages[language]}
          </div>
          <i class="radio-icon icon-check"></i>
        </div>
      </label>
    `;
      languagesTemplate += langTpl;
    }

    const template = `<div class="list">${languagesTemplate}</div>`;
    return template;
  },

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
});
