import appModel from 'app_model';

/******************************************************************************
 * Species list sorts.
 *****************************************************************************/
/**
 * A collection of sorting options used to manage lists.
 * id - sort type identifier
 * label - label to represent the filter in the UI
 */
function exist(country, a, b) {
  if (!a.attributes[country].exist === 'YES') {
    return false;
  }
  if (!b.attributes[country].exist === 'YES') {
    return false;
  }

  return true;
}

const sorts = {
  default(a, b) {
    const country = appModel.get('country');
    if (!exist(country, a, b)) {
      return 1;
    }
    a = a.attributes[country].order;
    b = b.attributes[country].order;

    if (a === b) {
      return 0;
    }
    return a > b ? 1 : -1;
  },
  common(a, b) {
    const country = appModel.get('country');
    if (!exist(country, a, b)) {
      return 1;
    }

    if (!a.attributes[country].common_name) return 1;
    if (!b.attributes[country].common_name) return -1;

    a = a.attributes[country].common_name.toLowerCase();
    b = b.attributes[country].common_name.toLowerCase();

    if (a === b) {
      return 0;
    }
    return a > b ? 1 : -1;
  },
  'common-reverse'(a, b) {
    const country = appModel.get('country');
    if (!exist(country, a, b)) {
      return 1;
    }

    if (!a.attributes[country].common_name) return 1;
    if (!b.attributes[country].common_name) return -1;

    a = a.attributes[country].common_name.toLowerCase();
    b = b.attributes[country].common_name.toLowerCase();

    if (a === b) {
      return 0;
    }
    return a < b ? 1 : -1;
  },
  scientific(a, b) {
    const a_taxon = a.attributes.taxon.toLowerCase();
    const b_taxon = b.attributes.taxon.toLowerCase();

    if (a_taxon === b_taxon) {
      const a_form = a.attributes.form;
      const b_form = b.attributes.form;
      return a_form > b_form;
    }
    return a_taxon > b_taxon ? 1 : -1;
  },
  'scientific-reverse'(a, b) {
    const a_taxon = a.attributes.taxon.toLowerCase();
    const b_taxon = b.attributes.taxon.toLowerCase();

    if (a_taxon === b_taxon) {
      const a_form = a.attributes.form;
      const b_form = b.attributes.form;
      return a_form < b_form;
    }
    return a_taxon < b_taxon ? 1 : -1;
  },
};

export default sorts;

