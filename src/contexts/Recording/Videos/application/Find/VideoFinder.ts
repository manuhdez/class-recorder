import VideoRepository from '../../domain/VideoRepository';

export default class VideoFinder {
  constructor(private repository: VideoRepository) {}

  invoke() {
    return this.repository.all();
  }
}
