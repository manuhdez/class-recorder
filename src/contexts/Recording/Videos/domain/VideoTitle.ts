import InvalidVideoTitleFormat from './errors/InvalidVideoTitleFormat';
import VideoTitleTooLong from './errors/VideoTitleTooLong';

export default class VideoTitle {
  private MAX_TITLE_LENGTH = 150;

  constructor(private readonly value: string) {
    this.ensureTitleIsValid(value);
    this.value = value;
  }

  private ensureTitleIsValid(value: string): void {
    this.ensureTitleFormatIsValidString(value);
    const isLargerThanMaxLength = value.length > this.MAX_TITLE_LENGTH;
    if (isLargerThanMaxLength) throw new VideoTitleTooLong(this.MAX_TITLE_LENGTH);
  }

  private ensureTitleFormatIsValidString(value: string): void {
    if (typeof value !== 'string') throw new InvalidVideoTitleFormat();
  }

  public getValue(): string {
    return this.value;
  }
}
