// # Transforms a CSV file into a JSON file
// # eg.
// # A, B, C[], C[], C[], D[], E{A}, E{B}, F{P{L[]}}
// #
// # {A, B, [C, C, C], [D], E:{A, B}}, F:{P:[L]}


const parse = require('csv-parse');
const fs = require('fs');

const inputFileName = process.argv[2];

function processRow(header, row) {
  const rowObj = {};

  // for each row column value set it in the right rowObj
  row.forEach((columnVal, i) => {
    if (columnVal) {
      setColumnObj(rowObj, header[i], normalizeValue(columnVal));
    }
  });

  return rowObj;
}

function setColumnObj(obj, columnName, value) {
  if (!columnName.length) {
    return null;
  }

  // cleanup
  const keyFull = columnName.replace(' ', '');

  // check if any fancy parsing is needed
  const array = keyFull[keyFull.length - 1] === ']';
  const object = keyFull[keyFull.length - 1] === '}';

  if (!array && !object) {
    return (obj[columnName] = value);
  }

  let index,
    key;
  if (array) {
    index = keyFull.indexOf('[');
    key = keyFull.substring(0, index);

    // initialize if non existing
    if (!obj[key]) {
      obj[key] = [];
    }

    return obj[key].push(value);
  }

  if (object) {
    index = keyFull.indexOf('{');
    key = keyFull.substring(0, index);

    // initialize if non existing
    if (!obj[key]) {
      obj[key] = {};
    }

    const newColumnName = keyFull.substring(index + 1, keyFull.length - 1);
    return setColumnObj(obj[key], newColumnName, value);
  }
}

function normalizeValue(value) {
  // check if int
  // https://coderwall.com/p/5tlhmw/converting-strings-to-number-in-javascript-pitfalls
  const int = value * 1;
  if (!isNaN(int)) return int;
  return value;
}

/**
 * Process the CSV file.
 * @param output
 * @returns {Array}
 */
function main(output) {
  const obj = [];
  const header = output.shift();
  output.forEach((row) => {
    const rowObj = processRow(header, row);
    obj.push(rowObj);
  });

  return obj;
}

/**
 * Parse raw CSV file.
 */
fs.readFile(`./${inputFileName}.csv`, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  parse(data, {}, (err, output) => {
    const obj = main(output);

    fs.writeFile(`./${inputFileName}.data.json`, JSON.stringify(obj),  (err) => {
      if (err) {
        return console.log(err);
      }

      console.log('The file was saved!');
    });
  });
});
