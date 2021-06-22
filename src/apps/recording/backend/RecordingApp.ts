import Server from './Server';

export default class RecordingApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5000';
    this.server = new Server(port);
    return this.server.listen();
  }

  async stop() {
    this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHttpServer();
  }
}
