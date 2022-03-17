const pool = require('../utils/pool');

module.exports = class Car {
  id;
  brand;
  make;
  model;

  constructor(row) {
    this.id = row.id;
    this.brand = row.brand;
    this.make = row.make;
    this.model = row.model;
  }

  static async insert({ brand, make, model }) {
    const { rows } = await pool.query(
      'INSERT INTO cars (brand, make, model) VALUES ($1, $2, $3) RETURNING *',
      [brand, make, model]
    );
    return new Car(rows[0]);
  }
};
