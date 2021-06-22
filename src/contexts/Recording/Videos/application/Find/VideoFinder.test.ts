import VideoFinder from './VideoFinder';
import VideoMother from '../../../../../test/Recording/Videos/domain/VideoMother';
import MockVideoRepository from '../../../../../test/Recording/Videos/infrastructure/MockVideoRepository';

const repository = new MockVideoRepository();
const videoFinder = new VideoFinder(repository);

test('returns the list of videos saved', () => {
  const videos = VideoMother.randomList();
  repository.all.mockReturnValueOnce(videos);
  const response = videoFinder.invoke();

  expect(response).toEqual(videos);
  expect(response).toHaveLength(videos.length);
});

test('returns an empty array if there are no videos yet', () => {
  repository.all.mockReturnValueOnce([]);
  const response = videoFinder.invoke();
  expect(response).toEqual([]);
  expect(response).toHaveLength(0);
});
