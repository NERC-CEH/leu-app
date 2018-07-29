/** ****************************************************************************
 * Some location transformation logic.
 **************************************************************************** */
import bigu from 'bigu';
import Log from './log';

const helpers = {
  // grid ref character length
  gridref_accuracy: {
    tetrad: {
      label: 'Tetrad (2km square)',
      length: 5,
    },
    monad: {
      label: 'Monad (1km square)',
      length: 6,
    },
    // '100m': 8, // 100m
  },

  /**
   *
   * @param {type} location
   * @returns {string}
   */
  locationToGrid(location) {
    const gridCoords = bigu.latlng_to_grid_coords(
      location.latitude,
      location.longitude
    );

    if (!gridCoords) {
      return null;
    }

    const normAcc = bigu.GridRefParser.get_normalized_precision(
      location.accuracy * 2 // accuracy is radius
    );

    // Disabled because users 'want' higher precision rather correctness
    // if (location.source === 'gps') {
    //   return helpers.normalizeGridRefAcc(gridCoords, location, normAcc);
    // }

    return gridCoords.to_gridref(normAcc);
  },

  /**
   *
   * @param {object} location
   * @returns {Array} latlng pairs (SW, SE, NE, NW)
   */
  getSquareBounds(location) {
    if (location.latitude) {
      const gridRefString = helpers.locationToGrid(location);
      const parsedRef = bigu.GridRefParser.factory(gridRefString);

      if (parsedRef) {
        const nationalGridRefSW = parsedRef.osRef;
        const a = new parsedRef.NationalRef(
          nationalGridRefSW.x + parsedRef.length,
          nationalGridRefSW.y
        ); // eslint-disable-line
        const b = new parsedRef.NationalRef(
          nationalGridRefSW.x + parsedRef.length,
          nationalGridRefSW.y + parsedRef.length
        ); // eslint-disable-line
        const c = new parsedRef.NationalRef(
          nationalGridRefSW.x,
          nationalGridRefSW.y + parsedRef.length
        ); // eslint-disable-line
        return [
          nationalGridRefSW.to_latLng(),
          a.to_latLng(),
          b.to_latLng(),
          c.to_latLng(),
        ];
      }

      return null;
    }

    return null;
  },

  /**
   * Checks if the grid reference is valid and in GB land
   * @param gridrefString
   */
  isValidGridRef(gridrefString) {
    try {
      const parsedRef = bigu.GridRefParser.factory(gridrefString);
      if (parsedRef && bigu.MappingUtils.is_gb_hectad(parsedRef.hectad)) {
        return true;
      }

      return false;
    } catch (e) {
      Log(e.message);
    }

    return false;
  },
};

export default helpers;
