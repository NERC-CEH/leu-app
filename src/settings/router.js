/** ****************************************************************************
 * Settings router.
 **************************************************************************** */
import Marionette from "backbone.marionette";
import App from "app";
import radio from "radio";
import Log from "helpers/log";
import MenuController from "./menu/controller";
import CountryController from "./country/controller";
import LanguageController from "./language/controller";

App.settings = {};

const Router = Marionette.AppRouter.extend({
  routes: {
    "settings(/)": MenuController.show,
    "settings/country(/)": CountryController.show,
    "settings/language(/)": LanguageController.show,
    "settings/*path": () => {
      radio.trigger("app:404:show");
    },
  },
});

App.on("before:start", () => {
  Log("Settings:router: initializing.");
  App.settings.router = new Router();
});
