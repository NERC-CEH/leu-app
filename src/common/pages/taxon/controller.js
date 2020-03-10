import Log from "helpers/log";
import radio from "radio";
import App from "app";
import appModel from "app_model";
import savedSamples from "saved_samples";
import speciesCollection from "../../species_collection";
import MainView from "./main_view";
import HeaderView from "./header_view";
import FiltersHeaderView from "./filters_header_view";
import FiltersView from "./filters_view";
import SortsView from "./sorts_view";

const API = {
  show(sampleID) {
    Log("Records:Taxon:Controller: showing");

    const that = this;
    this.id = sampleID;

    if (sampleID) {
      // wait till savedSamples is fully initialized
      if (savedSamples.fetching) {
        savedSamples.once("fetching:done", () => {
          API.show.apply(that, [sampleID]);
        });
        return;
      }

      // check if the sample has taxon specified
      const sample = savedSamples.get(sampleID);
      // Not found
      if (!sample) {
        Log("No sample model found.", "e");
        radio.trigger("app:404:show", { replace: true });
        return;
      }

      // MAIN
      const mainView = new MainView({
        collection: speciesCollection,
        appModel,
        sampleModel: sample,
      });

      mainView.on("childview:select", taxon => {
        API.save(sample, taxon);
      });

      const mainRegion = App.regions.getRegion("main");
      if (mainRegion.el.scrollTop) mainRegion.el.scrollTop = 0; // needs to be at the top
      radio.trigger("app:main", mainView);
    } else {
      const mainView = new MainView({
        collection: speciesCollection,
        appModel,
      });
      radio.trigger("app:main", mainView);
    }

    // HEADER
    const headerView = new HeaderView({ model: appModel });

    headerView.on("filter", () => {
      const filtersView = new FiltersView({ model: appModel });

      filtersView.on("filter", (filterGroup, filter) => {
        if (!filter || !filterGroup) {
          Log("Species:List:Controller: No filter provided", "e");
          return;
        }
        Log(`Species:List:Controller: Filter toggled ${filter}`);
        appModel.toggleFilter(filterGroup, filter);
      });

      radio.trigger("app:dialog", {
        title: new FiltersHeaderView({ model: appModel, speciesCollection }),
        body: filtersView,
      });
    });
    headerView.on("sort", () => {
      const sortsView = new SortsView({ model: appModel });

      sortsView.on("sort", sort => {
        if (!sort) {
          Log("Species:List:Controller: No sort provided", "e");
          return;
        }
        Log("Species:List:Controller: Sort set");
        radio.trigger("app:dialog:hide");

        appModel.set("sort", sort);
        appModel.save();
      });

      radio.trigger("app:dialog", {
        title: t("Sort"),
        body: sortsView,
      });
    });

    radio.trigger("app:header", headerView);

    // FOOTER
    radio.trigger("app:footer:hide");
  },

  save(recordModel, taxon) {
    const occ = recordModel.occurrences.at(0);
    occ
      .set("taxon", taxon)
      .save()
      .then(() => {
        window.history.back();
      });
  },
};

export { API as default };
