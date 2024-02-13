const DeleteComments = require('../../Domains/comment/entities/DeleteComments');

class DeleteCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const { thread, comment, user } = new DeleteComments(useCasePayload);
    await this._threadRepository.checkExistingThreadById(thread);
    await this._commentRepository.checkExistingCommentById(comment);
    await this._commentRepository.verifyCommentOwnerById(comment, user);
    await this._commentRepository.deleteCommentById(comment);
  }
}

module.exports = DeleteCommentUseCase;
