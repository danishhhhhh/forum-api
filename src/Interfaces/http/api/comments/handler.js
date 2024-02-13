const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postCommentsHandler = this.postCommentsHandler.bind(this);
  }

  async postCommentsHandler(request, h) {
    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
    const { id: user } = request.auth.credentials;
    const useCasePayload = {
      content: request.payload.content,
      user,
      thread: request.params.threadId,
    };
    const addedComment = await addCommentUseCase.execute(useCasePayload);
    const response = h.response({
      status: 'success',
      data: {
        addedComment: { ...addedComment },
      },
    });

    response.code(201);
    return response;
  }
}

module.exports = CommentsHandler;
