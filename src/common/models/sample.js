/** ****************************************************************************
 * Indicia Sample.
 **************************************************************************** */
import _ from "lodash";
import Indicia from "indicia";
import CONFIG from "config";
import userModel from "user_model";
import Occurrence from "occurrence";
import Device from "helpers/device";
import store from "../store";
import GeolocExtension from "./sample_geoloc_ext";

const Sample = Indicia.Sample.extend({
  api_key: CONFIG.indicia.api_key,
  host_url: CONFIG.indicia.host,
  user: userModel.getUser.bind(userModel),
  password: userModel.getPassword.bind(userModel),

  store, // offline store

  Occurrence,

  keys: CONFIG.indicia.sample, // warehouse attribute keys

  metadata: {
    survey_id: CONFIG.indicia.survey_id,
    // recording form on the iRecord website
    input_form: CONFIG.indicia.input_form,
  },

  /**
   * Need a function because Device might not be ready on module load.
   * @returns {{device: *, device_version: *}}
   */
  defaults() {
    return {
      // attach device information
      device: Device.getPlatform(),
      device_version: Device.getVersion(),
    };
  },

  validateRemote(attributes) {
    const attrs = _.extend({}, this.attributes, attributes);

    const sample = {};
    const occurrences = {};

    // location
    const location = attrs.location || {};
    if (!location.latitude || !location.longitude) {
      sample.location = "missing";
    }

    // date
    if (!attrs.date) {
      sample.date = "missing";
    } else {
      const date = new Date(attrs.date);
      if (date === "Invalid Date" || date > new Date()) {
        sample.date = new Date(date) > new Date() ? "future date" : "invalid";
      }
    }

    // location type
    if (!attrs.location_type) {
      sample.location_type = "can't be blank";
    }

    // occurrences
    if (this.occurrences.length === 0) {
      sample.occurrence = "no species selected";
    } else {
      this.occurrences.each(occurrence => {
        const errors = occurrence.validate(null, { remote: true });
        if (errors) {
          sample.occurrence = "no species selected";
        }
      });
    }

    if (!_.isEmpty(sample) || !_.isEmpty(occurrences)) {
      const errors = {
        sample,
        occurrences,
      };
      return errors;
    }

    return null;
  },

  isLocalOnly() {
    const status = this.getSyncStatus();
    return (
      this.metadata.saved &&
      (status === Indicia.LOCAL || status === Indicia.SYNCHRONISING)
    );
  },

  timeout() {
    if (!Device.connectionWifi()) {
      return 180000; // 3 min
    }
    return 60000; // 1 min
  },
});

// add geolocation functionality
const SampleWithGeoloc = Sample.extend(GeolocExtension);

export { SampleWithGeoloc as default };
