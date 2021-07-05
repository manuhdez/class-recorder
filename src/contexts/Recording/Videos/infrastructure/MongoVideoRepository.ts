import Video from '../domain/Video';
import VideoRepository from '../domain/VideoRepository';
import MongoRepository from '../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import VideoId from '../domain/VideoId';

export default class MongoVideoRepository extends MongoRepository<Video> implements VideoRepository {
  protected moduleName(): string {
    return 'videos';
  }

  async save(video: Video): Promise<void> {
    await this.persist(video.id.value, video);
  }

  async all(): Promise<Video[] | null> {
    const collection = await this.collection();
    const result = await collection.find().toArray();
    return result.map(doc => Video.fromPrimitives({ ...doc, id: doc._id }));
  }

  async find(id: VideoId): Promise<Video | null> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: id });
    return document ? Video.fromPrimitives({ ...document }) : null;
  }

  async clear(): Promise<void> {
    await this.dropCollection();
  }
}
