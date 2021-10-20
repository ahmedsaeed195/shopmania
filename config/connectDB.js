const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' });

db = new Sequelize(process.env.SHOPMANIA_DBNAME, process.env.SHOPMANIA_DBUSER, process.env.SHOPMANIA_DBPASSWORD, {
  host: process.env.SHOPMANIA_HOST,
  dialect: 'mysql'
});

(async () => {
  try {
    const sync = await db.sync();
    if(sync)
      console.log('sync complete');
  } catch (err) {
    throw err;
  }
})();

module.exports = db;