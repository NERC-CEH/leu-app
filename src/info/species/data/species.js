// get local environment variables from .env
require('dotenv').config({ silent: true, path: '../../../../.env' }); // eslint-disable-line
const fs = require('fs');
const http = require('https'); // eslint-disable-line

const fileID = '013SAXWCHGUJK2QH74BRBLCHE7MDGR34UE';
const worksheet = 'species';
const range = 'species!A1:FC73';

function fetch() {
  console.log('Pulling all the data from remote.');
  // examples:
  // /workbook/worksheets('species')/range(address='species!A1:FC73')
  // /workbook/worksheets('species')/cell(row=3,column=8)

  const token = process.env.APP_MS_TOKEN;
  if (!token) {
    return Promise.reject(new Error('Requires an APP_MS_TOKEN var set up.'));
  }

  return new Promise(resolve => {
    const options = {
      method: 'GET',
      hostname: 'graph.microsoft.com',
      path: `/v1.0/me/drive/items/${fileID}/workbook/worksheets('${worksheet}')/range(address='${range}')`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
    };

    const req = http.request(options, res => {
      const chunks = [];

      res.on('data', chunk => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const body = Buffer.concat(chunks);
        const json = JSON.parse(body.toString());

        console.log(`Fetched !`);
        resolve(json.values);
      });
    });

    req.end();
  });
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
    return (obj[columnName] = value); // eslint-disable-line
  }

  let index;
  let key;
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
  return null;
}

function normalizeValue(value) {
  // check if int
  // https://coderwall.com/p/5tlhmw/converting-strings-to-number-in-javascript-pitfalls
  const int = value; // * 1;
  console.log(value);

  if (!Number.isNaN(int)) return int;
  return value;
}

function processRow(header, row) {
  const rowObj = {};

  // for each row column value set it in the right rowObj
  row.forEach((columnVal, i) => {
    if (columnVal !== null && columnVal !== '') {
      setColumnObj(rowObj, header[i], normalizeValue(columnVal));
    }
  });

  return rowObj;
}

/**
 * Process the CSV file.
 * @param rows
 * @returns {Array}
 */
function processRows(rows) {
  const obj = [];
  const header = rows.shift();
  rows.forEach(row => {
    const rowObj = processRow(header, row);
    obj.push(rowObj);
  });

  return obj;
}

function saveSpeciesToFile(species) {
  return new Promise((resolve, reject) => {
    console.log(`Writing ./species.data.json`);

    fs.writeFile(
      './species.data.json',
      JSON.stringify(species, null, 2),
      err => {
        if (err) {
          reject(err);
          return;
        }

        resolve(species);
      }
    );
  });
}

fetch()
  .then(processRows)
  .then(saveSpeciesToFile)
  .then(() => console.log('All done!'));
