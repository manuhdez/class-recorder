import VideoTitle from './VideoTitle';

export default class Video {
  // @ts-ignore
  private title: VideoTitle;

  constructor(title: VideoTitle) {
    this.title = title;
  }

  public static create(title: VideoTitle): Video {
    return new Video(title);
  }

  public getTitle(): string {
    return this.title.getValue();
  }
}
