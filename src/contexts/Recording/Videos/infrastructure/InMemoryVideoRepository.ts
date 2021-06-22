import Video from '../domain/Video';
import VideoRepository from '../domain/VideoRepository';

export default class InMemoryVideoRepository implements VideoRepository {
  private _videos: Video[] = [];

  save(video: Video): void {
    this._videos.push(video);
  }

  all(): Video[] {
    return this._videos;
  }
}
