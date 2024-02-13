const AddComments = require('../AddComments');

describe('a AddComments entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {};

    expect(() => new AddComments(payload)).toThrowError('ADD_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      user: 1234567890,
      thread: 'thread-123',
    };

    expect(() => new AddComments(payload)).toThrowError('ADD_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create new thread object correctly', () => {
    const payload = {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      user: 'user-123',
      thread: 'thread-123',
    };

    const { content, user, thread } = new AddComments(payload);

    expect(content).toEqual(payload.content);
    expect(user).toEqual(payload.user);
    expect(thread).toEqual(payload.thread);
  });
});
