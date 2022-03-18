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
};
