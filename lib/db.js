import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'sql.freedb.tech',
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME || 'freedb_school-management122',
  port: parseInt(process.env.DB_PORT) || 3306,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  connectTimeout: 30000,
  acquireTimeout: 30000,
  timeout: 30000,
};

let connection;

export async function getConnection() {
  if (!connection) {
    try {
      console.log('Connecting to FreeDB database:', process.env.DB_NAME);
      
      connection = await mysql.createConnection(dbConfig);
      console.log('✅ FreeDB connected successfully');
      
      // Test the connection
      await connection.execute('SELECT 1');
      console.log('✅ Database test query successful');
      
      // Create schools table if it doesn't exist
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS schools (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          address TEXT NOT NULL,
          city VARCHAR(100) NOT NULL,
          state VARCHAR(100) NOT NULL,
          contact VARCHAR(15) NOT NULL,
          image TEXT,
          email_id VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('✅ Schools table ready');
      
    } catch (error) {
      console.error('❌ FreeDB connection failed:', error);
      connection = null;
      throw error;
    }
  }
  return connection;
}

export async function executeQuery(query, params = []) {
  try {
    const conn = await getConnection();
    const [results] = await conn.execute(query, params);
    return results;
  } catch (error) {
    console.error('❌ Query execution failed:', error);
    connection = null;
    throw error;
  }
}