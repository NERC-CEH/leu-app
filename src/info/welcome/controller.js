import radio from "radio";
import appModel from "app_model";
import { languageToCountryMap } from "helpers/translator";
import speciesCollection from "common/species_collection";
import MainView from "../../settings/country/main_view";
import MainViewLanguage from "../../settings/language/main_view";

const API = {
  show() {
    radio.trigger("app:header:hide");
    radio.trigger("app:footer:hide");

    API.showLanguageSelection();
  },

  showLanguageSelection() {
    const mainView = new MainViewLanguage({ model: appModel });
    radio.trigger("app:main", mainView);

    // if exit on selection click
    mainView.on("save", () => {
      const language = mainView.getValues();

      const country = languageToCountryMap[language];
      if (!country) {
        API.showCountrySelection(language);
        return;
      }

      appModel.save({ country, language });
      speciesCollection.filterList(); // update collection

      appModel.save({ showWelcome: false });
      radio.trigger("home");
    });
  },

  showCountrySelection(language) {
    const mainView = new MainView({ model: appModel });
    radio.trigger("app:main", mainView);

    // if exit on selection click
    mainView.on("save", () => {
      const country = mainView.getValues();
      if (country) {
        appModel.save({ country, language });
        speciesCollection.filterList(); // update collection
      }
      appModel.save({ showWelcome: false });
      radio.trigger("home");
    });
  },
};

export { API as default };
