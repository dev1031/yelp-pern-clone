require("dotenv").config();

const { Pool } = require('pg');
const { Client } = require('pg');

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const proConfig = "postgres://eyulfxycdkfgqa:6c93d543cc139e0f0e5ecb3bb38b121127cc0ab256e91c11ba5055b884a857df@ec2-54-160-161-214.compute-1.amazonaws.com:5432/ddrpg9jghmpj1f"; //heroku addons

// const client = new Client({
//   connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig
// })
// client.connect()
const db = new Pool({
  connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig
});

module.exports = db;