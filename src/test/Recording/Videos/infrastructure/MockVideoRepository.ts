import VideoRepository from '../../../../contexts/Recording/Videos/domain/VideoRepository';

export default class MockVideoRepository implements VideoRepository {
  save = jest.fn();
  all = jest.fn();
}
