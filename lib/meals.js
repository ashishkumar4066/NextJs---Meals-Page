import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db = null;

export async function getMeals(req, res) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  if (!db) {
    db = await open({
      filename: './meals.db', // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  const items = await db.all('SELECT * FROM meals');

  return items;
}

export async function getMeal(slug) {
  if (!db) {
    db = await open({
      filename: './meals.db', // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }
  const query = `SELECT * FROM meals WHERE slug = ?`;
  return db.get(query, [slug]);
}
