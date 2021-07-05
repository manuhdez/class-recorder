import VideoRepository from '../../../../contexts/Recording/Videos/domain/VideoRepository';
import container from '../../../../apps/recording/backend/dependency-injection';

export async function clearVideosFromDB(): Promise<void> {
  const videoRepository: VideoRepository = container.get('Videos.VideoRepository');
  await videoRepository.clear();
}
