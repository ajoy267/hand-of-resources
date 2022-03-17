const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Car = require('../lib/models/Car');

describe('bikes routes', () => {
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
});
