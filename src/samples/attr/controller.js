/** ****************************************************************************
 * Sample Attribute controller.
 **************************************************************************** */
import Backbone from "backbone";
import Indicia from "indicia";
import Log from "helpers/log";
import radio from "radio";
import savedSamples from "saved_samples";
import MainView from "./main_view";
import HeaderView from "../../common/views/header_view";

const API = {
  show(sampleID, attr) {
    // wait till savedSamples is fully initialized
    if (savedSamples.fetching) {
      const that = this;
      savedSamples.once("fetching:done", () => {
        API.show.apply(that, [sampleID, attr]);
      });
      return;
    }

    Log(`Samples:Attr:Controller: showing ${attr}.`);

    const sample = savedSamples.get(sampleID);
    // Not found
    if (!sample) {
      Log("No sample model found.", "e");
      radio.trigger("app:404:show", { replace: true });
      return;
    }

    // can't edit a saved one - to be removed when sample update
    // is possible on the server
    if (sample.getSyncStatus() === Indicia.SYNCED) {
      radio.trigger("samples:show", sampleID, { replace: true });
      return;
    }

    // MAIN
    const mainView = new MainView({
      attr,
      model: sample,
    });
    radio.trigger("app:main", mainView);

    // HEADER
    const headerView = new HeaderView({
      onExit() {
        API.onExit(mainView, sample, attr, () => {
          window.history.back();
        });
      },
      model: new Backbone.Model({ title: t(attr) }),
    });

    radio.trigger("app:header", headerView);

    // if exit on selection click
    mainView.on("save", () => {
      API.onExit(mainView, sample, attr, () => {
        window.history.back();
      });
    });

    // FOOTER
    radio.trigger("app:footer:hide");
  },

  onExit(mainView, sample, attr, callback) {
    Log("Samples:Attr:Controller: exiting.");
    const values = mainView.getValues();
    API.save(attr, values, sample, callback);
  },

  /**
   * Update sample with new values
   * @param values
   * @param sample
   */
  save(attr, values, sample, callback) {
    Log("Samples:Attr:Controller: saving.");

    let newVal;
    const occ = sample.getOccurrence();

    switch (attr) {
      case "date":

        // validate before setting up
        if (values.date && values.date.toString() !== "Invalid Date") {
          newVal = values.date;
          sample.set("date", newVal);
        }
        break;
      case "habitat":
        newVal = values[attr];

        // todo:validate before setting up
        sample.set(attr, values[attr]);
        break;
      case "number":
      case "comment":
        newVal = values[attr];

        // todo:validate before setting up
        occ.set(attr, values[attr]);
        break;
      default:
    }

    // save it
    sample
      .save()
      .then(callback)
      .catch(err => {
        Log(err, "e");
        radio.trigger("app:dialog:error", err);
      });
  },
};

export { API as default };
