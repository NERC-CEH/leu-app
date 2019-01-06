import appModel from 'app_model';

/******************************************************************************
 * Species list sorts.
 *****************************************************************************/
/**
 * A collection of sorting options used to manage lists.
 * id - sort type identifier
 * label - label to represent the filter in the UI
 */
function exist(country, species1, species2) {
  if (!species1.attributes[country].exist === 'YES') {
    return false;
  }
  if (!species2.attributes[country].exist === 'YES') {
    return false;
  }

  return true;
}

const sorts = {
  default(species1, species2) {
    const country = appModel.get('country');
    if (!exist(country, species1, species2)) {
      return 1;
    }
    let commonName1 = species1.attributes[country].order;
    let commonName2 = species2.attributes[country].order;

    if (commonName1 === commonName2) {
      return 0;
    }
    return commonName1 > commonName2 ? 1 : -1;
  },
  common(species1, species2) {
    const country = appModel.get('country');
    if (!exist(country, species1, species2)) {
      return 1;
    }

    let commonName1 = species1.attributes[country].common_name;
    let commonName2 = species2.attributes[country].common_name;
    if (!commonName1) return 1;
    if (!commonName2) return -1;

    if( !isNaN(commonName1[0]) && isNaN(commonName2[0])){
      return 1;
    }  
    if( !isNaN(commonName2[0]) && isNaN(commonName1[0])){
      return -1;
    }  

    return commonName1.localeCompare(commonName2, undefined, {numeric: true});
  },
  'common-reverse'(species1, species2) {
    const country = appModel.get('country');
    if (!exist(country, species1, species2)) {
      return 1;
    }
    let commonName1 = species1.attributes[country].common_name;
    let commonName2 = species2.attributes[country].common_name;
    if (!commonName1) return 1;
    if (!commonName2) return -1;

    if( !isNaN(commonName1[0]) && isNaN(commonName2[0])){
      return -1;
    }  
    if( !isNaN(commonName2[0]) && isNaN(commonName1[0])){
      return 1;
    }  
    
    return commonName2.localeCompare(commonName1, undefined, {numeric: true});
  },

  
  scientific(species1, species2) {
    const aTaxon = species1.attributes.taxon.toLowerCase();
    const bTaxon = species2.attributes.taxon.toLowerCase();

    if (aTaxon === bTaxon) {
      const aForm = species1.attributes.form;
      const bForm = species2.attributes.form;
      return aForm > bForm;
    }
    return aTaxon > bTaxon ? 1 : -1;
  },
  'scientific-reverse'(species1, species2) {
    const aTaxon = species1.attributes.taxon.toLowerCase();
    const bTaxon = species2.attributes.taxon.toLowerCase();

    if (aTaxon === bTaxon) {
      const aForm = species1.attributes.form;
      const bForm = species2.attributes.form;
      return aForm < bForm;
    }
    return aTaxon < bTaxon ? 1 : -1;
  },
};

export default sorts;

