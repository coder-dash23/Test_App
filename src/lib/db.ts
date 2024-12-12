// lib/db.ts
import mysql from 'mysql2/promise';

export const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',  // MySQL host (use env variable)
  user: process.env.MYSQL_USER || 'root',      // MySQL username (use env variable)
  password: process.env.MYSQL_PASSWORD || '',  // MySQL password (use env variable)
  database: process.env.MYSQL_DB || 'test',    // MySQL database name (use env variable)
});
