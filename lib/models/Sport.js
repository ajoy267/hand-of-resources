const pool = require('../utils/pool');

module.exports = class Sport {
  id;
  name;
  team;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.team = row.team;
  }

  static async insert({ name, team }) {
    const { rows } = await pool.query(
      'INSERT INTO sports (name, team) VALUES ($1, $2) RETURNING *',
      [name, team]
    );
    return new Sport(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM sports');
    return rows.map((row) => new Sport(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM sports WHERE id=$1', [id]);
    return new Sport(rows[0]);
  }

  static async update(id, details) {
    const currentSport = await Sport.getById(id);
    const updatedSport = { ...currentSport, ...details };
    const { name, team } = updatedSport;
    const { rows } = await pool.query(
      'UPDATE sports SET name=$1, team=$2 WHERE id=$3 RETURNING *',
      [name, team, id]
    );
    return new Sport(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM sports WHERE id=$1 RETURNING *',
      [id]
    );
    return new Sport(rows[0]);
  }
};
