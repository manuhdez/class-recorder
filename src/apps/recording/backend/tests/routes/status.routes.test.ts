import getTestApp from '../app';
import supertest from 'supertest';

const app = getTestApp();
const api = supertest(app);

test('returns status 200 and message OK', async () => {
  await api.get('/status').expect(200).expect({ status: 'OK' });
});
