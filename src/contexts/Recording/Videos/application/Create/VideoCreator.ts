import Video from '../../domain/Video';
import VideoTitle from '../../domain/VideoTitle';
import VideoRepository from '../../domain/VideoRepository';

export default class VideoCreator {
  constructor(private videoRepository: VideoRepository) {}

  invoke(title: VideoTitle): void {
    const video = Video.create(title);
    this.videoRepository.save(video);
  }
}
