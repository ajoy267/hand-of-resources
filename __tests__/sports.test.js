const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Sport = require('../lib/models/Sport');

describe('car routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new sport', async () => {
    const expected = {
      name: 'Cycling',
      team: 'Yes',
    };
    const res = await request(app).post('/api/v1/sports').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets all sports', async () => {
    const expected = await Sport.getAll();
    const res = await request(app).get('/api/v1/sports');
    expect(res.body).toEqual(expected);
  });

  it('gets a sport by its id', async () => {
    const expected = await Sport.getById(1);
    const res = await request(app).get(`/api/v1/sports/${expected.id}`);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('updates a sport based off its id', async () => {
    const expected = {
      name: 'Running',
      team: 'Yes',
    };
    const res = await request(app)
      .patch('/api/v1/sports/1')
      .send({ name: 'Running' });
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('deletes a sport from the table', async () => {
    const expected = await Sport.getById(1);
    const res = await request(app).delete(`/api/v1/sports/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
});
