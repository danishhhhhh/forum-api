class AddThreads {
  constructor(payload) {
    this._verifyPayload(payload);

    this.title = payload.title;
    this.body = payload.body;
    this.user = payload.user;
  }

  _verifyPayload(payload) {
    const { title, body, user } = payload;

    if (!title || !body || !user) {
      throw new Error('ADD_THREADS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof title !== 'string' || typeof body !== 'string' || typeof user !== 'string') {
      throw new Error('ADD_THREADS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddThreads;
