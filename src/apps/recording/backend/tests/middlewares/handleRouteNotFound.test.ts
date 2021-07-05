import supertest from 'supertest';
import configExpressServer from '../../config/configExpressServer';

const app = configExpressServer();
const api = supertest(app);

test('returns a 404 status if a route does not exists', async () => {
  const routeName = '/random-route';
  const { status, body } = await api.get(routeName);
  expect(status).toEqual(404);
  expect(body.success).toEqual(false);
  expect(body.error).toEqual(`Route ${routeName} does not exists.`);
});
