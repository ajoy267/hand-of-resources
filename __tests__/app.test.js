const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Bike = require('../lib/models/Bike');

describe('hand-of-resources routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a bike', async () => {
    const expected = {
      brand: 'Specialized',
      model: 'S-Works Tarmac SL7',
      components: 'Shimano Di2',
    };
    const res = await request(app).post('/api/v1/bikes').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets all bikes', async () => {
    const expected = await Bike.getAll();
    const res = await request(app).get('/api/v1/bikes');
    expect(res.body).toEqual(expected);
  });

  it('gets a bike by its id', async () => {
    const expected = await Bike.getById(1);
    const res = await request(app).get(`/api/v1/bikes/${expected.id}`);
    expect(res.body).toEqual({ ...expected });
  });

  it('updated a bike based off its id', async () => {
    const expected = {
      id: expect.any(String),
      brand: 'Specialized',
      model: 'Tarmac SL7',
      components: 'Shimano Di2',
    };
    const res = await request(app)
      .patch('/api/v1/bikes/1')
      .send({ model: 'Tarmac SL7' });
    expect(res.body).toEqual(expected);
  });
});
