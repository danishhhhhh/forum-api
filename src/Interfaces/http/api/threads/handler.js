const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const { id: user } = request.auth.credentials;
    const useCasePayload = {
      title: request.payload.title,
      body: request.payload.body,
      user,
    };
    const addedThread = await addThreadUseCase.execute(useCasePayload);
    const response = h.response({
      status: 'success',
      data: {
        addedThread: { ...addedThread },
      },
    });

    response.code(201);
    return response;
  }
}

module.exports = ThreadsHandler;
