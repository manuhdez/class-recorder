import supertest from 'supertest';
import getTestApp from '../app';
import Uuid from '../../../../../contexts/Shared/domain/value-object/Uuid';
import VideoMother from '../../../../../test/Recording/Videos/domain/VideoMother';
import { clearVideosFromDB } from '../../../../../test/Recording/Videos/infrastructure/utils';

const app = getTestApp();
const api = supertest(app);

beforeEach(clearVideosFromDB);
afterAll(clearVideosFromDB);

describe('GET /videos', () => {
  describe('With an empty list', () => {
    test('get the list of videos stored', async () => {
      await api.get('/videos').expect(200).expect({ success: true, videos: [] });
    });
  });

  describe('with a seeded list of videos', () => {
    const videoList = VideoMother.randomList(5);

    beforeEach(async () => {
      for (let video of videoList) {
        await api.post('/videos').send(video.toPrimitives());
      }
    });

    test('gets a seeded list of videos', async () => {
      const response = await api.get('/videos').expect(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('videos');
      expect(response.body.videos).toHaveLength(videoList.length);

      response.body.videos.forEach((video: any, idx: number) => {
        expect(videoList[idx].id.value).toEqual(video.id);
        expect(videoList[idx].title.value).toEqual(video.title);
      });
    });
  });
});

describe('POST - /videos', () => {
  const validUUid = Uuid.random().toString();

  describe('with all valid fields required', () => {
    const videoData = { id: validUUid, title: 'video title' };

    test('returns a successful response', async () => {
      await api
        .post('/videos')
        .send(videoData)
        .expect(201)
        .expect({ success: true, message: 'The video was successfully created.' });
    });

    test('saving a video with an existing id will update the video data', async () => {
      const video = { id: validUUid, title: 'mock title' };
      const newVideo = { ...video, title: 'updated video data' };

      await api.post('/videos').send(video).expect(201);
      await api.post('/videos').send(newVideo).expect(201);
      await api.get('/videos').expect(200, { success: true, videos: [newVideo] });
    });
  });

  describe('returns 400 with missing or invalid data', () => {
    test('if no data is sent', async () => {
      await api.post('/videos').expect(400);
    });

    test('if missing one field', async () => {
      await api.post('/videos').send({}).expect(400);
    });

    test('if sent an invalid id', async () => {
      await api
        .post('/videos')
        .send({ id: 'fake-uuid', title: 'whatever' })
        .expect(400, { success: false, error: 'The given id has not a valid uuid format.' });
    });

    test('if sent an invalid title', async () => {
      await api
        .post('/videos')
        .send({ id: validUUid, title: 23 })
        .expect(400, { success: false, error: 'The video title has to be of type String.' });

      await api
        .post('/videos')
        .send({ id: validUUid, title: { value: 'mock title' } })
        .expect(400, { success: false, error: 'The video title has to be of type String.' });
    });

    test('if the video title is too long', async () => {
      const longTitle = new Array(200).fill('h').join('');
      await api
        .post('/videos')
        .send({ id: validUUid, title: longTitle })
        .expect(400)
        .expect({ success: false, error: 'The title of a video cannot be longer than 150 characters' });
    });
  });
});
