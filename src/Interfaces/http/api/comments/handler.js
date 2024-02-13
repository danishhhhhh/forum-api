const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');

class CommentsHandler {
  constructor(container) {
    this._container = container;

    this.postCommentsHandler = this.postCommentsHandler.bind(this);
    this.deleteCommentsHandler = this.deleteCommentsHandler.bind(this);
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

  async deleteCommentsHandler(request, h) {
    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
    const { id: user } = request.auth.credentials;
    const useCasePayload = {
      thread_id: request.params.threadId,
      comment_id: request.params.commentId,
      user_id: user,
    };
    await deleteCommentUseCase.execute(useCasePayload);
    const response = h.response({
      status: 'success',
    });

    response.code(200);
    return response;
  }
}

module.exports = CommentsHandler;
