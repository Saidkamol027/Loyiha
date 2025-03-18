require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: +process.env.DB_PORT,
})

pool
	.connect()
	.then(() => console.log('PostgreSQL ga muvaffaqiyatli ulandi'))
	.catch(err => console.error('Bazaga ulanishda hatolik', err))

module.exports = { pool }
