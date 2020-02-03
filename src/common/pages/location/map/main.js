/** ****************************************************************************
 * Location main view map functions.
 **************************************************************************** */

import $ from 'jquery';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/layers-2x.png';
import 'leaflet/dist/images/layers.png';
import L from 'leaflet';
import CONFIG from 'config';
import Log from 'helpers/log';
import mapMarker from './marker';
import gpsFunctions from './gps';

const MIN_WGS84_ZOOM = 5;

const DEFAULT_LAYER = 'Satellite';
const DEFAULT_LAYER_ZOOM = MIN_WGS84_ZOOM; // 7 and not 1 because of WGS84 scale
const DEFAULT_CENTER = [51.78144, 8.9415];

const API = {
  initMap() {
    Log('Location:MainView:Map: initializing.');

    this.map = null;
    this.layers = this.getLayers();

    this.currentLayer = null;

    this._refreshMapHeight();

    this.map = L.map(this.$container);

    // default layer
    this.currentLayer = this._getCurrentLayer();

    // position view
    this._repositionMap();

    // show default layer
    this.layers[this.currentLayer].addTo(this.map);
    this.$container.dataset.layer = this.currentLayer; // fix the lines between the tiles

    // Controls
    this.addControls();

    // GPS
    this.addGPS();

    // Marker
    this.addMapMarker();
  },

  getLayers() {
    const layers = {};
    layers.Satellite = L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: CONFIG.map.mapbox_satellite_id,
        accessToken: CONFIG.map.mapbox_api_key,
        tileSize: 256, // specify as, OS layer overwites this with 200 otherwise,
        minZoom: MIN_WGS84_ZOOM,
      }
    );

    layers.OSM = L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: CONFIG.map.mapbox_osm_id,
        accessToken: CONFIG.map.mapbox_api_key,
        tileSize: 256, // specify as, OS layer overwites this with 200 otherwise
        minZoom: MIN_WGS84_ZOOM,
      }
    );

    return layers;
  },

  addControls() {
    Log('Location:MainView:Map: adding layer controls.');

    this.controls = L.control.layers(
      {
        'Open Street Map': this.layers.OSM,
        Satellite: this.layers.Satellite,
      },
      {}
    );
    this.map.addControl(this.controls);
  },

  /**
   * Normalises the map zoom level between different projections.
   * @param layer
   * @returns {*}
   */
  getMapZoom(zoom) {
    const normalZoom = zoom || this.map.getZoom();

    return normalZoom;
  },

  _repositionMap(dontZoom) {
    const location = this._getCurrentLocation();
    let zoom;
    if (!dontZoom) {
      zoom = this._metresToMapZoom(location.accuracy);
    } else {
      zoom = this.map.getZoom();
    }
    this.map.setView(this._getCenter(location), zoom);
  },

  _getCurrentLayer() {
    return DEFAULT_LAYER;
  },

  /**
   * Set full remaining height.
   */
  _refreshMapHeight() {
    Log('Location:MainView:Map: refreshing map height.');
    this.$container = this.$el.find('#map')[0];
    $(this.$container).style = 'height: 100vh;';
  },

  _getCenter(location = {}) {
    let center = DEFAULT_CENTER;
    if (location.latitude) {
      center = [location.latitude, location.longitude];
    }
    return center;
  },

  /**
   * Transform location accuracy to WGS84 map zoom level.
   * @param metres
   * @private
   */
  _metresToMapZoom(metres) {
    if (!metres) {
      return DEFAULT_LAYER_ZOOM;
    }

    if (metres >= 5000) {
      return 9;
    }
    if (metres >= 1000) {
      return 12; // tetrad
    }
    if (metres >= 500) {
      return 13;
    }
    if (metres >= 50) {
      return 16;
    }

    return 18;
  },

  /**
   * Transform WGS84 map zoom to radius in meters.
   * @param zoom
   * @returns {*}
   * @private
   */
  _mapZoomToMetres(zoom) {
    let scale;
    if (zoom <= 10) {
      scale = 0;
    } else if (zoom <= 12) {
      return 1000; // tetrad (radius is 1000m)
    } else if (zoom <= 13) {
      scale = 1;
    } else if (zoom <= 16) {
      scale = 2;
    } else {
      scale = 3;
    }

    scale = 5000 / 10 ** scale; // meters
    return scale < 1 ? 1 : scale;
  },
};

$.extend(API, mapMarker);
$.extend(API, gpsFunctions);

export default API;
