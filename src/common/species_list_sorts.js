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
  if (!a.attributes[locale].exist === 'YES') {
    return false;
  }
  if (!b.attributes[locale].exist === 'YES') {
    return false;
  }

  return true;
}

const sorts = {
  default(a, b) {
    const locale = appModel.get('country');
    if (!exist(locale, a, b)) {
      return 1;
    }
    a = a.attributes[locale].order;
    b = b.attributes[locale].order;

    if (a === b) {
      return 0;
    }
    return a > b ? 1 : -1;
  },
  common(a, b) {
    const locale = appModel.get('country');
    if (!exist(locale, a, b)) {
      return 1;
    }

    if (!a.attributes[locale].common_name) return 1;
    if (!b.attributes[locale].common_name) return -1;

    a = a.attributes[locale].common_name.toLowerCase();
    b = b.attributes[locale].common_name.toLowerCase();

    if (a === b) {
      return 0;
    }
    return a > b ? 1 : -1;
  },
  'common-reverse'(a, b) {
    const locale = appModel.get('country');
    if (!exist(locale, a, b)) {
      return 1;
    }

    if (!a.attributes[locale].common_name) return 1;
    if (!b.attributes[locale].common_name) return -1;

    a = a.attributes[locale].common_name.toLowerCase();
    b = b.attributes[locale].common_name.toLowerCase();

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

