import Video from '../../domain/Video';

export interface VideoRepository {
  save(video: Video): void;
}

export default class VideoCreator {
  constructor(private videoRepository: VideoRepository) {}

  invoke(video: Video): void {
    this.videoRepository.save(video);
  }
}
