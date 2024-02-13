const DetailThreads = require('../DetailThreads');

describe('a DetailThreads entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {};

    expect(() => new DetailThreads(payload)).toThrowError('DETAIL_THREADS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      id: 1234567890,
    };

    expect(() => new DetailThreads(payload)).toThrowError('DETAIL_THREADS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create new thread object correctly', () => {
    const payload = {
      id: 'thread-123',
    };

    const { id } = new DetailThreads(payload);

    expect(id).toEqual(payload.id);
  });
});
