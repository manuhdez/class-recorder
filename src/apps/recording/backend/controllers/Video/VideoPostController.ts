import Controller from '../Controller';
import { Request, Response } from 'express';
import VideoCreator from '../../../../../contexts/Recording/Videos/application/Create/VideoCreator';
import VideoTitle from '../../../../../contexts/Recording/Videos/domain/VideoTitle';
import VideoId from '../../../../../contexts/Recording/Videos/domain/VideoId';

export default class VideoPostController implements Controller {
  constructor(private videoCreator: VideoCreator) {}

  async run(req: Request, res: Response): Promise<void> {
    const id = new VideoId(req.body.id);
    const title = new VideoTitle(req.body.title);
    this.videoCreator.invoke(id, title);
    res.status(201).json({ success: true, message: 'The video was successfully created.' });
  }
}
