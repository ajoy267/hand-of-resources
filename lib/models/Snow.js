const pool = require('../utils/pool');

module.exports = class Snow {
  id;
  sport;
  experience;

  constructor(row) {
    this.id = row.id;
    this.sport = row.sport;
    this.experience = row.experience;
  }

  static async insert({ sport, experience }) {
    const { rows } = await pool.query(
      'INSERT INTO snow (sport, experience) VALUES ($1, $2) RETURNING *',
      [sport, experience]
    );
    if (!rows[0]) {
      return null;
    }
    return new Snow(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM snow');
    return rows.map((row) => new Snow(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM snow WHERE id=$1', [id]);
    return new Snow(rows[0]);
  }

  static async update(id, details) {
    const currentSport = await Snow.getById(id);
    const updatedSport = { ...currentSport, ...details };
    const { sport, experience } = updatedSport;
    const { rows } = await pool.query(
      'UPDATE snow SET sport=$1, experience=$2 WHERE id=$3 RETURNING *',
      [sport, experience, id]
    );
    return new Snow(rows[0]);
  }
};
