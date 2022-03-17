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

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cars');
    return rows.map((row) => new Car(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM cars WHERE id=$1', [id]);
    return new Car(rows[0]);
  }

  static async update(id, details) {
    const currentCar = await Car.getById(id);
    const updatedCar = { ...currentCar, ...details };
    const { brand, make, model } = updatedCar;
    const { rows } = await pool.query(
      'UPDATE cars SET brand=$1, make=$2, model=$3 WHERE id=$4 RETURNING *',
      [brand, make, model, id]
    );
    return new Car(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM cars WHERE id=$1 RETURNING *',
      [id]
    );
    return new Car(rows[0]);
  }
};
