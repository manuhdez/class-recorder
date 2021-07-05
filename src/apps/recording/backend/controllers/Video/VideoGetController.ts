import { Request, Response } from 'express';
import Controller from '../Controller';
import VideoFinder from '../../../../../contexts/Recording/Videos/application/Find/VideoFinder';

export default class VideoGetController implements Controller {
  constructor(private videoFinder: VideoFinder) {}

  async run(req: Request, res: Response) {
    const videos = await this.videoFinder.invoke();

    res.status(200).json({
      success: true,
      videos: !videos ? [] : videos.map(video => video.toPrimitives())
    });
  }
}
