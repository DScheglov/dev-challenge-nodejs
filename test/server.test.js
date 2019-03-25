/* eslint-disable global-require */
jest.mock('redis', () => require('redis-mock'));
const uuid = require('uuid/v4');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../lib/server');

const dbName = `integration-test-${uuid()}`;

const getRoutes = (vessel, target) => request(app).get(`/routes?target=${target}&vessel=${vessel}`);

describe('/routes', () => {
  beforeAll(() => app.init({
    MONGO_DB_URI: `mongodb://${process.env.DOCKER_TEST ? 'mongodb' : 'localhost'}/${dbName}`,
    SOURCE_FILE_PATH: `${__dirname}/../gates.txt`
  }), 120000);

  beforeEach(() => mongoose
    .connection
    .db.collections()
    .then(
      collections => Promise.all(
        collections.map(collection => collection.deleteMany({}))
      )
    ), 120000);

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  }, 120000);

  it('GET /routes?target=56&vessel=1 - 200, [...routes]', async () => {
    const result = await request(app).get('/routes?target=56&vessel=1').expect(200);
    expect(result.body).toMatchSnapshot();
  }, 120000);

  it('GET /routes?target=4&vessel=1 - 200, []', async () => {
    const result = await request(app).get('/routes?target=4&vessel=1').expect(200);
    expect(result.body).toEqual([]);
  }, 120000);

  it('GET /routes?&vessel=1 - 400, target is required', async () => {
    const result = await request(app).get('/routes?vessel=1').expect(400);
    expect(result.body).toMatchSnapshot();
  }, 120000);

  it('GET /routes?&target=56 - 400, vessel is required', async () => {
    const result = await request(app).get('/routes?target=56').expect(400);
    expect(result.body).toMatchSnapshot();
  }, 120000);

  it('GET /routes - 400, vessel is required', async () => {
    const result = await request(app).get('/routes').expect(400);
    expect(result.body).toMatchSnapshot();
  }, 120000);
});

describe('/vessels', () => {
  beforeAll(() => app.init({
    MONGO_DB_URI: `mongodb://${process.env.DOCKER_TEST ? 'mongodb' : 'localhost'}/${dbName}`,
    SOURCE_FILE_PATH: `${__dirname}/../gates.txt`
  }), 120000);

  beforeEach(() => mongoose
    .connection
    .db.collections()
    .then(
      collections => Promise.all(
        collections.map(collection => collection.deleteMany({}))
      )
    ), 120000);

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  }, 120000);

  it('GET /vessels - 200, json: []', async () => {
    await request(app).get('/vessels').expect(200, []);
  });

  it('GET /vessels - 200, json: [ ...vessels ]', async () => {
    await getRoutes(1, 56);
    await getRoutes(1, 4);
    await getRoutes(2, 4);
    await getRoutes(2, 56);
    await request(app).get('/vessels').expect(200, [
      { vessel: 1, target: 4 },
      { vessel: 2, target: 56 },
    ]);
  });

  it('GET /vessels?format=json - 200, json: []', async () => {
    await request(app).get('/vessels?format=json').expect(200, []);
  });

  it('GET /vessels?format=json - 200, json: [ ...vessels ]', async () => {
    await getRoutes(1, 56);
    await getRoutes(1, 4);
    await getRoutes(2, 4);
    await getRoutes(2, 56);
    await request(app).get('/vessels?format=json').expect(200, [
      { vessel: 1, target: 4 },
      { vessel: 2, target: 56 },
    ]);
  });

  it('GET /vessels?format=pdf - 200, json: []', async () => {
    await request(app).get('/vessels?format=json').expect(200, []);
  });

  it('GET /vessels?format=pdf - 200, json: [ ...vessels ]', async () => {
    await getRoutes(1, 56);
    await getRoutes(1, 4);
    await getRoutes(2, 4);
    await getRoutes(2, 56);
    await request(app).get('/vessels?format=json').expect(200, [
      { vessel: 1, target: 4 },
      { vessel: 2, target: 56 },
    ]);
  });

  it('GET /vessels?format=csv - 200, csv: headers only', async () => {
    expect(
      (await request(app).get('/vessels?format=csv').expect(200)).text
    ).toMatchSnapshot();
  });

  it('GET /vessels?format=csv - 200, csv: header and vessels', async () => {
    await getRoutes(1, 56);
    await getRoutes(1, 4);
    await getRoutes(2, 4);
    await getRoutes(2, 56);
    expect(
      (await request(app).get('/vessels?format=csv').expect(200)).text
    ).toMatchSnapshot();
  });
});

describe('/vessels/:vessel/route-requests', () => {
  beforeAll(() => app.init({
    MONGO_DB_URI: `mongodb://${process.env.DOCKER_TEST ? 'mongodb' : 'localhost'}/${dbName}`,
    SOURCE_FILE_PATH: `${__dirname}/../gates.txt`
  }), 120000);

  beforeEach(() => mongoose
    .connection
    .db.collections()
    .then(
      collections => Promise.all(
        collections.map(collection => collection.deleteMany({}))
      )
    ), 120000);

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  }, 120000);

  it('GET /vessels/5/route-requests - 404, json: { error: "vessel 5 is not found" }', async () => {
    await request(app)
      .get('/vessels/5/route-requests')
      .expect(404, { error: 'Vessel "5" is not found.' });
  });

  it('GET /vessels/abc/route-requests - 400, json: { error: "vessel is not specified" }', async () => {
    await request(app)
      .get('/vessels/abc/route-requests')
      .expect(400, { error: 'Route parameter "vessel" is not specified or specified incorrectly: "abc" is not a positive integer.' });
  });

  it('GET /vessels/1/route-requests - 200, json: [ ...requests ]', async () => {
    await getRoutes(1, 56);
    await getRoutes(1, 4);
    await getRoutes(2, 4);
    await getRoutes(2, 56);

    const { body } = await request(app)
      .get('/vessels/1/route-requests')
      .expect(200);
    expect(body).toHaveLength(2);
    expect(body[0].vessel).toBe(1);
    expect(body[0].target).toBe(56);
    expect(body[0].result).toMatchSnapshot();
  });

  it('GET /vessels/5/route-requests?format=json - 404, json: { error: "vessel 5 is not found" }', async () => {
    await request(app)
      .get('/vessels/5/route-requests?format=json')
      .expect(404, { error: 'Vessel "5" is not found.' });
  });

  it('GET /vessels/abc/route-requests?format=json - 400, json: { error: "vessel is not specified" }', async () => {
    await request(app)
      .get('/vessels/abc/route-requests?format=json')
      .expect(400, { error: 'Route parameter "vessel" is not specified or specified incorrectly: "abc" is not a positive integer.' });
  });

  it('GET /vessels/1/route-requests?format=json - 200, json: [ ...requests ]', async () => {
    await getRoutes(1, 56);
    await getRoutes(1, 4);
    await getRoutes(2, 4);
    await getRoutes(2, 56);

    const { body } = await request(app)
      .get('/vessels/1/route-requests?format=json')
      .expect(200);
    expect(body).toHaveLength(2);
    expect(body[0].vessel).toBe(1);
    expect(body[0].target).toBe(56);
    expect(body[0].result).toMatchSnapshot();
  });

  it('GET /vessels/5/route-requests?format=pdf - 404, json: { error: "vessel 5 is not found" }', async () => {
    await request(app)
      .get('/vessels/5/route-requests?format=pdf')
      .expect(404, { error: 'Vessel "5" is not found.' });
  });

  it('GET /vessels/abc/route-requests?format=pdf - 400, json: { error: "vessel is not specified" }', async () => {
    await request(app)
      .get('/vessels/abc/route-requests?format=pdf')
      .expect(400, { error: 'Route parameter "vessel" is not specified or specified incorrectly: "abc" is not a positive integer.' });
  });

  it('GET /vessels/1/route-requests?format=pdf - 200, json: [ ...requests ]', async () => {
    await getRoutes(1, 56);
    await getRoutes(1, 4);
    await getRoutes(2, 4);
    await getRoutes(2, 56);

    const { body } = await request(app)
      .get('/vessels/1/route-requests?format=pdf')
      .expect(200);
    expect(body).toHaveLength(2);
    expect(body[0].vessel).toBe(1);
    expect(body[0].target).toBe(56);
    expect(body[0].result).toMatchSnapshot();
  });

  it('GET /vessels/5/route-requests?format=csv - 404, json: { error: "vessel 5 is not found" }', async () => {
    await request(app)
      .get('/vessels/5/route-requests?format=csv')
      .expect(404, { error: 'Vessel "5" is not found.' });
  });

  it('GET /vessels/abc/route-requests?format=csv - 400, json: { error: "vessel is not specified" }', async () => {
    await request(app)
      .get('/vessels/abc/route-requests?format=csv')
      .expect(400, { error: 'Route parameter "vessel" is not specified or specified incorrectly: "abc" is not a positive integer.' });
  });

  it('GET /vessels/1/route-requests?format=csv - 200, csv: header and data', async () => {
    await getRoutes(1, 56);
    await getRoutes(1, 4);
    await getRoutes(2, 4);
    await getRoutes(2, 56);

    const { text } = await request(app)
      .get('/vessels/1/route-requests?format=csv')
      .expect(200);
    expect(text.split('\x0D\x0A')).toHaveLength(
      1 + // header
      5 + // routes fotr 56
      1 // no routes for 4
    );
  });
});
