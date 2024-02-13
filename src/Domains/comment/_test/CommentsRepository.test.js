const CommentsRepository = require('../CommentsRepository');

describe('CommentsRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const commentsRepository = new CommentsRepository();

    // Action and Assert
    await expect(commentsRepository.addComments({})).rejects.toThrowError('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentsRepository.deleteCommentById('')).rejects.toThrowError('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentsRepository.verifyCommentOwnerById('', '')).rejects.toThrowError('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentsRepository.getDetailCommentById('')).rejects.toThrowError('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(commentsRepository.checkExistingCommentById('')).rejects.toThrowError('COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
