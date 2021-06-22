import RecordingApp from './RecordingApp';

(async () => {
  try {
    await new RecordingApp().start();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

process.on('uncaughtException', e => {
  console.error(e);
  process.exit(1);
});
