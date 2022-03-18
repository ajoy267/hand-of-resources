const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
});
