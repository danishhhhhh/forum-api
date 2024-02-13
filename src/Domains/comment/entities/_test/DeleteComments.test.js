const DeleteComments = require('../DeleteComments');

describe('a DeleteComments entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      thread_id: 'thread-123',
      comment_id: 'comment-123',
    };

    expect(() => new DeleteComments(payload)).toThrowError('DELETE_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', () => {
    const payload = {
      thread_id: 'thread-123',
      comment_id: 'comment-123',
      user_id: 123,
    };

    expect(() => new DeleteComments(payload)).toThrowError('DELETE_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should delete comment object correctly', () => {
    const payload = {
      thread_id: 'thread-123',
      comment_id: 'comment-123',
      user_id: 'user-123',
    };

    const { thread, comment, user } = new DeleteComments(payload);

    expect(thread).toEqual(payload.thread_id);
    expect(comment).toEqual(payload.comment_id);
    expect(user).toEqual(payload.user_id);
  });
});
