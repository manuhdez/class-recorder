import Video from './Video';
import VideoId from './VideoId';

export default interface VideoRepository {
  save(video: Video): Promise<void>;
  all(): Promise<Video[] | null>;
  find(id: VideoId): Promise<Video | null>;
  clear(): Promise<void>;
}
