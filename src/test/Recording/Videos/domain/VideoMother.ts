import { lorem } from 'faker';
import Video from '../../../../contexts/Recording/Videos/domain/Video';
import VideoTitle from '../../../../contexts/Recording/Videos/domain/VideoTitle';

export default class VideoMother {
  static randomVideoTitle(): VideoTitle {
    return new VideoTitle(lorem.words(6));
  }

  static random(): Video {
    const title = VideoMother.randomVideoTitle();
    return new Video(title);
  }

  static randomList(length = 10): Video[] {
    const videos: Video[] = [];
    const emptyList = new Array(length).fill(null);
    emptyList.forEach(() => videos.push(VideoMother.random()));
    return videos;
  }
}
