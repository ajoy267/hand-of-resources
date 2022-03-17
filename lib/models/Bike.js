const pool = require('../utils/pool');

module.exports = class Bike {
  id;
  brand;
  model;
  components;

  constructor(row) {
    this.id = row.id;
    this.brand = row.brand;
    this.model = row.model;
    this.components = row.components;
  }

  static async insert({ brand, model, components }) {
    const { rows } = await pool.query(
      'INSERT INTO bikes (brand, model, components) VALUES ($1, $2, $3) RETURNING *',
      [brand, model, components]
    );
    return new Bike(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM bikes');
    return rows.map((row) => new Bike(row));
  }
};
