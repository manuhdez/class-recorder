import express from 'express';
import * as http from 'http';
import Logger from '../../../contexts/Shared/domain/Logger';
import container from './dependency-injection';
import configExpressServer from './config/configExpressServer';

export default class Server {
  private readonly port: string;
  private express: express.Express;
  private logger: Logger;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.logger = container.get('Shared.Logger');
    this.express = configExpressServer();
  }

  getHttpServer(): http.Server | undefined {
    return this.httpServer;
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        this.logger.info(
          `Recordings backend running at http://localhost:${this.port} in ${this.express.get('env')} mode`
        );
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}
