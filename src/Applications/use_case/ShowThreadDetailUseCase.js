const DetailThreads = require('../../Domains/threads/entities/DetailThreads');
const DetailComments = require('../../Domains/comment/entities/DetailComments');

class ShowDetailThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const { id } = new DetailThreads(useCasePayload);
    await this._threadRepository.checkExistingThreadById(id);
    const detailThread = await this._threadRepository.getDetailThreadById(id);
    const getCommentsThread = await this._commentRepository.getDetailCommentById(id);
    detailThread.comments = new DetailComments({ comments: getCommentsThread }).comments;
    return {
      thread: detailThread,
    };
  }
}

module.exports = ShowDetailThreadUseCase;
