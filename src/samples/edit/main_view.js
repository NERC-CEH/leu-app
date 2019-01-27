/** ****************************************************************************
 * Sample Edit main view.
 **************************************************************************** */
import Marionette from "backbone.marionette";
import Indicia from "indicia";
import appModel from "app_model";
import JST from "JST";
import DateHelp from "helpers/date";
import StringHelp from "helpers/string";

import "./styles.scss";

export default Marionette.View.extend({
  template: JST["samples/edit/main"],

  initialize() {
    const sample = this.model.get("sample");
    this.listenTo(sample, "request sync error geolocation", this.render);
  },

  serializeData() {
    const country = appModel.get("country");
    const sample = this.model.get("sample");
    const occ = sample.getOccurrence();
    const specie = occ.get("taxon") || {};

    // taxon
    const scientificName = specie.taxon;
    const commonName = specie[country] && specie[country].common_name;

    const locationPrint = sample.printLocation();
    const location = sample.get("location") || {};

    const number = occ.get("number") && StringHelp.limit(occ.get("number"));

    return {
      id: sample.cid,
      scientificName,
      commonName,
      training: occ.metadata.training,
      isLocating: sample.isGPSRunning(),
      isSynchronising: sample.getSyncStatus() === Indicia.SYNCHRONISING,
      location: locationPrint,
      location_name: location.name,
      date: DateHelp.print(sample.get("date"), true),
      number,
      habitat: sample.get("habitat") && StringHelp.limit(sample.get("habitat")),
      comment: occ.get("comment") && StringHelp.limit(occ.get("comment")),
    };
  },
});
