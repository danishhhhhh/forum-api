const AddComments = require('../../Domains/comment/entities/AddComments');

class AddCommentUserCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const addComments = new AddComments(useCasePayload);
    await this._threadRepository.checkExistingThreadById(useCasePayload.thread);
    return this._commentRepository.addComments(addComments);
  }
}

module.exports = AddCommentUserCase;
