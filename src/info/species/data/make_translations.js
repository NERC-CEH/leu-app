// # Transforms a CSV file into a JSON file
// # eg.
// # A, B, C[], C[], C[], D[], E{A}, E{B}, F{P{L[]}}
// #
// # {A, B, [C, C, C], [D], E:{A, B}}, F:{P:[L]}

'use strict';

const parse = require('csv-parse');
const fs = require('fs');

/**
 * Process the CSV file.
 * @param output
 * @returns {Array}
 */
function main(output) {
  const obj = {};
  let header;
  output.forEach((row) => {
    const lang = row.shift(); // remove 'EN'

    if (lang === 'EN'){
      header = row;
      return;
    }

    row.forEach((value, i) => {
      const key = header[i];
      obj[key] = obj[key] || {};
      obj[key][lang] = value;
    });
  });

  return obj;
}

/**
 * Parse raw CSV file.
 */
fs.readFile('./translations.csv', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  parse(data, {}, function(err, output){
    const obj = main(output);

    fs.writeFile("./translations.data.json", JSON.stringify(obj), null, 4, function(err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });
  });
});
