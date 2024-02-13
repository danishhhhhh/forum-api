const AddComments = require('../../Domains/comment/entities/AddComments');
const RegisterUser = require('../../Domains/users/entities/RegisterUser');

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
