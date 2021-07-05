import { Collection, MongoClient } from 'mongodb';
import AggregateRoot from '../../../domain/AggregateRoot';

export default abstract class MongoRepository<T extends AggregateRoot> {
  constructor(private _client: Promise<MongoClient>) {}

  protected abstract moduleName(): string;

  protected client() {
    return this._client;
  }

  protected async collection(): Promise<Collection> {
    const client = await this.client();
    return client.db().collection(this.moduleName());
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const document = {
      ...aggregateRoot.toPrimitives(),
      _id: id,
      id: undefined
    };

    const collection = await this.collection();
    await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
  }

  protected async dropCollection(): Promise<void> {
    const client = await this.client();
    await client.db().collection(this.moduleName()).deleteMany({});
  }
}
