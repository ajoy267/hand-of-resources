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

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM bikes WHERE id=$1', [id]);
    return new Bike(rows[0]);
  }

  static async update(id, details) {
    const currentBike = await Bike.getById(id);
    const updatedBike = { ...currentBike, ...details };
    const { brand, model, components } = updatedBike;
    const { rows } = await pool.query(
      'UPDATE bikes SET brand=$1, model=$2, components=$3 WHERE id=$4 RETURNING *',
      [brand, model, components, id]
    );
    return new Bike(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM bikes WHERE id=$1 RETURNING *',
      [id]
    );
    return new Bike(rows[0]);
  }
};
