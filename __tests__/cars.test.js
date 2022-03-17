const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
});
