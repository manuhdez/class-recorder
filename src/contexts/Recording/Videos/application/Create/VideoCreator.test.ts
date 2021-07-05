import VideoCreator from './VideoCreator';
import VideoMother from '../../../../../test/Recording/Videos/domain/VideoMother';
import MockVideoRepository from '../../../../../test/Recording/Videos/infrastructure/MockVideoRepository';
import Video from '../../domain/Video';

const repository = new MockVideoRepository();
const videoCreator = new VideoCreator(repository);

afterEach(() => jest.clearAllMocks());

describe('With a valid video', () => {
  test('it should save the video on the repository', () => {
    const videoId = VideoMother.randomVideoId();
    const videoTitle = VideoMother.randomVideoTitle();
    const expectedVideo = new Video(videoId, videoTitle);

    videoCreator.invoke(videoId, videoTitle);
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(expectedVideo);
  });
});
