/** ****************************************************************************
 * Setting Menu main view.
 **************************************************************************** */
import $ from "jquery";
import Marionette from "backbone.marionette";
import _ from "lodash";
import { countries } from "helpers/translator";
import "./styles.scss";

let template = Object.entries(countries)
  .map(
    ([key, value]) => `
<label class="item item-radio">
    <input type="radio" name="group" value="${key}" 
    <%- obj['${key}'] ? 'checked' : ''%>>
    <div class="radio-content">
      <div class="item-content">
        ${value}
      </div>
      <i class="radio-icon icon-check"></i>
    </div>
</label>`,
  )
  .join("");

template = _.template(`<div class="list">${template}</div>`);

export default Marionette.View.extend({
  id: "country-selection",
  tagName: "ul",
  className: "table-view",
  template,

  triggers: {
    'click input[type="radio"]': "save",
  },

  getValues() {
    let value;

    const $inputs = this.$el.find('input[type="radio"]');
    $inputs.each((int, elem) => {
      if ($(elem).prop("checked")) {
        value = $(elem).val();
      }
    });

    return value;
  },

  serializeData() {
    const appModel = this.model;
    const isWelcomeScreen = !appModel.get("showWelcome");

    const data = {};
    if (!isWelcomeScreen) {
      return data;
    }

    data[appModel.get("country")] = true;
    return data;
  },
});
