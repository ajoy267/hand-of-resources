const pool = require('../utils/pool');

module.exports = class Game {
  id;
  type;
  name;

  constructor(row) {
    this.id = row.id;
    this.type = row.type;
    this.name = row.name;
  }

  static async insert({ type, name }) {
    const { rows } = await pool.query(
      'INSERT INTO games (type, name) VALUES ($1, $2) RETURNING *',
      [type, name]
    );
    if (!rows[0]) {
      return null;
    }
    return new Game(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM games');
    return rows.map((row) => new Game(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM games WHERE id=$1', [id]);
    return new Game(rows[0]);
  }

  static async update(id, details) {
    const currentGame = await Game.getById(id);
    const updatedGame = await { ...currentGame, ...details };
    const { type, name } = updatedGame;
    const { rows } = await pool.query(
      'UPDATE games SET type=$1, name=$2 WHERE id=$3 RETURNING *',
      [type, name, id]
    );
    return new Game(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM games WHERE id=$1 RETURNING *',
      [id]
    );
    return new Game(rows[0]);
  }
};
