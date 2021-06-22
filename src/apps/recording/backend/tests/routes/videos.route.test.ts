import supertest from 'supertest';
import getTestApp from '../app';
import VideoMother from '../../../../../test/Recording/Videos/domain/VideoMother';

const app = getTestApp();
const api = supertest(app);

describe('GET /videos', () => {
  describe('With an empty list', () => {
    test('get the list of videos stored', async () => {
      await api.get('/videos').expect(200).expect({ videos: [] });
    });
  });

  describe('with a seeded list of videos', () => {
    const videoList = VideoMother.randomList(5);

    beforeEach(async () => {
      for (let video of videoList) {
        await api.post('/videos').send({ title: video.getTitle() });
      }
    });

    test('gets a seeded list of videos', async () => {
      const response = await api.get('/videos').expect(200);
      expect(response.body.videos).toHaveLength(videoList.length);
      response.body.videos.forEach((video: any, idx: number) => {
        expect(videoList[idx].getTitle()).toEqual(video.title.value);
      });
    });
  });
});

describe('POST - /videos', () => {
  describe('with all valid fields required', () => {
    const validVideoData = { title: 'video title' };

    test('returns status created', async () => {
      await api.post('/videos').send(validVideoData).expect(201);
    });

    test('returns a successful response', async () => {
      const response = await api.post('/videos').send(validVideoData);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message', 'The video was successfully created.');
    });
  });

  describe('returns 400 with missing or invalid data', () => {
    test('if no data is sent', async () => {
      await api.post('/videos').expect(400);
    });

    test('if missing one field', async () => {
      await api.post('/videos').send({}).expect(400);
    });

    test('if sent a number for title', async () => {
      const response = await api.post('/videos').send({ title: 23 }).expect(400);
      expect(response.body).toEqual({
        success: false,
        error: 'The video title has to be of type String.'
      });
    });

    test('if sent an object for title', async () => {
      const response = await api
        .post('/videos')
        .send({ title: { value: 'title' } })
        .expect(400);

      expect(response.body).toEqual({
        success: false,
        error: 'The video title has to be of type String.'
      });
    });
  });
});
