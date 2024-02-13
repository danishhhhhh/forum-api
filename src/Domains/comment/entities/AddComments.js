class AddComments {
  constructor(payload) {
    this._verifyPayload(payload);

    this.content = payload.content;
    this.user = payload.user;
    this.thread = payload.thread;
  }

  _verifyPayload(payload) {
    const { content, user, thread } = payload;

    if (!content || !user || !thread) {
      throw new Error('ADD_COMMENTS.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string' || typeof user !== 'string' || typeof thread !== 'string') {
      throw new Error('ADD_COMMENTS.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddComments;
