import { lorem } from 'faker';
import Video from '../../../../contexts/Recording/Videos/domain/Video';
import VideoTitle from '../../../../contexts/Recording/Videos/domain/VideoTitle';
import VideoId from '../../../../contexts/Recording/Videos/domain/VideoId';

export default class VideoMother {
  static randomVideoTitle(): VideoTitle {
    return new VideoTitle(lorem.words(6));
  }

  static randomVideoId(): VideoId {
    const randomId = VideoId.random().value;
    return new VideoId(randomId);
  }

  static random(): Video {
    const id = VideoMother.randomVideoId();
    const title = VideoMother.randomVideoTitle();
    return new Video(id, title);
  }

  static randomList(length = 10): Video[] {
    return new Array(length).fill(null).map(() => VideoMother.random());
  }
}
