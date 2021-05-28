import { VideoRepository } from '../../application/Create/VideoCreator';
import Video from '../../domain/Video';

export default class MockVideoRepository implements VideoRepository {
  mockSave = jest.fn();

  save(video: Video): void {
    this.mockSave(video);
  }
}
