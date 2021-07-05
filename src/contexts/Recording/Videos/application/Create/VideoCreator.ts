import Video from '../../domain/Video';
import VideoId from '../../domain/VideoId';
import VideoTitle from '../../domain/VideoTitle';
import VideoRepository from '../../domain/VideoRepository';

export default class VideoCreator {
  constructor(private videoRepository: VideoRepository) {}

  invoke(id: VideoId, title: VideoTitle): void {
    const video = Video.create(id, title);
    this.videoRepository.save(video);
  }
}
