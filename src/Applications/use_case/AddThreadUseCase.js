const AddThreads = require('../../Domains/threads/entities/AddThreads');

class AddThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const newThreads = new AddThreads(useCasePayload);
    return this._threadRepository.addThread(newThreads);
  }
}

module.exports = AddThreadUseCase;
