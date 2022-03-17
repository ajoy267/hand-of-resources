const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Car = require('../lib/models/Car');

describe('car routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a car', async () => {
    const expected = {
      brand: 'Jeep',
      make: 'Compass',
      model: '80th Anniversary Edition',
    };
    const res = await request(app).post('/api/v1/cars').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets all cars', async () => {
    const expected = await Car.getAll();
    const res = await request(app).get('/api/v1/cars');
    expect(res.body).toEqual(expected);
  });

  it('gets a car by its id', async () => {
    const expected = await Car.getById(1);
    const res = await request(app).get(`/api/v1/cars/${expected.id}`);
    expect(res.body).toEqual({ ...expected });
  });

  it('updates car based off id', async () => {
    const expected = {
      id: expect.any(String),
      brand: 'Jeep',
      make: 'Compass',
      model: 'TrailHawk',
    };
    const res = await request(app)
      .patch('/api/v1/cars/1')
      .send({ model: 'TrailHawk' });
    expect(res.body).toEqual(expected);
  });

  it('it deletes a car from the table', async () => {
    const expected = await Car.getById(1);
    const res = await request(app).delete(`/api/v1/cars/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
});
