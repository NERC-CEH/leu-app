/** ****************************************************************************
 * Sample Attribute main view.
 **************************************************************************** */
import $ from "jquery";
import Marionette from "backbone.marionette";
import Device from "helpers/device";
import DateHelp from "helpers/date";
import StringHelp from "helpers/string";
import Log from "helpers/log";
import JST from "JST";
import CONFIG from "config";

export default Marionette.View.extend({
  initialize(options) {
    switch (options.attr) {
      case "habitat":
      case "number":
        this.template = JST["common/radio"];
        break;

      default:
        this.template = JST[`samples/attr/${options.attr}`];
    }
  },

  triggers: {
    'click input[type="radio"]': "save",
  },

  getValues() {
    const values = {};
    let value;
    const attr = this.options.attr;
    let $inputs;
    switch (attr) {
      case "date": {
        value = this.$el.find("input").val();
        const date = new Date(value);
        if (date.toString() !== "Invalid Date") {
          values[attr] = new Date(date);
        }
        break;
      }
      case "number":
        const numberConfig = CONFIG.indicia.occurrence.number;
        $inputs = this.$el.find('input[type="radio"]');
        $inputs.each((int, elem) => {
          if ($(elem).prop("checked")) {
            const newVal = $(elem).val();
            // don't set default
            if (newVal !== numberConfig.default) {
              values.number = newVal;
            }
          }
        });
        break;
      case "habitat":
        const habitatConfig = CONFIG.indicia.sample.habitat;
        $inputs = this.$el.find('input[type="radio"]');
        $inputs.each((int, elem) => {
          if ($(elem).prop("checked")) {
            const newVal = $(elem).val();
            // don't set default
            if (newVal !== habitatConfig.default) {
              values.habitat = newVal;
            }
          }
        });
        break;
      case "comment":
        value = this.$el.find("textarea").val();
        values[attr] = StringHelp.escape(value);
        break;
      default:
    }

    return values;
  },

  serializeData() {
    const occ = this.model.getOccurrence();
    let templateData = {};
    let selected;

    switch (this.options.attr) {
      case "date":
        templateData.date = DateHelp.toDateInputValue(this.model.get("date"));
        templateData.maxDate = DateHelp.toDateInputValue(new Date());
        break;
      case "number": {
        selected = occ.get("number") || {};
        templateData = {
          message: "How many individual?",
          selection: CONFIG.indicia.occurrence.number._values,
          selected,
        };
        break;
      }
      case "comment":
        templateData.value = occ.get(this.options.attr);
        break;
      case "habitat":
        selected = this.model.get("habitat") || {};
        templateData = {
          message: "What sort of habitat did you find the ladybirds in?",
          selection: Object.keys(CONFIG.indicia.sample.habitat.values),
          selected,
        };
        break;

      default:
        Log("Samples:Attribute:MainView: no such attribute.", "e");
        return null;
    }

    return templateData;
  },

  onAttach() {
    let $input;
    switch (this.options.attr) {
      case "date":
        $input = this.$el.find("input").focus();
        if (Device.isAndroid()) {
          const options = {
            date: new Date(this.model.get("date")),
            mode: "date",
            androidTheme: 5,
            allowOldDates: true,
            allowFutureDates: false,
          };

          window.datePicker.show(options, date => {
            $input.val(DateHelp.toDateInputValue(new Date(date)));
          });
        }
        break;
      case "comment":
        $input = this.$el.find("textarea").focus();
        if (window.cordova && Device.isAndroid()) {
          window.Keyboard.show();
          $input.focusout(() => {
            window.Keyboard.hide();
          });
        }
        break;
      default:
    }
  },
});
