/** ****************************************************************************
 * Main app configuration file.
 **************************************************************************** */
import $ from "jquery";
import Indicia from "indicia";
import DateHelp from "helpers/date";

const HOST =
  process.env.APP_INDICIA_API_HOST || "https://european-ladybirds.brc.ac.uk/";

const notInTest = process.env.ENV !== "test";
const CONFIG = {
  // variables replaced on build
  version: process.env.APP_VERSION,
  build: process.env.APP_BUILD,
  name: process.env.APP_NAME,

  environment: process.env.ENV,
  experiments: process.env.APP_EXPERIMENTS,
  training: process.env.APP_TRAINING,

  gps_accuracy_limit: 100,

  site_url: HOST,

  // use prod logging if testing otherwise full log
  log: notInTest,

  // google analytics
  ga: {
    id: notInTest && process.env.APP_GA,
  },

  supportEmail: {
    UK: "ladybird-survey%40ceh.ac.uk",
    IT: "alberto.inghilesi%40gmail.com",
    PT: "antonio.oc.soares%40uac.pt",
    SK: "sandraviglasova%40gmail.com",
    CZ: "jirislavskuhrovec%40gmail.com",
    BE: "tim.adriaens%40inbo.be",
    
    Elsewhere: "ladybird-survey%40ceh.ac.uk",
  },

  // error analytics
  sentry: {
    key: notInTest && process.env.APP_SENTRY_KEY,
    project: "155047",
  },

  users: {
    url: `${HOST + Indicia.API_BASE + Indicia.API_VER}/users/`,
    timeout: 80000,
  },

  reports: {
    url: `${HOST +
      Indicia.API_BASE +
      Indicia.API_VER +
      Indicia.API_REPORTS_PATH}`,
    timeout: 80000,
  },

  // mapping
  map: {
    os_api_key: process.env.APP_OS_MAP_KEY,
    mapbox_api_key: process.env.APP_MAPBOX_MAP_KEY,
    mapbox_osm_id: "cehapps.0fenl1fe",
    mapbox_satellite_id: "cehapps.0femh3mh",
  },

  // indicia configuration
  indicia: {
    host: HOST,
    api_key: process.env.APP_INDICIA_API_KEY,
    website_id: 115,
    survey_id: 525,
    input_form: "enter-app-record",

    sample: {
      // anonymouse user info
      firstname: {
        id: 6,
      },
      secondname: {
        id: 7,
      },
      user_email: {
        // email key is taken
        id: 8,
      },
      phone: {
        id: 20,
      },
      location: {
        values(location, submission) {
          // convert accuracy for map and gridref sources
          const { accuracy } = location;
          const attributes = {};
          const keys = CONFIG.indicia.sample;
          attributes.location_name = location.name; // this is a native indicia attr
          attributes[keys.location_source.id] = location.source;
          attributes[keys.location_gridref.id] = location.gridref;
          attributes[keys.location_altitude.id] = location.altitude;
          attributes[keys.location_altitude_accuracy.id] =
            location.altitudeAccuracy;
          attributes[keys.location_accuracy.id] = accuracy;

          // add other location related attributes
          $.extend(submission.fields, attributes);

          return `${parseFloat(location.latitude).toFixed(7)}, ${parseFloat(
            location.longitude,
          ).toFixed(7)}`;
        },
      },
      location_accuracy: { id: 282 },
      location_altitude: { id: 283 },
      location_altitude_accuracy: { id: 284 },
      location_source: { id: 760 },
      location_gridref: { id: 335 },

      device: {
        id: 273,
        values: {
          iOS: 2398,
          Android: 2399,
        },
      },

      device_version: { id: 759 },

      date: {
        values(date) {
          return DateHelp.print(date);
        },
      },

      habitat: {
        id: 209,
        default: "Not recorded",
        values: {
          "Not recorded": null,
          Coast: 1640,
          "Inland waters": 1648,
          "Bogs and fens": 1656,
          Grasslands: 1668,
          "Heathland, scrub, hedgerow": 1680,
          Woodland: 1692,
          "Unvegetated or sparsely vegetated habitats": 1704,
          "Arable land, garden or park": 1716,
          "Industrial and Urban": 1722,
          "Mixed habitats": 1734,
        },
      },
    },
    occurrence: {
      training: {
        id: "training",
      },

      taxon: {
        values(taxon) {
          return taxon.warehouse_id;
        },
      },

      number: {
        id: 143,
        default: "Present",
        values: {
          Present: null,
          1: 1783,
          "2-5": 1784,
          "6-20": 1785,
          "21-50": 1786,
          "50+": 1787,
        },
        _values: ["Present", 1, "2-5", "6-20", "21-50", "50+"],
      },
    },
  },
};

export default CONFIG;
