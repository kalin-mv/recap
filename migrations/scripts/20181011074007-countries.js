'use strict';

const shell = require('shelljs');
const { MONGODB_URI } = process.env;

module.exports = {
  async up(db) {
    console.info('--------------------------------------------------------');
    console.info('--------------------------------------------------------');
    console.info(' ----------------- Start migration ---------------------');
    console.info('--------------------------------------------------------');
    console.info(' ----------------- Import countries ---------------------');
    console.info('--------------------------------------------------------');
    console.info('--------------------------------------------------------');

    await db.createCollection('countries');
    await shell.exec(
      `mongoimport --uri "${MONGODB_URI}" --collection countries --file country.json`
    );
    await db
      .collection('countries')
      .updateMany({}, { $set: { isActive: 0 } })
      .then(() => {
        db.collection('countries').updateMany(
          { cca2: { $in: ['UA', 'US', 'FR', 'ES', 'IT', 'GB'] } },
          { $set: { isActive: 1 } }
        );
      });
  },
};
