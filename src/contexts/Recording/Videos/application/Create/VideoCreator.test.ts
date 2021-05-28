import Video from '../../domain/Video';
import VideoCreator from './VideoCreator';
import MockVideoRepository from '../../infrastructure/__mocks__/MockVideoRepository';

describe('With a valid video', () => {
  test('it should save the video on the repository', () => {
    const testVideo = new Video('test video title');
    const repository = new MockVideoRepository();
    const videoCreator = new VideoCreator(repository);

    videoCreator.invoke(testVideo);

    expect(repository.mockSave).toHaveBeenCalled();
    expect(repository.mockSave).toHaveBeenCalledWith(testVideo);
  });
});
