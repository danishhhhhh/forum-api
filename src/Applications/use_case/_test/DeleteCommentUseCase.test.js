const CommentsRepository = require('../../../Domains/comment/CommentsRepository');
const ThreadsRepository = require('../../../Domains/threads/ThreadsRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should throw error if use case payload not contain thread id or comment id', async () => {
    // Arrange
    const useCasePayload = {};
    const deleteCommentUseCase = new DeleteCommentUseCase({});

    // Action & Assert
    await expect(deleteCommentUseCase.execute(useCasePayload)).rejects.toThrowError('DELETE_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload not meet data type specification', async () => {
    const useCasePayload = {
      thread_id: 'thread-123',
      comment_id: 'comment-123',
      user_id: 123,
    };
    const deleteCommentUseCase = new DeleteCommentUseCase({});

    await expect(deleteCommentUseCase.execute(useCasePayload)).rejects.toThrowError('DELETE_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should orchestrating the delete comment action correctly', async () => {
    const useCasePayload = {
      thread_id: 'thread-123',
      comment_id: 'comment-123',
      user_id: 'user-123',
    };
    const mockCommentRepository = new CommentsRepository();
    const mockThreadRepository = new ThreadsRepository();

    mockThreadRepository.checkExistingThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.checkExistingCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.verifyCommentOwnerById = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.deleteCommentById = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    await deleteCommentUseCase.execute(useCasePayload);

    expect(mockThreadRepository.checkExistingThreadById)
      .toHaveBeenCalledWith(useCasePayload.thread_id);
    expect(mockCommentRepository.checkExistingCommentById)
      .toHaveBeenCalledWith(useCasePayload.comment_id);
    expect(mockCommentRepository.verifyCommentOwnerById)
      .toHaveBeenCalledWith(useCasePayload.comment_id, useCasePayload.user_id);
    expect(mockCommentRepository.deleteCommentById)
      .toHaveBeenCalledWith(useCasePayload.comment_id);
  });
});
