import Video from './Video';

export default interface VideoRepository {
  save(video: Video): void;
  all(): Video[];
}
