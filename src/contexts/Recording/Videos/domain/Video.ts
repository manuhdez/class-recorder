import VideoId from './VideoId';
import VideoTitle from './VideoTitle';
import AggregateRoot from '../../../Shared/domain/AggregateRoot';

export default class Video extends AggregateRoot {
  constructor(readonly id: VideoId, readonly title: VideoTitle) {
    super();
  }

  public static create(id: VideoId, title: VideoTitle): Video {
    return new Video(id, title);
  }

  public static fromPrimitives(video: { id: string; title: string }): Video {
    return new Video(new VideoId(video.id), new VideoTitle(video.title));
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      title: this.title.value
    };
  }
}
