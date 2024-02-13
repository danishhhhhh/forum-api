const AddedThreads = require('../AddedThreads');

describe('a AddedThreads entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'thread-1234567890',
      title: 'Thread Title',
    };

    expect(() => new AddedThreads(payload)).toThrowError('ADDED_THREADS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      id: 'thread-1234567890',
      title: 'Thread Title',
      user_id: 1234567890,
    };

    expect(() => new AddedThreads(payload)).toThrowError('ADDED_THREADS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create new thread object correctly', () => {
    const payload = {
      id: 'thread-1234567890',
      title: 'Thread Title',
      user_id: 'user-123',
    };

    const { id, title, owner } = new AddedThreads(payload);

    expect(id).toEqual(payload.id);
    expect(title).toEqual(payload.title);
    expect(owner).toEqual(payload.user_id);
  });
});
