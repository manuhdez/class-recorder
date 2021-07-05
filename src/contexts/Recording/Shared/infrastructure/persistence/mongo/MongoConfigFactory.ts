import { config } from 'dotenv';
import { MongoConfig } from '../../../../../Shared/infrastructure/persistence/mongo/MongoClientFactory';

config();

export default class MongoConfigFactory {
  static createConfig(): MongoConfig {
    return {
      url: process.env.RECORDER_DB_URI as string
    };
  }

  static createTestConfig(): MongoConfig {
    return {
      url: process.env.RECORDER_DB_URI_TEST as string
    };
  }
}
