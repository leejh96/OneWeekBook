require('dotenv').config();
const development = {
  "username": process.env.DEV_DB_USERNAME,
  "password": process.env.DEV_DB_PASSWORD,
  "database": process.env.DEV_DB,
  "host": process.env.DEV_DB_HOST,
  "dialect": process.env.DEV_DB_DIALECT,
  "port": process.env.DEV_DB_PORT
}
const test = {
  "username": process.env.TEST_DB_USERNAME,
  "password": process.env.TEST_DB_PASSWORD,
  "database": process.env.TEST_DB,
  "host": process.env.TEST_DB_HOST,
  "dialect": process.env.TEST_DB_DIALECT
}

const production = {
  "username": process.env.PRODUCTION_DB_USERNAME,
  "password": process.env.PRODUCTION_DB_PASSWORD,
  "database": process.env.PRODUCTION_DB,
  "host": process.env.PRODUCTION_DB_HOST,
  "dialect": process.env.PRODUCTION_DB_DIALECT
}
const node_env = process.env.NODE_ENV || 'development';
module.exports = { development, test, production, node_env };