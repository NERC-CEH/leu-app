import appModel from 'app_model';

/******************************************************************************
 * Species list sorts.
 *****************************************************************************/
/**
 * A collection of sorting options used to manage lists.
 * id - sort type identifier
 * label - label to represent the filter in the UI
 */
function exist(locale, a, b) {
  if (!a.attributes[locale].exist === 'NO') {
    return 1;
  }
  if (!b.attributes[locale].exist === 'NO') {
    return -1;
  }
}

const sorts = {
  common(a, b) {
    const locale = appModel.get('country');
    const doesNotExist = exist(locale, a, b);
    if (!doesNotExist) {
      return doesNotExist;
    }
    a = a.attributes[locale].common_name.toLowerCase();
    b = b.attributes[locale].common_name.toLowerCase();

    if (a === b) {
      return 0;
    }
    return a > b ? 1 : -1;
  },
  'common-reverse'(a, b) {
    const locale = appModel.get('country');
    const doesNotExist = exist(locale, a, b);
    if (!doesNotExist) {
      return doesNotExist;
    }    a = a.attributes[locale].common_name.toLowerCase();
    b = b.attributes[locale].common_name.toLowerCase();

    if (a === b) {
      return 0;
    }
    return a < b ? 1 : -1;
  },
  scientific(a, b) {
    const locale = appModel.get('country');
    const doesNotExist = exist(locale, a, b);
    if (!doesNotExist) {
      return doesNotExist;
    }    a = a.attributes[locale].taxon.toLowerCase();
    b = b.attributes[locale].taxon.toLowerCase();

    if (a === b) {
      return 0;
    }
    return a > b ? 1 : -1;
  },
  'scientific-reverse'(a, b) {
    const locale = appModel.get('country');
    const doesNotExist = exist(locale, a, b);
    if (!doesNotExist) {
      return doesNotExist;
    }
    a = a.attributes[locale].taxon.toLowerCase();
    b = b.attributes[locale].taxon.toLowerCase();

    if (a === b) {
      return 0;
    }
    return a < b ? 1 : -1;
  },
};

export default sorts;

