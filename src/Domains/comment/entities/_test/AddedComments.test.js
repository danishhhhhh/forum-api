const AddedComments = require('../AddedComments');

describe('a AddedComments entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      id: 'comment-123',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };

    expect(() => new AddedComments(payload)).toThrowError('ADDED_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      id: 'comment-123',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      user_id: 1234567890,
    };

    expect(() => new AddedComments(payload)).toThrowError('ADDED_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create new thread object correctly', () => {
    const payload = {
      id: 'comment-123',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      user_id: 'user-123',
    };

    const { id, content, owner } = new AddedComments(payload);

    expect(id).toEqual(payload.id);
    expect(content).toEqual(payload.body);
    expect(owner).toEqual(payload.user_id);
  });
});
