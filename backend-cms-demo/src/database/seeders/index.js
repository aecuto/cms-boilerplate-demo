require('module-alias/register');

const userSeeder = require('./user');
const adminSeeder = require('./admin');
const path = require('path');
const connectDB = require('database');

require('dotenv').config({
  path: path.join(__dirname, '../../../.env')
});

const SEEDTYPE = process.env.SEEDTYPE;

const initSeed = async () => {
  await connectDB();
  await userSeeder.seedUp();
  await adminSeeder.seedUp();
};

const initSeedDown = async () => {
  await connectDB();
  await userSeeder.seedDown();
  await adminSeeder.seedDown();
};

if (SEEDTYPE === 'UP') {
  initSeed();
} else if (SEEDTYPE === 'DOWN') {
  initSeedDown();
}
